import { createFileRoute } from "@tanstack/react-router";
import { useLocale } from "@/app/providers";
import { Catalog } from "@/components/shared/Catalog";

export const Route = createFileRoute("/best-sellers")({
  head: () => ({
    meta: [
      { title: "Best sellers — Camli Beauty Egypt" },
      { name: "description", content: "The most-loved Camli rituals: Nayra body butter and sandalwood & orange dilka." },
      { property: "og:title", content: "Best sellers — Camli Beauty Egypt" },
      { property: "og:description", content: "The most-loved Camli body rituals." },
    ],
  }),
  component: Best,
});

function Best() {
  const { t } = useLocale();
  return (
    <section className="container-lux py-16">
      <h1 className="font-display text-5xl text-foreground">{t.shop.bestTitle}</h1>
      <p className="mb-10 mt-3 text-muted-foreground">{t.home.bestTitle}</p>
      <Catalog bestOnly />
    </section>
  );
}
