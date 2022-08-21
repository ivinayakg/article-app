import { LockClosedIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToStorage, axios } from "../services";

export default function Login() {
  const navigate = useNavigate();
  const formHandler = async (e) => {
    e.preventDefault();
    const data = {};
    const formData = new FormData(e.target);
    for (let x of formData) {
      data[x[0]] = x[1];
    }
    try {
      const res = await axios.post("/login", data);
      setTimeout(() => {
        navigate("/");
        navigate(0);
      }, 2000);
      addToStorage("isAuth", true, true);
      addToStorage("token", res.data.data.token);
      addToStorage("user", res.data.data.user, true);
      toast.success("Successfully Login");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-3xl font-medium text-gray-900 text-center">
              Articles
            </h1>
            <h2 className="mt-6 text-center text-xl tracking-tight font-bold text-gray-900">
              Log In to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={formHandler}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
              <Link
                to="/register"
                className="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border-indigo-600"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
