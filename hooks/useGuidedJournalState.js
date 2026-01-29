import { useState, useEffect, useCallback } from "react";
import { getPromptByNumber, getNextPromptNumber } from "../lib/journalPrompts";

/**
 * useGuidedJournalState - Manages guided journal mode state
 * 
 * Handles:
 * - Persisting the last completed prompt per user
 * - Cycling through prompts (1-365)
 * - Skip and Save for Later functionality
 * - LocalStorage integration for persistence
 */
export const useGuidedJournalState = (userId) => {
  const [currentPromptNumber, setCurrentPromptNumber] = useState(1);
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [savedForLater, setSavedForLater] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Storage keys
  const storageKey = `guided-journal-prompt-${userId}`;
  const savedForLaterKey = `guided-journal-saved-${userId}`;

  // Initialize from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    const savedList = localStorage.getItem(savedForLaterKey);

    if (saved) {
      const promptNum = parseInt(saved, 10);
      setCurrentPromptNumber(promptNum);
      setCurrentPrompt(getPromptByNumber(promptNum));
    } else {
      // Default to prompt #1
      setCurrentPrompt(getPromptByNumber(1));
    }

    if (savedList) {
      try {
        setSavedForLater(JSON.parse(savedList));
      } catch (e) {
        console.error("Failed to parse saved for later list:", e);
      }
    }

    setIsInitialized(true);
  }, [userId, storageKey, savedForLaterKey]);

  // Move to next prompt and persist
  const goToNextPrompt = useCallback(() => {
    const nextNumber = getNextPromptNumber(currentPromptNumber);
    setCurrentPromptNumber(nextNumber);
    const nextPrompt = getPromptByNumber(nextNumber);
    setCurrentPrompt(nextPrompt);
    localStorage.setItem(storageKey, nextNumber.toString());
  }, [currentPromptNumber, storageKey]);

  // Skip prompt (move to next without saving)
  const skipPrompt = useCallback(() => {
    goToNextPrompt();
  }, [goToNextPrompt]);

  // Save for later (add to list and move to next)
  const saveForLater = useCallback(() => {
    setSavedForLater((prev) => {
      const updated = [...prev, currentPromptNumber];
      localStorage.setItem(savedForLaterKey, JSON.stringify(updated));
      return updated;
    });
    goToNextPrompt();
  }, [currentPromptNumber, goToNextPrompt, savedForLaterKey]);

  // Go back to a saved-for-later prompt
  const goToSavedPrompt = useCallback((promptNumber) => {
    setCurrentPromptNumber(promptNumber);
    const prompt = getPromptByNumber(promptNumber);
    setCurrentPrompt(prompt);
    localStorage.setItem(storageKey, promptNumber.toString());
  }, [storageKey]);

  // Mark prompt as completed and move to next
  const markPromptComplete = useCallback(() => {
    // Remove from saved if it was there
    setSavedForLater((prev) => {
      const updated = prev.filter((p) => p !== currentPromptNumber);
      localStorage.setItem(savedForLaterKey, JSON.stringify(updated));
      return updated;
    });
    goToNextPrompt();
  }, [currentPromptNumber, goToNextPrompt, savedForLaterKey]);

  return {
    currentPromptNumber,
    currentPrompt,
    savedForLater,
    isInitialized,
    skipPrompt,
    saveForLater,
    goToSavedPrompt,
    markPromptComplete,
  };
};

export default useGuidedJournalState;
