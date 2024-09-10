import AppLayoutWrapper from "@/layouts/AppLayoutWrapper";
import router from "@/router";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";

const AppProvider = () => {
  return (
    <HelmetProvider>
      <AppLayoutWrapper>
        <RouterProvider router={router} />
        <Toaster
          toastOptions={{
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            className: "text-xs md:text-sm ",
            success: {
              duration: 5000,
              icon: "🎉",
            },
            error: {
              duration: 3000,
              icon: "👎",
            },
          }}
        />
      </AppLayoutWrapper>
    </HelmetProvider>
  );
};

export default AppProvider;
