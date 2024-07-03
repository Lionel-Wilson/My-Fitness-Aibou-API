//TO-DO: ADD ERRORS MAP
export type AddWorkoutLogResponse = {
  flashMessage: string;
};

export type BmrFormData = {
  Age: number;
  Weight: number;
  Height: number;
  Gender: string;
};

export type User = {
  userName: string;
  about: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  password: string;
  dob: string;
  gender: string;
};

export interface StringMap {
  [key: string]: string;
}
export type SignupResponse = {
  flashMessage: string;
  errors: StringMap;
};
