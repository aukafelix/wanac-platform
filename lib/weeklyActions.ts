/**
 * Weekly Actions - Rotates through 52 weekly action prompts
 * 
 * Shows one prompt per week (determined by ISO week number)
 * Non-intrusive, optional, supportive tone.
 */

const weeklyActions = [
  {
    week: 1,
    prompt: "This week, reach out to one person who matters to you.",
  },
  {
    week: 2,
    prompt: "This week, do something that brings you joy, no matter how small.",
  },
  {
    week: 3,
    prompt: "This week, try one new thing, however minor.",
  },
  {
    week: 4,
    prompt: "This week, practice saying 'no' to something that doesn't serve you.",
  },
  {
    week: 5,
    prompt: "This week, notice and appreciate one strength in yourself.",
  },
  {
    week: 6,
    prompt: "This week, take care of your physical health in one meaningful way.",
  },
  {
    week: 7,
    prompt: "This week, listen to someone without trying to fix or advise.",
  },
  {
    week: 8,
    prompt: "This week, do one thing that scares you, even if it's small.",
  },
  {
    week: 9,
    prompt: "This week, express gratitude to someone who has helped you.",
  },
  {
    week: 10,
    prompt: "This week, set one boundary that protects your well-being.",
  },
  {
    week: 11,
    prompt: "This week, spend time in nature or outdoors.",
  },
  {
    week: 12,
    prompt: "This week, create something, anything—art, writing, a meal.",
  },
  {
    week: 13,
    prompt: "This week, forgive yourself for one thing you've been holding onto.",
  },
  {
    week: 14,
    prompt: "This week, help someone without expecting anything in return.",
  },
  {
    week: 15,
    prompt: "This week, move your body in a way that feels good.",
  },
  {
    week: 16,
    prompt: "This week, learn something new, however small.",
  },
  {
    week: 17,
    prompt: "This week, be kind to someone who is struggling.",
  },
  {
    week: 18,
    prompt: "This week, spend quality time with someone you care about.",
  },
  {
    week: 19,
    prompt: "This week, take a break when you need one.",
  },
  {
    week: 20,
    prompt: "This week, practice patience with yourself.",
  },
  {
    week: 21,
    prompt: "This week, do something that makes you proud.",
  },
  {
    week: 22,
    prompt: "This week, face one fear, no matter how small.",
  },
  {
    week: 23,
    prompt: "This week, celebrate a win, even a tiny one.",
  },
  {
    week: 24,
    prompt: "This week, ask for help when you need it.",
  },
  {
    week: 25,
    prompt: "This week, notice the good things around you.",
  },
  {
    week: 26,
    prompt: "This week, take care of one thing you've been putting off.",
  },
  {
    week: 27,
    prompt: "This week, practice self-compassion when you fall short.",
  },
  {
    week: 28,
    prompt: "This week, connect with your values in one concrete way.",
  },
  {
    week: 29,
    prompt: "This week, do something that aligns with your purpose.",
  },
  {
    week: 30,
    prompt: "This week, give yourself permission to rest.",
  },
  {
    week: 31,
    prompt: "This week, check in with someone from your past.",
  },
  {
    week: 32,
    prompt: "This week, reflect on your progress.",
  },
  {
    week: 33,
    prompt: "This week, practice gratitude in one small way daily.",
  },
  {
    week: 34,
    prompt: "This week, challenge one negative belief about yourself.",
  },
  {
    week: 35,
    prompt: "This week, spend time doing something you love.",
  },
  {
    week: 36,
    prompt: "This week, show up authentically with at least one person.",
  },
  {
    week: 37,
    prompt: "This week, take one step toward a goal that matters to you.",
  },
  {
    week: 38,
    prompt: "This week, practice saying what you really feel.",
  },
  {
    week: 39,
    prompt: "This week, be present for one moment each day.",
  },
  {
    week: 40,
    prompt: "This week, acknowledge something you've overcome.",
  },
  {
    week: 41,
    prompt: "This week, do something kind for yourself.",
  },
  {
    week: 42,
    prompt: "This week, connect with your strength.",
  },
  {
    week: 43,
    prompt: "This week, honor your feelings, whatever they are.",
  },
  {
    week: 44,
    prompt: "This week, invest in a relationship that matters.",
  },
  {
    week: 45,
    prompt: "This week, try something that makes you grow.",
  },
  {
    week: 46,
    prompt: "This week, give yourself credit for showing up.",
  },
  {
    week: 47,
    prompt: "This week, practice mindfulness or meditation.",
  },
  {
    week: 48,
    prompt: "This week, reflect on how far you've come.",
  },
  {
    week: 49,
    prompt: "This week, do something that scares and excites you.",
  },
  {
    week: 50,
    prompt: "This week, lean on your support system.",
  },
  {
    week: 51,
    prompt: "This week, celebrate your resilience.",
  },
  {
    week: 52,
    prompt: "This week, reflect on the year and set one intention.",
  },
];

/**
 * Get the current ISO week number (1-52)
 */
export const getCurrentWeekNumber = () => {
  const date = new Date();
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const weekNumber = Math.ceil((dayOfYear + new Date(date.getFullYear(), 0, 1).getDay()) / 7);
  return weekNumber;
};

/**
 * Get the weekly action for this week
 */
export const getWeeklyAction = () => {
  const weekNumber = getCurrentWeekNumber();
  return weeklyActions.find((a) => a.week === weekNumber) || weeklyActions[0];
};

/**
 * Get the last completion date from localStorage
 */
export const getLastWeeklyActionCompletedWeek = (userId: string) => {
  const key = `weekly-action-completed-week-${userId}`;
  const saved = localStorage.getItem(key);
  return saved ? parseInt(saved, 10) : null;
};

/**
 * Mark weekly action as completed
 */
export const markWeeklyActionCompleted = (userId: string, weekNumber: number | null = null) => {
  const week = weekNumber || getCurrentWeekNumber();
  const key = `weekly-action-completed-week-${userId}`;
  localStorage.setItem(key, week.toString());
};

/**
 * Check if user should see weekly action (first time this week)
 */
export const shouldShowWeeklyAction = (userId: string) => {
  const currentWeek = getCurrentWeekNumber();
  const lastCompleted = getLastWeeklyActionCompletedWeek(userId);
  return lastCompleted !== currentWeek;
};

export default weeklyActions;
