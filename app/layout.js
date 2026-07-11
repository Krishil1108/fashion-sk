import "./globals.css";
import CartDrawer from "./components/CartDrawer";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata = {
  title: "Aura - Premium Fashion E-Commerce",
  description: "Next-generation luxury fashion e-commerce platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <ThemeProvider>
          {children}
          <CartDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}
