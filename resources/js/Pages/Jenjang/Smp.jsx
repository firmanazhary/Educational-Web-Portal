import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import JenjangDetailHero from "@/Components/jenjang/smp/JenjangDetailHero";
import JenjangPillarsSection from "@/Components/jenjang/smp/JenjangPillarsSection";
import WhyChooseSection from "@/Components/jenjang/smp/WhyChooseSection";
import FacilitiesSection from "@/Components/jenjang/smp/FacilitiesSection";
import ActivitiesSection from "@/Components/jenjang/smp/ActivitiesSection";
import JoinSection from "@/Components/jenjang/smp/JoinSection";
import TestimonialsSection from "@/Components/jenjang/smp/TestimonialsSection";
import GallerySection from "@/Components/jenjang/smp/GallerySection";

export default function SmpPage() {
  return (
    <AppLayout title="SMP - SIT At-Taufiq">
      <Head title="SMP - SIT At-Taufiq" />

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