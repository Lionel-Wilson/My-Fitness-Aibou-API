"use client";
import { HomeNavBar } from "@/app/components/Homenavbar";
import { useState } from "react";

function formatFormData(formData: FormData) {
  var age: number = parseInt(formData.get("age") as string);
  var weight: number = parseInt(formData.get("weight") as string);
  var height: number = parseInt(formData.get("height") as string);
  var gender: string = formData.get("gender") as string;

  // Now you can use ExerciseName, CurrentWeight, MaxReps, and Notes in your code

  return {
    Age: age,
    Weight: weight,
    Height: height,
    Gender: gender,
  };
}

export default function BmrCalculator() {
  const [bmrResult, setBmrResult] = useState();

  async function getBmr(formData: FormData) {
    const rawFormData = formatFormData(formData);

    fetch("/api/bmr_calculator", {
      method: "POST",
      body: JSON.stringify(rawFormData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
        return res.json();
      })
      .then((data) => {
        setBmrResult(data);
      });
  }

  function clearForm() {
    const form = document.getElementById("bmr-form") as HTMLFormElement;

    if (form) {
      form.reset();
    }
  }

  return (
    <>
      <HomeNavBar />
      <div className="mx-auto max-w-7xl px-2 py-14 sm:px-6 lg:px-8 ">
        <form action={getBmr} id="bmr-form">
          <div className="space-y-12">
            <div className="border-b border-gray-100/10 pb-12">
              <h1 className="text-base font-semibold leading-7 text-amber-300">
                BMR Calculator
              </h1>
              <p className="mt-1 text-sm leading-6 text-gray-100">
                The Basal Metabolic Rate (BMR) Calculator estimates your basal
                metabolic rate—the amount of energy expended while at rest in a
                neutrally temperate environment, and in a post-absorptive state
                (meaning that the digestive system is inactive, which requires
                about 12 hours of fasting).
              </p>
            </div>

            <div className="border-b border-gray-100/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-amber-300">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-100">
                Metric Units
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    Weight (in kg)
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="weight"
                      id="weight"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="height"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    Height (in cm)
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="height"
                      id="height"
                      autoComplete="height"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    Age
                  </label>
                  <div className="mt-2">
                    <input
                      id="age"
                      name="age"
                      type="number"
                      autoComplete="age"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    Gender
                  </label>
                  <div className="mt-2">
                    <select
                      id="gender"
                      name="gender"
                      className="block w-full rounded-md border-0 py-1.5 text-text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
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
              Calculate
            </button>
          </div>
        </form>
        <div>
          <h1 className="text-2xl font-semibold leading-7 text-gray-100">
            {bmrResult ?? bmrResult}
          </h1>
        </div>
      </div>
    </>
  );
}
