import { createFileRoute } from "@tanstack/react-router";
import { useLocale } from "@/app/providers";
import { PolicyPage } from "@/components/shared/PolicyPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service — Camli Beauty Egypt" },
      { name: "description", content: "Terms of service for shopping with Camli Beauty Egypt." },
      { property: "og:title", content: "Terms of service — Camli Beauty Egypt" },
      { property: "og:description", content: "Terms of service for shopping with Camli Beauty Egypt." },
    ],
  }),
  component: Terms,
});

function Terms() {
  const { t } = useLocale();
  return <PolicyPage title={t.pages.terms} />;
}
