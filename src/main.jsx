import { createRoot } from "react-dom/client";
import "./index.css";
import { lazy } from "react";
const Router = lazy(() => import("./routes"));
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router />
      <div>
        <Toaster />
      </div>
    </GoogleOAuthProvider>
  </>
);
