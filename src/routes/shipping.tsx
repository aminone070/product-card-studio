import { createFileRoute } from "@tanstack/react-router";
import { useLocale } from "@/app/providers";
import { PolicyPage } from "@/components/shared/PolicyPage";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & returns — Camli Beauty Egypt" },
      { name: "description", content: "Delivery and returns information for Camli Beauty Egypt orders." },
      { property: "og:title", content: "Shipping & returns — Camli Beauty Egypt" },
      { property: "og:description", content: "Delivery and returns information for Camli Beauty Egypt orders." },
    ],
  }),
  component: Shipping,
});

function Shipping() {
  const { t } = useLocale();
  return <PolicyPage title={t.pages.shipping} />;
}
