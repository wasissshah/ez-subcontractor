"use client";
import "../styles/font-montserrat.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../styles/style.css";
import { useEffect } from "react";



export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <head>
      </head>
      <body>{children}</body>
      </html>
  );
}
