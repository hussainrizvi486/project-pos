import "./index.css";

import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { SidebarLayout } from "@components/layouts";
import { DataForm } from "@components/data-form";

// import { Checkbox } from "@components/ui/checkbox";

const POSPage = React.lazy(() => import("./page/pos/index"));
const InvoicePage = React.lazy(() => import("./page/invoice/index"));
const LoginPage = React.lazy(() => import("./page/auth/login"));
const CheckoutPage = React.lazy(() => import("./page/checkout/index"));

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

function POSApp() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<POSPage />} index />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/form" element={<DataForm />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Suspense>
  );
}



export default POSApp;
