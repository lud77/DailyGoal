
export interface Habit {
  id: string;
  name: string;
  createdAt: Date;
  completedToday: boolean;
  lastCompletedDate?: Date;
}

export interface HabitState {
  habits: Habit[];
  lastResetDate: string;
}

export interface HabitItemProps {
  habit: Habit;
  onToggle: (habitId: string) => void;
  onDelete: (habitId: string) => void;
}

export interface HabitListProps {
  habits: Habit[];
  onToggleHabit: (habitId: string) => void;
  onDeleteHabit: (habitId: string) => void;
}

export interface AddHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onAddHabit: (habitName: string) => void;
}