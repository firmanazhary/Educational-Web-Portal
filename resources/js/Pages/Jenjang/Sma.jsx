import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import JenjangDetailHero from "@/Components/jenjang/sma/JenjangDetailHero";
import JenjangPillarsSection from "@/Components/jenjang/sma/JenjangPillarsSection";
import WhyChooseSection from "@/Components/jenjang/sma/WhyChooseSection";
import FacilitiesSection from "@/Components/jenjang/sma/FacilitiesSection";
import ActivitiesSection from "@/Components/jenjang/sma/ActivitiesSection";
import JoinSection from "@/Components/jenjang/sma/JoinSection";
import TestimonialsSection from "@/Components/jenjang/sma/TestimonialsSection";
import GallerySection from "@/Components/jenjang/sma/GallerySection";

export default function SmaPage() {
  return (
    <AppLayout title="SMA - SIT At-Taufiq">
      <Head title="SMA - SIT At-Taufiq" />

      {/* <main className="min-h-screen w-full bg-[#FFFBEF] text-indigo-950 flex flex-col overflow-x-hidden selection:bg-amber-100 selection:text-amber-800"> */}
        <JenjangDetailHero photoSrc="/images/jenjang/pg-hero.jpg" />
        <JenjangPillarsSection />
        <WhyChooseSection />
        <FacilitiesSection />
        <ActivitiesSection />
        <JoinSection />
        <TestimonialsSection />
        <GallerySection />
      {/* </main> */}
    </AppLayout>
  );
}