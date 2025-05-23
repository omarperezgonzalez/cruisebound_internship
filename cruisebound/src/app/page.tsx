import HeroSection from "@/components/HeroSection";
import SailingTable from "@/components/SailingTable";

export default function Home() {
  return (
    <main className="w-full h-full">
      <div className="h-[100dv] w-[100dw]">
        <HeroSection />
      </div>

      <SailingTable />
    </main>
  );
}
