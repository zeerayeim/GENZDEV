## Project background

GENZDEV is a Discord-led storefront for FiveM server owners and Minecraft communities. The site helps visitors discover polished scripts and plugins, understand what each product does, and move into the GENZDEV Discord to purchase or request support. The developer identity shown throughout the experience is ZeeRa[zR].

## Product shape

- Static React and TypeScript storefront built with Vite.
- Single-page browsing experience with an animated systems hero, product filters, eight product cards, proof points, support callout, and footer.
- The FiveM catalog features the developer's five CFX-ZR resources: Deathcam, Event, Deathscreen, Traphouse, and AyudaSystem. Deathcam, Event, Deathscreen, and AyudaSystem use the developer's supplied interface screenshots in their cards and modal galleries; Traphouse uses custom cinematic cover artwork. All five use Discord quote pricing until exact prices are provided.
- The remaining catalog contains three example Minecraft plugins with prices, compatibility labels, and lightweight detail interactions.
- Discord entry points use the official `https://discord.gg/E2XHc8W44A` invite. Product actions open an accessible order dialog that links visitors into Discord for purchase and support.
- Visual direction is a dark launcher-console aesthetic with cobalt-blue energy accents, sharp geometry, and restrained motion.
- Responsive layouts, keyboard-visible focus states, and reduced-motion support are required.
- No authentication, database, real checkout, or server-side behavior is in scope.
