import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes.jsx";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={routes} />
      <div>
        <Toaster />
      </div>
    </GoogleOAuthProvider>
  </>
);
