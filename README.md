# 🚀 Appointment Booking System

This is a **MERN** (MongoDB, Express, React, Node.js) application for booking appointments. It includes a backend API with appointment scheduling functionality and a frontend widget that can be embedded on any website.

---

## 📂 Project Structure

```
Appointment-System/
│── backend/              # Express.js server
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── app.ts           # Express app instance
│   ├── server.ts        # Server entry point
│── frontend/             # Next.js frontend
│   ├── src/
|   |   ├── App/        # Pages and layouts
│   │   ├── components/  # React components
│   │   ├── views/       # UI pages
│   |   ├── hooks/       # Custom hooks
│   |   ├── libs/        # Configurations
│   |   ├── store/       # Global state management
│   |   ├── services/    # API calls
│   |   ├── components/widget/  # Widget source code
│   ├── public/          # Static assets
│── README.md            # Project documentation
```

---

## 🛠️ Setup & Installation

### 🔹 **1. Clone the Repository**

```sh
git clone https://github.com/your-repo/mern-appointment-system.git
cd mern-appointment-system
```

### 🔹 **2. Backend Setup**

```sh
cd backend
yarn install   # Install dependencies
yarn dev       # Start the server (runs on http://localhost:5000)
```

#### **Environment Variables (backend/.env)**

```env
MONGO_URI=mongodb://localhost:27017/appointments
PORT=5000
```

---

### 🔹 **3. Frontend Setup**

```sh
cd ../frontend
yarn install   # Install dependencies
yarn dev       # Start the frontend (runs on http://localhost:3000)
```

#### **Frontend Configuration (frontend/.env)**

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/appointments
```

---

## 📌 API Endpoints

### **1. Get Available Slots**

**`GET /appointments/:date`**  
_Returns available time slots for the given date._

```json
{
  "availableSlots": ["10:00 AM", "10:30 AM", "11:00 AM"]
}
```

### **2. Book an Appointment**

**`POST /appointments`**  
_Request Body:_

```json
{
  "name": "vizz",
  "phone": "1234567890",
  "date": "2025-03-07",
  "timeSlot": "10:00 AM"
}
```

_Response:_

```json
{
  "message": "Appointment booked successfully!"
}
```

---

## 📌 Frontend Widget

The frontend widget allows users to embed the appointment booking system on any website.

### **Building the Widget**

To generate or update the widget build, run:

```sh
cd frontend
yarn build-widget
```

This will generate or update `public/booking-widget.js`, which can be used on any website.

### **Embedding the Widget**

Include the widget on any site using:

```html
<script src="http://localhost:3000/booking-widget.js"></script>
<script>
  window.BookingWidget("widget-container");
</script>
```

Alternatively, to ensure the script is fully loaded before execution:

```html
<!-- Initialize the widget -->
<script>
  // Wait a moment to ensure script is fully loaded and executed
  setTimeout(function () {
    // Try to access the BookingWidget function directly
    if (typeof window.BookingWidget === "function") {
      window.BookingWidget("booking-widget-container");
    }
  }, 500); // Short delay to ensure script is loaded
</script>
```

### **Using the Widget in a Next.js App**

To use the widget in a Next.js application, dynamically load the script in a `useEffect` hook:

```tsx
import { useEffect } from "react";

const BookingWidgetComponent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "http://localhost:3000/booking-widget.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (typeof window.BookingWidget === "function") {
        window.BookingWidget("booking-widget-container");
      }
    };
  }, []);

  return <div id="booking-widget-container"></div>;
};

export default BookingWidgetComponent;
```

---

## 🚀 Deployment

### **Backend (Node.js Server)**

```sh
yarn build
yarn start
```

### **Frontend (Next.js App & Widget)**

```sh
yarn build
```

Deploy the `.next/` folder using Vercel, Netlify, or any static hosting provider.

---

## 👨‍💻 Contributors

- **Vishnu** - [GitHub](https://github.com/itsmevizz/)
