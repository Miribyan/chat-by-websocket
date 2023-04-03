import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setName(window.localStorage.getItem("activeUserName"));
  }, []);

  const click = () => {
    navigate(`send-message`);
  };
  const logout = () => {
    navigate(`/`);
    window.localStorage.setItem("activeUserName", "");
    window.localStorage.setItem("activeUserId", "");
  };
  return (
    <div className="flex h-16 flex-col gap-4 pt-4 ">
      <div className="flex justify-between ">
        <div className="text-xl text-indigo-800 ">Hello, {name}</div>
        <button
          type="button"
          onClick={logout}
          className="rounded bg-red-600 py-1 px-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Log Out
        </button>
      </div>
      <button
        type="button"
        onClick={click}
        className="rounded  w-full bg-indigo-100 py-1 px-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-150"
      >
        New message
      </button>
    </div>
  );
}
