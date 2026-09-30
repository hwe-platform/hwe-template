import { accommodationSchema } from '@hwe-platform/core-ui';

/** Una imagen poblada, como la devuelve Payload con `depth`. */
export function imagen(nombre: string, alt = `Vue ${nombre}`) {
  return {
    id: nombre,
    filename: `${nombre}.jpg`,
    url: `/media/${nombre}.jpg`,
    alt,
    mimeType: 'image/jpeg',
    filesize: 1234,
  };
}

/**
 * El «Mobile Home Confort 3 chambres» del export, con los campos que pinta
 * `MobileHomePage.tsx`. Cada test cambia solo lo que comprueba.
 */
export function alojamiento(cambios: Record<string, unknown> = {}) {
  return accommodationSchema.parse({
    id: 1,
    name: 'Mobile Home Confort 3 chambres',
    slug: 'mobile-home-confort-3-chambres',
    type: 'mobilhome',
    shortDescription: 'Location idéale pour les familles.',
    description: {
      root: {
        children: [
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Location mobil-home 3 chambres à Exempleville' }],
          },
          { type: 'paragraph', children: [{ type: 'text', text: 'Sur 38 m², ce mobil-home…' }] },
        ],
      },
    },
    specs: { capacity: 6, bedrooms: 3, surface: 38, hasAC: false, petFriendly: false },
    pricing: { from: 490, currency: 'EUR', priceNote: '/sem.' },
    media: { mainImage: imagen('pict_10_1') },
    category: 2,
    booking: { bookable: true, externalId: '42' },
    ...cambios,
  });
}

/** El mismo alojamiento con todas las secciones opcionales rellenas, como en el export. */
export function alojamientoCompleto() {
  return alojamiento({
    bedroomDetails: [
      { description: 'Chambre 1 : lit double 140×190 cm' },
      { description: 'Chambre 2 : 2 lits superposés 80×190 cm' },
    ],
    equipment: [
      { label: 'WiFi haut débit inclus', icon: 'wifi', included: true },
      { label: 'Climatisation', icon: 'wind', included: false },
    ],
    features: [
      { icon: 'treePine', label: 'Terrasse couverte' },
      { icon: 'car', label: 'Parking' },
    ],
    media: { mainImage: imagen('principal'), floorPlan: imagen('plan', 'Plan du mobil-home') },
    documents: [{ label: 'Inventaire PDF', file: imagen('inventaire') }],
  });
}
