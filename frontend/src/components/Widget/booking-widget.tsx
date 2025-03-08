import HomeView from "../../views/home";
import { createRoot } from "react-dom/client";
import * as React from "react"; // Make sure to import React explicitly

const BookingWidget = (elementId: string) => {
  const container = document.getElementById(elementId);
  if (!container) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }
  const root = createRoot(container);
  // Use the imported React to render
  root.render(React.createElement(HomeView));
};

if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    (window as any).BookingWidget = BookingWidget;
  });
}

export { BookingWidget };
