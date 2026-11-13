/**
 * Icono de FontAwesome
 * @typedef {import('@fortawesome/fontawesome-svg-core').IconDefinition} IconDefinition
 */

/**
 * Estructura para la selección del protocolo en el formulario.
 * @typedef {Object} ProtocolInput
 * @property {string} id - identificador único del protocolo.
 * @property {string} label - etiqueta del input.
 * @property {string} icon - imagen del icono del protocolo por tema.
 */

/**
 * Estructura para la galería de protocolos soportados
 * @typedef {Object} ProtocolCard
 * @property {string} icon - imagen del icono del protocolo por tema.
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
