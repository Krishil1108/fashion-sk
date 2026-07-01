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
        {/* FontAwesome CSS */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </head>
      <body>{children}</body>
    </html>
  );
}
