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
    <div className="flex h-16 flex-col drop-shadow-md gap-4 pt-4 ">
      <div className="flex justify-between ">
      <button
          type="button"
          onClick={logout}
          className="rounded mx-2 bg-gray-800 py-1 px-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
        >
          Back
        </button>

        <div className="text-xl"> User: {name}</div>
      </div>
      <button
        type="button"
        onClick={click}
        className="rounded  w-full bg-gray-800 py-1  text-sm font-semibold text-white shadow-sm hover:bg-gray-600"
      >
        New message
      </button>
    </div>
  );
}
