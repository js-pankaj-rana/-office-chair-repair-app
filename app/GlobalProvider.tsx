"use client";

import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import ToastProvider from "@/components/ToasterProvider";
import { Provider } from "react-redux";

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastProvider />
      <Provider store={store}>
        <SessionProvider>{children}</SessionProvider>
      </Provider>
    </>
  );
}
