import { Logo } from "@/components/shared/Logo";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useLocale } from "@/app/providers";
import { SOCIALS, STORE_URL } from "@/data/products";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Newsletter() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "err" | "ok">("idle");
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!EMAIL_RE.test(email.trim())) return setState("err");
        setState("ok");
        window.open(`${STORE_URL}/#newsletter`, "_blank", "noopener");
      }}
      className="w-full max-w-md"
    >
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setState("idle");
          }}
          placeholder={t.newsletter.placeholder}
          aria-label={t.newsletter.placeholder}
          aria-invalid={state === "err"}
          className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm text-foreground outline-none focus:border-primary"
        />
        <button className="btn-lux shadow-glow bg-primary px-6 py-3 text-primary-foreground transition hover:opacity-90">{t.actions.subscribe}</button>
      </div>
      {state === "err" && <p className="mt-2 text-sm text-destructive">{t.newsletter.err}</p>}
      {state === "ok" && <p className="mt-2 text-sm text-muted-foreground">{t.newsletter.handoff}</p>}
    </form>
  );
}

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container-lux grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="h-12" />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{t.footer.tagline}</p>
          <div className="mt-8">
            <p className="font-display text-xl text-foreground">{t.newsletter.title}</p>
            <p className="mb-4 text-sm text-muted-foreground">{t.newsletter.body}</p>
            <Newsletter />
          </div>
        </div>
        <div>
          <p className="eyebrow mb-4">{t.footer.shop}</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="text-muted-foreground hover:text-foreground">{t.nav.shop}</Link></li>
            <li><Link to="/best-sellers" className="text-muted-foreground hover:text-foreground">{t.nav.best}</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">{t.footer.info}</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground">{t.nav.about}</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">{t.nav.contact}</Link></li>
            <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">{t.footer.privacy}</Link></li>
            <li><Link to="/shipping" className="text-muted-foreground hover:text-foreground">{t.pages.shipping}</Link></li>
            <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">{t.pages.terms}</Link></li>
          </ul>
          <p className="eyebrow mb-4 mt-8">{t.footer.follow}</p>
          <ul className="flex gap-4 text-sm">
            <li><a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">Instagram</a></li>
            <li><a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">Facebook</a></li>
            <li><a href={SOCIALS.tiktok} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">TikTok</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Camli Beauty. {t.footer.rights}
      </div>
    </footer>
  );
}
