import type { Metadata } from "next";
import ToolbarComponent from "../components/headerComponent";
import backgroundImage from "@/public/coffeeShopBackground.jpg"; // Import your background image

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  
};



export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <div className="relative">
      <header className="relative z-50 ">
        <ToolbarComponent />
      </header>
      <main className={`relative min-h-screen bg-cover bg-center`} style={{ backgroundImage: `url(${backgroundImage.src})` }}>
        <div className="relative z-10">{children}</div>
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div> {/* Optional: Add overlay */}
      </main>
    </div>
  );
}
