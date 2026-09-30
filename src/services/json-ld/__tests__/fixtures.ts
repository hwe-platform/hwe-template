import type {
  AccommodationInput,
  EntityInput,
  JsonLdContext,
  PageInput,
  SiteConfigInput,
} from '../types';

/** Contexto de una petición en francés, el idioma principal (sin prefijo). */
export const ctx: JsonLdContext = {
  siteUrl: 'https://example.com',
  locale: 'fr',
  localePrefix: '',
};

/** Contexto de una petición en inglés (`/en`). */
export const ctxEn: JsonLdContext = { ...ctx, locale: 'en', localePrefix: '/en' };

/** Documento de media poblado, como llega de Payload con `depth` ≥ 1. */
export function media(file: string) {
  return { id: file, url: `/api/media/file/${file}`, alt: file, filename: file };
}

/** richText de Lexical con un párrafo por texto. */
export function lexical(...paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        children: [{ type: 'text', text }],
      })),
    },
  };
}

export const siteConfig: SiteConfigInput = {
  general: {
    siteName: 'Camping Example',
    siteDescription: 'Camping 3 étoiles à Exempleville, au cœur de la région',
    logo: media('logo.png'),
    stars: 3,
    businessType: 'campground',
  },
  contact: {
    address: 'Rue Exemple',
    postalCode: '00000',
    city: 'Exempleville',
    country: 'FR',
    phone: '+33 1 00 00 00 00',
    email: 'contact@example.com',
  },
  location: { latitude: 45.1234, longitude: 1.2345 },
  languages: { available: ['fr', 'en', 'es'], default: 'fr' },
  social: {
    facebook: 'https://facebook.com/examplecamping',
    instagram: 'https://instagram.com/example_camping',
    instagramHandle: '@example_camping',
  },
  payments: ['CB', 'Visa', 'Mastercard'],
};

/** site-config recién creado: solo lo obligatorio, sin contacto ni redes. */
export const siteConfigMinimo: SiteConfigInput = {
  general: { siteName: 'Camping Example', siteDescription: null, logo: null },
  contact: { address: null, postalCode: null, city: null, country: null, phone: '', email: null },
  social: {},
  payments: [],
};

export const mobilhome: AccommodationInput = {
  name: 'Mobile Home Confort 3 chambres',
  slug: 'mobile-home-confort',
  type: 'mobilhome',
  subtype: 'Confort',
  shortDescription: 'Mobil-home tout confort avec 3 chambres, terrasse couverte et vue forêt.',
  featured: true,
  specs: { capacity: 6, bedrooms: 3, surface: 35, petFriendly: false },
  equipment: [
    { label: 'Cuisine équipée', included: true },
    { label: 'Climatisation', included: true },
    { label: 'Draps', included: false },
  ],
  pricing: { from: 65, currency: 'EUR' },
  media: {
    mainImage: media('mh-confort-main.jpg'),
    gallery: [media('mh-confort-1.jpg'), media('mh-confort-2.jpg')],
  },
};

export const emplacement: AccommodationInput = {
  name: 'Emplacement Cyclo Rando',
  slug: 'emplacement-cyclo-rando',
  type: 'emplacement',
  shortDescription: 'Emplacement nature pour tentes, idéal pour randonneurs et cyclistes.',
  featured: true,
  specs: { capacity: null, bedrooms: 0, surface: 80, petFriendly: true },
  equipment: [
    { label: 'Électricité', included: true },
    { label: "Point d'eau", included: true },
  ],
  pricing: { from: null, currency: 'EUR' },
  media: { mainImage: media('cyclo-rando.jpg'), gallery: [] },
};

export const home: PageInput = {
  title: 'Accueil',
  slug: 'accueil',
  type: 'home',
  hero: { media: media('hero-home.jpg') },
};

export const paginaContacto: PageInput = {
  title: 'Contact',
  slug: 'contact',
  type: 'contact',
  seo: { metaDescription: 'Contactez le Camping Example à Exempleville.' },
};

export const restaurante: EntityInput = {
  name: 'Le Restaurant du Camping',
  slug: 'restaurant',
  type: 'restaurant',
  shortDescription: 'Cuisine du terroir landais.',
  description: lexical('Cuisine du terroir landais avec produits frais et locaux.'),
  image: media('restaurant-terrasse.jpg'),
  tag: 'Cuisine du terroir',
  hasOwnPage: true,
  features: [{ label: 'Terrasse ombragée' }, { label: '' }],
  ctas: [
    { label: 'Réserver une table', url: 'tel:+33100000000' },
    { label: 'Voir la carte', url: '/restaurant/carte' },
  ],
};
