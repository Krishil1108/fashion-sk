import Script from 'next/script';

export const metadata = {
  title: "Myntra Clone",
  description: "E-commerce fashion store cloned and powered by Next.js & Sanity CMS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Boxicons CSS */}
        <link href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css" rel="stylesheet" />
        {/* FontAwesome script */}
        <Script src="https://kit.fontawesome.com/72215895a8.js" crossorigin="anonymous" strategy="beforeInteractive" />
      </head>
      <body>{children}</body>
    </html>
  );
}
