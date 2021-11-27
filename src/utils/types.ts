export type Workout = {
  id: number;
  name: string;
  sets: number;
  reps: number;
};

export type Day = {
  name: string;
  exercises: Workout[];
};

export enum Week {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}
