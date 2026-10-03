/**
 * Icono de FontAwesome
 * @typedef {import('@fortawesome/fontawesome-svg-core').IconDefinition} IconDefinition
 */

/**
 * Par de imágenes PNG según el tema activo.
 * @typedef {Object} ThemeAssetIcons
 * @property {string} dark - ruta del icono para el tema oscuro.
 * @property {string} light - ruta del icono para el tema claro.
 */

/**
 * Par de iconos FontAwesome según el tema activo.
 * @typedef {Object} ThemeIcons
 * @property {IconDefinition} dark - icono cuando el tema es oscuro.
 * @property {IconDefinition} light - icono cuando el tema es claro.
 */

/**
 * Estructura para la selección del protocolo en el formulario.
 * @typedef {Object} ProtocolInput
 * @property {string} id - identificador único del protocolo.
 * @property {string} label - etiqueta del input.
 * @property {ThemeAssetIcons} icon - imagen del icono del protocolo por tema.
 */

/**
 * Estructura para la galería de protocolos soportados
 * @typedef {Object} ProtocolCard
 * @property {ThemeAssetIcons} icon - imagen del icono del protocolo por tema.
 * @property {string} acronym - acrónimo oficial del protocolo.
 * @property {string} rep - significado del acrónimo.
 * @property {string} description - explicación sobre el propósito del protocolo.
 */

/**
 * Configuración de estilos e icono asignado a cada rol del botón.
 * @typedef {Object} ButtonRoleConfig
 * @property {string} className - clases CSS para el botón.
 * @property {IconDefinition} icon - icono de FontAwesome para el rol.
 */

/**
 * Configuración de la animación del icono de los botones
 * @typedef {Object} IconAnimationConfig
 * @property {string} className - clases CSS para el botón.
 * @property {string} direction - dirección de la animación.
 */

export {}; // Módulo ES6
