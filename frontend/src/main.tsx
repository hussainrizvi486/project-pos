import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import POSApp from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store.ts";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
      <Provider store={store}>
        <Router>
          <POSApp />
        </Router>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
