import { useState, useEffect, useCallback } from 'react';

import { Habit, HabitState } from '../types';

const useHabits = () => {
  const [habitState, setHabitState] = useState<HabitState>({
    habits: [],
    lastResetDate: new Date().toDateString(),
  });

  // Get today's date string for comparison
  const getTodayString = () => new Date().toDateString();

  // Check if habits need to be reset (new day)
  const checkAndResetDaily = useCallback(() => {
    const today = getTodayString();

    if (habitState.lastResetDate !== today) {
      setHabitState(prevState => ({
        ...prevState,
        habits: prevState.habits.map(habit => ({
          ...habit,
          completedToday: false, // Reset completion status
        })),
        lastResetDate: today,
      }));
    }
  }, [habitState.lastResetDate]);

  // Run daily reset check on mount and when app becomes active
  useEffect(() => {
    checkAndResetDaily();
  }, [checkAndResetDaily]);

  // Generate unique ID for new habits
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Add a new habit
  const addHabit = useCallback((name: string) => {
    const newHabit: Habit = {
      id: generateId(),
      name: name.trim(),
      completedToday: false,
      createdAt: new Date(),
    };

    setHabitState((prevState) => {
      return {
        ...prevState,
        habits: [...prevState.habits, newHabit],
      }
    });
  }, []);

  // Toggle habit completion status
  const toggleHabit = useCallback((habitId: string) => {
    setHabitState(prevState => ({
      ...prevState,
      habits: prevState.habits.map(habit =>
        habit.id === habitId
          ? { ...habit, completedToday: !habit.completedToday }
          : habit
      ),
    }));
  }, []);

  // Delete a habit
  const deleteHabit = useCallback((habitId: string) => {
    setHabitState(prevState => ({
      ...prevState,
      habits: prevState.habits.filter(habit => habit.id !== habitId),
    }));
  }, []);

  // Get habits sorted by creation date (newest first)
  const getSortedHabits = useCallback(() => {
    return [...habitState.habits].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [habitState.habits]);

  // Get completion statistics
  const getStats = useCallback(() => {
    const total = habitState.habits.length;
    const completed = habitState.habits.filter(habit => habit.completedToday).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      remaining: total - completed,
      completionRate,
    };
  }, [habitState.habits]);

  // Reset all habits (for testing or manual reset)
  const resetAllHabits = useCallback(() => {
    setHabitState((prevState) => ({
      ...prevState,
      habits: prevState.habits.map(habit => ({
        ...habit,
        completedToday: false,
      })),
      lastResetDate: getTodayString(),
    }));
  }, []);

  // Clear all habits
  const clearAllHabits = useCallback(() => {
    setHabitState((prevState) => ({
      ...prevState,
      habits: [],
    }));
  }, []);

  return {
    // State
    habits: getSortedHabits(),
    stats: getStats(),

    // Actions
    addHabit,
    toggleHabit,
    deleteHabit,
    resetAllHabits,
    clearAllHabits,

    // Utilities
    checkAndResetDaily,
  };
};

export default useHabits;