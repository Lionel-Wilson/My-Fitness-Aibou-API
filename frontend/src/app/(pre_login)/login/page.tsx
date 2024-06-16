"use client";
import { HomeNavBar } from "@/app/components/Homenavbar";
import { clearForm } from "@/app/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";

function formatFormData(formData: FormData) {
  var email: string = formData.get("email") as string;
  var password: string = formData.get("password") as string;

  return {
    email: email,
    password: password,
  };
}

export default function Login() {
  const [genericError, setgenericError] = useState("");

  async function login(formData: FormData) {
    const rawFormData = formatFormData(formData);
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(rawFormData),
    });
    if (!res.ok) {
      const data: string = await res.json();
      setgenericError(data);
      clearForm("login-form");
      return;
    }

    redirect(res.url);
  }

  return (
    <>
      <HomeNavBar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=amber&shade=300"
            alt="Your Company"
            height={40}
            width={58}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">
            Sign in to your account
          </h2>
        </div>

        {genericError && (
          <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-red-500">
            {genericError}
          </h2>
        )}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form id="login-form" className="space-y-6" action={login}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-amber-300 hover:text-amber-400"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
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

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-amber-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-100">
            Don&rsquo;t have an account?{" "}
            <a
              href="/signup"
              className="font-semibold leading-6 text-amber-300 hover:text-amber-400"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
