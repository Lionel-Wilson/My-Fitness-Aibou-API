interface UserDetails {
  userName: string;
  about: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  password: string;
  dob: string;
  gender: string;
}

interface workoutStore {
  notes: string;
  exercises: Array<Exercise>;
}
interface Exercise {
  id: string;
  name: string;
  notes: string;
  currentWeight: number;
  currentMaxReps: number;
  sets: number;
}

/* not needed
export interface AddWorkoutLogFormData{
    ExerciseName: string,
    CurrentWeight: number,
    MaxReps: number,
    Notes: string,
} */
