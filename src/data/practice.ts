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
    slug: "haw-river",
    title: "Haw River, North Carolina",
    meta: "Gov · Town",
    label: "Revize · Town website · Approved August 2026",
    hook: "A historic mill town on the Haw River, re-colored from green to blue once it turned out the green belonged to the town next door.",
    subtitle:
      "Haw River is a small Piedmont town built around a historic textile mill, with the motto “Our River. Our Town.” The direction from kickoff was simplicity: a solid hero panel, bill pay up front, and nothing busy.",
    tags: ["Visual Design", "Color System", "Kickoff", "Iteration"],
    accent: "#00509D",
    briefTitle: "Keep it simple, put bill pay up front",
    brief: [
      "The town was replacing a dated site and gave the designer free rein on color. Its 2019 tree logo with the “Our River. Our Town.” tagline goes in the navigation, and the roughly fifty-year-old official seal goes in the footer.",
      "I ran the kickoff from a deck built for the meeting, and the decisions came straight out of it: one navigation bar with no utility bar, no social media anywhere because the town doesn't use it, and online bill pay as the most prominent action on the page.",
    ],
    approachTitle: "When the color belongs to the neighbors",
    approach:
      "The first concept used a deep green and gold drawn from the logo. The town turned the green down twice, and the deciding reason wasn't the shade: neighboring Green Level uses a similar green. So I retired it entirely and blended a blue system from three palettes the client picked, giving each palette one job.",
    decisions: [
      {
        name: "Hero",
        value:
          "A large photo of the river with a solid, angled overlay panel instead of a thin transparent one, carrying the motto and two calls to action.",
      },
      {
        name: "Bill pay",
        value:
          "Online bill pay is a button in the hero and the first quick-link card directly below it.",
      },
      {
        name: "Palette blend",
        value:
          "One palette sets the identity blue and gold, another supplies the deepest navy for the footer, and the third gives the light background bands. A darker gold was added so gold can appear as text on light backgrounds.",
      },
      {
        name: "Side benefit",
        value:
          "Navy separates cleanly from the trees in the hero photo. That fixed the client's complaint that the green panel blended into the foliage, without changing the photo.",
      },
      {
        name: "Announcements",
        value:
          "News is called Announcements, and a post without a photo falls back to the official seal knocked out on brand color, so nothing ever waits on an image.",
      },
      {
        name: "Events",
        value: "A calendar grid and a list side by side, filtered to Meetings and Events.",
      },
    ],
    palette: [
      { name: "River Blue", hex: "#00509D", role: "text", note: "Primary" },
      { name: "Midnight", hex: "#00296B", role: "text", note: "Hero panel" },
      { name: "Deep Navy", hex: "#0B132B", role: "text", note: "Footer" },
      { name: "Gold", hex: "#FDC500", role: "accent", note: "Fills and dark surfaces only" },
      { name: "Gold Ink", hex: "#8A5A00", role: "text", note: "Gold as text" },
      { name: "Serene", hex: "#E7ECEF", role: "surface", note: "Light bands" },
    ],
    screens: {
      primary: s("haw-river", "home", "Home", 3738),
      secondary: [
        s("haw-river", "inner", "Interior page", 2429),
        s("haw-river", "interactions", "Interactions and menus", 3738),
      ],
    },
    outcome: {
      title: "A full retheme without a rebuild",
      body: "Because the design was bound to variables, the switch from green to blue propagated through every board. An audit still found 18 elements hardcoded to the old green, and all of them were rebound before the client saw the revision.",
      stat: "632",
      statText:
        "variable bindings carried the retheme. Afterward the homepage passed with zero contrast failures across 135 text and background pairs.",
    },
  },
  {
    slug: "williams",
    title: "Williams, Arizona",
    meta: "Gov · City",
    label: "Revize · City website · Approved August 2026",
    hook: "A national-park-poster take on a Route 66 mountain town, built so it could never be mistaken for the other Williams.",
    subtitle:
      "Williams is a small Route 66 town at 6,762 feet, the Gateway to the Grand Canyon, inside the largest Ponderosa pine forest in the world. The site had one unusual requirement: it must look nothing like the City of Williams, California.",
    tags: ["Art Direction", "Visual Design", "ADA", "Design Systems"],
    accent: "#256B87",
    briefTitle: "Not the other Williams",
    brief: [
      "The city's identity matters mostly because it separates Williams, Arizona from Williams, California. A wide illustrated lockup made for the web couldn't hold up at navigation size, so its wordmark goes in the nav and the official city logo goes in the footer.",
      "The city also wants its website, not Facebook, to be the source of truth. That drove several decisions: a Watch Live card that lands on a page of the site instead of YouTube, public notices in place of a news feed nobody would keep fresh, and no mayor's message, because mayors turn over every two years.",
    ],
    approachTitle: "Mile Marker 6762",
    approach:
      "I explored three divergent art directions and chose national-park-poster Americana built only from what Williams has: the last bypassed stretch of Route 66 and a pine forest at 6,762 feet. Then I cut the decoration back over several review rounds, removing shields, dashed centerlines, and sawtooth ridgelines, until the photography and the copy carried the idea.",
    decisions: [
      {
        name: "Type",
        value:
          "Besley, a Clarendon-style display serif, with Archivo for body text, deliberately rotated away from the pairings recent projects had used.",
      },
      {
        name: "Hero",
        value:
          "A tall hero built to take the city's background video, a welcome panel with its own search, and five quick-link cards overlapping the bottom edge.",
      },
      {
        name: "Both paths",
        value:
          "Some residents rely on dropdown menus and some never touch them, so the site keeps both: full dropdowns and quick-link cards for the same tasks.",
      },
      {
        name: "Events first",
        value:
          "A month calendar with category filters sits right under the quick links, because the old community calendar was the city's pain point. Event titles stay out of the grid cells so the grid keeps its shape.",
      },
      {
        name: "Accessible gold",
        value:
          "The brand's Aspen Gold fails on white, so it carries the motif only. A darker gold ink handles any gold text, and buttons map to the primary blue, which keeps every one of the 56 button variants accessible.",
      },
    ],
    palette: [
      { name: "Alpine Lake", hex: "#256B87", role: "text", note: "Primary" },
      { name: "Ponderosa Pine", hex: "#28513F", role: "text", note: "Secondary" },
      { name: "Mountain Slate", hex: "#253239", role: "text" },
      { name: "Aspen Gold", hex: "#D8A63F", role: "accent", note: "Motif only" },
      { name: "Gold Ink", hex: "#7C5E16", role: "text", note: "Gold as text" },
      { name: "Alpine Mist", hex: "#F3F6F2", role: "surface" },
    ],
    screens: {
      primary: s("williams", "home", "Home", 4314),
      secondary: [
        s("williams", "inner", "Interior page", 2558),
        s("williams", "department", "Department template", 2700),
        s("williams", "interactions", "Interactions and menus", 4314),
      ],
    },
    outcome: {
      title: "Fewer motifs, more Williams",
      body: "The direction went through a series of internal review rounds that each took something away, then went to the city and was approved after a single revision round. It was built natively on the company design system, so every component it added is reusable.",
      stat: "56",
      statText:
        "button variants kept accessible by one token decision: buttons use the primary blue, and the gold stays decorative.",
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
