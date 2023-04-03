import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import ChatWrap from "./Pages/ChatWrap";
import SendMessage from "./Pages/SendMessage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat/:id" element={<ChatWrap />}>
        <Route path="send-message/*" element={<SendMessage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
