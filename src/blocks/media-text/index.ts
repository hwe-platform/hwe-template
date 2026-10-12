/**
 * Imagen + texto de este site.
 *
 * Es el de plataforma con los iconos y los rótulos del site enchufados
 * (`MediaTextBlock.tsx`). Lo propio de cada cliente no va en el bloque sino en
 * lo que se le pasa por los slots (`slot-registry.tsx`): un adorno sobre la
 * imagen va en `sobreLaImagen`, y el bloque de plataforma sigue sin saber que
 * existe.
 */
export { MediaTextBlock } from './MediaTextBlock';
