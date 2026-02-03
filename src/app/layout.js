import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";
import '../scss/main.scss';
import localFont from 'next/font/local';

const sfProText = localFont({
  src: [
    {
      path: '../../public/assets/font/SF-Pro-Text-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/font/SF-Pro-Text-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/assets/font/SF-Pro-Text-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/assets/font/SF-Pro-Text-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sf-pro',
  display: 'swap',
});

export const metadata = {
  title: "Helix",
  description: "The DNA of Product Storytelling",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={sfProText.variable}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
