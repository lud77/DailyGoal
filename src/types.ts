
export interface Habit {
  id: string;
  name: string;
  createdAt: Date;
  completedToday: boolean;
  lastCompletedDate?: Date;
}
