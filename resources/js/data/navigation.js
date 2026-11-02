import { jenjangList } from "./jenjang";
import { eventsList } from "./events";
import { programsList } from "./programs";

// Struktur navbar utama.
// Submenu Events & Programs dapat menerima data dinamis dari database (via Inertia props).
// Jika database belum diisi, otomatis menggunakan fallback static data.
export function getNavItems({ navEvents = [], navPrograms = [] } = {}) {
  const rawEvents = Array.isArray(navEvents)
    ? navEvents
    : navEvents && typeof navEvents === "object"
      ? Object.values(navEvents)
      : [];
  const safeEvents = rawEvents.filter((e) => e && (e.title || e.name));
  const eventsData = safeEvents.length > 0 ? safeEvents : eventsList;

  const rawPrograms = Array.isArray(navPrograms)
    ? navPrograms
    : navPrograms && typeof navPrograms === "object"
      ? Object.values(navPrograms)
      : [];
  const safePrograms = rawPrograms.filter((p) => p && (p.title || p.name));
  const programsData = safePrograms.length > 0 ? safePrograms : programsList;

  return [
    { label: "Home", href: "/" },
    {
      label: "About Us",
      href: "/about",
      children: [
        { label: "FAQ", href: "/about#faq" },
        { label: "Sejarah", href: "/about#sejarah" },
        { label: "Contact Us", href: "/about#contact" },
      ],
    },
    {
      label: "Jenjang",
      href: "/jenjang",
      children: [...jenjangList]
        .sort((a, b) => a.order - b.order)
        .map((j) => ({ label: j.name, href: `/jenjang/${j.slug}` })),
    },
    { label: "Admission", href: "/admission" },
    {
      label: "Events",
      href: "/events",
      children: eventsData.map((e) => {
        const title = e.title || e.name || "Event";
        const slug = e.slug || encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"));
        return {
          label: title,
          href: `/events?event=${slug}`,
        };
      }),
    },
    {
      label: "Programs",
      href: "/programs",
      children: programsData.map((p) => {
        const title = p.title || p.name || "Program";
        const slug = p.slug || encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"));
        return {
          label: title,
          href: `/programs?program=${slug}`,
        };
      }),
    },
    { label: "Blog", href: "/blog" },
  ];
}
