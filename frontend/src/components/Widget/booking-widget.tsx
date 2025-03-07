import { createRoot } from "react-dom/client";
import HomeView from "@/views/home";

const BookingWidget = (elementId: string) => {
  const container = document.getElementById(elementId);
  if (!container) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  const root = createRoot(container);
  root.render(<HomeView />);
};

// ✅ Explicitly attach it to the `window` object
if (typeof window !== "undefined") {
  (window as any).BookingWidget = BookingWidget;
}

export default BookingWidget;
