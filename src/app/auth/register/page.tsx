
import React from "react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen ">
      <main className="bg-[url('../../public/assets/shutterstock_322888487-2-ql73b798b4ngnw8w8b3ygew6351qvtpdzdwjcka3qc.jpg')] bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center">
        <div className="bg-white/80 p-8 rounded-lg shadow-lg w-3/12">
          <h1 className="text-2xl font-bold mb-4 font-[family-name:var(--interSemiBold)]">
            Register
          </h1>
          <form action="" method="post">
          <div className="sm:col-span-8">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900 font-[family-name:var(--interRegular)]"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="name"
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-8">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900 font-[family-name:var(--interRegular)]"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-8">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900 font-[family-name:var(--interRegular)]"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            {/*Button  */}
            <div className="mt-6 flex items-center justify-center gap-x-6">
              <button
                type="submit"
                className="w-full font-[family-name:var(--interSemiBold)] rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-1.5 text-sm/6 text-gray-600 font-[family-name:var(--interMedium)]">
          Already have an account?{" "}
            <a href="/auth/login" className="text-blue-500">
            Login
            </a>{" "}
          </p>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
