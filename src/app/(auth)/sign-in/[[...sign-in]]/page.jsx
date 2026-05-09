"use client";

import { SignIn } from "@clerk/nextjs";
import { useTheme } from "@/context/ThemeContext";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  const { isDark } = useTheme();

  return (
    <SignIn 
      appearance={{
        baseTheme: isDark ? dark : undefined,
        variables: {
          colorPrimary: "#c9a96e",
          colorBackground: isDark ? "#121212" : "#ffffff", // Solid colors to ensure readability
          fontFamily: "var(--font-inter), sans-serif",
          borderRadius: "0.75rem",
        },
        elements: {
          card: "shadow-2xl border border-[var(--border-light)]",
          headerTitle: "font-serif text-3xl",
          formButtonPrimary: "shadow-lg",
        }
      }}
    />
  );
}
