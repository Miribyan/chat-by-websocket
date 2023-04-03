import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";
import { getListRec, receivedMessage } from "../API";
import Header from "./Header";
import LiReceivedMessage from "./LiReceivedMessage";

const socket = io.connect(`https://${window.location.hostname}`);

export default function ChatWrap() {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    setActiveId(window.localStorage.getItem("activeUserId"));
  }, []);

  useEffect(() => {
    getListRec()
      .then((res) => res.json())
      .then((data) => {
        console.log()
        setItemList(data);
      });
  }, []);

  const getMessages = useCallback(() => {
    receivedMessage(activeId)
      .then((res) => res.json())
      .then((data) => setReceivedMessages(data.reverse()));
  }, [activeId]);

  useEffect(() => {
    getMessages();
  }, [activeId]);

  socket.on("new message", function (recipID) {
    if (recipID === activeId) {
      getMessages();
    }
  });

  return (
    <>
      <div>
        <div className="fixed inset-y-0 z-50 flex w-72 flex-col">
          <div className="flex grow bg-gray-50 drop-shadow-md flex-col gap-y-8 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <Header />
            <nav>
              <ul className="divide-y divide-gray-200">
                {receivedMessages.map((message) => (
                  <LiReceivedMessage
                    key={message.id}
                    message={message}
                    recipients={itemList}
                  />
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="pl-72">
          <main className="p-2 h-screen w-2/3 mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
