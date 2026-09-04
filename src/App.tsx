import { useEffect, useMemo, useState } from "react";

type Category = "all" | "fivem" | "minecraft";

type Product = {
  id: string;
  title: string;
  category: Exclude<Category, "all">;
  description: string;
  price: number | null;
  tag: string;
  version: string;
  features: string[];
  accent: string;
  image?: string;
  gallery?: string[];
  galleryLayout?: "split" | "stack";
};

const products: Product[] = [
  {
    id: "cfx-zr-deathcam",
    title: "CFX-ZR Deathcam",
    category: "fivem",
    description: "A cinematic post-death camera experience for immersive roleplay.",
    price: null,
    tag: "CFX-ZR release",
    version: "FiveM resource",
    features: ["Post-death camera", "Clean transitions", "Config-ready"],
    accent: "#4f8cff",
    image: "/images/cfx-zr-deathcam.webp",
    gallery: ["/images/cfx-zr-deathcam.png", "/images/cfx-zr-deathcam-admin.webp"],
  },
  {
    id: "cfx-zr-event",
    title: "CFX-ZR Event",
    category: "fivem",
    description: "Run organized community events with a streamlined admin workflow.",
    price: null,
    tag: "Community tool",
    version: "FiveM resource",
    features: ["Event controls", "Admin workflow", "Flexible settings"],
    accent: "#ff9d3d",
    image: "/images/cfx-zr-event.webp",
    gallery: ["/images/cfx-zr-event-form.webp", "/images/cfx-zr-event-winner.webp"],
  },
  {
    id: "cfx-zr-deathscreen",
    title: "CFX-ZR Deathscreen",
    category: "fivem",
    description: "A polished death state interface that keeps every action clear.",
    price: null,
    tag: "Immersive UI",
    version: "FiveM resource",
    features: ["Respawn countdown", "Clear player state", "Responsive interface"],
    accent: "#ff546e",
    image: "/images/cfx-zr-deathscreen.webp",
    gallery: ["/images/cfx-zr-deathscreen-ui.webp", "/images/cfx-zr-deathscreen-minimized.webp"],
    galleryLayout: "stack",
  },
  {
    id: "cfx-zr-traphouse",
    title: "CFX-ZR Traphouse",
    category: "fivem",
    description: "Add a configurable underground location loop to your city.",
    price: null,
    tag: "Roleplay system",
    version: "FiveM resource",
    features: ["Location logic", "Configurable rewards", "Secured interactions"],
    accent: "#ffb84f",
    image: "/images/traphouse.png",
    gallery: ["/images/traphouse.png", "/images/traphousemenu.png"],
    galleryLayout: "stack",
  },
  {
    id: "cfx-zr-ayudasystem",
    title: "CFX-ZR AyudaSystem",
    category: "fivem",
    description: "Schedule server-wide aid drops with clear Discord status updates.",
    price: null,
    tag: "Server automation",
    version: "FiveM resource",
    features: ["Scheduled aid", "Global player rewards", "Discord status embeds"],
    accent: "#00d8ff",
    image: "/images/cfx-zr-ayudasystem.webp",
    gallery: ["/images/cfx-zr-ayudasystem.webp", "/images/cfx-zr-ayudasystem-given.webp"],
  },
  {
    id: "aether-crates",
    title: "Aether Crates",
    category: "minecraft",
    description: "Reward crates with polished previews and flexible chances.",
    price: 12,
    tag: "Fast setup",
    version: "Paper · Spigot",
    features: ["Live previews", "Editable rewards", "Key animations"],
    accent: "#ab7cff",
  },
  {
    id: "sentinel-staff",
    title: "Sentinel Staff",
    category: "minecraft",
    description: "Essential moderation tools in one quick command suite.",
    price: 18,
    tag: "Admin pick",
    version: "1.20+",
    features: ["Vanish mode", "Player inspect", "Action logging"],
    accent: "#5ee6a8",
  },
  {
    id: "realm-quests",
    title: "Realm Quests",
    category: "minecraft",
    description: "Create repeatable adventures without editing source code.",
    price: 21,
    tag: "No-code config",
    version: "Paper · Spigot",
    features: ["Quest editor", "NPC support", "Reward chains"],
    accent: "#ff6f91",
  },
];

const discordInvite = "https://discord.gg/E2XHc8W44A";

function LogoMark() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true">
      <path d="M4 7.5 18 2l14 5.5v21L18 34 4 28.5z" fill="currentColor" opacity=".18" />
      <path d="M11 11h15l-4 5H14l-1.5 2H22l-1 6H10l1-5h-3z" fill="currentColor" />
      <path d="m23 18 5-6h-4l-4 6z" fill="#07101f" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 9h10M10 5l4 4-4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function CategoryIcon({ type }: { type: Exclude<Category, "all"> }) {
  return type === "fivem" ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.2 7.5 7 4.7h10l2.8 2.8 1.2 8.3-2.4 2.4-4.2-3.2H9.6l-4.2 3.2L3 15.8z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="M8 9v4M6 11h4M15.8 10h.1M18 12h.1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 7 8-4 8 4v10l-8 4-8-4z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="m4 7 8 4 8-4M12 11v10" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

export function App() {
  const [category, setCategory] = useState<Category>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProducts = useMemo(
    () => category === "all" ? products : products.filter((product) => product.category === category),
    [category],
  );

  useEffect(() => {
    if (!selectedProduct) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProduct(null);
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProduct]);

  const scrollToCatalog = () => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="GENZDEV home">
          <span className="brand-mark"><LogoMark /></span>
          <span className="brand-word">GENZ<span>DEV</span></span>
        </a>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
          <a href="#catalog" onClick={() => setMenuOpen(false)}>Products</a>
          <a href="#standards" onClick={() => setMenuOpen(false)}>Our standard</a>
          <a href="#support" onClick={() => setMenuOpen(false)}>Support</a>
        </nav>
        <a className="discord-button nav-discord" href={discordInvite} target="_blank" rel="noreferrer">
          Enter Discord <ArrowIcon />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="status-pill"><i /> Store systems online</div>
            <h1>BUILT TO<br /><span>RUN YOUR</span><br />WORLD.</h1>
            <p className="hero-lede">
              Premium FiveM scripts and Minecraft plugins for communities that refuse to feel ordinary.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={scrollToCatalog}>Browse the drop <ArrowIcon /></button>
              <a className="text-link" href="#standards">Why GENZDEV <span>↘</span></a>
            </div>
            <div className="hero-meta">
              <span><b>02</b> game platforms</span>
              <span><b>01</b> developer, direct support</span>
            </div>
          </div>

          <div className="hero-system" aria-label="GENZDEV live product system illustration">
            <div className="system-glow" />
            <div className="system-frame">
              <div className="system-header">
                <span>GZ / PRODUCT_CORE</span>
                <span className="live-label"><i /> LIVE</span>
              </div>
              <div className="system-center">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="core-mark"><LogoMark /></div>
                <span className="core-label">GENZDEV<br /><small>BUILD 26.9</small></span>
              </div>
              <div className="system-log">
                <p><span>01:14:22</span> Framework detected <b>OK</b></p>
                <p><span>01:14:23</span> Dependencies loaded <b>OK</b></p>
                <p><span>01:14:24</span> Community ready <b>GO</b></p>
              </div>
            </div>
            <div className="platform-chip chip-fivem"><CategoryIcon type="fivem" /><span>FiveM<br /><b>Scripts</b></span></div>
            <div className="platform-chip chip-minecraft"><CategoryIcon type="minecraft" /><span>Minecraft<br /><b>Plugins</b></span></div>
            <span className="coordinate coordinate-left">40°42'51.4"N</span>
            <span className="coordinate coordinate-right">CODED BY ZR</span>
          </div>
        </section>

        <section className="ticker" aria-label="Store benefits">
          <div className="ticker-track">
            <span>Clean code</span><i>◆</i><span>Built for performance</span><i>◆</i><span>Direct developer support</span><i>◆</i><span>Simple setup</span><i>◆</i><span>Clean code</span><i>◆</i><span>Built for performance</span>
          </div>
        </section>

        <div className="light-zone">
        <section className="catalog-section" id="catalog">
          <div className="section-heading">
            <div>
              <p className="section-kicker">THE CURRENT DROP</p>
              <h2>Tools for your<br />next great server.</h2>
            </div>
            <p className="section-intro">Pick your platform. Every release is configured to be understandable, adaptable, and ready for real players.</p>
          </div>

          <div className="catalog-controls">
            <div className="filter-tabs" role="group" aria-label="Filter products">
              {(["all", "fivem", "minecraft"] as Category[]).map((filter) => (
                <button
                  key={filter}
                  className={category === filter ? "active" : ""}
                  onClick={() => setCategory(filter)}
                  aria-pressed={category === filter}
                >
                  {filter === "all" ? "All releases" : filter === "fivem" ? "FiveM scripts" : "Minecraft plugins"}
                </button>
              ))}
            </div>
            <span className="result-count">{String(filteredProducts.length).padStart(2, "0")} products</span>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product, index) => (
              <article className="product-card" key={product.id} style={{ "--accent": product.accent, "--delay": `${index * 55}ms` } as React.CSSProperties}>
                <div className="card-topline">
                  <span className="product-tag">{product.tag}</span>
                  <span className="product-index">/{String(index + 1).padStart(2, "0")}</span>
                </div>
                {product.image ? (
                  <div className="product-visual">
                    <img src={product.image} alt={`${product.title} script cover`} loading="lazy" />
                    <span className="product-symbol"><CategoryIcon type={product.category} /></span>
                    <span className="visual-code">ZR / {product.id.replace("cfx-zr-", "").toUpperCase()}</span>
                  </div>
                ) : <div className="product-symbol product-symbol-standalone"><CategoryIcon type={product.category} /></div>}
                <div className="product-platform">{product.category === "fivem" ? "FiveM script" : "Minecraft plugin"}</div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <span className="compatibility">{product.version}</span>
                <ul>
                  {product.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <div className="product-footer">
                  {product.price === null ? (
                    <div className="price quote-price"><small>PRICE</small><strong>ASK</strong><span>DISCORD</span></div>
                  ) : (
                    <div className="price"><small>FROM</small><strong>${product.price}</strong><span>USD</span></div>
                  )}
                  <button onClick={() => setSelectedProduct(product)} aria-label={`View ${product.title}`}>View product <ArrowIcon /></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="standards-section" id="standards">
          <div className="standard-title">
            <p className="section-kicker">THE GENZ STANDARD</p>
            <h2>Less friction.<br /><em>More play.</em></h2>
          </div>
          <div className="standards-list">
            <article><span>01</span><div><h3>Performance first</h3><p>Features earn their place. We keep execution focused so your server stays responsive.</p></div></article>
            <article><span>02</span><div><h3>Config you can read</h3><p>Clear settings and sensible defaults help you spend less time hunting through files.</p></div></article>
            <article><span>03</span><div><h3>Help from the builder</h3><p>Get support in Discord from someone who knows the code—not a copy-paste knowledge base.</p></div></article>
          </div>
        </section>
        </div>

        <section className="support-section" id="support">
          <div className="support-grid" aria-hidden="true">
            {Array.from({ length: 24 }, (_, i) => <span key={i} />)}
          </div>
          <div className="support-copy">
            <p className="section-kicker">DIRECT LINE TO THE DEV</p>
            <h2>Have a server.<br />Need a solution?</h2>
            <p>Join the GENZDEV Discord to ask questions, get setup help, or talk about custom development.</p>
            <a className="light-button" href={discordInvite} target="_blank" rel="noreferrer">Talk to ZeeRa[zR] <ArrowIcon /></a>
          </div>
          <div className="developer-card">
            <div className="avatar"><img src="/images/zeera-avatar.jpg" alt="ZeeRa[zR]" /></div>
            <div><span>LEAD DEVELOPER</span><strong>ZeeRa[zR]</strong><small><i /> Available in Discord</small></div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><LogoMark /><span>GENZDEV</span></div>
        <p>FiveM scripts. Minecraft plugins. Built different.</p>
        <div className="footer-links"><a href="#catalog">Products</a><a href="#support">Support</a><a href="#top">Back to top ↑</a></div>
        <div className="footer-bottom"><span>© 2026 GENZDEV</span><span>Developed by ZeeRa[zR]</span></div>
      </footer>

      {selectedProduct && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelectedProduct(null)}>
          <section className="purchase-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close dialog">×</button>
            <span className="modal-kicker">PURCHASE THROUGH DISCORD</span>
            {selectedProduct.gallery ? (
              <div className={`modal-gallery ${selectedProduct.galleryLayout === "stack" ? "is-stack" : ""}`}>
                {selectedProduct.gallery.map((image, index) => <img key={image} src={image} alt={`${selectedProduct.title} interface ${index + 1}`} />)}
              </div>
            ) : selectedProduct.image ? <img className="modal-cover" src={selectedProduct.image} alt="" /> : <div className="modal-icon" style={{ color: selectedProduct.accent }}><CategoryIcon type={selectedProduct.category} /></div>}
            <h2 id="modal-title">Get {selectedProduct.title}</h2>
            <p>Orders and product support are handled directly in the GENZDEV Discord.</p>
            <div className="modal-price"><span>Product price</span><strong>{selectedProduct.price === null ? "Ask in Discord" : `$${selectedProduct.price} USD`}</strong></div>
            <div className="invite-note"><b>How to order</b><span>Join the official server, open a purchase ticket, and the GENZDEV team will help with delivery.</span></div>
            <a className="primary-button modal-action" href={discordInvite} target="_blank" rel="noreferrer">Continue to Discord <ArrowIcon /></a>
            <small>Press Esc or click outside to close</small>
          </section>
        </div>
      )}
    </div>
  );
}
