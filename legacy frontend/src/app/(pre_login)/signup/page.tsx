"use client";
import { HomeNavBar } from "@/app/components/Homenavbar";
import { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { SignupResponse, StringMap, User } from "@/app/lib/types";
import { clearForm } from "@/app/lib/utils";
import { redirect } from "next/navigation";

function formatFormData(formData: FormData) {
  var userName: string = formData.get("username") as string;
  var about: string = formData.get("about") as string;
  var firstName: string = formData.get("first-name") as string;
  var lastName: string = formData.get("last-name") as string;
  var email: string = formData.get("email") as string;
  var country: string = formData.get("country") as string;
  var password: string = formData.get("password") as string;
  var dob: string = formData.get("dob") as string;
  var gender: string = formData.get("gender") as string;

  return {
    userName: userName,
    about: about,
    firstName: firstName,
    lastName: lastName,
    email: email,
    country: country,
    password: password,
    dob: dob,
    gender: gender,
  };
}

export default function SignUp() {
  const [flashMessage, setflashMessage] = useState("");
  const [errors, setErrors] = useState<StringMap>({ field: "" });

  async function submitSignUpForm(formData: FormData) {
    const rawFormData = formatFormData(formData);
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(rawFormData),
    });
    if (res.ok) {
      redirect(res.url);
    } else {
      const data: SignupResponse = await res.json();
      setflashMessage(data.flashMessage);
      setErrors(data.errors);
      return;
    }
  }

  return (
    <>
      <HomeNavBar />
      <div className="mx-auto max-w-7xl px-2 py-14 sm:px-6 lg:px-8">
        <form id="signup-form" action={submitSignUpForm}>
          <div className="space-y-12">
            <div className="border-b border-amber-300/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-amber-300">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-300">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-300 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-300 sm:text-sm">
                        myfitnessaibou.com/
                      </span>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-amber-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="janesmith"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-amber-300"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    About
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-300">
                    Write a few sentences about yourself.
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    Date of Birth
                  </label>
                  <div className="mt-2">
                    <input
                      id="dob"
                      name="dob"
                      autoComplete="bday"
                      type="date"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:max-w-xs sm:text-sm sm:leading-6"
                    ></input>
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
                      autoComplete="sex"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
                {/*
                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <UserCircleIcon
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      className="rounded-md bg-amber-300 px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-amber-300 hover:bg-gray-50"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-amber-300/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-300">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-amber-300 font-semibold text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-300 focus-within:ring-offset-2 hover:text-gray-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-300">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
*/}
              </div>
            </div>

            <div className="mt-2">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-amber-300"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Japan</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-amber-300"
              onClick={() => clearForm("signup-form")}
            >
              Clear
            </button>
            <button
              type="submit"
              className="rounded-md bg-amber-300 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-black hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div>
          <h1 className="text-2xl font-semibold leading-7 text-gray-100">
            {flashMessage ?? ""}
          </h1>
          {Object.values(errors).map((error, index) => (
            <h1
              key={`error-${index}`}
              className="text-2xl font-semibold leading-7 text-red-500"
            >
              {error}
            </h1>
          ))}
        </div>
      </div>
    </>
  );
}
