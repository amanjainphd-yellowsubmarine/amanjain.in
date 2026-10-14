export const sitePages = [
  { slug: "about", group: "About", name: "About", where: "Menu → About", edits: "Top banner, biography, education, jobs, expertise, and the button at the bottom." },
  { slug: "engagements", group: "Engagements", name: "Engagements", where: "Menu → Engagements", edits: "Top banner, photo strip, events, role cards, projects, and Get in Touch." },
  { slug: "books", group: "Books", name: "Books menu page", where: "Menu → Books", edits: "The short Books page. The two book pages below are edited separately." },
  { slug: "books/from-fomo-to-jomo", group: "Books", name: "From FOMO to JOMO", where: "Menu → Books → From FOMO to JOMO", edits: "The current Coming Soon banner stays editable, and it can be hidden. The next slides use only the three book designs: Coming Soon panel, Tools inside, and Big word." },
  { slug: "books/recommended", group: "Books", name: "Recommended Books", where: "Menu → Books → Recommended Books", edits: "Top banner, the book cards, and the button at the bottom." },
  { slug: "on-air", group: "On Air", name: "On Air menu page", where: "Menu → On Air", edits: "The short On Air page. Podcasts and Media Appearances are edited separately." },
  { slug: "on-air/podcasts", group: "On Air", name: "Podcasts", where: "Menu → On Air → Podcasts", edits: "Hero (heading, description, Let’s Talk button, person/camera/mic, optional phone photo), The Leadership Gossip, podcast cards, and closing section." },
  { slug: "on-air/media-appearances", group: "On Air", name: "Media Appearances", where: "Menu → On Air → Media Appearances", edits: "Hero (same fields as Podcasts), media videos (YouTube + cover), and closing section." },
  { slug: "resources", group: "Resources", name: "Resources menu page", where: "Menu → Resources", edits: "The short Resources page. The four pages below are edited separately." },
  { slug: "resources/practice-caselets", group: "Resources", name: "Practice Caselets", where: "Menu → Resources → Practice Caselets", edits: "Top banner, the caselet cards, and the button at the bottom." },
  { slug: "resources/articles-research-papers", group: "Resources", name: "Articles & Research Papers", where: "Menu → Resources → Article & Research Papers", edits: "Top banner, article cards, research papers, and the button at the bottom." },
  { slug: "resources/assets", group: "Resources", name: "Assets", where: "Menu → Resources → Assets", edits: "Top banner, the download lists, and the button at the bottom." },
  { slug: "resources/in-the-news", group: "Resources", name: "In The News", where: "Menu → Resources → In The News", edits: "Top banner and the news cards." },
  { slug: "connect", group: "Connect", name: "Connect", where: "Menu → Connect, and the Let's talk button", edits: "Top banner, the contact form, and the button under the form." },
] as const;

export const pageGroups = ["About", "Engagements", "Books", "On Air", "Resources", "Connect"] as const;

export function pageGuide(slug: string) {
  return sitePages.find((page) => page.slug === slug);
}

export const pageOutlines: Record<string, { href: string; label: string }[]> = {
  about: [
    { href: "#about-hero", label: "About page hero" },
    { href: "#about-bio", label: "Biography" },
    { href: "#about-education", label: "Education" },
    { href: "#about-experience", label: "Professional Experience" },
    { href: "#about-expertise", label: "Areas of Expertise" },
    { href: "#about-close", label: "Ready to Transform" },
  ],
  engagements: [
    { href: "#engagements-hero", label: "Engagements page hero" },
    { href: "#engagements-gallery", label: "Photo gallery" },
    { href: "#engagements-events", label: "Events" },
    { href: "#engagements-roles", label: "Professional Engagements" },
    { href: "#engagements-projects", label: "Projects Delivered" },
    { href: "#engagements-contact", label: "Get in Touch" },
  ],
  "books/from-fomo-to-jomo": [
    { href: "#fomo-hero", label: "From FOMO to JOMO" },
    { href: "#fomo-voices", label: "In the Words of Leaders" },
    { href: "#fomo-who", label: "Who is it for?" },
    { href: "#fomo-close", label: "Ready to Transform" },
  ],
  "books/recommended": [
    { href: "#reco-hero", label: "Recommended Books hero" },
    { href: "#reco-list", label: "Book list" },
    { href: "#reco-close", label: "Ready to Transform" },
  ],
  "on-air/podcasts": [
    { href: "#podcasts-hero", label: "Hero — heading, Let’s Talk, photos" },
    { href: "#podcasts-upcoming", label: "The Leadership Gossip" },
    { href: "#podcasts-cards", label: "Podcast card sliders" },
    { href: "#podcasts-close", label: "Ready to Transform" },
  ],
  "on-air/media-appearances": [
    { href: "#podcasts-hero", label: "Hero — heading, Let’s Talk, photos" },
    { href: "#podcasts-media", label: "Media videos (YouTube + cover)" },
    { href: "#podcasts-close", label: "Ready to Transform" },
  ],
  "resources/practice-caselets": [
    { href: "#caselets-hero", label: "Practice Caselets hero" },
    { href: "#caselets-cards", label: "Caselet cards" },
  ],
  "resources/articles-research-papers": [
    { href: "#articles-hero", label: "Articles & Research Papers hero" },
    { href: "#articles-newsletter", label: "LinkedIn newsletter" },
    { href: "#articles-list", label: "Published Articles" },
    { href: "#articles-research", label: "Research Papers & Case Studies" },
  ],
  "resources/assets": [
    { href: "#assets-hero", label: "Assets hero" },
    { href: "#assets-lists", label: "Asset lists" },
  ],
  "resources/in-the-news": [
    { href: "#news-hero", label: "In the News hero" },
    { href: "#news-cards", label: "News cards" },
  ],
  connect: [
    { href: "#connect-hero", label: "Let's talk hero" },
    { href: "#connect-form", label: "Contact form" },
  ],
};
