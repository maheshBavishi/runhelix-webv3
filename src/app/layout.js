import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";
import '../scss/main.scss';
import { preload } from 'react-dom';

export const metadata = {
  title: "Helix",
  description: "The DNA of Product Storytelling",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  preload('/assets/font/SF-Pro-Text-Regular.otf', { as: 'font', type: 'font/otf', crossOrigin: 'anonymous' });
  return (
    <html lang="en">
      <body>
        {/* <SmoothScroll> */}
        <Header />
        {children}
        <Footer />
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}
