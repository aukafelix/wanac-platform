import { useState, useRef } from 'react';
import { huggingfaceService } from '../../../../../services/api/huggingface.service';
import { meetingService } from '../../../../../services/api/meeting.service';

/**
 * Custom hook to manage meeting recording and AI processing
 */
export function useRecording(jitsiApiRef, jitsiReady) {
  const [isRecording, setIsRecording] = useState(false);
  const [currentRecordingId, setCurrentRecordingId] = useState(null);
  const [recordingBlob, setRecordingBlob] = useState(null);
  const [processingRecording, setProcessingRecording] = useState(false);
  const [meetingSummaries, setMeetingSummaries] = useState(null);

  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  /**
   * Toggle recording on/off
   */
  const toggleRecording = async () => {
    if (!jitsiApiRef?.current || !jitsiReady) {
      console.warn('⚠️ Jitsi not ready for recording');
      throw new Error('Jitsi is not ready. Please wait a moment and try again.');
    }

    try {
      if (isRecording) {
        // STOP RECORDING
        console.log('🛑 Stopping recording...');

        // Stop Jitsi recording if available
        try {
          await jitsiApiRef.current.executeCommand('stopRecording', 'file');
          console.log('✅ Jitsi recording stopped');
        } catch (err) {
          console.warn('⚠️ Could not stop Jitsi recording:', err);
        }

        // Stop local media recorder
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
          console.log('✅ Local recorder stopped');
        }

        setIsRecording(false);
        console.log('✅ Recording stopped successfully');
      } else {
        // START RECORDING
        console.log('🔴 Starting recording...');

        // Start Jitsi recording if available
        try {
          await jitsiApiRef.current.executeCommand('startRecording', {
            mode: 'file',
            shouldShare: false,
            rtmpStreamKey: '',
            rtmpBroadcastID: '',
            youtubeStreamKey: '',
            youtubeBroadcastID: '',
          });
          console.log('✅ Jitsi recording started (server-side)');
        } catch (err) {
          console.warn('⚠️ Jitsi recording not available, using local recording only:', err.message);
        }

        // Start local media recorder as backup/fallback
        try {
          // Get display media (screen + audio) for better quality
          let stream;
          try {
            // Try to get screen + audio
            stream = await navigator.mediaDevices.getDisplayMedia({ 
              audio: true,
              video: true 
            });
            console.log('✅ Screen capture with audio enabled');
          } catch (err) {
            // Fallback to just microphone audio
            console.log('⚠️ Screen capture unavailable, using microphone only');
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          }
          
          const mediaRecorder = new MediaRecorder(stream, {
            mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9') 
              ? 'video/webm;codecs=vp9'
              : 'video/webm'
          });
          mediaRecorderRef.current = mediaRecorder;
          recordedChunksRef.current = [];

          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              recordedChunksRef.current.push(event.data);
              console.log('📦 Recording chunk saved:', event.data.size, 'bytes');
            }
          };

          mediaRecorder.onstop = async () => {
            const blob = new Blob(recordedChunksRef.current, { 
              type: stream.getVideoTracks().length > 0 ? 'video/webm' : 'audio/webm' 
            });
            setRecordingBlob(blob);
            console.log('✅ Recording saved locally, size:', (blob.size / 1024 / 1024).toFixed(2), 'MB');

            // Stop all tracks
            stream.getTracks().forEach((track) => {
              track.stop();
              console.log('🛑 Track stopped:', track.kind);
            });
          };

          mediaRecorder.start(1000); // Collect data every second
          console.log('✅ Local media recorder started');
        } catch (err) {
          console.error('❌ Failed to start local recorder:', err);
          throw new Error('Could not access microphone/screen. Please grant permissions.');
        }

        setIsRecording(true);

        // Generate a temporary recording ID
        const tempRecordingId = `rec_${Date.now()}`;
        setCurrentRecordingId(tempRecordingId);
        console.log('✅ Recording started with ID:', tempRecordingId);
      }
    } catch (err) {
      console.error('❌ Failed to toggle recording:', err);
      throw new Error('Failed to toggle recording: ' + err.message);
    }
  };

  /**
   * Process recording with AI transcription and summaries
   */
  const processRecording = async (meetingData, searchParams) => {
    if (!recordingBlob || !currentRecordingId) {
      throw new Error('No recording available to process');
    }

    setProcessingRecording(true);

    try {
      const userId = localStorage.getItem('user_id') || 'unknown';
      const userName = localStorage.getItem('user_name') || 'Participant';
      const expId = searchParams?.get('id');
      const ftId = searchParams?.get('fireteamId');

      console.log('🎙️ Starting transcription...');

      // Step 1: Transcribe audio using OpenAI Whisper
      const transcriptionResult = await openaiService.transcribeAudio(recordingBlob);
      const transcript = transcriptionResult.text;

      console.log('✅ Transcription complete, length:', transcript.length);
      console.log('🤖 Generating AI summaries...');

      // Step 2: Generate all 3 summaries in parallel
      const summaries = await huggingfaceService.generateMeetingSummaries(transcript, meetingData);

      console.log('✅ AI summaries generated');
      console.log('📤 Uploading to backend...');

      // Step 3: Upload recording with metadata using new service
      const metadata = {
        transcript: transcript,
        summaries: summaries,
        participants: meetingData.attendanceLog || [],
        start_time: meetingData.startTime || new Date().toISOString(),
        end_time: new Date().toISOString(),
        duration: meetingData.duration || '0 mins',
        user_id: userId,
        user_name: userName,
        attendance_log: meetingData.attendanceLog || [],
      };

      await meetingService.uploadRecording(
        ftId,
        expId,
        recordingBlob,
        metadata
      );

      console.log('✅ Recording uploaded successfully');

      // Set summaries for modal display
      setMeetingSummaries(summaries);

      // Return both summaries and recording ID
      return {
        summaries,
        recordingId: currentRecordingId
      };
    } catch (error) {
      console.error('❌ Failed to process recording:', error);
      throw new Error(
        'Failed to process recording: ' + (error.response?.data?.message || error.message)
      );
    } finally {
      setProcessingRecording(false);
    }
  };

  return {
    isRecording,
    recordingBlob,
    processingRecording,
    meetingSummaries,
    toggleRecording,
    processRecording,
    setMeetingSummaries,
  };
}

