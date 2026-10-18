import { createFileRoute } from "@tanstack/react-router";
import { useLocale } from "@/app/providers";
import { Catalog } from "@/components/shared/Catalog";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop all — Camli Beauty Egypt" },
      { name: "description", content: "Browse every Camli ritual: dilka scrubs, body butters and hibiscus eye masks." },
      { property: "og:title", content: "Shop all — Camli Beauty Egypt" },
      { property: "og:description", content: "Dilka scrubs, body butters and hibiscus eye masks." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): { category?: "scrub" | "butter" | "eye" } =>
    s["category"] === "scrub" || s["category"] === "butter" || s["category"] === "eye" ? { category: s["category"] } : {},
  component: Shop,
});

function Shop() {
  const { t } = useLocale();
  const { category } = Route.useSearch();
  return (
    <section className="container-lux py-16">
      <h1 className="font-display text-5xl text-foreground">{t.shop.title}</h1>
      <p className="mb-10 mt-3 text-muted-foreground">{t.shop.subtitle}</p>
      <Catalog initialCategory={category ?? "all"} />
    </section>
  );
}
