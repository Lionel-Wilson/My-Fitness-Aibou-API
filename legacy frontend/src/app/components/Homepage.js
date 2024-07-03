'use client'
import { HomeNavBar } from "./Homenavbar";
import {
    ClipboardDocumentListIcon,
    ShoppingCartIcon,
    UsersIcon,
  } from "@heroicons/react/20/solid";
import Image from 'next/image'


export function HomePage() {



      const features = [
        {
          name: "Create your own workouts.",
          description:
            "Add exercises from our large database of exercises to your workout. Track your reps to make sure you’re pushing yourself and doing progressive overload",
          icon: ClipboardDocumentListIcon,
        },
        {
          name: "Everything calories.",
          description:
            "Calculate your BMR, view your calories on a weekly scale('Calorie banking') and precisely track your daily calorie consumption.",
          icon: ShoppingCartIcon,
        },
        {
          name: "Connect with friends.",
          description:
            "Achieve your goals more easily by connect with your friends, sharing your progress and keeping eachother accountable",
          icon: UsersIcon,
        },
      ];
  return (
    <div className="bg-gradient-to-r from-gray-950 from-25% via-gray-950 via-65% to-gray-950 to-90%">
    <header className="absolute inset-x-0 top-0 z-50">
      <HomeNavBar   />

 
    </header>

    <div className="relative isolate px-6 pt-14 lg:px-8">
      {/*}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#fef3c7] to-[#eab308] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
        */}
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-100 ring-1 ring-gray-100 hover:ring-gray-900/20">
            Announcing our next round of funding.{" "}
            <a href="#" className="font-semibold text-amber-300">
              <span className="absolute inset-0" aria-hidden="true" />
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-50 sm:text-6xl">
            Reach your goals with MyFitnessAibou
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-100">
            Build healthy habits with the all-in-one food, exercise, and
            calorie tracker.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-amber-300 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              Get started
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-100"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      {/*
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#fef3c7] to-[#eab308] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
        */}
    </div>
    <div className="overflow-hidden bg-gradient-to-r from-gray-950 from-25% via-gray-950 via-65% to-gray-950 to-90% py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-amber-300">
                Deploy faster
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
                Hit your health goals in 1-2-3
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-100">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores impedit perferendis suscipit eaque, iste dolor
                cupiditate blanditiis ratione.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-100 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-100">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-amber-300"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  </div>
  )
}