import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

if (typeof window !== "undefined") {
  const script = document.createElement("script");
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  script.async = true;
  document.head.appendChild(script);

  (window as any).fbq = function (...args: any[]) {
    (window as any).fbq.callMethod
      ? (window as any).fbq.callMethod.apply((window as any).fbq, args)
      : (window as any).fbq.queue.push(args);
  };
  (window as any).fbq.queue = [];
  (window as any).fbq.loaded = true;
  (window as any).fbq.version = "2.0";
  (window as any).fbq("init", "2622116344790469");
  (window as any).fbq("track", "PageView");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
