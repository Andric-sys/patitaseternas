"use client"

import type React from "react"

import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PayPalScriptProvider
        options={{
          "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
          currency: "MXN",
          intent: "capture",
        }}
      >
        {children}
      </PayPalScriptProvider>
    </SessionProvider>
  )
}

