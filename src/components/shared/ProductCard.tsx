import { Link } from "@tanstack/react-router";
import { useCart, useLocale } from "@/app/providers";
import { defaultVariant, isAvailable, lowestPrice, type Product } from "@/data/products";
import { formatPrice } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { t, l, locale } = useLocale();
  const { add } = useCart();
  const available = isAvailable(product);
  const v = defaultVariant(product);
  const multi = product.variants.length > 1;
  return (
    <article className="group flex flex-col">
      <Link
        to="/products/$handle"
        params={{ handle: product.handle }}
        className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-secondary"
        aria-label={l(product.title)}
      >
        <img
          src={product.images[0]}
          alt={l(product.title)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        {!available && (
          <span className="absolute start-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
            {t.actions.soldOut}
          </span>
        )}
        {v.compareAt && (
          <span className="absolute end-3 top-3 btn-lux shadow-glow bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            {t.product.save(formatPrice(v.compareAt - v.price, locale))}
          </span>
        )}
      </Link>
      <div className="mt-4 flex flex-1 flex-col gap-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{l(product.tagline)}</p>
        <Link to="/products/$handle" params={{ handle: product.handle }} className="font-display text-xl text-foreground hover:text-primary">
          {l(product.title)}
        </Link>
        <p className="text-sm text-foreground">
          {multi && <span className="text-muted-foreground">{t.shop.from} </span>}
          {formatPrice(lowestPrice(product), locale)}
          {v.compareAt && <s className="ms-2 text-muted-foreground">{formatPrice(v.compareAt, locale)}</s>}
        </p>
        <button
          type="button"
          disabled={!available}
          onClick={() => add(v.id)}
          className="mt-3 rounded-full border border-foreground/20 px-4 py-2 text-sm text-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-foreground"
        >
          {available ? t.actions.addToCart : t.actions.soldOut}
        </button>
      </div>
    </article>
  );
}
