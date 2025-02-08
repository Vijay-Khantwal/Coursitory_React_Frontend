# Coursitory Frontend

A modern, responsive web application for an online learning platform built with React and Tailwind CSS.
<br>
<br>
Checkout **[Coursitory_Spring_Backend](https://github.com/Vijay-Khantwal/Coursitory_Spring_BackEnd)** for the associated backend of this application.

## 🚀 Features

- **User Authentication**
  - Login/Register functionality
  - Sign in with Google for easier login
  - JWT-based authentication
  - Persistent session management

- **Course Management**
  - Browse all available courses
  - View enrolled courses
  - Course details with video and PDF content
  - Secure payments for course access

- **Payments**
  - Integrated Razorpay payment gateway for purchasing course access
  - Secure and seamless transactions

- **Content Delivery**
  - Video streaming integration
  - PDF document viewing
  - Responsive video player
  - Dynamic content loading in chunks

- **UI/UX**
  - Responsive design for all devices
  - Loading states and animations
  - Toast notifications

## 🛠️ Tech Stack and Dependencies

- **React** - Frontend framework
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - API requests
- **React Hot Toast** - Notifications
- **Framer Motion** - Animations
- **@react-oauth/google** - OAuth through Google

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Vijay-Khantwal/Coursitory_React_Frontend.git
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory:
```bash
VITE_API_URL=http://your-backend-url
VITE_RZP_KEY_ID=your-razorpay-key
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```
4. Start the development server:
```bash
npm run dev
```

## 🔑 Key Components

- **CourseCard**: Displays course information.
- **VideoPlayer**: Custom video player component.
- **Header**: Navigation and Search.
- **CourseDetails**: Detailed course view.
- **CoursePage**: Homepage with featured courses.

---

## 🔒 Environment Variables

| Variable               | Description                          |
| ---------------------- | ------------------------------------ |
| **VITE_API_URL**       | Backend API URL.                    |
| **VITE_RZP_KEY_ID**    | Razorpay API Key for payments.      |
| **VITE_GOOGLE_CLIENT_ID** | Google OAuth Client ID for authentication. |

---

## 🤝 Contributing

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a pull request
