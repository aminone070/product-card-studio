import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useCart, useLocale } from "@/app/providers";
import { defaultVariant, getProduct, products } from "@/data/products";
import { formatPrice, MAX_QTY } from "@/lib/cart";
import { ProductCard } from "@/components/shared/ProductCard";

export const Route = createFileRoute("/products/$handle")({
  loader: ({ params }) => {
    const product = getProduct(params.handle);
    if (!product) throw notFound();
    return { handle: product.handle };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.handle) : undefined;
    if (!p) return { meta: [{ title: "Product not found — Camli Beauty" }, { name: "robots", content: "noindex" }] };
    const title = `${p.title.en} — Camli Beauty Egypt`;
    const desc = p.description.en.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:image", content: p.images[0] },
        { name: "twitter:image", content: p.images[0] },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useLoaderData();
  const product = getProduct(handle)!;
  const { t, l, locale } = useLocale();
  const { add } = useCart();
  const [img, setImg] = useState(0);
  const [variantId, setVariantId] = useState(defaultVariant(product).id);
  const [qty, setQty] = useState(1);
  const v = product.variants.find((x) => x.id === variantId)!;
  const related = products.filter((p) => p.handle !== handle).sort((a) => (a.category === product.category ? -1 : 1)).slice(0, 3);

  return (
    <div className="container-lux py-10">
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">{t.product.home}</Link>
        <ChevronRight className="h-3 w-3 rtl:rotate-180" />
        <Link to="/shop" className="hover:text-foreground">{t.product.shop}</Link>
        <ChevronRight className="h-3 w-3 rtl:rotate-180" />
        <span className="text-foreground">{l(product.title)}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-secondary">
            <AnimatePresence mode="wait">
              <motion.img
                key={img}
                src={product.images[img]}
                alt={l(product.title)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setImg(i)}
                  aria-label={t.product.gallery(i + 1)}
                  aria-pressed={img === i}
                  className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-transparent opacity-60 transition aria-pressed:border-primary aria-pressed:opacity-100"
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="eyebrow">{l(product.tagline)}</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">{l(product.title)}</h1>
          <p className="mt-4 text-2xl text-foreground">
            {formatPrice(v.price, locale)}
            {v.compareAt && <s className="ms-3 text-lg text-muted-foreground">{formatPrice(v.compareAt, locale)}</s>}
          </p>
          <p className="mt-6 leading-relaxed text-muted-foreground">{l(product.description)}</p>

          {product.variants.length > 1 && (
            <fieldset className="mt-8">
              <legend className="mb-3 text-sm text-foreground">{t.product.option}</legend>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((x) => (
                  <button
                    key={x.id}
                    onClick={() => setVariantId(x.id)}
                    aria-pressed={x.id === variantId}
                    className={`btn-lux border border-border px-4 py-2 text-sm text-foreground transition aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground ${x.available ? "" : "line-through opacity-60"}`}
                  >
                    {l(x.title)}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-border" role="group" aria-label={t.product.quantity}>
              <button className="p-3 disabled:opacity-40" disabled={qty <= 1} onClick={() => setQty(qty - 1)} aria-label="-">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center">{qty}</span>
              <button className="p-3 disabled:opacity-40" disabled={qty >= MAX_QTY} onClick={() => setQty(qty + 1)} aria-label="+">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              disabled={!v.available}
              onClick={() => add(v.id, qty)}
              className="flex-1 btn-lux shadow-glow bg-primary px-8 py-3.5 text-primary-foreground shadow-soft transition hover:shadow-lift active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {v.available ? t.actions.addToCart : t.actions.soldOut}
            </button>
          </div>
          {!v.available && <p className="mt-3 text-sm text-destructive">{t.product.unavailable}</p>}

          <div className="mt-10 border-t border-border pt-8">
            <h2 className="font-display text-2xl text-foreground">{t.product.benefits}</h2>
            <ul className="mt-4 space-y-2">
              {product.benefits.map((b) => (
                <li key={b.en} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {l(b)}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 border-t border-border pt-8">
            <h2 className="font-display text-2xl text-foreground">{t.product.details}</h2>
            <dl className="mt-4 divide-y divide-border">
              {product.details.map((d) => (
                <div key={d.label.en} className="grid grid-cols-3 gap-4 py-3 text-sm">
                  <dt className="text-foreground">{l(d.label)}</dt>
                  <dd className="col-span-2 text-muted-foreground">{l(d.value)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="mb-10 font-display text-4xl text-foreground">{t.product.related}</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-8 lg:grid-cols-3">
          {related.map((p) => <ProductCard key={p.handle} product={p} />)}
        </div>
      </section>
    </div>
  );
}
