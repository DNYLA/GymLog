export type Exercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  completed: boolean;
};

export type Workout = {
  name: string;
  exercises: Exercise[];
};

export type ProgramType = {
  name: string;
  owner: string;
  items: Workout[];
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
