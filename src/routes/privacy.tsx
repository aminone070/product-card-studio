import { createFileRoute } from "@tanstack/react-router";
import { useLocale } from "@/app/providers";
import { STORE_URL } from "@/data/products";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — Camli Beauty Egypt" },
      { name: "description", content: "How Camli Beauty handles your personal information." },
      { property: "og:title", content: "Privacy policy — Camli Beauty Egypt" },
      { property: "og:description", content: "How Camli Beauty handles your personal information." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  const { t } = useLocale();
  return (
    <div className="container-lux max-w-3xl py-16">
      <h1 className="font-display text-5xl text-foreground">{t.privacy.title}</h1>
      <p className="mt-6 leading-relaxed text-muted-foreground">{t.privacy.body}</p>
      <a href={`${STORE_URL}/policies/privacy-policy`} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block btn-lux shadow-glow bg-primary px-8 py-3.5 text-primary-foreground">
        {t.privacy.cta}
      </a>
    </div>
  );
}
