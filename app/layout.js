import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../components/toggle/theme-provider"; 

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "WhatsApp Clone App",
  description: "Talk, connect, and share loving moments with your people",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} antialiased`}>
          <ThemeProvider >{children}</ThemeProvider>
      </body>
    </html>
  );
}
