import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByName, login } from "../API";

function Login() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();


  const onLogin = () => {
    login(name).then((res) => {
      if (res.status === 200) {
        getUserByName(name)
          .then((res) => res.json())
          .then((data) => {
            window.localStorage.setItem("activeUserName", data[0].name);
            window.localStorage.setItem("activeUserId", data[0].id);
            navigate(`/chat/${data[0].id}`);
          });
      }
    });
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">
                Name for login
              </label>
              <input
                id="name"
                name="email"
                type="text"
                required
                className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="  Write your name"
                onInput={(e) => setName(e.target.value)}
              />
            </div>
            
          </div>
          <div>
            <button
              type="button"
              onClick={onLogin}
              className="group relative flex w-full justify-center rounded-md bg-sky-400 py-2 px-3 text-sm font-semibold text-white hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
