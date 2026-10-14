export type PublishStatus = "draft" | "published";

export type FooterLink = {
  label: string;
  href: string;
};

export type SiteFooterContent = {
  bookingLabel: string;
  bookingHref: string;
  quickTitle: string;
  quickLinks: FooterLink[];
  resourcesTitle: string;
  resourceLinks: FooterLink[];
  contactTitle: string;
  socials: FooterLink[];
};

export type SiteSettings = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  footer: SiteFooterContent;
};

export type BioBlock = {
  title: string;
  paragraphs: string[];
};

export type EducationItem = {
  degree: string;
  institution: string;
  year: string;
  logo: string;
  alt: string;
};

export type ExperienceItem = {
  dates: string;
  role: string;
  company: string;
  logo: string;
  alt: string;
};

export type ExpertiseArea = {
  title: string;
  description: string;
};

export type PageHero = {
  title: string;
  description: string;
  cardTitle: string;
  image: string;
  mobileImage?: string;
  alt: string;
  blocks: BioBlock[];
  educationTitle: string;
  education: EducationItem[];
  experienceTitle: string;
  experienceSubtitle: string;
  experience: ExperienceItem[];
  areasTitle: string;
  areasSubtitle: string;
  areas: ExpertiseArea[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

export type GalleryImage = {
  image: string;
  alt: string;
};

export type EngagementEvent = {
  timing: "future" | "past";
  format: "" | "keynote" | "masterclass" | "panel";
  title: string;
  place: string;
  date: string;
  topic: string;
};

export type EngagementRole = {
  title: string;
  description: string;
};

export type ProjectItem = {
  company: string;
  type: string;
};

export type ProjectCategory = {
  title: string;
  items: ProjectItem[];
};

export type EngagementHero = {
  title: string;
  description: string;
  image: string;
  mobileImage?: string;
  alt: string;
  gallery: GalleryImage[];
  eventsTitle: string;
  eventsSubtitle: string;
  events: EngagementEvent[];
  rolesTitle: string;
  rolesSubtitle: string;
  roles: EngagementRole[];
  projectsTitle: string;
  projectsSubtitle: string;
  projectCategories: ProjectCategory[];
  splitTitle: string;
  splitSubtitle: string;
  splitLabel: string;
  splitHref: string;
  splitImage: string;
  splitAlt: string;
};

export type BookPoint = {
  number: string;
  text: string;
};

export type BookChapter = {
  number: string;
  title: string;
  description: string;
  points: BookPoint[];
  image: string;
  alt: string;
};

export type BookVoice = {
  name: string;
  role: string;
  quote: string;
  photo: string;
  photoAlt: string;
  logo: string;
  logoAlt: string;
};

export type BookAudience = {
  title: string;
  text: string;
};

export type BookPage = {
  heading: string;
  subheading: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  buttonLabel: string;
  logo: string;
  logoAlt: string;
  cover: string;
  coverAlt: string;
  mobileImage?: string;
  coverHref: string;
  quote: string;
  authorName: string;
  authorInfo: string;
  authorPhoto?: string;
  authorPhotoAlt?: string;
  bannerHidden?: boolean;
  slides?: HeroSlide[];
  insideTitle: string;
  chapters: BookChapter[];
  voicesTitle: string;
  voicesSubtitle: string;
  voicesDesc: string;
  featured: BookVoice;
  voices: BookVoice[];
  whoTitle: string;
  whoAudiences: BookAudience[];
  whoLine: string;
  whoNamePlaceholder: string;
  whoEmailPlaceholder: string;
  whoButtonLabel: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

export type RecommendedBook = {
  title: string;
  cover: string;
  alt: string;
  rating: string;
  author: string;
  year: string;
  publisher: string;
  about: string;
  highlights: string[];
};

export type RecommendedHero = {
  title: string;
  description: string;
  image: string;
  mobileImage?: string;
  alt: string;
  listTitle: string;
  listSubtitle: string;
  books: RecommendedBook[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

export type PodcastEpisode = {
  title: string;
  description: string;
  image: string;
  alt: string;
  duration: string;
  href: string;
  tags: string[];
};

export type MediaAppearanceItem = {
  title: string;
  video: string;
  caption: string;
  thumbnail?: string;
  thumbnailAlt?: string;
};

export type PodcastHero = {
  title: string;
  description: string;
  heroButtonLabel?: string;
  heroButtonHref?: string;
  image: string;
  mobileImage?: string;
  imageAlt: string;
  camera: string;
  cameraAlt: string;
  mic: string;
  micAlt: string;
  featuringLead: string;
  featuringAccent: string;
  featuringSubtitle: string;
  featuringButton: string;
  featuring: PodcastEpisode[];
  recommendedTitle: string;
  recommendedSubtitle: string;
  recommendedButton: string;
  recommended: PodcastEpisode[];
  mediaTitle: string;
  mediaSubtitle: string;
  mediaVideo: string;
  mediaCaption: string;
  mediaItems?: MediaAppearanceItem[];
  closeTitle: string;
  closeSubtitle: string;
  closeLabel: string;
  closeHref: string;
  closeImage: string;
  closeAlt: string;
  upcomingTitle?: string;
  upcomingWhen?: string;
  upcomingText?: string;
  gossipTitle?: string;
  gossipSubtitle?: string;
  gossipButton?: string;
  gossip?: PodcastEpisode[];
};

export type CaseletCard = {
  tag: string;
  title: string;
  description: string;
  outcome: string;
  href: string;
  buttonLabel: string;
};

export type ArticleFeature = {
  magazine: string;
  title: string;
  description: string;
  highlights: string[];
  href: string;
  buttonLabel: string;
};

export type ArticleCard = {
  title: string;
  description: string;
  image: string;
  alt: string;
  duration: string;
  href: string;
  buttonLabel: string;
};

export type ResearchPaper = {
  tone: "teal" | "orange";
  label: string;
  title: string;
  description: string;
  highlights: string[];
  href: string;
  buttonLabel: string;
};

export type ArticlesHero = {
  title: string;
  description: string;
  image: string;
  mobileImage?: string;
  alt: string;
  listTitle: string;
  listSubtitle: string;
  features: ArticleFeature[];
  cards: ArticleCard[];
  researchTitle: string;
  researchSubtitle: string;
  papers: ResearchPaper[];
  closeTitle: string;
  closeSubtitle: string;
  closeLabel: string;
  closeHref: string;
  newsletterTitle?: string;
  newsletterText?: string;
  newsletterLabel?: string;
  newsletterHref?: string;
};

export type NewsCard = {
  image: string;
  alt: string;
  year: string;
  category: string;
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
};

export type NewsHero = {
  title: string;
  description: string;
  image: string;
  mobileImage?: string;
  alt: string;
  cards: NewsCard[];
};

export type ConnectHero = {
  title: string;
  description: string;
  image: string;
  mobileImage?: string;
  alt: string;
  contactTitle: string;
  email: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  agendaPlaceholder: string;
  agendas: string[];
  subjectPlaceholder: string;
  messagePlaceholder: string;
  buttonLabel: string;
  closeTitle: string;
  closeSubtitle: string;
  closeLabel: string;
  closeHref: string;
};

export type AssetCard = {
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
};

export type AssetCategory = {
  title: string;
  cards: AssetCard[];
};

export type AssetsHero = {
  title: string;
  description: string;
  image: string;
  mobileImage?: string;
  alt: string;
  categories: AssetCategory[];
  closeTitle: string;
  closeSubtitle: string;
  closeLabel: string;
  closeHref: string;
};

export type CaseletsHero = {
  title: string;
  description: string;
  image: string;
  mobileImage?: string;
  alt: string;
  cards: CaseletCard[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

export type PageContent = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  body: string;
  status: PublishStatus;
  hero?: PageHero;
  engagement?: EngagementHero;
  book?: BookPage;
  recommended?: RecommendedHero;
  podcast?: PodcastHero;
  caselets?: CaseletsHero;
  articles?: ArticlesHero;
  assets?: AssetsHero;
  news?: NewsHero;
  connect?: ConnectHero;
};

export type HeroRing = {
  background: string;
  opacity: number;
};

export type HeroLine = {
  label: string;
  text: string;
};

export type HeroLink = {
  label: string;
  href: string;
};

export type HeroSlide = {
  id: string;
  template?: "portrait" | "story" | "buy" | "panel" | "arch" | "word";
  eyebrow?: string;
  title: string;
  subtitle: string;
  quote?: string;
  quoteName?: string;
  quoteRole?: string;
  badge?: string;
  ticker?: string;
  bigWord?: string;
  lines?: HeroLine[];
  links?: HeroLink[];
  buttonLabel: string;
  href: string;
  image: string;
  mobileImage?: string;
  alt: string;
  rings: HeroRing[];
};

export type HomeStat = {
  target: number;
  suffix: string;
  label: string;
};

export type HomeAbout = {
  image: string;
  alt: string;
  name: string;
  tagline: string;
  role: string;
  paragraphs: string[];
  stats: HomeStat[];
};

export type ExpertiseCard = {
  title: string;
  description: string;
};

export type HomeExpertise = {
  title: string;
  subtitle: string;
  cards: ExpertiseCard[];
};

export type AchievementCard = {
  year: string;
  title: string;
  description: string;
};

export type HomeAchievements = {
  title: string;
  subtitle: string;
  cards: AchievementCard[];
};

export type StoryCard = {
  quote: string;
  name: string;
  role: string;
  photo: string;
  logo: string;
  logoAlt: string;
  profileUrl?: string;
};

export type HomeStories = {
  title: string;
  subtitle: string;
  cards: StoryCard[];
};

export type HomeSubscribe = {
  title: string;
  subtitle: string;
  note: string;
  buttonLabel: string;
  linkedinLabel: string;
  linkedinHref: string;
  namePlaceholder: string;
  emailPlaceholder: string;
};

export type HomeContact = {
  title: string;
  headline: string;
  intro: string;
  orLabel: string;
  prompt: string;
  email: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  buttonLabel: string;
};

export type HomeContent = {
  slides: HeroSlide[];
  about: HomeAbout;
  expertise: HomeExpertise;
  achievements: HomeAchievements;
  stories: HomeStories;
  subscribe: HomeSubscribe;
  contact: HomeContact;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
};

export type WorkItem = {
  slug: string;
  title: string;
  summary: string;
  year: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  status: PublishStatus;
  publishedAt: string;
};

export type MediaItem = {
  id: string;
  name: string;
  alt: string;
  url: string;
};

export type MenuLink = {
  id: string;
  label: string;
  href: string;
};

export type MenuItem = MenuLink & {
  children: MenuLink[];
};

export type HeaderContent = {
  logo: {
    src: string;
    alt: string;
  };
  menu: MenuItem[];
  cta: {
    label: string;
    href: string;
  };
};

export type EnquiryStatus = "new" | "read";

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: EnquiryStatus;
  type?: "resource" | "message";
  resourceTitle?: string;
  resourcePage?: string;
  resourceAction?: "download" | "read";
  resourceHref?: string;
};
