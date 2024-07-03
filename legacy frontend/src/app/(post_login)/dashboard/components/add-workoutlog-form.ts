"use client";
import { AddWorkoutLogResponse } from "@/app/lib/types";
import { HomeNavBar } from "@/app/components/Homenavbar";
import { useState } from "react";

function formatFormData(formData: FormData) {
  var exerciseName: string = formData.get("ExerciseName") as string;
  var currentWeight: number | null = parseInt(
    formData.get("CurrentWeight") as string
  );
  var maxReps: number | null = parseInt(formData.get("MaxReps") as string);
  var notes: string | null = formData.get("Notes") as string;

  // Example: Handle NaN for CurrentWeight and MaxReps
  currentWeight = isNaN(currentWeight) ? null : currentWeight;
  maxReps = isNaN(maxReps) ? null : maxReps;

  // Now you can use ExerciseName, CurrentWeight, MaxReps, and Notes in your code

  return {
    ExerciseName: exerciseName,
    CurrentWeight: currentWeight,
    MaxReps: maxReps,
    Notes: notes,
  };
}

export default function SignUp() {
  const [flashMessage, setflashMessage] = useState("");

  async function postWorkoutlog(formData: FormData) {
    const rawFormData = formatFormData(formData);

    const res = await fetch("/api/add_workoutlog", {
      method: "POST",
      body: JSON.stringify(rawFormData),
    });
    const data = await res.json();
    const message = JSON.parse(data) as AddWorkoutLogResponse;
    setflashMessage(message.flashMessage);
    return;
  }

  function clearForm() {
    const formElement = document.getElementById(
      "workoutlog-form"
    ) as HTMLFormElement;

    if (formElement) {
      formElement.reset();
    }
  }

  return (
    <>
      <HomeNavBar />
      <div className="mx-auto max-w-7xl px-2 py-14 sm:px-6 lg:px-8">
        <h1>Welcome to the Signup Page!</h1>
        <br></br>
        <form action={postWorkoutlog} id="workoutlog-form">
          <div className="space-y-12">
            <div className="border-b border-gray-100/10 pb-12">
              <h1 className="text-base font-semibold leading-7 text-amber-300">
                Workout log
              </h1>
              <p className="mt-1 text-sm leading-6 text-gray-100">waffle</p>
            </div>

            <div className="border-b border-gray-100/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-amber-300">
                Workout Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-100">
                Metric Units
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="ExerciseName"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    Exercise Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="ExerciseName"
                      id="ExerciseName"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="CurrentWeight"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    Current Weight
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="CurrentWeight"
                      id="CurrentWeight"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="MaxReps"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    Max Reps
                  </label>
                  <div className="mt-2">
                    <input
                      id="MaxReps"
                      name="MaxReps"
                      type="number"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="Notes"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    Notes
                  </label>
                  <div className="mt-2">
                    <input
                      id="Notes"
                      name="Notes"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-100"
              onClick={clearForm}
            >
              Clear
            </button>
            <button
              type="submit"
              className="rounded-md bg-amber-300 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              Add
            </button>
          </div>
        </form>
        <div>
          <h1 className="text-2xl font-semibold leading-7 text-gray-100">
            {flashMessage ?? ""}
          </h1>
        </div>
      </div>
    </>
  );
}
