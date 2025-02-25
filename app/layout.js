import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import CalendlyPopup from "./components/helper/calendlyPopup"; // Import Calendly Widget
import ClientOnly from "./components/helper/clientwrapper";
import "./css/card.scss";
import "./css/globals.scss";
import { personalData } from "@/utils/data/personal-data";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `${personalData.name} - ${personalData.designation}`,
  description: `Innovative Senior Full Stack AI Engineer with 8+ years of experience designing and deploying scalable AI applications.
    Expertise in TypeScript, JavaScript, React/Next.js, Python, Golang, and cloud platforms like Google Cloud and AWS. Proven
    track record in building high-performance web applications, integrating AI models, and establishing robust CI/CD
    pipelines. Passionate about leveraging cutting-edge technologies to enhance user experience and system efficiency.`,
};

export default function RootLayout({ children }) {
  // Track whether window is available

  return (
    <html lang="en" id="root">
    
      <body className={inter.className}>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          <ClientOnly>{children}</ClientOnly>{" "}
          {/* Wrap children in client component */} <ScrollToTop />
        </main>
        <Footer />
        <CalendlyPopup />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
