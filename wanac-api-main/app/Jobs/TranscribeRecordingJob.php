<?php

namespace App\Jobs;

use App\Models\Recording;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TranscribeRecordingJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $recording;

    public function __construct(Recording $recording)
    {
        $this->recording = $recording;
    }

    public function handle()
    {
        try {
            $path = public_path($this->recording->file_dir);
            $filename = basename($path);

            $response = Http::attach(
                'file',
                file_get_contents($path),
                $filename
            )->post(env('WHISPER_API_URL', 'https://whisper.wanac.org/transcribe'));


            if ($response->successful()) {
                $data = $response->json();

                $this->recording->update([
                    'language' => $data['language'] ?? null,
                    'duration' => $data['duration'] ?? null,
                    'transcription' => $data['transcription'] ?? null,
                ]);
            } else {
                // $this->recording->update(['status' => 'failed']);
            }
        } catch (\Exception $e) {
            Log::error('Transcription failed: ' . $e->getMessage());
            $this->recording->update(['transcription_status' => 'failed']);
        }
    }
}
