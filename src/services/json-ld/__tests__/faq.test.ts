import { describe, it, expect } from 'vitest';

import { buildFAQSchema } from '../faq';
import { lexical } from './fixtures';

const bloqueAnimales = {
  blockType: 'faq',
  items: [
    {
      question: 'Le camping accepte-t-il les animaux ?',
      answer: lexical('Oui, les animaux sont acceptés.', 'Supplément de 5€ par nuit.'),
    },
  ],
};

const bloqueFechas = {
  blockType: 'faq',
  items: [
    {
      question: "Quelles sont les dates d'ouverture ?",
      answer: lexical('Du 1er avril au 30 septembre.'),
    },
  ],
};

describe('buildFAQSchema', () => {
  it('genera el FAQPage con respuestas en texto plano', () => {
    expect(buildFAQSchema([bloqueAnimales])).toEqual({
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Le camping accepte-t-il les animaux ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oui, les animaux sont acceptés. Supplément de 5€ par nuit.',
          },
        },
      ],
    });
  });

  it('combina varios bloques FAQ en un solo FAQPage, ignorando el resto', () => {
    const schema = buildFAQSchema([bloqueAnimales, { blockType: 'hero' }, bloqueFechas]);
    expect(schema?.mainEntity).toHaveLength(2);
  });

  it('descarta las preguntas sin respuesta o sin enunciado', () => {
    const schema = buildFAQSchema([
      {
        blockType: 'faq',
        items: [
          { question: 'Sans réponse ?', answer: null },
          { question: '', answer: lexical('Réponse orpheline.') },
          ...bloqueFechas.items,
        ],
      },
    ]);
    expect(schema?.mainEntity).toHaveLength(1);
  });

  it('no se genera sin preguntas: el bloque FAQ de hoy no tiene items', () => {
    expect(buildFAQSchema([{ blockType: 'faq' }])).toBeNull();
    expect(buildFAQSchema([])).toBeNull();
  });
});
