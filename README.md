# 🚀 MERN Appointment Booking System

This is a **MERN** (MongoDB, Express, React, Node.js) application for booking appointments. It includes a backend API with appointment scheduling functionality and a frontend widget that can be embedded on any website.

---

## 📂 Project Structure

```
MERN-Appointment-System/
│── backend/              # Express.js server
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── controllers/     # logic
│   ├── app.ts           # Express app instance
│   ├── server.ts        # Server entry point
│── frontend/             # React frontend
│   ├── src/
|   |   ├── App/        # Pages and layouts
│   │   ├── components/  # React components
│   │   ├── views/       # UI pages
│   |   ├── hooks/           # UseHooks
│   |   ├── libs/            # Configs
│   |   ├── store/           # Global store
│   |   ├── services/           # Api calls
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

#### **Frontend Configuration ( frontend/.env)**

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

### **Frontend Build & Widget**

To build the frontend widget:

```sh
cd frontend
yarn build-widget
```

This generates `public/booking-widget.js`, which can be used on any site:

```html
<script src="http://localhost:3000/booking-widget.js"></script>
<script>
  window.BookingWidget("widget-container");
</script>
```

---

## 🚀 Deployment

### **Backend (Node.js Server)**

```sh
yarn build
yarn start
```

### **Frontend (React App)**

```sh
yarn build
```

Deploy `dist/` folder using Vercel, Netlify, or any static hosting.

---

## 👨‍💻 Contributors

- **Vishnu** - [GitHub](https://github.com/itsmevizz/)
