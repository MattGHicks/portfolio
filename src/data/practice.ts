// Recent Revize practice studies (2026 approvals). One shared template renders
// all of them at /case-study/[slug]. Every fact here comes from the project's
// vault client note or its approved design files; contrast ratios are computed
// from the hex values below, never typed in.

export interface Swatch {
  name: string;
  hex: string;
  /** "text" swatches report their contrast on white; "surface" and "accent"
      swatches say how they're used instead. */
  role: "text" | "surface" | "accent";
  note?: string;
}

export interface Screen {
  src: string;
  caption: string;
  width: number;
  height: number;
}

export interface PracticeStudy {
  slug: string;
  title: string;
  /** index row meta, e.g. "Gov · County" */
  meta: string;
  /** hero label above the title */
  label: string;
  hook: string;
  subtitle: string;
  tags: string[];
  accent: string;
  briefTitle: string;
  brief: string[];
  approachTitle: string;
  approach: string;
  decisions: { name: string; value: string }[];
  palette?: Swatch[];
  screens: { primary: Screen; secondary: Screen[] };
  outcome: { title: string; body: string; stat: string; statText: string };
}

const s = (slug: string, file: string, caption: string, height: number): Screen => ({
  src: `/images/cs/${slug}/${file}.jpg`,
  caption,
  width: 1440,
  height,
});

export const practice: PracticeStudy[] = [
  {
    slug: "rankin-county",
    title: "Rankin County, Mississippi",
    meta: "Gov · County",
    label: "Revize · County website · Approved October 2026",
    hook: "A growth-county site built around its one hard requirement, search, with a hero seam drawn from the river bend in the new logo.",
    subtitle:
      "A county website for one of the fastest-growing counties in Mississippi. The county's IT lead handed over an open canvas, and the Board of Supervisors had one hard requirement: make it easy to search. Approved on the first concept.",
    tags: ["Visual Design", "Search UX", "Accessibility", "Dev Handoff"],
    accent: "#017E8E",
    briefTitle: "An open canvas and one rule",
    brief: [
      "Rankin County sits in the Jackson metro and is growing fast across Brandon, Pearl, Flowood, Richland, and Star. It had just commissioned a new logo whose R folds a sunrise, a skyline, green fields, and the Pearl River into one mark.",
      "The single contact was the county's IT lead, who described himself as the IT guy, not a design guy. Everything was open except the Board's requirement that residents be able to find things by searching.",
    ],
    approachTitle: "Make search the loudest thing on the page",
    approach:
      "I explored three directions and kept the one that bet least on photography the county didn't have yet. Search became the single most prominent object on the page, and the hero borrows its shape from the logo instead of from a stock template.",
    decisions: [
      {
        name: "Search first",
        value:
          "A search card overlaps the bottom edge of the hero with five popular searches beneath it, and a gold Search pill sits in the navigation on every page.",
      },
      {
        name: "The river seam",
        value:
          "The hero splits along a Pearl River meander, the same S-bend that forms the R in the new logo, traced by a teal ribbon over a sunrise ray-burst.",
      },
      {
        name: "Type",
        value:
          "Playfair Display headings mirror the logo's high-contrast wordmark, with Manrope for everything else. I started with Instrument Serif, but it has no bold weight, and the design system's heading styles need one.",
      },
      {
        name: "Quick links",
        value:
          "Two rows of three icon cards, with the whole card clickable. Photo cards were tried and rejected as too busy.",
      },
      {
        name: "No utility bar",
        value:
          "The county chose simplicity over a utility bar, on the condition that emergency alerts can still be switched on from the CMS. They can.",
      },
      {
        name: "Dev handoff",
        value:
          "The page builder couldn't produce the curve, so I shipped a CSS drop-in: one SVG overlay between the CMS photo and the copy, no markup changes, desktop only, with a five-step README for the developers.",
      },
    ],
    palette: [
      { name: "Navy", hex: "#00264A", role: "text", note: "Primary" },
      { name: "Teal", hex: "#017E8E", role: "text" },
      { name: "Green", hex: "#59781D", role: "text" },
      { name: "Gold", hex: "#FEBF37", role: "accent", note: "Fills only, with navy text" },
    ],
    screens: {
      primary: s("rankin-county", "home", "Home", 4812),
      secondary: [
        s("rankin-county", "inner", "Interior page", 2581),
        s("rankin-county", "interactions", "Interactions and menus", 4812),
      ],
    },
    outcome: {
      title: "Accessible by measurement, not by eye",
      body: "The concept was checked in the browser before it went to the client, and the county approved it without a revision round. The hero handoff went to development in October.",
      stat: "0",
      statText:
        "contrast failures across 58 distinct text and background pairs. Every prose, link, and button label is at least 16px, and every touch target is at least 44px.",
    },
  },
  {
    slug: "milton",
    title: "Milton, Georgia",
    meta: "Gov · City",
    label: "Revize · City website · Approved September 2026",
    hook: "“A slower kind of Georgia.” An editorial, countryside-paced site for a city that calls itself Georgia's Equestrian Hometown.",
    subtitle:
      "A city site for Milton, a north Fulton County city of about 41,500 that brands itself as Georgia's Equestrian Hometown. The brand palette read dull on screen, so I kept its anchor color and lifted everything around it.",
    tags: ["Visual Design", "Color System", "Typography", "Iteration"],
    accent: "#063E4E",
    briefTitle: "Direction without a kickoff recording",
    brief: [
      "The kickoff was run by another member of the team and there was no recording, so the direction came from the kickoff notes, the city's brand color and typeface documents, and its photo library.",
      "Milton is rural on purpose: twenty-five square miles of protected countryside, trails, and a walkable historic district in Crabapple, fifteen minutes from Atlanta. The site needed to feel like that, not like a generic suburb.",
    ],
    approachTitle: "Keep the anchor, lift the rest",
    approach:
      "The brand document leaned on dark blue, slate, dark green, and brown, and together they felt heavy. I kept Heritage Blue as the anchor and built a lighter, warmer system around it, with an italic serif reserved for the one word that matters in each headline.",
    decisions: [
      {
        name: "Palette",
        value:
          "Heritage Blue stays the anchor, lifted with cream, sand, a refined sky blue, and a gold sampled from the logo. Brown became a sparing accent, and dark green is reserved for parks and nature.",
      },
      {
        name: "Type",
        value:
          "The brand faces aren't licensed for the web, so each got its closest web match: Source Serif for headings, Figtree for body, and an italic serif for accent words.",
      },
      {
        name: "Hero",
        value:
          "A photo slideshow with a short story attached to each slide, as the kickoff asked, and a search bar at the base of the hero that's prominent without taking over.",
      },
      {
        name: "Quick access",
        value:
          "Six cards in a single row, each with an icon, a title, a one-line description, and an arrow, so residents can scan the row instead of reading it.",
      },
      {
        name: "Revisions",
        value:
          "After the first revision the client approved about 97% of the design. The remaining rounds reworked only the top of the homepage: softer corners, less boxy framing, arrows instead of dots.",
      },
    ],
    palette: [
      { name: "Heritage Blue", hex: "#063E4E", role: "text", note: "Anchor" },
      { name: "Heritage Gold", hex: "#B8893D", role: "accent", note: "From the logo" },
      { name: "Sky", hex: "#5FB4D7", role: "accent" },
      { name: "Cream", hex: "#F7F1E6", role: "surface" },
      { name: "Sand", hex: "#E8DCC4", role: "surface" },
    ],
    screens: {
      primary: s("milton", "home", "Home", 5033),
      secondary: [
        s("milton", "inner", "Interior page", 2731),
        s("milton", "department", "Department template", 3422),
        s("milton", "interactions", "Interactions and menus", 5039),
      ],
    },
    outcome: {
      title: "Most of it landed on the first pass",
      body: "Feedback after the first revision was about one region of one page. Everything else, from the palette to the department template, held through approval.",
      stat: "97%",
      statText: "of the design approved after the first revision round. Later rounds focused on the homepage hero alone.",
    },
  },
  {
    slug: "utica",
    title: "Utica, New York",
    meta: "Gov · City",
    label: "Revize · City website · Approved September 2026",
    hook: "A seal-led, tile-first site for a historic upstate city, built so residents never have to drill down for common tasks.",
    subtitle:
      "Utica was leaving an old CMS that had boxed its site in. The principle from kickoff was simple: put the common actions up front, with no drill-down, because burying them was the old site's main failing.",
    tags: ["Visual Design", "IA", "Service Tiles", "ADA"],
    accent: "#1A3D36",
    briefTitle: "Common actions, up front",
    brief: [
      "Utica has served the Mohawk Valley since 1832. The city uses its seal rather than a logo, wanted real panoramic photography of the city, and was building a GovWell services portal in parallel that the new site would front.",
      "I transcribed the kickoff recording locally and turned it into structured design notes, so every decision below traces back to something the city said.",
    ],
    approachTitle: "Tiles as the centerpiece",
    approach:
      "The client asked for square and rectangular geometry only, with no circles anywhere. I built the homepage around a grid of square service tiles directly under a calm, split hero, so the most-used tasks are one click from the front page.",
    decisions: [
      {
        name: "Branding",
        value:
          "The black-and-white city seal, cropped round, sits beside “Utica, New York” and the line “Incorporated 1832.” District brands for the brewery and arts districts stay off this site.",
      },
      {
        name: "Geometry",
        value:
          "Square and rectangular forms only, per the client. Cards, buttons, and image frames all follow the rule.",
      },
      {
        name: "Service tiles",
        value:
          "Eight editable tiles: tax assessment roll, budget, tax bills, the GovWell services portal, permits, bids and RFPs, meetings, and employment, which the city wanted at the top level.",
      },
      {
        name: "Hero",
        value:
          "Static and taller than before, with no zoom or pan. Real city photography sits beside a deep green panel carrying small welcome text.",
      },
      {
        name: "Type and color",
        value:
          "The type pairing came from the client's shortlist of four Google sans families. I steered the color away from the previous campaign blue to a deep civic green on cream.",
      },
    ],
    screens: {
      primary: s("utica", "home", "Home", 4090),
      secondary: [
        s("utica", "inner", "Interior page", 2767),
        s("utica", "department", "Department template", 2656),
        s("utica", "interactions", "Interactions and menus", 4066),
      ],
    },
    outcome: {
      title: "One round to approval",
      body: "The concept went through a single revision round before the city approved it. The tile grid and the seal treatment carried through unchanged.",
      stat: "1",
      statText: "revision round between the first concept and approval.",
    },
  },
  {
    slug: "limestone",
    title: "Village of Limestone, Illinois",
    meta: "Gov · Village",
    label: "Revize · Village website + logo refresh · Approved August 2026",
    hook: "A village run entirely by volunteers, given a prairie-light identity: a refreshed crest, Fraunces headlines, and a sunflower field.",
    subtitle:
      "Limestone is a young village in Kankakee County, incorporated in 2006 and governed entirely by unpaid volunteers. The client was explicitly hands-off, so nearly every decision in the logo refresh and the website was the designer's.",
    tags: ["Visual Design", "Logo Refresh", "Typography", "Templates"],
    accent: "#086539",
    briefTitle: "Full latitude, small village",
    brief: [
      "The mayor, trustees, clerk, and committee members all serve without pay. The village was replacing an older CivicPlus site, wanted its logo refreshed as part of the project, and had no color, type, or layout preferences.",
      "The best asset on hand was a single sunflower field photograph. It became the hero, and the palette grew out of it.",
    ],
    approachTitle: "Refuse the default layout",
    approach:
      "The first internal pass fell back on the same skeleton most municipal sites share, with a full-bleed photo hero, a row of icon cards, and three news cards. I threw it out and rebuilt around the village itself: prairie light, a cream canvas, and a green-led palette.",
    decisions: [
      {
        name: "Direction",
        value:
          "“Prairie Light.” A green-led palette on a limestone-cream canvas, with navy moved to depth roles rather than leading.",
      },
      {
        name: "Logo",
        value:
          "The old mark traced the village's irregular boundary. The refresh drops the outline for a crest with the water tower, sunflowers, and fields.",
      },
      {
        name: "Type",
        value: "Fraunces for display, Public Sans for everything else.",
      },
      {
        name: "Hero",
        value:
          "The dark overlay is its own layer, so a volunteer can swap the CMS photo without ever breaking the legibility of the welcome text.",
      },
      {
        name: "Content order",
        value:
          "Events and meetings come before announcements, because that's what residents come for. Announcements carry a branded default image, so a post never waits on someone finding a photo.",
      },
    ],
    palette: [
      { name: "Village Green", hex: "#086539", role: "text", note: "Primary" },
      { name: "Navy", hex: "#014377", role: "text", note: "Depth" },
      { name: "Prairie Orange", hex: "#F18B36", role: "accent", note: "Graphics only, never text" },
      { name: "Limestone", hex: "#F8F4EC", role: "surface", note: "Canvas" },
    ],
    screens: {
      primary: s("limestone", "home", "Home", 4178),
      secondary: [
        s("limestone", "inner", "Interior page", 2650),
        s("limestone", "department", "Department template", 2668),
        s("limestone", "interactions", "Interactions and menus", 4178),
      ],
    },
    outcome: {
      title: "More templates than the usual contract",
      body: "The village approved the design, including the refreshed logo, after a single revision round.",
      stat: "5",
      statText:
        "templates delivered instead of the usual three: home, interactions, interior page, department, and tile.",
    },
  },
  {
    slug: "irondale",
    title: "Irondale Public Library, Alabama",
    meta: "Library",
    label: "Revize · Library website · Approved August 2026",
    hook: "A public library site that shares the city's palette but not its structure, with catalog and website search in a single hero box.",
    subtitle:
      "The library wanted to feel related to the City of Irondale's website without copying it. If the two matched, the staff said, a separate library site would be money wasted. Same palette, different structure.",
    tags: ["Visual Design", "Search UX", "Library", "Iteration"],
    accent: "#00466A",
    briefTitle: "Related to the city, not a copy of it",
    brief: [
      "Irondale's library shares the city's colors, but its patrons come for different things: the catalog, hours, events, and their account. The old site buried the account link and made patrons guess which search box searched what.",
      "Homepage sections fill the screen and snap into place on desktop. On mobile the page scrolls freely, because snapping fights thumbs.",
    ],
    approachTitle: "One search box, two indexes",
    approach:
      "The hero holds one search box with a toggle between the catalog and the website, so patrons pick what they're searching before they type. Everything else on the homepage is something a patron does: check hours, see events, browse new releases, find their section.",
    decisions: [
      {
        name: "Search toggle",
        value:
          "Catalog and website search share one box in the hero, with the catalog selected by default.",
      },
      {
        name: "My Account",
        value:
          "Promoted to a highlighted button in the utility bar on every page. The old site buried it.",
      },
      {
        name: "No hero video",
        value:
          "Chosen deliberately for patrons on limited data plans. The hero is a still photograph of the library itself.",
      },
      {
        name: "Live embeds",
        value:
          "Weekly hours and upcoming events come from the library's LibCal feed, and a new-releases carousel pulls from the catalog, so staff update one system, not two.",
      },
      {
        name: "Revision",
        value:
          "The first concept read as a historic academic library rather than a modern public one. I lightened the navy to an ocean blue, swapped in the library's own photos, and cut serif headers on interior pages while keeping them on the homepage.",
      },
    ],
    palette: [{ name: "Ocean Blue", hex: "#00466A", role: "text", note: "Lightened in revision" }],
    screens: {
      primary: s("irondale", "home", "Home", 4257),
      secondary: [
        s("irondale", "inner", "Interior page", 2509),
        s("irondale", "interactions", "Interactions and menus", 4257),
      ],
    },
    outcome: {
      title: "From academic to public",
      body: "The library loved the layout from the first concept. The revision rounds were about tone: making the same structure read as welcoming rather than historic.",
      stat: "2",
      statText:
        "searches in one box. Patrons choose catalog or website before they type, instead of guessing which box does what.",
    },
  },
  {
    slug: "dublin",
    title: "Dublin, California",
    meta: "Gov · Multi-site",
    label: "Revize · City website + aquatics center · Approved July 2026",
    hook: "One design system, four Figma variable modes: City Hall and The Wave aquatics center built from the same components.",
    subtitle:
      "Dublin started as four properties: the city, its police services, The Wave aquatics center, and economic development. One Figma design system with four variable modes let each property swap palette and type while sharing every component.",
    tags: ["Design Systems", "Variables", "Multi-Site", "Compliance"],
    accent: "#B96A25",
    briefTitle: "Four properties, one system",
    brief: [
      "Dublin is a growing Bay Area city whose properties each needed their own identity. The Wave is a regional aquatics destination with its own brand, and economic development had a separate branding campaign underway with another vendor.",
      "Instead of four designs, I built one system with four modes across its color, type, and grid collections. Switching a frame's mode re-skins it for that property.",
    ],
    approachTitle: "Let the system absorb scope changes",
    approach:
      "Midway through, the city manager folded police into the main site as a department page, and economic development followed while its branding was finished. Because every property ran on the same components, those changes cost a mode, not a redesign.",
    decisions: [
      {
        name: "Variable modes",
        value:
          "Main City, Police, The Wave, and Economic Development, each a mode across the Colors, Typography, and Grid collections.",
      },
      {
        name: "Scope change",
        value:
          "Police and economic development became department pages on the city site. The Wave stayed standalone as a regional destination with its own URL.",
      },
      {
        name: "State law",
        value:
          "A new California requirement called for a prominent agenda-alerts signup. The Stay Connected band carries two calls to action, one for agenda alerts and one for the city newsletter.",
      },
      {
        name: "Economic development",
        value:
          "An accessibility-checked palette anchored in Dublin's brand copper, delivered as a swatch the vendor could drop into its own campaign.",
      },
      {
        name: "The Wave",
        value:
          "Pure white quick-link cards and six distinct icon colors, so the aquatics site reads as play rather than paperwork.",
      },
    ],
    screens: {
      primary: s("dublin", "home", "City home", 3271),
      secondary: [
        s("dublin", "wave-home", "The Wave home", 3042),
        s("dublin", "inner", "City interior page", 2592),
        s("dublin", "interactions", "City interactions and menus", 3271),
      ],
    },
    outcome: {
      title: "Scope changed. The system didn't.",
      body: "Six revision rounds, two scope reductions from the city manager, and a new state law all landed in the same Figma file without a rebuild.",
      stat: "4",
      statText:
        "variable modes in one design system. Two properties came out of it as standalone designs, and the other two folded back into the city site.",
    },
  },
];

export const practiceBySlug = Object.fromEntries(practice.map((p) => [p.slug, p]));

/** WCAG relative-luminance contrast of a hex color against white. */
export function contrastOnWhite(hex: string): number {
  const c = hex.replace("#", "");
  const ch = [0, 2, 4].map((i) => {
    const v = parseInt(c.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  return 1.05 / (L + 0.05);
}
