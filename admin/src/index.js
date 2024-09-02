import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter,HashRouter } from "react-router-dom";
import App from "App";
import { AdminControllerProvider } from "context";
import { QueryClient, QueryClientProvider } from "react-query";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import CustomToaster from "utils/CustomToaster";

const container = document.getElementById("root");
const root = createRoot(container);
const queryClient = new QueryClient();

root.render(
  <HashRouter>
    <AdminControllerProvider>
      <QueryClientProvider client={queryClient}>
        <PerfectScrollbar>
          <CustomToaster />
          <App />
        </PerfectScrollbar>
      </QueryClientProvider>
    </AdminControllerProvider>
  </HashRouter>
);
