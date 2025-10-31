export interface TimeEntry {
  id: number;
  startTime: number;
  endTime: number;
  duration: number; // in seconds
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  picture: string;
}