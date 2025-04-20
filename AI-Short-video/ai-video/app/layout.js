import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const outfit = Outfit({subsets:['latin']})

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
      className={outfit.className}
      >
     <ConvexClientProvider>
      {children}
      </ConvexClientProvider>
        
      </body>
    </html>
  );
}
