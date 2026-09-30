import { contactSubmissionInputSchema, contactSubmissionUpdateSchema } from '@hwe-platform/core-ui';

import { authenticatedOnly } from '../access';
import { RETENTION_DAYS } from '../services/contact/constants';
import { validateWrite } from '../hooks/validate';

import type { Access, CollectionConfig } from 'payload';

/** Nadie crea ni edita envíos desde fuera: solo el Route Handler, con `overrideAccess`. */
const nadie: Access = () => false;

/**
 * Mensajes del formulario de contacto (HU-021).
 *
 * Se guardan además de enviarse por email: un fallo del SMTP no pierde el
 * mensaje, el equipo los ve en el admin, y el Route Handler cuenta aquí los
 * envíos recientes de cada visitante para el rate limit.
 *
 * **RGPD.** Datos personales con un fin concreto: responder al visitante. De
 * la IP solo se guarda un hash con sal, lo justo para el rate limit. Retención
 * de {@link RETENTION_DAYS} días; el borrado automático llega en Hito 2
 * (specs/informacion/contacto.md) y hasta entonces se borra a mano desde aquí,
 * que es también como se ejerce el derecho de supresión.
 */
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Mensaje de contacto', plural: 'Mensajes de contacto' },
  access: {
    read: authenticatedOnly,
    create: nadie,
    update: nadie,
    delete: authenticatedOnly,
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'name', 'email', 'createdAt', 'emailSent'],
    group: 'Formularios',
    description: `Mensajes recibidos desde la página de contacto. Se conservan ${RETENTION_DAYS} días (RGPD): bórralos pasado ese plazo o cuando el visitante lo pida.`,
  },
  hooks: {
    beforeChange: [
      validateWrite({
        create: contactSubmissionInputSchema,
        update: contactSubmissionUpdateSchema,
        label: 'contact-submissions',
      }),
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'subject', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'consentAt',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Cuándo aceptó la política de privacidad.',
      },
    },
    {
      name: 'ipHash',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'Hash de la IP con sal, para el límite de envíos. No es la IP.' },
    },
    {
      name: 'emailSent',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Si el aviso por email llegó a salir.' },
    },
  ],
  timestamps: true,
};
