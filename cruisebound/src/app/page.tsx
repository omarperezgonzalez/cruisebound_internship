import HeroSection from "@/components/HeroSection";
import SailingTable from "@/components/SailingTable";

export default function Home() {
  return (
    <main className="w-full h-full">
      <div className="h-dvh w-dw">
        <HeroSection />
      </div>

      <SailingTable />
    </main>
  );
}
