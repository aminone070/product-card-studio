import { brandMedia } from "@/data/brand";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroVideo } from "@/components/shared/HeroVideo";
import { useLocale } from "@/app/providers";
import { getProduct, products } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";
import { Reveal } from "@/components/shared/Reveal";
import { Newsletter } from "@/components/layout/Footer";

const HERO = getProduct("nayra-hibiscus-dilka")!.images[0];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Camli Beauty Egypt — Heritage Dilka & Body Rituals" },
      { name: "description", content: "Hibiscus dilka, body butters and eye care rooted in Sudanese beauty rituals. Shop Camli Beauty in Egypt." },
      { property: "og:title", content: "Camli Beauty Egypt — Heritage Dilka & Body Rituals" },
      { property: "og:description", content: "Hibiscus dilka, body butters and eye care rooted in Sudanese beauty rituals." },
      { property: "og:image", content: HERO },
      { name: "twitter:image", content: HERO },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, l } = useLocale();
  const best = products.filter((p) => p.bestSeller);
  const spotlight = getProduct("nayra-dilka-sandalwood-scent")!;
  const cats = (["scrub", "butter", "eye"] as const).map((c) => ({ c, p: products.find((p) => p.category === c)! }));

  return (
    <>
      {/* Hero — full-bleed brand film, as on camlibeautyeg.com */}
      <HeroVideo
        eyebrow={t.hero.eyebrow}
        title1={t.hero.title1}
        title2={t.hero.title2}
        body={t.hero.body}
        shopThis={t.actions.shopThis}
        shopAll={t.actions.shopAll}
      />

      {/* Marquee */}
      <div className="overflow-hidden border-y border-border py-4" aria-hidden>
        <div className="marquee flex w-max gap-12 whitespace-nowrap font-display text-2xl italic text-primary">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i}>{i % 2 ? t.home.marquee : "Camli Beauty ✦"}</span>
          ))}
        </div>
      </div>

      {/* Intro */}
      <section className="container-lux grid gap-12 py-24 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow">{t.home.introEyebrow}</p>
          <h2 className="mt-4 font-display text-4xl text-foreground md:text-5xl">{t.home.introTitle}</h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-8 text-muted-foreground">
          <p>{t.home.introBody}</p>
          <div className="border-s-2 border-primary ps-6">
            <h3 className="font-display text-2xl text-foreground">{t.home.formulaTitle}</h3>
            <p className="mt-2">{t.home.formulaBody}</p>
          </div>
        </Reveal>
      </section>

      {/* Best sellers */}
      <section className="container-lux py-12">
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{t.home.bestEyebrow}</p>
            <h2 className="mt-3 font-display text-4xl text-foreground">{t.home.bestTitle}</h2>
          </div>
          <Link to="/best-sellers" className="text-sm text-primary hover:underline">{t.actions.shopAll}</Link>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-8 lg:grid-cols-3">
          {best.map((p) => <ProductCard key={p.handle} product={p} />)}
        </div>
      </section>

      {/* Collections */}
      <section className="container-lux py-24">
        <Reveal>
          <p className="eyebrow">{t.home.collectionEyebrow}</p>
          <h2 className="mt-3 font-display text-4xl text-foreground">{t.home.collectionTitle}</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {cats.map(({ c, p }, i) => (
            <Reveal key={c} delay={i * 0.08}>
              <Link to="/shop" className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-secondary">
                <img src={p.images[0]} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="bg-hero-fade absolute inset-0" />
                <span className="absolute bottom-6 start-6 font-display text-3xl text-foreground">{t.home.categories[c]}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Spotlight */}
      <section className="bg-secondary/50 py-24">
        <div className="container-lux grid items-center gap-12 md:grid-cols-2">
          <Reveal className="order-2 md:order-1">
            <img src={spotlight.images[0]} alt={l(spotlight.title)} loading="lazy" className="aspect-square w-full rounded-[2rem] object-cover shadow-soft" />
          </Reveal>
          <Reveal delay={0.1} className="order-1 md:order-2">
            <p className="eyebrow">{t.home.spotlightEyebrow}</p>
            <h2 className="mt-4 font-display text-4xl text-foreground md:text-5xl">{t.home.spotlightTitle}</h2>
            <p className="mt-6 text-muted-foreground">{t.home.spotlightBody}</p>
            <Link to="/products/$handle" params={{ handle: spotlight.handle }} className="mt-8 inline-block btn-lux shadow-glow bg-primary px-8 py-3.5 text-primary-foreground">
              {t.actions.shopThis}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      {/* Film + reels */}
      <section className="relative overflow-hidden py-24">
        <img src={brandMedia.texture} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-10" />
        <div className="container-lux relative grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <img src={brandMedia.campaign} alt="" loading="lazy" className="aspect-[9/16] max-h-[640px] w-full rounded-[2rem] object-cover shadow-lift" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">{t.home.missionEyebrow}</p>
            <h2 className="mt-4 font-display text-4xl text-foreground md:text-6xl">{t.home.missionTitle}</h2>
            <p className="mt-6 text-muted-foreground">{t.home.missionBody}</p>
            <div className="mt-10 grid grid-cols-5 gap-2">
              {brandMedia.reels.map((r) => (
                <img key={r} src={r} alt="" loading="lazy" className="aspect-[9/16] w-full rounded-xl object-cover" />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-lux">
        <Reveal className="flex flex-col items-center rounded-[2rem] bg-primary/5 px-6 py-16 text-center">
          <h2 className="font-display text-4xl text-foreground">{t.newsletter.title}</h2>
          <p className="mb-6 mt-2 text-muted-foreground">{t.newsletter.body}</p>
          <Newsletter />
        </Reveal>
      </section>
    </>
  );
}
