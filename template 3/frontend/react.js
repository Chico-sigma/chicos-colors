const { useEffect, useId, useMemo, useState } = React;

const COLOR_LIBRARY = [
  { id: "majorelle-blue", name: "Majorelle Blue", hex: "#3F5AA8", tag: "Architecture", location: "Marrakech riads" },
  { id: "chefchaouen-cyan", name: "Chefchaouen Cyan", hex: "#6BB7C9", tag: "Coastal", location: "Blue Medina" },
  { id: "saffron-sunset", name: "Saffron Sunset", hex: "#E7A82E", tag: "Nature", location: "Atlas dusk" },
  { id: "henna-brown", name: "Henna Brown", hex: "#7A4A32", tag: "Architecture", location: "Kasbah walls" },
  { id: "ouarzazate-ochre", name: "Ouarzazate Ochre", hex: "#D59A3E", tag: "Nature", location: "Desert roads" },
  { id: "olive-grove", name: "Olive Grove", hex: "#6F8B57", tag: "Nature", location: "Garden terraces" },
  { id: "souk-spice", name: "Souk Spice", hex: "#A83D2C", tag: "Crafts", location: "Medina alleys" },
  { id: "teal-tide", name: "Teal Tide", hex: "#0A7E7A", tag: "Coastal", location: "Essaouira shore" },
  { id: "rose-sand", name: "Rose Sand", hex: "#D99A8C", tag: "Architecture", location: "Kasbah courtyards" },
  { id: "ivory-tile", name: "Ivory Tile", hex: "#F3E7CF", tag: "Architecture", location: "Riad walls" },
  { id: "copper-lantern", name: "Copper Lantern", hex: "#B5632D", tag: "Crafts", location: "Night market" },
  { id: "atlas-moss", name: "Atlas Moss", hex: "#617A4D", tag: "Nature", location: "Mountain trails" },
  { id: "coast-foam", name: "Coast Foam", hex: "#DCEAE3", tag: "Coastal", location: "Sea breeze" },
  { id: "medina-berry", name: "Medina Berry", hex: "#9C4D60", tag: "Crafts", location: "Market stalls" },
  { id: "cerulean-glaze", name: "Cerulean Glaze", hex: "#1C7AA8", tag: "Coastal", location: "Tile workshop" },
  { id: "terracotta-haze", name: "Terracotta Haze", hex: "#C4664A", tag: "Architecture", location: "Atlas foothills" },
  { id: "pistachio-mist", name: "Pistachio Mist", hex: "#AECC9C", tag: "Nature", location: "Garden paths" },
  { id: "sunbaked-amber", name: "Sunbaked Amber", hex: "#D89036", tag: "Nature", location: "Desert dunes" },
  { id: "indigo-evening", name: "Indigo Evening", hex: "#2B4973", tag: "Coastal", location: "Casablanca skyline" },
  { id: "berber-rose", name: "Berber Rose", hex: "#C65D73", tag: "Crafts", location: "Festival tents" },
  { id: "mint-tea", name: "Mint Tea", hex: "#9ACCB0", tag: "Nature", location: "Courtyard tea room" },
  { id: "dune-sand", name: "Dune Sand", hex: "#D8BA8D", tag: "Nature", location: "Sahara edge" },
  { id: "clay-patio", name: "Clay Patio", hex: "#C98B5A", tag: "Architecture", location: "Sun-warmed courtyard" },
  { id: "golden-hour", name: "Golden Hour", hex: "#E7C774", tag: "Nature", location: "Late desert light" },
  { id: "kasbah-gold", name: "Kasbah Gold", hex: "#D4A84F", tag: "Architecture", location: "Sandstone towers" },
  { id: "atlas-cedar", name: "Atlas Cedar", hex: "#658C64", tag: "Nature", location: "Mountain cedar" },
  { id: "hammam-steam", name: "Hammam Steam", hex: "#E5E4DA", tag: "Architecture", location: "Bathhouse stone" },
  { id: "marrakesh-coral", name: "Marrakesh Coral", hex: "#E3825D", tag: "Crafts", location: "Jemaa el-Fnaa" },
  { id: "lagoon-blue", name: "Lagoon Blue", hex: "#3E9AA7", tag: "Coastal", location: "Harbor water" },
  { id: "ash-olive", name: "Ash Olive", hex: "#6A7756", tag: "Architecture", location: "Stone streets" },
  { id: "sunflare-gold", name: "Sunflare Gold", hex: "#F1C86B", tag: "Nature", location: "Granite cliffs" },
  { id: "cafe-stone", name: "Cafe Stone", hex: "#8F6C55", tag: "Architecture", location: "Moorish cafes" },
  { id: "aqua-ink", name: "Aqua Ink", hex: "#2E8A9B", tag: "Coastal", location: "Harbor tiles" },
  { id: "neon-voltage", name: "Neon Voltage", hex: "#DFFF00", tag: "Cyberpunk Neon", location: "Midnight arcade" },
  { id: "laser-pink", name: "Laser Pink", hex: "#FF1493", tag: "Cyberpunk Neon", location: "Rainlit district" },
  { id: "plasma-blue", name: "Plasma Blue", hex: "#00BFFF", tag: "Cyberpunk Neon", location: "Skyline signage" },
  { id: "hologram-violet", name: "Hologram Violet", hex: "#8A2BE2", tag: "Cyberpunk Neon", location: "Neon market" },
  { id: "electric-lime", name: "Electric Lime", hex: "#BFFF00", tag: "Cyberpunk Neon", location: "Circuit garden" },
  { id: "arcade-cyan", name: "Arcade Cyan", hex: "#00FFFF", tag: "Cyberpunk Neon", location: "Retro console glow" },
  { id: "hot-magenta", name: "Hot Magenta", hex: "#FF00AA", tag: "Cyberpunk Neon", location: "Club entrance" },
  { id: "turbo-orange", name: "Turbo Orange", hex: "#FF5F1F", tag: "Cyberpunk Neon", location: "Transit flare" },
  { id: "ultraviolet-beam", name: "Ultraviolet Beam", hex: "#7F00FF", tag: "Cyberpunk Neon", location: "Warehouse lights" },
  { id: "signal-red", name: "Signal Red", hex: "#FF1744", tag: "Cyberpunk Neon", location: "Warning display" },
  { id: "digital-aqua", name: "Digital Aqua", hex: "#00E5FF", tag: "Cyberpunk Neon", location: "Subway screens" },
  { id: "neon-coral", name: "Neon Coral", hex: "#FF4057", tag: "Cyberpunk Neon", location: "Rooftop billboard" },
  { id: "pixel-purple", name: "Pixel Purple", hex: "#C000FF", tag: "Cyberpunk Neon", location: "Game lounge" },
  { id: "glow-yellow", name: "Glow Yellow", hex: "#F5FF00", tag: "Cyberpunk Neon", location: "Night market" },
  { id: "photon-green", name: "Photon Green", hex: "#39FF14", tag: "Cyberpunk Neon", location: "Bio-tech lab" },
  { id: "chrome-blue", name: "Chrome Blue", hex: "#0099FF", tag: "Cyberpunk Neon", location: "Elevated highway" },
  { id: "infrared-rose", name: "Infrared Rose", hex: "#FF355E", tag: "Cyberpunk Neon", location: "Camera overlay" },
  { id: "cyber-teal", name: "Cyber Teal", hex: "#00FFCC", tag: "Cyberpunk Neon", location: "Hacker terminal" },
  { id: "neon-tangerine", name: "Neon Tangerine", hex: "#FF9500", tag: "Cyberpunk Neon", location: "Street food sign" },
  { id: "volt-violet", name: "Volt Violet", hex: "#AA00FF", tag: "Cyberpunk Neon", location: "Immersive theater" },
  { id: "cloud-cream", name: "Cloud Cream", hex: "#FFF4D6", tag: "Soft Pastel", location: "Morning window light" },
  { id: "petal-pink", name: "Petal Pink", hex: "#F7CAD0", tag: "Soft Pastel", location: "Pressed flower book" },
  { id: "powder-blue", name: "Powder Blue", hex: "#BDE0FE", tag: "Soft Pastel", location: "Quiet seaside room" },
  { id: "lavender-haze", name: "Lavender Haze", hex: "#D8C4F1", tag: "Soft Pastel", location: "Twilight curtains" },
  { id: "apricot-milk", name: "Apricot Milk", hex: "#FFD6A5", tag: "Soft Pastel", location: "Summer kitchen" },
  { id: "mint-frost", name: "Mint Frost", hex: "#CDEFE3", tag: "Soft Pastel", location: "Herb garden" },
  { id: "buttercream", name: "Buttercream", hex: "#FFF1B6", tag: "Soft Pastel", location: "Bakery window" },
  { id: "peach-sorbet", name: "Peach Sorbet", hex: "#FFC6B9", tag: "Soft Pastel", location: "Summer sketchbook" },
  { id: "lilac-mist", name: "Lilac Mist", hex: "#E4C1F9", tag: "Soft Pastel", location: "Garden dusk" },
  { id: "seafoam-soft", name: "Seafoam Soft", hex: "#B8E0D2", tag: "Soft Pastel", location: "Tidal pool" },
  { id: "rosewater", name: "Rosewater", hex: "#FADADD", tag: "Soft Pastel", location: "Ceramic basin" },
  { id: "lemon-chiffon", name: "Lemon Chiffon", hex: "#FFFACD", tag: "Soft Pastel", location: "Sunlit linen" },
  { id: "periwinkle-air", name: "Periwinkle Air", hex: "#C5CAE9", tag: "Soft Pastel", location: "Open sky" },
  { id: "melon-wash", name: "Melon Wash", hex: "#FFB7A5", tag: "Soft Pastel", location: "Fruit stall" },
  { id: "pistachio-cream", name: "Pistachio Cream", hex: "#D9EDC2", tag: "Soft Pastel", location: "Tea garden" },
  { id: "bluebell", name: "Bluebell", hex: "#AFCBFF", tag: "Soft Pastel", location: "Wildflower path" },
  { id: "vanilla-lace", name: "Vanilla Lace", hex: "#F8EDEB", tag: "Soft Pastel", location: "Vintage textile" },
  { id: "april-green", name: "April Green", hex: "#C8E6C9", tag: "Soft Pastel", location: "Fresh leaves" },
  { id: "dusty-peony", name: "Dusty Peony", hex: "#E8B4B8", tag: "Soft Pastel", location: "Old greenhouse" },
  { id: "sky-meringue", name: "Sky Meringue", hex: "#D7F9F1", tag: "Soft Pastel", location: "Cloudy horizon" },
  { id: "mossy-path", name: "Mossy Path", hex: "#687A5B", tag: "Earthy Nature", location: "Forest floor" },
  { id: "fern-shadow", name: "Fern Shadow", hex: "#385A45", tag: "Earthy Nature", location: "Rainforest understory" },
  { id: "clay-earth", name: "Clay Earth", hex: "#A65D3B", tag: "Earthy Nature", location: "Red canyon wall" },
  { id: "lichen-stone", name: "Lichen Stone", hex: "#9A9B7A", tag: "Earthy Nature", location: "Weathered boulder" },
  { id: "pine-needle", name: "Pine Needle", hex: "#234F3E", tag: "Earthy Nature", location: "Mountain woodland" },
  { id: "canyon-rust", name: "Canyon Rust", hex: "#B55239", tag: "Earthy Nature", location: "Desert ravine" },
  { id: "sagebrush", name: "Sagebrush", hex: "#88966B", tag: "Earthy Nature", location: "Highland meadow" },
  { id: "bark-brown", name: "Bark Brown", hex: "#604A3A", tag: "Earthy Nature", location: "Old cedar grove" },
  { id: "river-reed", name: "River Reed", hex: "#A4A86D", tag: "Earthy Nature", location: "Marshland edge" },
  { id: "mushroom-taupe", name: "Mushroom Taupe", hex: "#8C7B6B", tag: "Earthy Nature", location: "Forest floor" },
  { id: "juniper-berry", name: "Juniper Berry", hex: "#526B5D", tag: "Earthy Nature", location: "Coastal scrub" },
  { id: "sunlit-lichen", name: "Sunlit Lichen", hex: "#C2B280", tag: "Earthy Nature", location: "Stone garden" },
  { id: "peat-moor", name: "Peat Moor", hex: "#4B4035", tag: "Earthy Nature", location: "Heather hillside" },
  { id: "willow-leaf", name: "Willow Leaf", hex: "#7B916B", tag: "Earthy Nature", location: "Riverside shade" },
  { id: "terrace-soil", name: "Terrace Soil", hex: "#795548", tag: "Earthy Nature", location: "Herb terrace" },
  { id: "wild-thyme", name: "Wild Thyme", hex: "#718355", tag: "Earthy Nature", location: "Dry hillside" },
  { id: "ochre-mud", name: "Ochre Mud", hex: "#C19A6B", tag: "Earthy Nature", location: "Wetland trail" },
  { id: "deep-algae", name: "Deep Algae", hex: "#315C4C", tag: "Earthy Nature", location: "Forest pond" },
  { id: "hazelnut-husk", name: "Hazelnut Husk", hex: "#916B4F", tag: "Earthy Nature", location: "Autumn grove" },
  { id: "dried-grass", name: "Dried Grass", hex: "#B5A642", tag: "Earthy Nature", location: "Late summer field" },
  { id: "brushed-gold", name: "Brushed Gold", hex: "#C5A253", tag: "Luxury Metallic", location: "Art deco salon" },
  { id: "champagne-metal", name: "Champagne Metal", hex: "#E7D3A8", tag: "Luxury Metallic", location: "Celebration table" },
  { id: "rose-gold", name: "Rose Gold", hex: "#B76E79", tag: "Luxury Metallic", location: "Jewelry atelier" },
  { id: "platinum-mist", name: "Platinum Mist", hex: "#D9D9D6", tag: "Luxury Metallic", location: "Modern penthouse" },
  { id: "antique-brass", name: "Antique Brass", hex: "#B08D57", tag: "Luxury Metallic", location: "Heritage hotel" },
  { id: "polished-copper", name: "Polished Copper", hex: "#B87333", tag: "Luxury Metallic", location: "Chef's kitchen" },
  { id: "silver-leaf", name: "Silver Leaf", hex: "#C0C0C0", tag: "Luxury Metallic", location: "Gallery frame" },
  { id: "champagne-shimmer", name: "Champagne Shimmer", hex: "#F7E7CE", tag: "Luxury Metallic", location: "Velvet lounge" },
  { id: "titanium", name: "Titanium", hex: "#878681", tag: "Luxury Metallic", location: "Sculptural watch" },
  { id: "molten-bronze", name: "Molten Bronze", hex: "#8C6239", tag: "Luxury Metallic", location: "Foundry studio" },
  { id: "satin-pearl", name: "Satin Pearl", hex: "#EAE0C8", tag: "Luxury Metallic", location: "Dressing room" },
  { id: "gunmetal-sheen", name: "Gunmetal Sheen", hex: "#536872", tag: "Luxury Metallic", location: "Automotive showroom" },
  { id: "honeyed-gold", name: "Honeyed Gold", hex: "#D4AF37", tag: "Luxury Metallic", location: "Sunlit foyer" },
  { id: "mercury", name: "Mercury", hex: "#BFC1C2", tag: "Luxury Metallic", location: "Minimalist bar" },
  { id: "cognac-metal", name: "Cognac Metal", hex: "#9A463D", tag: "Luxury Metallic", location: "Leather atelier" },
  { id: "silk-bronze", name: "Silk Bronze", hex: "#A67B5B", tag: "Luxury Metallic", location: "Boutique interior" },
  { id: "white-gold", name: "White Gold", hex: "#D4D4C8", tag: "Luxury Metallic", location: "Fine jewelry case" },
  { id: "burnished-silver", name: "Burnished Silver", hex: "#8E8E8E", tag: "Luxury Metallic", location: "Architectural detail" },
  { id: "sable-gold", name: "Sable Gold", hex: "#A0783D", tag: "Luxury Metallic", location: "Private library" },
  { id: "electrum", name: "Electrum", hex: "#E3C565", tag: "Luxury Metallic", location: "Collector's cabinet" },
  { id: "obsidian-night", name: "Obsidian Night", hex: "#101820", tag: "Dark Gothic", location: "Candlelit hall" },
  { id: "velvet-crimson", name: "Velvet Crimson", hex: "#6E1423", tag: "Dark Gothic", location: "Theater curtain" },
  { id: "raven-black", name: "Raven Black", hex: "#1B1B1B", tag: "Dark Gothic", location: "Rainy cathedral" },
  { id: "witching-purple", name: "Witching Purple", hex: "#3B1F4A", tag: "Dark Gothic", location: "Moonlit garden" },
  { id: "iron-rose", name: "Iron Rose", hex: "#702963", tag: "Dark Gothic", location: "Forgotten manor" },
  { id: "black-cherry", name: "Black Cherry", hex: "#3A0D16", tag: "Dark Gothic", location: "Velvet salon" },
  { id: "cathedral-stone", name: "Cathedral Stone", hex: "#4A4E4D", tag: "Dark Gothic", location: "Gargoyle ledge" },
  { id: "eclipse-blue", name: "Eclipse Blue", hex: "#172A46", tag: "Dark Gothic", location: "Midnight stained glass" },
  { id: "poison-ivy", name: "Poison Ivy", hex: "#243B2F", tag: "Dark Gothic", location: "Overgrown crypt" },
  { id: "blood-moon", name: "Blood Moon", hex: "#8A0304", tag: "Dark Gothic", location: "Winter solstice" },
  { id: "ash-violet", name: "Ash Violet", hex: "#51445F", tag: "Dark Gothic", location: "Dusty portrait room" },
  { id: "graveyard-moss", name: "Graveyard Moss", hex: "#465C3C", tag: "Dark Gothic", location: "Ancient cemetery" },
  { id: "smoked-plum", name: "Smoked Plum", hex: "#49304B", tag: "Dark Gothic", location: "After-hours lounge" },
  { id: "midnight-teal", name: "Midnight Teal", hex: "#123C42", tag: "Dark Gothic", location: "Flooded passage" },
  { id: "black-lace", name: "Black Lace", hex: "#242124", tag: "Dark Gothic", location: "Antique wardrobe" },
  { id: "haunted-umber", name: "Haunted Umber", hex: "#3B3028", tag: "Dark Gothic", location: "Wood-panel study" },
  { id: "storm-slate", name: "Storm Slate", hex: "#343A40", tag: "Dark Gothic", location: "Thunderhead horizon" },
  { id: "dark-mauve", name: "Dark Mauve", hex: "#6B3E4B", tag: "Dark Gothic", location: "Rose window shadow" },
  { id: "coven-green", name: "Coven Green", hex: "#294936", tag: "Dark Gothic", location: "Herbalist's cellar" },
  { id: "nocturne-ink", name: "Nocturne Ink", hex: "#202A44", tag: "Dark Gothic", location: "Night train" },
  { id: "riad-coral", name: "Riad Coral", hex: "#D96C55", tag: "Architecture", location: "Courtyard plaster" },
  { id: "tile-blue", name: "Tile Blue", hex: "#286B83", tag: "Architecture", location: "Zellige workshop" },
  { id: "sunwashed-plaster", name: "Sunwashed Plaster", hex: "#E8C39E", tag: "Architecture", location: "Medina facade" },
  { id: "palace-ochre", name: "Palace Ochre", hex: "#C68B3C", tag: "Architecture", location: "Kasbah gate" },
  { id: "courtyard-shadow", name: "Courtyard Shadow", hex: "#59656F", tag: "Architecture", location: "Riad arcade" },
  { id: "cedar-needle", name: "Cedar Needle", hex: "#3F684C", tag: "Nature", location: "Atlas forest" },
  { id: "fig-leaf", name: "Fig Leaf", hex: "#77966A", tag: "Nature", location: "Garden wall" },
  { id: "wild-olive", name: "Wild Olive", hex: "#8B9660", tag: "Nature", location: "Hillside grove" },
  { id: "sunlit-moss", name: "Sunlit Moss", hex: "#A5A95A", tag: "Nature", location: "Forest clearing" },
  { id: "river-pebble", name: "River Pebble", hex: "#8B9A9C", tag: "Nature", location: "Mountain stream" },
  { id: "woven-indigo", name: "Woven Indigo", hex: "#3B4B83", tag: "Crafts", location: "Loom house" },
  { id: "dyed-carmine", name: "Dyed Carmine", hex: "#B23845", tag: "Crafts", location: "Natural dye vat" },
  { id: "saffron-thread", name: "Saffron Thread", hex: "#E2A72E", tag: "Crafts", location: "Textile market" },
  { id: "ceramic-rose", name: "Ceramic Rose", hex: "#C97978", tag: "Crafts", location: "Pottery shelf" },
  { id: "woven-cocoa", name: "Woven Cocoa", hex: "#795548", tag: "Crafts", location: "Berber loom" },
  { id: "harbor-mist", name: "Harbor Mist", hex: "#A7C7C9", tag: "Coastal", location: "Atlantic morning" },
  { id: "saltwater-blue", name: "Saltwater Blue", hex: "#4A91A5", tag: "Coastal", location: "Tide pool" },
  { id: "weathered-aqua", name: "Weathered Aqua", hex: "#6FA7A5", tag: "Coastal", location: "Painted boat hull" },
  { id: "sea-cliff", name: "Sea Cliff", hex: "#49646B", tag: "Coastal", location: "Rocky shoreline" },
  { id: "sunset-tide", name: "Sunset Tide", hex: "#D57962", tag: "Coastal", location: "Harbor dusk" },
  { id: "neon-fuchsia", name: "Neon Fuchsia", hex: "#FF0080", tag: "Cyberpunk Neon", location: "Nightclub marquee" },
  { id: "laser-lime", name: "Laser Lime", hex: "#CCFF00", tag: "Cyberpunk Neon", location: "Drone display" },
  { id: "quantum-cyan", name: "Quantum Cyan", hex: "#00FFC8", tag: "Cyberpunk Neon", location: "Data tunnel" },
  { id: "plasma-orange", name: "Plasma Orange", hex: "#FF6600", tag: "Cyberpunk Neon", location: "Street racer glow" },
  { id: "neon-indigo", name: "Neon Indigo", hex: "#4B00FF", tag: "Cyberpunk Neon", location: "Holographic billboard" },
  { id: "pastel-lavender", name: "Pastel Lavender", hex: "#CDB4DB", tag: "Soft Pastel", location: "Quiet studio" },
  { id: "pastel-sky", name: "Pastel Sky", hex: "#A2D2FF", tag: "Soft Pastel", location: "Open-air balcony" },
  { id: "pastel-coral", name: "Pastel Coral", hex: "#FFAFCC", tag: "Soft Pastel", location: "Summer postcard" },
  { id: "pastel-sage", name: "Pastel Sage", hex: "#BDE0C5", tag: "Soft Pastel", location: "Botanical print" },
  { id: "pastel-vanilla", name: "Pastel Vanilla", hex: "#FDECC8", tag: "Soft Pastel", location: "Cream tea" },
  { id: "earth-clover", name: "Earth Clover", hex: "#52734D", tag: "Earthy Nature", location: "Meadow edge" },
  { id: "earth-sienna", name: "Earth Sienna", hex: "#8D5524", tag: "Earthy Nature", location: "Clay hillside" },
  { id: "earth-bog", name: "Earth Bog", hex: "#596E5A", tag: "Earthy Nature", location: "Mossland trail" },
  { id: "earth-flint", name: "Earth Flint", hex: "#777B7E", tag: "Earthy Nature", location: "Dry riverbed" },
  { id: "gilded-olive", name: "Gilded Olive", hex: "#A88B4A", tag: "Luxury Metallic", location: "Private dining room" },
  { id: "silver-satin", name: "Silver Satin", hex: "#B7B7B7", tag: "Luxury Metallic", location: "Tailor's atelier" },
  { id: "copper-rose", name: "Copper Rose", hex: "#A85F55", tag: "Luxury Metallic", location: "Boutique mirror" },
  { id: "pewter-lustre", name: "Pewter Lustre", hex: "#899499", tag: "Luxury Metallic", location: "Architectural foyer" },
  { id: "gothic-wine", name: "Gothic Wine", hex: "#4C1626", tag: "Dark Gothic", location: "Old theater box" },
  { id: "crypt-blue", name: "Crypt Blue", hex: "#26354A", tag: "Dark Gothic", location: "Stone passage" },
  { id: "thorn-green", name: "Thorn Green", hex: "#314A36", tag: "Dark Gothic", location: "Walled cemetery" },
  { id: "charcoal-velvet", name: "Charcoal Velvet", hex: "#302D34", tag: "Dark Gothic", location: "Private chamber" },
  { id: "plum-shadow", name: "Plum Shadow", hex: "#5A3D5C", tag: "Dark Gothic", location: "Stained glass dusk" },
  { id: "mosaic-sand", name: "Mosaic Sand", hex: "#D2B48C", tag: "Architecture", location: "Tile courtyard" },
  { id: "terrace-white", name: "Terrace White", hex: "#F0E6D2", tag: "Architecture", location: "Sunlit roof" },
  { id: "archway-teal", name: "Archway Teal", hex: "#2F7775", tag: "Architecture", location: "Painted passage" },
  { id: "cypress-green", name: "Cypress Green", hex: "#4C6B50", tag: "Nature", location: "Garden avenue" },
  { id: "meadow-gold", name: "Meadow Gold", hex: "#D9B44A", tag: "Nature", location: "Wildflower field" },
  { id: "rainleaf", name: "Rainleaf", hex: "#629677", tag: "Nature", location: "Wet forest canopy" },
  { id: "indigo-ink", name: "Indigo Ink", hex: "#303F68", tag: "Crafts", location: "Block-print studio" },
  { id: "woven-saffron", name: "Woven Saffron", hex: "#D98E2B", tag: "Crafts", location: "Market textile" },
  { id: "clay-berry", name: "Clay Berry", hex: "#934B59", tag: "Crafts", location: "Hand-thrown vessel" },
  { id: "blue-horizon", name: "Blue Horizon", hex: "#75A9B8", tag: "Coastal", location: "Open sea" },
  { id: "shell-pink", name: "Shell Pink", hex: "#E5B8A6", tag: "Coastal", location: "Tide line" },
  { id: "deep-harbor", name: "Deep Harbor", hex: "#24536B", tag: "Coastal", location: "Night marina" },
  { id: "neon-mint", name: "Neon Mint", hex: "#00FF9D", tag: "Cyberpunk Neon", location: "Augmented garden" },
  { id: "hyper-red", name: "Hyper Red", hex: "#FF0033", tag: "Cyberpunk Neon", location: "Combat simulator" },
  { id: "neon-sapphire", name: "Neon Sapphire", hex: "#0066FF", tag: "Cyberpunk Neon", location: "Tower beacon" },
  { id: "pastel-mauve", name: "Pastel Mauve", hex: "#D7BDE2", tag: "Soft Pastel", location: "Powder room" },
  { id: "pastel-aqua", name: "Pastel Aqua", hex: "#B5EAD7", tag: "Soft Pastel", location: "Glasshouse pool" },
  { id: "pastel-melon", name: "Pastel Melon", hex: "#FFDAC1", tag: "Soft Pastel", location: "Sunday brunch" },
  { id: "earth-bark", name: "Earth Bark", hex: "#6F4E37", tag: "Earthy Nature", location: "Old woodland" },
  { id: "earth-sprout", name: "Earth Sprout", hex: "#789262", tag: "Earthy Nature", location: "New growth" },
  { id: "metallic-amber", name: "Metallic Amber", hex: "#BF8B30", tag: "Luxury Metallic", location: "Golden cabinet" },
  { id: "metallic-graphite", name: "Metallic Graphite", hex: "#4B5054", tag: "Luxury Metallic", location: "Design studio" },
  { id: "gothic-ink", name: "Gothic Ink", hex: "#1F2633", tag: "Dark Gothic", location: "Sealed archive" },
  { id: "gothic-ivy", name: "Gothic Ivy", hex: "#344E41", tag: "Dark Gothic", location: "Ruined cloister" },
  { id: "moroccan-red", name: "Moroccan Red", hex: "#A83D2C", tag: "Moroccan Colors", location: "Inspired by warm clay and sunlit walls" },
  { id: "sahara-sand", name: "Sahara Sand", hex: "#D8BA8D", tag: "Moroccan Colors", location: "Inspired by desert light" },
  { id: "atlas-green", name: "Atlas Green", hex: "#4C6B50", tag: "Moroccan Colors", location: "Inspired by mountain cedar" },
  { id: "zellige-green", name: "Zellige Green", hex: "#2F7775", tag: "Moroccan Colors", location: "Inspired by glazed tile" },
  { id: "ocean-blue", name: "Atlantic Blue", hex: "#286B83", tag: "Moroccan Colors", location: "Inspired by the Atlantic coast" },
  { id: "mint-tea-inspired", name: "Mint Tea", hex: "#9ACCB0", tag: "Moroccan Colors", location: "Inspired by a cool courtyard pour" },
  { id: "marrakech-sunset", name: "Marrakech Sunset", hex: "#D96C55", tag: "Moroccan Colors", location: "Inspired by evening terracotta" },
  { id: "majorelle-inspired", name: "Majorelle Blue", hex: "#3F5AA8", tag: "Moroccan Colors", location: "Inspired by vivid garden blue" }
];

const CATEGORY_OPTIONS = ["All", "Architecture", "Nature", "Crafts", "Coastal", "Cyberpunk Neon", "Soft Pastel", "Earthy Nature", "Luxury Metallic", "Dark Gothic"];
const FEATURED_COLOR_IDS = [
  "majorelle-blue", "saffron-sunset", "teal-tide", "terracotta-haze",
  "neon-voltage", "laser-pink", "plasma-blue", "cloud-cream",
  "petal-pink", "lavender-haze", "mossy-path", "clay-earth",
  "pine-needle", "brushed-gold", "rose-gold", "platinum-mist",
  "obsidian-night", "velvet-crimson", "eclipse-blue", "poison-ivy"
];
const FEATURED_COLORS = FEATURED_COLOR_IDS.map((id) => COLOR_LIBRARY.find((color) => color.id === id)).filter(Boolean);
const MOROCCAN_COLOR_IDS = ["moroccan-red", "majorelle-inspired", "sahara-sand", "atlas-green", "zellige-green", "ocean-blue", "mint-tea-inspired", "marrakech-sunset"];
const MOROCCAN_COLORS = MOROCCAN_COLOR_IDS.map((id) => COLOR_LIBRARY.find((color) => color.id === id)).filter(Boolean);

const COLOR_FAMILY_MAP = {
  blue: ["blue", "bleu", "azraq", "cyan", "indigo", "navy", "sky", "cobalt", "majorelle", "turquoise", "azure", "teal", "aqua", "cerulean", "lagoon"],
  red: ["red", "rouge", "ahmar", "crimson", "scarlet", "coral", "carmine", "berry", "rose", "ruby", "burgundy", "copper"],
  green: ["green", "vert", "akhdar", "olive", "moss", "mint", "sage", "fern", "forest", "cedar", "ivy", "pistachio", "algae"],
  yellow: ["yellow", "jaune", "asfar", "gold", "golden", "saffron", "amber", "ochre", "lemon", "brass", "honey"],
  orange: ["orange", "orange", "burtuqali", "terracotta", "clay", "apricot", "tangerine", "copper", "rust", "canyon"],
  purple: ["purple", "violet", "banafsaji", "lavender", "lilac", "plum", "mauve", "indigo", "ultraviolet"],
  pink: ["pink", "rose", "wardi", "magenta", "fuchsia", "peony", "blush", "petal", "watermelon"],
  brown: ["brown", "marron", "bunni", "umber", "sienna", "bark", "cocoa", "hazelnut", "coffee", "chestnut", "henna"],
  black: ["black", "noir", "aswad", "obsidian", "raven", "charcoal", "gothic", "eclipse", "shadow", "onyx"],
  white: ["white", "blanc", "abyad", "ivory", "cream", "pearl", "vanilla", "snow", "foam", "cloud"]
};

function normalizeSearchText(value) {
  return String(value || "").toLowerCase().trim().replace(/\s+/g, " ");
}

function getExpandedSearchGroups(query) {
  const normalizedQuery = normalizeSearchText(query);
  const queryTerms = normalizedQuery.split(" ").filter(Boolean);
  return queryTerms.map((term) => {
    const family = Object.values(COLOR_FAMILY_MAP).find((aliases) => aliases.includes(term));
    return family || [term];
  });
}

function getExpandedSearchTerms(query) {
  return [...new Set(getExpandedSearchGroups(query).flat())];
}

function matchesColorSearch(searchableValue, query) {
  const normalizedText = normalizeSearchText(searchableValue);
  const groups = getExpandedSearchGroups(query);
  return !groups.length || groups.every((group) => group.some((term) => normalizedText.includes(term)));
}

function getColorSearchText(color) {
  return [color.name, color.hex, color.tag, color.location, ...(Array.isArray(color.tags) ? color.tags : [])].join(" ");
}

function getPaletteSearchText(palette) {
  const nestedColors = (palette.colors || []).map((colorValue) => {
    if (typeof colorValue === "string" && colorValue.startsWith("#")) return colorValue;
    const color = COLOR_LIBRARY.find((entry) => entry.id === colorValue);
    return color ? getColorSearchText(color) : colorValue;
  });
  return [palette.name, palette.hex, palette.category, palette.description, palette.context, ...(Array.isArray(palette.tags) ? palette.tags : []), ...nestedColors].join(" ");
}

const AI_QUICK_PROMPTS = [
  "Suggest a warm palette for a traditional Moroccan cafe.",
  "Give me accessible high-contrast colors for a dark-mode dashboard.",
  "Palette for a modern tech startup in Meknes."
];

function getAssistantPalette(prompt) {
  const normalizedPrompt = prompt.toLowerCase();
  const paletteIds = normalizedPrompt.includes("dark") || normalizedPrompt.includes("contrast")
    ? ["obsidian-night", "cloud-cream", "neon-voltage", "eclipse-blue", "platinum-mist"]
    : normalizedPrompt.includes("tech") || normalizedPrompt.includes("startup") || normalizedPrompt.includes("meknes")
      ? ["cyber-teal", "plasma-blue", "chrome-blue", "cloud-cream", "copper-rose"]
      : ["saffron-sunset", "riad-coral", "clay-patio", "ivory-tile", "teal-tide"];
  return paletteIds.map((id) => COLOR_LIBRARY.find((color) => color.id === id)).filter(Boolean);
}

function AIColorAssistant({ onApplyHarmony }) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Tell me what mood, place, or interface you are designing and I will shape a five-color starting point." }
  ]);
  const [generatedPalette, setGeneratedPalette] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  async function copyAssistantColor(color) {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopiedId(color.id);
      window.setTimeout(() => setCopiedId(null), 1400);
    } catch (error) {
      setMessages((current) => [...current, { role: "assistant", text: "Clipboard access is unavailable in this browser." }]);
    }
  }

  async function submitPrompt(event) {
    event.preventDefault();
    const text = prompt.trim();
    if (!text) return;
    setIsLoading(true);
    setMessages((current) => [...current, { role: "user", text }]);

    try {
      const response = await fetch(`${API_BASE}/api/generate-palette`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to generate a palette.");
      const colors = data.colors.map((color, index) => ({ ...color, id: `ai-${index}-${color.hex.slice(1).toLowerCase()}` }));
      setMessages((current) => [...current, { role: "assistant", text: "Here is a Gemini-curated five-color direction for your brief." }]);
      setGeneratedPalette({ title: data.paletteName, colors });
      setPrompt("");
    } catch (error) {
      setMessages((current) => [...current, { role: "assistant", text: error.message || "The AI assistant is unavailable right now." }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="assistant-section">
      <div className="container assistant-container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Simulated palette intelligence</p>
            <h2>AI Color Assistant</h2>
          </div>
          <span className="section-meta">Five-color directions</span>
        </div>
        <div className="assistant-layout">
          <aside className="assistant-prompts">
            <p className="assistant-label">Try a quick prompt</p>
            {AI_QUICK_PROMPTS.map((quickPrompt) => (
              <button key={quickPrompt} type="button" onClick={() => setPrompt(quickPrompt)}>{quickPrompt}</button>
            ))}
          </aside>
          <div className="assistant-chat" aria-live="polite">
            <div className="assistant-messages">
              {messages.map((message, index) => <p key={`${message.role}-${index}`} className={`assistant-message ${message.role}`}>{message.text}</p>)}
            </div>
            {generatedPalette && (
              <article className="assistant-palette">
                <div className="assistant-palette-heading"><div><p className="eyebrow">Generated palette</p><h3>{generatedPalette.title}</h3></div><span>5 colors</span></div>
                <div className="assistant-color-grid">
                  {generatedPalette.colors.map((color) => (
                    <div className="assistant-color" key={color.id} style={{ backgroundColor: color.hex }}>
                      <div><strong>{color.name}</strong><span>{color.hex}</span></div>
                      <div className="assistant-color-actions">
                        <button type="button" onClick={() => copyAssistantColor(color)}>{copiedId === color.id ? "Copied!" : "Copy"}</button>
                        <button type="button" onClick={() => onApplyHarmony(color.hex)}>Apply to Harmony Builder</button>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )}
            <form className="assistant-form" onSubmit={submitPrompt}>
              <input type="text" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Describe the palette you need..." aria-label="Ask the AI Color Assistant" />
              <button type="submit" className="primary-btn assistant-submit" disabled={isLoading}><span className={isLoading ? "assistant-spinner" : ""} aria-hidden="true"></span>{isLoading ? "Generating..." : "Generate palette"}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const PALETTE_LIBRARY = [
  {
    id: "sunset-courtyard",
    name: "Sunset Courtyard",
    category: "Architecture",
    description: "Warm terracotta and sand tones for rich architectural storytelling.",
    colors: ["saffron-sunset", "henna-brown", "rose-sand", "kasbah-gold", "ivory-tile"]
  },
  {
    id: "ocean-mosaic",
    name: "Ocean Mosaic",
    category: "Coastal",
    description: "Cool water tones with clean sea-glass energy for modern coastal palettes.",
    colors: ["chefchaouen-cyan", "teal-tide", "cerulean-glaze", "lagoon-blue", "coast-foam"]
  },
  {
    id: "garden-spice",
    name: "Garden Spice",
    category: "Nature",
    description: "Olive, cedar, and earth tones inspired by terraces, herbs, and generous light.",
    colors: ["olive-grove", "atlas-cedar", "mint-tea", "atlas-moss", "pistachio-mist"]
  },
  {
    id: "medina-night",
    name: "Medina Night",
    category: "Crafts",
    description: "Rich market-inspired tones that feel handcrafted, vivid, and alive.",
    colors: ["medina-berry", "copper-lantern", "berber-rose", "majorelle-blue", "marrakesh-coral"]
  },
  {
    id: "atlas-terrace",
    name: "Atlas Terrace",
    category: "Nature",
    description: "Soft mineral shades that feel grounded, calm, and beautifully natural.",
    colors: ["dune-sand", "clay-patio", "golden-hour", "ash-olive", "sunflare-gold"]
  },
  {
    id: "souk-market",
    name: "Souk Market",
    category: "Crafts",
    description: "Spiced reds, copper, and jewel tones lifted from a lively medina market.",
    colors: ["souk-spice", "copper-lantern", "medina-berry", "marrakesh-coral", "kasbah-gold"]
  },
  {
    id: "high-atlas",
    name: "High Atlas",
    category: "Nature",
    description: "Mountain greens and sunlit stone for a grounded, generous natural mood.",
    colors: ["atlas-cedar", "atlas-moss", "dune-sand", "sunflare-gold", "cafe-stone"]
  },
  {
    id: "majorelle-oasis",
    name: "Majorelle Oasis",
    category: "Nature",
    description: "Botanical greens and iconic blue softened by a quiet courtyard light.",
    colors: ["majorelle-blue", "olive-grove", "mint-tea", "pistachio-mist", "ivory-tile"]
  },
  {
    id: "tangier-sunset",
    name: "Tangier Sunset",
    category: "Coastal",
    description: "A meeting of Atlantic blue and glowing evening color at the northern coast.",
    colors: ["indigo-evening", "lagoon-blue", "rose-sand", "marrakesh-coral", "golden-hour"]
  },
  {
    id: "desert-dunes",
    name: "Desert Dunes",
    category: "Nature",
    description: "Quiet sand, clay, and amber tones shaped by wind and wide-open horizons.",
    colors: ["dune-sand", "ouarzazate-ochre", "sunbaked-amber", "clay-patio", "henna-brown"]
  },
  {
    id: "sahara-gold",
    name: "Sahara Gold",
    category: "Nature",
    description: "Layered golds with deep earth accents for warmth that feels timeless.",
    colors: ["sunflare-gold", "kasbah-gold", "saffron-sunset", "cafe-stone", "henna-brown"]
  },
  {
    id: "ouarzazate-sunset",
    name: "Ouarzazate Sunset",
    category: "Architecture",
    description: "Rose, terracotta, and sandstone drawn from kasbah walls at golden hour.",
    colors: ["ouarzazate-ochre", "terracotta-haze", "rose-sand", "marrakesh-coral", "ivory-tile"]
  },
  {
    id: "berber-tapestry",
    name: "Berber Tapestry",
    category: "Crafts",
    description: "Textile-inspired berry, coral, blue, and earth notes with handmade character.",
    colors: ["berber-rose", "medina-berry", "majorelle-blue", "copper-lantern", "cafe-stone"]
  },
  {
    id: "chefchaouen-dream",
    name: "Chefchaouen Dream",
    category: "Coastal",
    description: "Layered blue washes and pale tile tones for a cool, contemplative escape.",
    colors: ["chefchaouen-cyan", "cerulean-glaze", "aqua-ink", "coast-foam", "ivory-tile"]
  },
  {
    id: "essaouira-breeze",
    name: "Essaouira Breeze",
    category: "Coastal",
    description: "Salt air, harbor water, and weathered stone in a breezy coastal arrangement.",
    colors: ["teal-tide", "lagoon-blue", "aqua-ink", "coast-foam", "ash-olive"]
  },
  {
    id: "riad-morning",
    name: "Riad Morning",
    category: "Architecture",
    description: "Soft tile, mint, and rose tones for the quiet light of a courtyard morning.",
    colors: ["hammam-steam", "mint-tea", "ivory-tile", "rose-sand", "teal-tide"]
  },
  {
    id: "lantern-festival",
    name: "Lantern Festival",
    category: "Crafts",
    description: "A glowing evening mix of copper, saffron, coral, and deep indigo.",
    colors: ["copper-lantern", "saffron-sunset", "marrakesh-coral", "berber-rose", "indigo-evening"]
  }
];

const PALETTE_CATEGORIES = CATEGORY_OPTIONS.filter((category) => category !== "All");
const PALETTE_THEME_NAMES = {
  Architecture: "Architectural Study",
  Nature: "Botanical Field",
  Crafts: "Craft Workshop",
  Coastal: "Coastal Current",
  "Cyberpunk Neon": "Neon Harmony",
  "Soft Pastel": "Pastel Dream",
  "Earthy Nature": "Earthy Tones",
  "Luxury Metallic": "Metallic Luxe",
  "Dark Gothic": "Gothic Nocturne"
};
const EXPANDED_PALETTES = Array.from({ length: 100 }, (_, index) => {
  const categoryIndex = index % PALETTE_CATEGORIES.length;
  const paletteNumber = Math.floor(index / PALETTE_CATEGORIES.length);
  const category = PALETTE_CATEGORIES[categoryIndex];
  const colorPool = COLOR_LIBRARY.filter((color) => color.tag === category);
  const start = (paletteNumber + categoryIndex) % colorPool.length;
  const step = 1 + ((paletteNumber + categoryIndex) % Math.max(1, colorPool.length - 1));
  const colors = Array.from({ length: 5 }, (_, colorIndex) => colorPool[(start + colorIndex * step) % colorPool.length].id);

  return {
    id: `expanded-palette-${index + 1}`,
    name: `${PALETTE_THEME_NAMES[category]} ${String(paletteNumber + 1).padStart(2, "0")}`,
    category,
    description: `A five-color ${category.toLowerCase()} composition with a focused ${PALETTE_THEME_NAMES[category].toLowerCase()} mood.`,
    colors
  };
});
const ALL_PALETTES = [...PALETTE_LIBRARY, ...EXPANDED_PALETTES];
const FEATURED_PALETTES = PALETTE_LIBRARY.slice(0, 3);
const FAVORITES_KEY = "chicos-favorites";
const FAVORITES_KEY_PALETTES = "chicos-favorite-palettes";
const CUSTOM_FAVORITES_KEY = "chicos-custom-favorites";
const CUSTOM_PALETTE_FAVORITES_KEY = "chicos-custom-palette-favorites";
const AUTH_TOKEN_KEY = "chicos-auth-token";
const AUTH_USER_KEY = "chicos-auth-user";
const API_BASE = "https://chicos-colors-api.vercel.app";
const CITY_PALETTES = [
  { id: "chefchaouen", name: "Chefchaouen Blues", region: "Chefchaouen", context: "Blue-washed medina walls, mountain air, and painted doorways.", tags: ["calm", "tilework", "mountain light"], colors: ["#2F6F91", "#5FAFC4", "#A8D6D1", "#D9E9E2", "#1E4058"] },
  { id: "marrakech", name: "Marrakech Terracotta", region: "Marrakech", context: "Rose city walls, warm dust, and late afternoon courtyard light.", tags: ["sun-baked", "riad", "warm"], colors: ["#B94E35", "#D77A51", "#E8B36D", "#F1D8B2", "#763B32"] },
  { id: "essaouira", name: "Essaouira Coast", region: "Essaouira", context: "Atlantic wind, blue boats, salt-washed wood, and sea foam.", tags: ["Atlantic", "breezy", "coastal"], colors: ["#1F6278", "#3E9AA7", "#9BCAC4", "#E0E9DC", "#C68A62"] },
  { id: "fes", name: "Fes Pottery", region: "Fes", context: "Cobalt ceramics, glazed courtyards, and the craft of zellige tile.", tags: ["zellige", "artisan", "cobalt"], colors: ["#174A78", "#317FA0", "#65B4B1", "#E4C878", "#F3E8CF"] },
  { id: "tangier", name: "Tangier Sunset", region: "Tangier", context: "Northern light where the Mediterranean meets the Atlantic horizon.", tags: ["horizon", "evening", "north coast"], colors: ["#243C68", "#536C98", "#D36A58", "#E6A35B", "#F4D5A5"] },
  { id: "ouarzazate", name: "Ouarzazate Earth", region: "Ouarzazate", context: "Kasbah clay, desert roads, and cinematic ochre under a clear sky.", tags: ["kasbah", "desert", "mineral"], colors: ["#7A4435", "#B86A45", "#D49A55", "#E4C083", "#4E5444"] },
  { id: "agadir", name: "Agadir Gold", region: "Agadir", context: "Atlantic light, sun-warmed walls, and golden market streets by the coast.", tags: ["golden", "Atlantic", "market"], colors: ["#C68B3C", "#E2B866", "#F1D49A", "#5D8C8C", "#274C5A"] },
  { id: "chefchaouen-indigo", name: "Chefchaouen Indigo", region: "Chefchaouen", context: "Deep indigo doors and blue-washed lanes softened by mountain daylight.", tags: ["indigo", "mountain", "tilework"], colors: ["#263F73", "#3F5AA8", "#6BB7C9", "#B7DDE0", "#E5E4DA"] },
  { id: "merzouga", name: "Merzouga Dunes", region: "Merzouga", context: "Sahara dunes shifting from amber heat to cool violet twilight.", tags: ["Sahara", "dunes", "sunset"], colors: ["#B86A45", "#D49A55", "#E4C083", "#7B4B43", "#3D405B"] },
  { id: "rabat", name: "Rabat Ochre", region: "Rabat", context: "Atlantic ramparts, ochre courtyards, and the calm green of coastal gardens.", tags: ["ramparts", "ochre", "garden"], colors: ["#B77B45", "#D5A25C", "#E8D7B0", "#557A6E", "#2E5965"] }
];

function MoroccanPattern({ className = "" }) {
  const patternId = `zellige-${useId().replace(/:/g, "")}`;
  return (
    <svg className={`moroccan-pattern ${className}`} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={patternId} width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M30 3 57 30 30 57 3 30Z M30 15 45 30 30 45 15 30Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M0 0h12v12H0z M48 0h12v12H48z M0 48h12v12H0z M48 48h12v12H48z" fill="currentColor" opacity=".45" />
        </pattern>
      </defs>
      <rect width="120" height="120" fill={`url(#${patternId})`} />
    </svg>
  );
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function readStored(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    try {
      const raw = localStorage.getItem(key);
      return typeof fallback === "string" && raw ? raw : fallback;
    } catch (storageError) {
      return fallback;
    }
  }
}

function writeStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    return false;
  }
  return true;
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const value = clean.length === 3 ? clean.split("").map((x) => x + x).join("") : clean;
  const int = parseInt(value, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((channel) => clamp(channel, 0, 255).toString(16).padStart(2, "0")).join("").toUpperCase();
}

function hexToHsl(hex) {
  const { r, g, b } = hexToRgb(hex);
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  let h = 0;
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  if (delta !== 0) {
    switch (max) {
      case red: h = ((green - blue) / delta) % 6; break;
      case green: h = (blue - red) / delta + 2; break;
      default: h = (red - green) / delta + 4; break;
    }
  }

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
  else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0];
  else if (h >= 120 && h < 180) [r, g, b] = [0, c, x];
  else if (h >= 180 && h < 240) [r, g, b] = [0, x, c];
  else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return rgbToHex(Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255));
}

function buildHarmony(baseHex, rule = "Complementary") {
  const { h, s, l } = hexToHsl(baseHex);
  const hueOffsets = {
    Complementary: [0, 18, 42, 105, 180],
    Analogous: [0, 22, 42, 342, 318],
    Triadic: [0, 120, 240, 30, 210],
    Monochromatic: [0, 0, 0, 0, 0]
  }[rule] || [0, 18, 42, 105, 180];

  if (rule === "Monochromatic") {
    return [
      baseHex,
      hslToHex(h, clamp(s - 8, 20, 92), clamp(l + 18, 30, 86)),
      hslToHex(h, clamp(s - 12, 18, 90), clamp(l + 8, 25, 78)),
      hslToHex(h, clamp(s + 5, 20, 92), clamp(l - 8, 18, 70)),
      hslToHex(h, clamp(s + 8, 20, 92), clamp(l - 18, 12, 62))
    ];
  }

  const tones = [
    baseHex,
    hslToHex((h + hueOffsets[1]) % 360, clamp(s - 8, 20, 92), clamp(l + 8, 30, 78)),
    hslToHex((h + hueOffsets[2]) % 360, clamp(s - 12, 18, 90), clamp(l - 6, 22, 72)),
    hslToHex((h + hueOffsets[3]) % 360, clamp(s + 8, 20, 90), clamp(l + 12, 30, 80)),
    hslToHex((h + hueOffsets[4]) % 360, clamp(s - 6, 18, 88), clamp(l - 8, 25, 70))
  ];
  return tones;
}

function getRelativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return [r, g, b].reduce((total, channel, index) => {
    const value = channel / 255;
    const linear = value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    return total + linear * [0.2126, 0.7152, 0.0722][index];
  }, 0);
}

function getContrastRatio(firstHex, secondHex) {
  const first = getRelativeLuminance(firstHex);
  const second = getRelativeLuminance(secondHex);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

function getReadableTextColor(backgroundHex) {
  return getContrastRatio(backgroundHex, "#FFFFFF") >= getContrastRatio(backgroundHex, "#111111") ? "#FFFFFF" : "#111111";
}

function getWcagLabel(ratio) {
  if (ratio >= 7) return `Pass (AAA) - ${ratio.toFixed(1)}:1`;
  if (ratio >= 4.5) return `Pass (AA) - ${ratio.toFixed(1)}:1`;
  if (ratio >= 3) return `Pass (AA Large) - ${ratio.toFixed(1)}:1`;
  return `Needs contrast - ${ratio.toFixed(1)}:1`;
}

function getPaletteHexes(palette) {
  return palette.colors.map((color) => getColorHex(color));
}

function getPaletteExport(palette, format) {
  const hexes = getPaletteHexes(palette);
  if (format === "figma") {
    return JSON.stringify({
      name: palette.name || "Chico's Colors palette",
      colors: hexes.map((hex, index) => ({ name: `${palette.id || "palette"}-${index + 1}`, value: hex }))
    }, null, 2);
  }
  if (format === "css-root") {
    return `:root {\n${hexes.map((hex, index) => `  --chico-${palette.id || "palette"}-${index + 1}: ${hex};`).join("\n")}\n}`;
  }
  if (format === "tailwind") {
    return `theme: {\n  extend: {\n    colors: {\n${hexes.map((hex, index) => `      "${palette.id || "palette"}-${index + 1}": "${hex}",`).join("\n")}\n    }\n  }\n}`;
  }
  if (format === "css") {
    return `:root {\n${hexes.map((hex, index) => `  --color-${index === 0 ? "primary" : `palette-${index + 1}`}: ${hex};`).join("\n")}\n}`;
  }
  return JSON.stringify(hexes, null, 2);
}

const COLOR_BLINDNESS_MATRICES = {
  Protanopia: [[0.567, 0.433, 0], [0.558, 0.442, 0], [0, 0.242, 0.758]],
  Deuteranopia: [[0.625, 0.375, 0], [0.7, 0.3, 0], [0, 0.3, 0.7]],
  Tritanopia: [[0.95, 0.05, 0], [0, 0.433, 0.567], [0, 0.475, 0.525]],
  Achromatopsia: [[0.299, 0.587, 0.114], [0.299, 0.587, 0.114], [0.299, 0.587, 0.114]]
};

function simulateColorBlindness(hex, mode) {
  if (!mode) return hex;
  const matrix = COLOR_BLINDNESS_MATRICES[mode];
  if (!matrix) return hex;
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(
    Math.round(matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b),
    Math.round(matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b),
    Math.round(matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b)
  );
}

function SearchBar({ query, onChange, placeholder }) {
  return (
    <div className="search-wrap">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        className="search-input"
        type="search"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search the color library"
      />
    </div>
  );
}

function ColorCard({ color, isFavorite, onToggle, onCopy, onOpen }) {
  return (
    <article className="color-card" style={{ backgroundColor: color.hex }}>
      <div className="card-top">
        <div>
          <h3 className="color-name">{color.name}</h3>
          <div className="color-code">{color.hex}</div>
        </div>
        <button
          type="button"
          className={`favorite-btn${isFavorite ? " active" : ""}`}
          onClick={() => onToggle(color.id)}
          aria-label={`${isFavorite ? "Remove" : "Add"} ${color.name} ${isFavorite ? "from" : "to"} favorites`}
          aria-pressed={isFavorite}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
      <p className="color-origin">{color.location}</p>
      <div className="color-card-actions">
        <button type="button" className="color-card-action" onClick={() => onCopy?.(color)}>Copy HEX</button>
        <button type="button" className="color-card-action" onClick={() => onOpen?.(color)}>Details</button>
      </div>
    </article>
  );
}

function Favorites({ savedColors, savedPalettes, savedCustomColors, savedCustomPalettes, onRemoveColor, onRemovePalette, onRemoveCustomColor, onRemoveCustomPalette, onExportPalette }) {
  const items = [
    ...savedColors.map((color) => ({ id: color.id, label: color.name, code: color.hex, swatch: color.hex, type: "color" })),
    ...savedCustomColors.map((color) => ({ id: color.id, label: color.name, code: color.hex, swatch: color.hex, type: "custom-color" })),
    ...savedCustomPalettes.map((palette) => ({ id: palette.id, label: palette.name, code: `${palette.colors.length} shades`, swatch: palette.colors[0], type: "custom-palette", palette })),
    ...savedPalettes.map((palette) => ({ id: palette.id, label: palette.name, code: `${palette.colors.length} shades`, swatch: getColorHex(palette.colors[0]), type: "palette", palette }))
  ];

  return (
    <section className="favorites-section" id="favorites">
      <div className="container">
        <div className="section-heading">
          <h2>Your favorites</h2>
          <span className="section-meta">{items.length} saved</span>
        </div>

        {items.length ? (
          <div className="favorite-list">
            {items.map((item) => (
              <div className="favorite-item" key={`${item.type}-${item.id}`}>
                <span className="favorite-swatch" style={{ backgroundColor: item.swatch }}></span>
                <span className="favorite-meta">
                  <span className="favorite-name">{item.label}</span>
                  <span className="favorite-code">{item.code}</span>
                </span>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => item.type === "color" ? onRemoveColor(item.id) : item.type === "custom-color" ? onRemoveCustomColor(item.id) : item.type === "custom-palette" ? onRemoveCustomPalette(item.id) : onRemovePalette(item.id)}
                  aria-label={`Remove ${item.label} from favorites`}
                >
                  ×
                </button>
                {item.palette && <span className="favorite-export-actions"><button type="button" className="favorite-export-btn" onClick={() => onExportPalette(item.palette, "png")} aria-label={`Export ${item.label} as PNG`}>PNG</button><button type="button" className="favorite-export-btn" onClick={() => onExportPalette(item.palette, "pdf")} aria-label={`Export ${item.label} as PDF`}>PDF</button></span>}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state favorites-empty-state">
            No saved colors yet. Tap a heart to build your palette.
          </div>
        )}
      </div>
    </section>
  );
}

function getColorHex(colorId) {
  if (typeof colorId === "string" && /^#[0-9a-f]{6}$/i.test(colorId)) return colorId.toUpperCase();
  const color = COLOR_LIBRARY.find((entry) => entry.id === colorId);
  return color ? color.hex : "#D9D9D9";
}

function getRgbLabel(hex) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${r}, ${g}, ${b})`;
}

function getHslLabel(hex) {
  const { h, s, l } = hexToHsl(hex);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function AuthModal({ onClose, onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const isLogin = mode === "login";
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`${API_BASE}/api/auth/${isLogin ? "login" : "register"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to authenticate.");

      writeStored(AUTH_TOKEN_KEY, data.token);
      writeStored(AUTH_USER_KEY, data.user);
      onAuthenticated(data.token, data.user);
      onClose();
    } catch (requestError) {
      setError(requestError.message || "Unable to reach the API.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close auth-modal-close" onClick={onClose} aria-label="Close sign in dialog">×</button>
        <p className="eyebrow">Your color archive</p>
        <h2 id="auth-modal-title">{mode === "login" ? "Welcome back" : "Create your account"}</h2>
        <div className="auth-tabs" role="tablist" aria-label="Account access">
          <button type="button" className={mode === "login" ? "active" : ""} onClick={() => { setMode("login"); setError(""); }} role="tab" aria-selected={mode === "login"}>Sign In</button>
          <button type="button" className={mode === "register" ? "active" : ""} onClick={() => { setMode("register"); setError(""); }} role="tab" aria-selected={mode === "register"}>Sign Up</button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <label>Name<input type="text" value={name} onChange={(event) => setName(event.target.value)} required minLength="2" autoComplete="name" /></label>
          )}
          <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label>
          <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength="8" autoComplete={mode === "login" ? "current-password" : "new-password"} /></label>
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button type="submit" className="primary-btn auth-submit" disabled={isSubmitting}>{isSubmitting ? "Working..." : mode === "login" ? "Sign In" : "Create Account"}</button>
        </form>
      </section>
    </div>
  );
}

function App() {
  const [activeView, setActiveView] = useState("gallery");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [galleryQuery, setGalleryQuery] = useState("");
  const [paletteQuery, setPaletteQuery] = useState("");
  const [paletteCategory, setPaletteCategory] = useState("All");
  const [paletteMode, setPaletteMode] = useState("colors");
  const [favoriteColorIds, setFavoriteColorIds] = useState(() => readStored(FAVORITES_KEY, []));
  const [favoritePaletteIds, setFavoritePaletteIds] = useState(() => readStored(FAVORITES_KEY_PALETTES, []));
  const [customFavorites, setCustomFavorites] = useState(() => readStored(CUSTOM_FAVORITES_KEY, []));
  const [customPaletteFavorites, setCustomPaletteFavorites] = useState(() => readStored(CUSTOM_PALETTE_FAVORITES_KEY, []));
  const [statusMessage, setStatusMessage] = useState("");
  const [selectedHarmonyBase, setSelectedHarmonyBase] = useState("majorelle-blue");
  const [harmonyRule, setHarmonyRule] = useState("Complementary");
  const [customHarmonyHex, setCustomHarmonyHex] = useState(getColorHex("majorelle-blue"));
  const [harmonyHexDraft, setHarmonyHexDraft] = useState(getColorHex("majorelle-blue"));
  const [harmonyHsl, setHarmonyHsl] = useState(() => hexToHsl(getColorHex("majorelle-blue")));
  const [lockedHarmonyColors, setLockedHarmonyColors] = useState([]);
  const [selectedCity, setSelectedCity] = useState(CITY_PALETTES[0]);
  const [componentTemplate, setComponentTemplate] = useState("hero");
  const [isCanvasDark, setIsCanvasDark] = useState(false);
  const [colorVisionMode, setColorVisionMode] = useState("");
  const [imagePalette, setImagePalette] = useState(null);
  const [imageName, setImageName] = useState("");
  const [isImageDragging, setIsImageDragging] = useState(false);
  const [imageError, setImageError] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [copiedColorId, setCopiedColorId] = useState(null);
  const [authToken, setAuthToken] = useState(() => readStored(AUTH_TOKEN_KEY, ""));
  const [currentUser, setCurrentUser] = useState(() => readStored(AUTH_USER_KEY, null));
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const storedTheme = readStored("chicos-theme", "");
    if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  function navigateTo(view) {
    setActiveView(view);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    writeStored(FAVORITES_KEY, favoriteColorIds);
  }, [favoriteColorIds]);

  useEffect(() => {
    writeStored(FAVORITES_KEY_PALETTES, favoritePaletteIds);
  }, [favoritePaletteIds]);

  useEffect(() => {
    writeStored(CUSTOM_FAVORITES_KEY, customFavorites);
  }, [customFavorites]);

  useEffect(() => {
    writeStored(CUSTOM_PALETTE_FAVORITES_KEY, customPaletteFavorites);
  }, [customPaletteFavorites]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writeStored("chicos-theme", theme);
  }, [theme]);

  function applyServerFavorites(favorites = []) {
    setFavoriteColorIds(favorites.filter((favorite) => favorite.type === "color").map((favorite) => favorite.itemId));
    setFavoritePaletteIds(favorites.filter((favorite) => favorite.type === "palette").map((favorite) => favorite.itemId));
    setCustomFavorites(favorites.filter((favorite) => favorite.type === "color" && !COLOR_LIBRARY.some((color) => color.id === favorite.itemId)).map((favorite) => ({ id: favorite.itemId, name: favorite.name || "Custom harmony color", hex: favorite.hex || "#D9D9D9" })));
    setCustomPaletteFavorites(favorites.filter((favorite) => favorite.type === "palette" && !ALL_PALETTES.some((palette) => palette.id === favorite.itemId)).map((favorite) => {
      const city = CITY_PALETTES.find((entry) => entry.id === favorite.itemId);
      if (city) return { id: city.id, name: city.name, colors: city.colors };
      if (favorite.colors?.length) return { id: favorite.itemId, name: favorite.name || "Saved palette", colors: favorite.colors };
      if (favorite.itemId === "image-extract" && imagePalette) return imagePalette;
      return customPaletteFavorites.find((palette) => palette.id === favorite.itemId) || null;
    }).filter(Boolean));
  }

  useEffect(() => {
    if (!authToken) return undefined;
    let cancelled = false;

    fetch(`${API_BASE}/api/auth/me`, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Session expired.");
        if (cancelled) return;
        setCurrentUser(data.user);
        writeStored(AUTH_USER_KEY, data.user);
        applyServerFavorites(data.user.favorites);
      })
      .catch(() => {
        if (cancelled) return;
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        setAuthToken("");
        setCurrentUser(null);
      });

    return () => { cancelled = true; };
  }, [authToken]);

  const favoriteColors = useMemo(() => COLOR_LIBRARY.filter((color) => favoriteColorIds.includes(color.id)), [favoriteColorIds]);
  const favoritePalettes = useMemo(() => ALL_PALETTES.filter((palette) => favoritePaletteIds.includes(palette.id)), [favoritePaletteIds]);

  const featuredColors = useMemo(() => {
    const query = galleryQuery.trim().toLowerCase();
    if (!query) return FEATURED_COLORS;
    return FEATURED_COLORS.filter((color) => `${color.name} ${color.location} ${color.tag} ${color.hex}`.toLowerCase().includes(query));
  }, [galleryQuery]);

  const featuredPalettes = useMemo(() => FEATURED_PALETTES.filter((palette) => {
    const query = paletteQuery.trim().toLowerCase();
    if (!query) return true;
    return `${palette.name} ${palette.description} ${palette.category}`.toLowerCase().includes(query);
  }).slice(0, 3), [paletteQuery]);

  const filteredPalettes = useMemo(() => {
    const query = normalizeSearchText(paletteQuery);
    return ALL_PALETTES.filter((palette) => {
      const categoryMatch = paletteCategory === "All" || palette.category === paletteCategory;
      return categoryMatch && matchesColorSearch(getPaletteSearchText(palette), query);
    });
  }, [paletteCategory, paletteQuery]);

  const filteredPaletteColors = useMemo(() => {
    const query = normalizeSearchText(paletteQuery);
    return COLOR_LIBRARY.filter((color) => {
      const categoryMatch = paletteCategory === "All" || color.tag === paletteCategory;
      return categoryMatch && matchesColorSearch(getColorSearchText(color), query);
    });
  }, [paletteCategory, paletteQuery]);

  const harmonyColors = useMemo(() => {
    const generated = buildHarmony(customHarmonyHex, harmonyRule);
    return generated.map((colorHex, index) => lockedHarmonyColors[index] || colorHex);
  }, [customHarmonyHex, harmonyRule, lockedHarmonyColors]);

  const simulatedHarmonyColors = useMemo(() => harmonyColors.map((hex) => simulateColorBlindness(hex, colorVisionMode)), [harmonyColors, colorVisionMode]);

  const harmonyContrast = useMemo(() => {
    const background = isCanvasDark ? "#111820" : simulatedHarmonyColors[0];
    const text = getReadableTextColor(background);
    return { background, text, ratio: getContrastRatio(background, text) };
  }, [simulatedHarmonyColors, isCanvasDark]);

  async function toggleFavoriteOnServer(favorite, label) {
    try {
      const response = await fetch(`${API_BASE}/api/auth/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
        body: JSON.stringify(favorite)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to update favorite.");
      applyServerFavorites(data.favorites);
      setStatusMessage(data.added ? `${label} saved to your account.` : `${label} removed from your account.`);
    } catch (error) {
      setStatusMessage(error.message || "Unable to sync favorite.");
    }
  }

  function toggleColorFavorite(id) {
    const color = COLOR_LIBRARY.find((entry) => entry.id === id);
    if (authToken) {
      toggleFavoriteOnServer({ type: "color", itemId: id, name: color.name, hex: color.hex }, color.name);
      return;
    }
    setFavoriteColorIds((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      setStatusMessage(next.includes(id) ? `${color.name} saved to favorites.` : `${color.name} removed from favorites.`);
      return next;
    });
  }

  function togglePaletteFavorite(id) {
    const palette = ALL_PALETTES.find((entry) => entry.id === id);
    if (!palette) {
      setStatusMessage("That palette is no longer available.");
      return;
    }
    if (authToken) {
      toggleFavoriteOnServer({ type: "palette", itemId: id, name: palette.name, colors: getPaletteHexes(palette) }, palette.name);
      return;
    }
    setFavoritePaletteIds((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      setStatusMessage(next.includes(id) ? `${palette.name} saved to favorites.` : `${palette.name} removed from favorites.`);
      return next;
    });
  }

  function handleAuthenticated(token, user) {
    setAuthToken(token);
    setCurrentUser(user);
    applyServerFavorites(user.favorites);
  }

  function handleLogout() {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    } catch (error) {
    }
    setAuthToken("");
    setCurrentUser(null);
    setStatusMessage("You have been signed out.");
  }

  function removeCustomFavorite(id) {
    const favorite = customFavorites.find((item) => item.id === id);
    if (favorite) toggleCustomFavorite(favorite.hex, favorite.name);
  }

  function toggleCityFavorite(city = selectedCity) {
    if (!city) return;
    const exists = customPaletteFavorites.some((favorite) => favorite.id === city.id);
    setCustomPaletteFavorites((current) => exists ? current.filter((favorite) => favorite.id !== city.id) : [...current, city]);
    if (authToken) {
      toggleFavoriteOnServer({ type: "palette", itemId: city.id, name: city.name, colors: getPaletteHexes(city) }, city.name);
    } else {
      setStatusMessage(exists ? `${city.name} removed from favorites.` : `${city.name} saved to favorites.`);
    }
  }

  function removeCustomPaletteFavorite(id) {
    const palette = customPaletteFavorites.find((item) => item.id === id);
    if (!palette) return;
    toggleCityFavorite(palette);
  }

  async function copyPaletteHexes(palette) {
    const allHex = getPaletteHexes(palette).join(" • ");
    try {
      await navigator.clipboard.writeText(allHex);
      setStatusMessage(`${palette.name} hex codes copied.`);
    } catch (error) {
      setStatusMessage("Clipboard access is unavailable in this browser.");
    }
  }

  async function copyColorHex(color) {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopiedColorId(color.id);
      setStatusMessage(`${color.name} HEX code copied.`);
      window.setTimeout(() => setCopiedColorId(null), 1600);
    } catch (error) {
      setStatusMessage("Clipboard access is unavailable in this browser.");
    }
  }

  function updateHarmonyBase(colorId) {
    setSelectedHarmonyBase(colorId);
    setCustomHarmonyHex(getColorHex(colorId));
    setHarmonyHexDraft(getColorHex(colorId));
    setHarmonyHsl(hexToHsl(getColorHex(colorId)));
  }

  function applyAssistantHarmony(hex) {
    setSelectedHarmonyBase("assistant-custom");
    setCustomHarmonyHex(hex);
    setHarmonyHexDraft(hex);
    setHarmonyHsl(hexToHsl(hex));
    setActiveView("builder");
    setStatusMessage(`${hex} applied to Harmony Builder.`);
  }

  function updateCustomHarmonyHex(value) {
    const normalized = value.startsWith("#") ? value : `#${value}`;
    setHarmonyHexDraft(normalized.slice(0, 7).toUpperCase());
    if (/^#[0-9a-f]{6}$/i.test(normalized)) {
      const nextHex = normalized.toUpperCase();
      setCustomHarmonyHex(nextHex);
      setHarmonyHsl(hexToHsl(nextHex));
    }
  }

  function updateHarmonyHsl(channel, value) {
    const nextHsl = { ...harmonyHsl, [channel]: Number(value) };
    const nextHex = hslToHex(nextHsl.h, nextHsl.s, nextHsl.l);
    setHarmonyHsl(nextHsl);
    setCustomHarmonyHex(nextHex);
    setHarmonyHexDraft(nextHex);
  }

  function toggleCustomFavorite(colorHex, label = "Harmony color") {
    const item = { id: `harmony-${colorHex.slice(1).toLowerCase()}`, name: label, hex: colorHex };
    const exists = customFavorites.some((favorite) => favorite.id === item.id);
    setCustomFavorites((current) => exists ? current.filter((favorite) => favorite.id !== item.id) : [...current, item]);
    if (authToken) {
      toggleFavoriteOnServer({ type: "color", itemId: item.id, name: item.name, hex: item.hex }, item.name);
    } else {
      setStatusMessage(exists ? `${label} removed from favorites.` : `${label} saved to favorites.`);
    }
  }

  function toggleHarmonyLock(index) {
    setLockedHarmonyColors((current) => {
      const next = [...current];
      next[index] = next[index] ? null : harmonyColors[index];
      return next;
    });
  }

  async function copyHarmonyVariables() {
    const variables = harmonyColors.map((colorHex, index) => `  --chico-harmony-${index + 1}: ${colorHex};`).join("\n");
    try {
      await navigator.clipboard.writeText(`:root {\n${variables}\n}`);
      setStatusMessage("Harmony CSS variables copied.");
    } catch (error) {
      setStatusMessage("Clipboard access is unavailable in this browser.");
    }
  }

  async function exportHarmony(format) {
    const payload = {
      name: `${harmonyRule} harmony`,
      rule: harmonyRule,
      colors: harmonyColors
    };
    if (format === "png") {
      exportHarmonyPng();
      return;
    }
    const content = format === "tailwind"
      ? `colors: {\n${harmonyColors.map((hex, index) => `  harmony-${index + 1}: "${hex}",`).join("\n")}\n}`
      : format === "css"
        ? `:root {\n${harmonyColors.map((hex, index) => `  --chico-harmony-${index + 1}: ${hex};`).join("\n")}\n}`
        : format === "figma"
          ? JSON.stringify({ name: `${harmonyRule} harmony`, colors: harmonyColors.map((hex, index) => ({ name: `harmony-${index + 1}`, value: hex })) }, null, 2)
          : format === "css-root"
            ? `:root {\n${harmonyColors.map((hex, index) => `  --chico-harmony-${index + 1}: ${hex};`).join("\n")}\n}`
        : JSON.stringify(payload, null, 2);
    try {
      await navigator.clipboard.writeText(content);
      setStatusMessage(`${format === "tailwind" ? "Tailwind" : format === "css" ? "CSS variables" : "JSON"} export copied.`);
    } catch (error) {
      setStatusMessage("Clipboard access is unavailable in this browser.");
    }
  }

  function exportHarmonyPng() {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 520;
    const context = canvas.getContext("2d");
    context.fillStyle = "#faf8f5";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#172b31";
    context.font = "700 34px sans-serif";
    context.fillText(`${harmonyRule} harmony`, 56, 72);
    context.font = "500 18px sans-serif";
    context.fillText("Chico's Colors", 56, 106);
    const swatchWidth = 208;
    harmonyColors.forEach((hex, index) => {
      const x = 56 + index * (swatchWidth + 12);
      context.fillStyle = hex;
      context.fillRect(x, 150, swatchWidth, 250);
      context.fillStyle = getReadableTextColor(hex);
      context.font = "700 18px sans-serif";
      context.fillText(hex, x + 18, 374);
    });
    const link = document.createElement("a");
    link.download = `chicos-colors-${harmonyRule.toLowerCase()}-harmony.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setStatusMessage("PNG palette card downloaded.");
  }

  function exportBrandCard(palette, format = "png") {
    const hexes = getPaletteHexes(palette);
    if (format === "png") {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 620;
      const context = canvas.getContext("2d");
      context.fillStyle = "#faf8f5";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#172b31";
      context.font = "700 42px sans-serif";
      context.fillText(palette.name || "Chico's Colors", 64, 82);
      context.font = "500 20px sans-serif";
      context.fillText("Brand color card", 64, 120);
      const width = (canvas.width - 128 - (hexes.length - 1) * 14) / hexes.length;
      hexes.forEach((hex, index) => {
        const x = 64 + index * (width + 14);
        context.fillStyle = hex;
        context.fillRect(x, 170, width, 300);
        context.fillStyle = getReadableTextColor(hex);
        context.font = "700 18px sans-serif";
        context.fillText(hex, x + 14, 442);
      });
      const link = document.createElement("a");
      link.download = `${(palette.name || "chicos-colors-brand-card").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setStatusMessage("Brand card PNG downloaded.");
      return;
    }

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) {
      setStatusMessage("Allow pop-ups to export a PDF brand card.");
      return;
    }
    printWindow.document.write(`<title>${palette.name || "Chico's Colors"} brand card</title><style>body{margin:0;padding:48px;font-family:Arial,sans-serif;color:#172b31}h1{font-size:36px;margin:0 0 8px}.sub{color:#5e6d72;margin-bottom:32px}.swatches{display:grid;grid-template-columns:repeat(${hexes.length},1fr);gap:12px}.swatch{height:300px;padding:16px;display:flex;align-items:flex-end;font-weight:700;box-sizing:border-box}</style><h1>${palette.name || "Chico's Colors"}</h1><div class="sub">Brand color card</div><div class="swatches">${hexes.map((hex) => `<div class="swatch" style="background:${hex};color:${getReadableTextColor(hex)}">${hex}</div>`).join("")}</div>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    setStatusMessage("PDF print dialog opened for the brand card.");
  }

  function saveExtractedPalette() {
    if (!imagePalette) return;
    const item = { id: imagePalette.id, name: imagePalette.name, colors: imagePalette.colors };
    const exists = customPaletteFavorites.some((favorite) => favorite.id === item.id);
    if (exists) return;
    setCustomPaletteFavorites((current) => [...current, item]);
    if (authToken) {
      toggleFavoriteOnServer({ type: "palette", itemId: item.id, name: item.name, colors: item.colors }, item.name);
    } else {
      setStatusMessage("Extracted palette saved to favorites.");
    }
  }

  async function exportPalette(palette, format) {
    if (!format) return;
    try {
      await navigator.clipboard.writeText(getPaletteExport(palette, format));
      const formatLabel = format === "hex" ? "HEX array" : format === "tailwind" ? "Tailwind CSS Config" : format === "figma" ? "Figma JSON Tokens" : "CSS Root Variables";
      setStatusMessage(`${palette.name} ${formatLabel} copied.`);
    } catch (error) {
      setStatusMessage("Clipboard access is unavailable in this browser.");
    }
  }

  function extractImagePalette(file) {
    if (!file || !file.type.startsWith("image/")) {
      setImageError("Choose an image file to extract colors.");
      return;
    }

    setImageError("");
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const size = 120;
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        context.drawImage(image, 0, 0, size, size);
        const pixels = context.getImageData(0, 0, size, size).data;
        const buckets = new Map();

        for (let index = 0; index < pixels.length; index += 16) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const alpha = pixels[index + 3];
          if (alpha < 180) continue;
          const key = `${Math.round(red / 24) * 24},${Math.round(green / 24) * 24},${Math.round(blue / 24) * 24}`;
          buckets.set(key, (buckets.get(key) || 0) + 1);
        }

        const colors = [...buckets.entries()]
          .sort((first, second) => second[1] - first[1])
          .slice(0, 5)
          .map(([key]) => {
            const [red, green, blue] = key.split(",").map(Number);
            return rgbToHex(red, green, blue);
          });
        while (colors.length < 5) colors.push(colors[colors.length - 1] || "#D9D9D9");
        setImageName(file.name);
        setImagePalette({ id: "image-extract", name: "Extracted Palette", colors, description: `Five dominant colors sampled from ${file.name}.` });
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    if (!selectedColor) return undefined;

    function handleEscape(event) {
      if (event.key === "Escape") setSelectedColor(null);
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedColor]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container nav-row">
          <a className="brand" href="#top" onClick={() => navigateTo("gallery")}>
            <span className="brand-mark">C</span>
            <span className="brand-name">Chico's <span>Colors</span></span>
          </a>

          <div className="header-actions">
            <label className="header-search">
              <span aria-hidden="true">⌕</span>
              <input type="search" value={galleryQuery} onChange={(event) => setGalleryQuery(event.target.value)} placeholder="Search" aria-label="Search colors" />
            </label>
            <button type="button" className="cart-btn" aria-label="Color cart" title="Color cart">&#128722;<span>0</span></button>
            <button type="button" className="theme-toggle" onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>{theme === "dark" ? "☼" : "◐"}</button>
            <button type="button" className="menu-toggle" aria-expanded={isMenuOpen} aria-controls="main-navigation" onClick={() => setIsMenuOpen((isOpen) => !isOpen)}>
              <span className="menu-toggle-icon" aria-hidden="true"><i></i><i></i><i></i></span>
              <span className="sr-only">Menu</span>
            </button>
          </div>

          <nav id="main-navigation" className={`nav-links ${isMenuOpen ? "is-open" : ""}`} aria-label="Main nav">
            <button type="button" className={`nav-link-btn ${activeView === "gallery" ? "active" : ""}`} onClick={() => navigateTo("gallery")}>Home</button>
            <button type="button" className={`nav-link-btn ${activeView === "palettes" ? "active" : ""}`} onClick={() => navigateTo("palettes")}>Palettes</button>
            <button type="button" className={`nav-link-btn ${activeView === "builder" ? "active" : ""}`} onClick={() => navigateTo("builder")}>Harmony Builder</button>
            <button type="button" className={`nav-link-btn ${activeView === "extract" ? "active" : ""}`} onClick={() => navigateTo("extract")}>Extract from Image</button>
            <button type="button" className={`nav-link-btn ${activeView === "assistant" ? "active" : ""}`} onClick={() => navigateTo("assistant")}>AI Assistant</button>
          </nav>
          {currentUser ? (
            <button type="button" className="account-btn" onClick={handleLogout} title="Sign out">{currentUser.name} · Sign out</button>
          ) : (
            <button type="button" className="account-btn" onClick={() => setIsAuthModalOpen(true)}>Sign In</button>
          )}
        </div>
      </header>

      <main>
        {activeView === "gallery" && (
          <>
            <section className="hero">
              <MoroccanPattern className="hero-pattern" />
              <div className="container hero-grid">
                <div>
                  <p className="eyebrow">Moroccan color stories</p>
                  <h1>Discover colors <em>inspired by Morocco.</em></h1>
                  <p className="hero-copy">
                    A modern color library for thoughtful design, shaped by Atlantic light, desert warmth, garden blues, and the geometry of handmade craft.
                  </p>
                  <div className="cta-row">
                    <button type="button" className="primary-btn" onClick={() => setActiveView("palettes")}>Explore palettes</button>
                    <button type="button" className="secondary-btn" onClick={() => setActiveView("builder")}>Create harmony</button>
                  </div>
                  <div className="stats">
                    <div className="stat-box">
                      <strong>{FEATURED_COLORS.length}</strong>
                      <span>curated shades</span>
                    </div>
                    <div className="stat-box">
                      <strong>{PALETTE_LIBRARY.length}</strong>
                      <span>palette stories</span>
                    </div>
                    <div className="stat-box">
                      <strong>{favoriteColorIds.length + favoritePaletteIds.length}</strong>
                      <span>saved picks</span>
                    </div>
                  </div>
                </div>

                <div className="hero-panel" aria-label="Featured palette preview">
                  <div className="panel-grid">
                    {COLOR_LIBRARY.slice(0, 5).map((color) => (
                      <div key={color.id} className="panel-swatch" style={{ backgroundColor: color.hex }} title={`${color.name}: ${color.hex}`} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="container story-grid" aria-label="Color inspiration">
              <article className="story-card">
                <h3>Sunrise warmth</h3>
                <p>Sun-baked ochres and saffron tones create calm but vibrant interiors.</p>
              </article>
              <article className="story-card">
                <h3>Ocean calm</h3>
                <p>Teal, blue, and misty aqua tones bring air, reflection, and balance.</p>
              </article>
              <article className="story-card">
                <h3>Earthy rhythm</h3>
                <p>Clay, olive, and stone tones ground the app in craft and depth.</p>
              </article>
            </section>

            <section className="gallery-section" id="gallery">
              <div className="container">
                <div className="section-heading">
                  <h2>Color gallery</h2>
                  <span className="section-meta">{featuredColors.length} featured shades</span>
                </div>

                <SearchBar query={galleryQuery} onChange={setGalleryQuery} placeholder="Search colors, tags, or locations..." />

                {featuredColors.length ? (
                  <div className="color-grid">
                    {featuredColors.map((color) => (
                      <ColorCard
                        key={color.id}
                        color={color}
                        isFavorite={favoriteColorIds.includes(color.id)}
                        onToggle={toggleColorFavorite}
                        onCopy={copyColorHex}
                        onOpen={setSelectedColor}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">No shades match this search. Try another location, tag, or color value.</div>
                )}
              </div>
            </section>

            <section className="moroccan-colors-section" aria-labelledby="moroccan-colors-title">
              <MoroccanPattern className="section-pattern" />
              <div className="container">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">A considered palette</p>
                    <h2 id="moroccan-colors-title">Moroccan Colors</h2>
                  </div>
                  <span className="section-meta">Inspired, not prescribed</span>
                </div>
                <p className="moroccan-intro">A focused collection of shades interpreted from Morocco's light, landscapes, materials, and everyday color stories.</p>
                <div className="color-grid moroccan-color-grid">
                  {MOROCCAN_COLORS.map((color) => (
                    <ColorCard key={color.id} color={color} isFavorite={favoriteColorIds.includes(color.id)} onToggle={toggleColorFavorite} onCopy={copyColorHex} onOpen={setSelectedColor} />
                  ))}
                </div>
              </div>
            </section>

            <section className="container" aria-label="Featured palettes preview">
              <div className="section-heading">
                <h2>Featured palettes</h2>
                <span className="section-meta">3 curated stories</span>
              </div>

              <div className="featured-grid">
                {featuredPalettes.map((palette) => (
                  <article className="featured-card" key={palette.id}>
                    <div className="featured-card-top">
                      <h3>{palette.name}</h3>
                      <span className="featured-category">{palette.category}</span>
                    </div>
                    <div className="featured-swatches">
                      {palette.colors.map((colorId) => (
                        <div key={`${palette.id}-${colorId}`} className="featured-swatch" style={{ backgroundColor: getColorHex(colorId) }} />
                      ))}
                    </div>
                    <div className="featured-meta">
                      <span className="featured-text">{palette.description}</span>
                      <div className="featured-actions">
                        <label className="export-control"><span>Export</span><select defaultValue="" onChange={(event) => { exportPalette(palette, event.target.value); event.target.value = ""; }} aria-label={`Export ${palette.name}`}><option value="" disabled>Choose format</option><option value="hex">HEX array</option><option value="tailwind">Tailwind CSS Config</option><option value="figma">Figma JSON Tokens</option><option value="css-root">CSS Root Variables</option></select></label>
                        <button
                          type="button"
                          className={`featured-heart ${favoritePaletteIds.includes(palette.id) ? "is-active" : ""}`}
                          onClick={() => togglePaletteFavorite(palette.id)}
                          aria-label={`${favoritePaletteIds.includes(palette.id) ? "Remove" : "Add"} ${palette.name} from favorites`}
                        >
                          {favoritePaletteIds.includes(palette.id) ? "♥" : "♡"}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {activeView === "palettes" && (
          <section className="palette-section" id="palettes">
            <div className="container">
              <div className="section-heading">
                <h2>Palettes</h2>
                <span className="section-meta">{filteredPaletteColors.length} colors · {filteredPalettes.length} collections</span>
              </div>

              <div className="palette-view-tabs" role="tablist" aria-label="Palette page views">
                <button type="button" className={paletteMode === "colors" ? "active" : ""} onClick={() => setPaletteMode("colors")} role="tab" aria-selected={paletteMode === "colors"}>Single Colors</button>
                <button type="button" className={paletteMode === "palettes" ? "active" : ""} onClick={() => setPaletteMode("palettes")} role="tab" aria-selected={paletteMode === "palettes"}>Color Palettes</button>
              </div>

              <SearchBar query={paletteQuery} onChange={setPaletteQuery} placeholder="Search colors, palettes, or moods..." />

              <div className="filter-pills" aria-label="Color and palette category filters">
                {CATEGORY_OPTIONS.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`filter-pill ${paletteCategory === category ? "active" : ""}`}
                    onClick={() => setPaletteCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {paletteMode === "colors" && <section className="palette-color-library" aria-labelledby="full-color-library-title">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">Complete collection</p>
                    <h3 id="full-color-library-title">Every color</h3>
                  </div>
                  <span className="section-meta">{filteredPaletteColors.length} shades</span>
                </div>
                {filteredPaletteColors.length ? (
                  <div className="color-grid">
                    {filteredPaletteColors.map((color) => (
                      <ColorCard
                        key={color.id}
                        color={color}
                        isFavorite={favoriteColorIds.includes(color.id)}
                        onToggle={toggleColorFavorite}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">No colors match this category or search.</div>
                )}
              </section>}

              {paletteMode === "palettes" && filteredPalettes.length ? (
                <div className="palette-list">
                  {filteredPalettes.map((palette) => (
                    <article className="palette-card" key={palette.id}>
                      <div className="palette-card-head">
                        <div>
                          <h3>{palette.name}</h3>
                          <span className="palette-category">{palette.category}</span>
                        </div>
                        <button
                          type="button"
                          className={`palette-heart ${favoritePaletteIds.includes(palette.id) ? "is-active" : ""}`}
                          aria-label={`${favoritePaletteIds.includes(palette.id) ? "Remove" : "Add"} ${palette.name} from favorites`}
                          onClick={() => togglePaletteFavorite(palette.id)}
                        >
                          {favoritePaletteIds.includes(palette.id) ? "♥" : "♡"}
                        </button>
                      </div>

                      <p className="palette-desc">{palette.description}</p>

                      <div className="palette-swatch-grid">
                        {palette.colors.map((colorId) => {
                          const color = COLOR_LIBRARY.find((entry) => entry.id === colorId);
                          return (
                            <button
                              key={`${palette.id}-${colorId}`}
                              type="button"
                              className={`palette-swatch${selectedColor?.id === color.id ? " is-selected" : ""}`}
                              style={{ backgroundColor: color.hex }}
                              onClick={() => setSelectedColor(color)}
                              aria-label={`View details for ${color.name}, ${color.hex}`}
                            >
                              <span className="palette-swatch-label">{color.name.split(" ")[0]}</span>
                              {copiedColorId === color.id && <span className="swatch-feedback">Copied!</span>}
                            </button>
                          );
                        })}
                      </div>

                      <div className="palette-actions">
                        <button type="button" className="copy-btn" onClick={() => copyPaletteHexes(palette)}>Copy All Hex Codes</button>
                        <label className="export-control">
                          <span>Export</span>
                          <select defaultValue="" onChange={(event) => { exportPalette(palette, event.target.value); event.target.value = ""; }} aria-label={`Export ${palette.name}`}>
                            <option value="" disabled>Choose format</option>
                            <option value="hex">HEX array</option>
                            <option value="tailwind">Tailwind CSS Config</option>
                            <option value="figma">Figma JSON Tokens</option>
                            <option value="css-root">CSS Root Variables</option>
                          </select>
                        </label>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state">No palettes match this filter.</div>
              )}
            </div>
          </section>
        )}

        {activeView === "assistant" && <AIColorAssistant onApplyHarmony={applyAssistantHarmony} />}

        {activeView === "builder" && (
          <section className="builder-section">
            <div className="container">
              <div className="section-heading">
                <h2>Harmony Builder</h2>
                <span className="section-meta">Generate modern pairings</span>
              </div>

              <div className="harmony-controls">
                <label className="harmony-control">
                  <span>Base color</span>
                  <select
                  className="harmony-select"
                  value={selectedHarmonyBase}
                  onChange={(event) => updateHarmonyBase(event.target.value)}
                  aria-label="Choose a base color"
                  >
                    {COLOR_LIBRARY.map((color) => (
                      <option key={color.id} value={color.id}>{color.name}</option>
                    ))}
                  </select>
                </label>
                <label className="harmony-control">
                  <span>Harmony rule</span>
                  <select className="harmony-select" value={harmonyRule} onChange={(event) => setHarmonyRule(event.target.value)} aria-label="Choose a harmony rule">
                    {['Complementary', 'Analogous', 'Triadic', 'Monochromatic'].map((rule) => <option key={rule} value={rule}>{rule}</option>)}
                  </select>
                </label>
                <label className="harmony-control harmony-hex-control">
                  <span>Custom HEX</span>
                  <input className="harmony-hex-input" type="text" value={harmonyHexDraft} onChange={(event) => updateCustomHarmonyHex(event.target.value)} onBlur={() => setHarmonyHexDraft(customHarmonyHex)} aria-label="Enter custom HEX color" />
                </label>
                <input className="harmony-color-picker" type="color" value={customHarmonyHex} onChange={(event) => updateCustomHarmonyHex(event.target.value)} aria-label="Pick a custom harmony color" />
                <div className="hsl-controls" aria-label="Fine tune HSL color values">
                  {[["h", "Hue", 360], ["s", "Saturation", 100], ["l", "Lightness", 100]].map(([channel, label, max]) => (
                    <label className="hsl-control" key={channel}>
                      <span>{label} <strong>{harmonyHsl[channel]}</strong></span>
                      <input type="range" min="0" max={max} value={harmonyHsl[channel]} onChange={(event) => updateHarmonyHsl(channel, event.target.value)} aria-label={label} />
                    </label>
                  ))}
                </div>
                <button type="button" className="ghost-btn" onClick={() => updateHarmonyBase(COLOR_LIBRARY[Math.floor(Math.random() * COLOR_LIBRARY.length)].id)}>
                  Shuffle unlocked
                </button>
              </div>

              <div className="city-generator">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">Place-based palettes</p>
                    <h3>Moroccan City Generator</h3>
                  </div>
                  <span className="section-meta">{selectedCity.region}</span>
                </div>
                <div className="city-options">
                  {CITY_PALETTES.map((city) => (
                    <button key={city.id} type="button" className={`city-option ${selectedCity.id === city.id ? "active" : ""}`} onClick={() => setSelectedCity(city)}>
                      <span className="city-option-swatch" style={{ background: `linear-gradient(135deg, ${city.colors[0]} 0 50%, ${city.colors[2]} 50%)` }}></span>
                      <span><strong>{city.name}</strong><small>{city.region}</small></span>
                    </button>
                  ))}
                </div>
                <div className="city-result">
                  <div>
                    <h4>{selectedCity.name}</h4>
                    <p>{selectedCity.context}</p>
                    <div className="city-tags">{selectedCity.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
                  </div>
                  <div className="city-swatches">
                    {selectedCity.colors.map((hex) => <button key={hex} type="button" title={`${hex} - Click to copy`} onClick={() => copyColorHex({ id: `city-${hex}`, name: selectedCity.name, hex })} style={{ backgroundColor: hex }} />)}
                      <button type="button" className={`city-favorite${customPaletteFavorites.some((favorite) => favorite.id === selectedCity.id) ? " is-active" : ""}`} onClick={() => toggleCityFavorite()} aria-label={`${customPaletteFavorites.some((favorite) => favorite.id === selectedCity.id) ? "Remove" : "Add"} ${selectedCity.name} from favorites`}>♥</button>
                  </div>
                </div>
              </div>

              <div className="harmony-grid">
                <article className="harmony-card">
                  <div className="harmony-card-heading">
                    <div>
                      <p className="eyebrow">{harmonyRule} harmony</p>
                      <h3>{COLOR_LIBRARY.find((color) => color.id === selectedHarmonyBase)?.name || "Custom color"}</h3>
                    </div>
                    <div className="harmony-card-actions">
                      <button type="button" className="copy-btn" onClick={copyHarmonyVariables}>Copy CSS</button>
                      <button type="button" className="small-button" onClick={() => exportBrandCard({ name: `${harmonyRule} Harmony`, colors: harmonyColors }, "png")}>Brand PNG</button>
                      <button type="button" className="small-button" onClick={() => exportBrandCard({ name: `${harmonyRule} Harmony`, colors: harmonyColors }, "pdf")}>Brand PDF</button>
                      <select className="export-select" defaultValue="" onChange={(event) => { if (event.target.value) exportHarmony(event.target.value); event.target.value = ""; }} aria-label="Export design system tokens">
                        <option value="" disabled>Design export</option>
                        <option value="tailwind">Tailwind CSS Config</option>
                        <option value="figma">Figma JSON Tokens</option>
                        <option value="css-root">CSS Root Variables</option>
                        <option value="json">JSON</option>
                        <option value="png">PNG image</option>
                      </select>
                    </div>
                  </div>
                  <div className="vision-control">
                    <label htmlFor="color-vision-mode">Preview color vision</label>
                    <select id="color-vision-mode" value={colorVisionMode} onChange={(event) => setColorVisionMode(event.target.value)}>
                      <option value="">Normal vision</option>
                      <option value="Protanopia">Protanopia</option>
                      <option value="Deuteranopia">Deuteranopia</option>
                      <option value="Tritanopia">Tritanopia</option>
                      <option value="Achromatopsia">Achromatopsia</option>
                    </select>
                  </div>
                  <div className="harmony-swatch-row">
                    {simulatedHarmonyColors.map((colorHex, index) => (
                      <div key={`${colorHex}-${index}`} className={`harmony-swatch${lockedHarmonyColors[index] ? " is-locked" : ""}`} role="button" tabIndex="0" style={{ backgroundColor: colorHex }} onClick={() => toggleHarmonyLock(index)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggleHarmonyLock(index); } }} title={`${colorHex} - ${lockedHarmonyColors[index] ? "Locked" : "Click to lock"}`} aria-label={`${lockedHarmonyColors[index] ? "Unlock" : "Lock"} harmony color ${index + 1}`}>
                        <span className="harmony-label">{index + 1}</span>
                        <span className="harmony-hex-label">{colorHex}</span>
                        <span className="harmony-lock">{lockedHarmonyColors[index] ? "LOCKED" : "LOCK"}</span>
                        <button type="button" className={`harmony-favorite${customFavorites.some((favorite) => favorite.id === `harmony-${colorHex.slice(1).toLowerCase()}`) ? " is-active" : ""}`} onClick={(event) => { event.stopPropagation(); toggleCustomFavorite(colorHex, `${harmonyRule} color ${index + 1}`); }} aria-label="Save generated harmony color">♥</button>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="harmony-card">
                  <div className="harmony-card-heading">
                    <div>
                      <p className="eyebrow">Live interface preview</p>
                      <h3>Component canvas</h3>
                    </div>
                    <div className="canvas-header-tools">
                      <select className="export-select" value={componentTemplate} onChange={(event) => setComponentTemplate(event.target.value)} aria-label="Choose component preview">
                        <option value="hero">Hero Section</option>
                        <option value="nav">Navigation Bar</option>
                        <option value="card">Card Component</option>
                        <option value="pricing">Pricing Table</option>
                      </select>
                      <label className="dark-mode-toggle"><input type="checkbox" checked={isCanvasDark} onChange={(event) => setIsCanvasDark(event.target.checked)} /> Dark mode</label>
                      <span className={`contrast-badge ${harmonyContrast.ratio >= 4.5 ? "pass" : "review"}`}>{getWcagLabel(harmonyContrast.ratio)}</span>
                    </div>
                  </div>
                  <div className={`preview-canvas${isCanvasDark ? " is-dark" : ""}`} style={{ backgroundColor: isCanvasDark ? "#111820" : simulatedHarmonyColors[0], color: isCanvasDark ? "#F4F0E8" : harmonyContrast.text }}>
                    {componentTemplate === "hero" && <><span className="preview-tag" style={{ backgroundColor: simulatedHarmonyColors[3], color: getReadableTextColor(simulatedHarmonyColors[3]) }}>CHICO'S COLORS</span><h4>Color with a point of view.</h4><p>Build a palette that makes every surface feel intentional, from the first glance to the final detail.</p><div className="preview-actions"><button type="button" className="preview-button" style={{ backgroundColor: simulatedHarmonyColors[1], color: getReadableTextColor(simulatedHarmonyColors[1]) }}>Explore shades</button><span className="preview-link" style={{ color: simulatedHarmonyColors[2] }}>View details →</span></div></>}
                    {componentTemplate === "nav" && <div className="component-nav"><strong>CHICO'S</strong><span>Colors</span><button type="button" style={{ backgroundColor: simulatedHarmonyColors[1], color: getReadableTextColor(simulatedHarmonyColors[1]) }}>Browse</button></div>}
                    {componentTemplate === "card" && <div className="component-card"><span className="preview-tag" style={{ backgroundColor: simulatedHarmonyColors[3], color: getReadableTextColor(simulatedHarmonyColors[3]) }}>FEATURED</span><h4>Quietly vivid.</h4><p>A compact card preview for editorial content and product moments.</p><button type="button" className="preview-button" style={{ backgroundColor: simulatedHarmonyColors[1], color: getReadableTextColor(simulatedHarmonyColors[1]) }}>Read story</button></div>}
                    {componentTemplate === "pricing" && <div className="component-pricing"><span className="preview-tag" style={{ backgroundColor: simulatedHarmonyColors[3], color: getReadableTextColor(simulatedHarmonyColors[3]) }}>STUDIO</span><h4>$24 <small>/ month</small></h4><p>Unlimited palettes and export-ready harmony tools.</p><button type="button" className="preview-button" style={{ backgroundColor: simulatedHarmonyColors[1], color: getReadableTextColor(simulatedHarmonyColors[1]) }}>Choose plan</button></div>}
                  </div>
                  <div className="contrast-note">Text on primary background: {getWcagLabel(harmonyContrast.ratio)}</div>
                </article>
              </div>
            </div>
          </section>
        )}

        {activeView === "extract" && (
          <section className="extract-section">
            <div className="container extract-container">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Palette builder</p>
                  <h2>Extract from Image</h2>
                </div>
                <span className="section-meta">5 dominant colors</span>
              </div>
              <p className="extract-intro">Drop a photograph, textile, tile, or moodboard here and turn its visual language into a usable palette.</p>
              <label className={`dropzone ${isImageDragging ? "is-dragging" : ""}`} onDragOver={(event) => { event.preventDefault(); setIsImageDragging(true); }} onDragLeave={() => setIsImageDragging(false)} onDrop={(event) => { event.preventDefault(); setIsImageDragging(false); extractImagePalette(event.dataTransfer.files[0]); }}>
                <input type="file" accept="image/*" onChange={(event) => extractImagePalette(event.target.files[0])} />
                <span className="dropzone-icon">+</span>
                <strong>Drop an image here</strong>
                <span>or browse from your device</span>
                {imageName && <small>{imageName}</small>}
              </label>
              {imageError && <p className="status">{imageError}</p>}
              {imagePalette && (
                <article className="extracted-palette">
                  <div className="section-heading">
                    <div><p className="eyebrow">Extracted result</p><h3>{imagePalette.name}</h3></div>
                    <label className="export-control"><span>Export</span><select defaultValue="" onChange={(event) => { exportPalette(imagePalette, event.target.value); event.target.value = ""; }} aria-label="Export extracted palette"><option value="" disabled>Choose format</option><option value="hex">HEX array</option><option value="tailwind">Tailwind CSS Config</option><option value="figma">Figma JSON Tokens</option><option value="css-root">CSS Root Variables</option></select></label>
                  </div>
                  <div className="extracted-swatches">{imagePalette.colors.map((hex) => <button key={hex} type="button" title={`${hex} - Click to copy`} onClick={() => copyColorHex({ id: `extract-${hex}`, name: "Extracted color", hex })} style={{ backgroundColor: hex }}><span>{hex}</span>{copiedColorId === `extract-${hex}` && <span className="swatch-feedback">Copied!</span>}</button>)}</div>
                  <button type="button" className="primary-btn extracted-save-btn" onClick={saveExtractedPalette}>{customPaletteFavorites.some((favorite) => favorite.id === imagePalette.id) ? "Saved to Favorites" : "Save Extracted Palette to Favorites"}</button>
                </article>
              )}
            </div>
          </section>
        )}

        {statusMessage && <div className="container"><p className="status" role="status">{statusMessage}</p></div>}

        {selectedColor && (
          <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelectedColor(null)}>
            <section
              className="color-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="color-modal-title"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <button type="button" className="modal-close" onClick={() => setSelectedColor(null)} aria-label="Close color details">×</button>
              <div className="modal-color-preview" style={{ backgroundColor: selectedColor.hex }}>
                <span>{selectedColor.hex}</span>
              </div>
              <p className="eyebrow">Color detail</p>
              <h2 id="color-modal-title">{selectedColor.name}</h2>
              <p className="modal-origin">Inspired by {selectedColor.location.toLowerCase()}.</p>
              <dl className="color-values">
                <div>
                  <dt>HEX</dt>
                  <dd>{selectedColor.hex}</dd>
                </div>
                <div>
                  <dt>RGB</dt>
                  <dd>{getRgbLabel(selectedColor.hex)}</dd>
                </div>
                <div>
                  <dt>HSL</dt>
                  <dd>{getHslLabel(selectedColor.hex)}</dd>
                </div>
                <div>
                  <dt>CSS</dt>
                  <dd>color: {selectedColor.hex};</dd>
                </div>
              </dl>
              <button type="button" className="primary-btn modal-copy-btn" onClick={() => copyColorHex(selectedColor)}>
                {copiedColorId === selectedColor.id ? "Copied!" : "Copy Hex"}
              </button>
            </section>
          </div>
        )}

        {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} onAuthenticated={handleAuthenticated} />}

        <Favorites
          savedColors={favoriteColors}
          savedPalettes={favoritePalettes}
          savedCustomColors={customFavorites}
          savedCustomPalettes={customPaletteFavorites}
          onRemoveColor={(colorId) => toggleColorFavorite(colorId)}
          onRemovePalette={(paletteId) => togglePaletteFavorite(paletteId)}
          onRemoveCustomColor={removeCustomFavorite}
          onRemoveCustomPalette={removeCustomPaletteFavorite}
          onExportPalette={(palette, format) => exportBrandCard(palette, format)}
        />
      </main>

      <footer className="site-footer">
        <MoroccanPattern className="footer-pattern" />
        <div className="container"><strong>Chico's Colors</strong><span>Moroccan-inspired color discovery</span><small>Made with care in Morocco · Built for curious eyes</small></div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
