/*==================================.
| IMPORTAMOS LOS ICONOS FONTAWESOME |
`==================================*/

import {
    faCircleArrowRight,
    faCircleStop,
    faCirclePlay,
    faCircleArrowLeft,
    faFilter,
    faRotateLeft,
    faFilePen,
    faTruck,
    faGlobe,
} from '@fortawesome/free-solid-svg-icons';

/*========================================.
| IMPORTAMOS LOS ICONOS DE LOS PROTOCOLOS |
`========================================*/

import darkPimIcon from './assets/icons/icon-pim-dark.png'
import darkArpIcon from './assets/icons/icon-arp-dark.png';
import darkDvmrpIcon from './assets/icons/icon-dvmrp-dark.png';
import darkIcmpIcon from './assets/icons/icon-icmp-dark.png';
import darkIgmpIcon from './assets/icons/icon-igmp-dark.png';
import darkMsdpIcon from './assets/icons/icon-msdp-dark.png';
import darkTcpIcon from './assets/icons/icon-tcp-dark.png';
import darkUdpIcon from './assets/icons/icon-udp-dark.png';

/*=====================.
| EXPORTACIÓN DE TIPOS |
`=====================*/

/** @typedef {import('./constants.types').ProtocolInput} ProtocolInput */
/** @typedef {import('./constants.types').ProtocolCard} ProtocolCard */
/** @typedef {import('./constants.types').ButtonRoleConfig} ButtonRoleConfig */
/** @typedef {import('./constants.types').IconAnimationConfig} IconAnimationConfig */

/*===========.
| CONSTANTES |
`===========*/

/**
 * Lista de protocolos que se pueden elegir en el formulario de
 * captura/filtro de paquetes.
 * @type {ProtocolInput[]}
 */
export const PROTOCOLS = [
    { id: 'arp', label: 'ARP', icon: darkArpIcon, },
    { id: 'icmp', label: 'ICMP', icon: darkIcmpIcon, },
    { id: 'igmp', label: 'IGMP', icon: darkIgmpIcon, },
    { id: 'dvmrp', label: 'DVMRP', icon: darkDvmrpIcon, },
    { id: 'pim', label: 'PIM', icon: darkPimIcon, },
    { id: 'msdp', label: 'MSDP', icon: darkMsdpIcon, },
    { id: 'tcp', label: 'TCP', icon: darkTcpIcon, },
    { id: 'udp', label: 'UDP', icon: darkUdpIcon, },
];

/**
 * Lista de protocolos soportados.
 * @type {ProtocolCard[]}
 */
export const PROTOCOL_CARDS = [
    {
        icon: darkArpIcon,
        acronym: 'ARP',
        rep: '(Address Resolution Protocol)',
        description: 'Asocia direcciones IP con direcciones MAC.',
        layer: 'Transporte',
        layer_icon: faTruck,
    },
    {
        icon: darkIcmpIcon,
        acronym: 'ICMP',
        rep: '(Internet Control Message Protocol)',
        description: 'Se utiliza para diagnósticos y la notificación de errores.',
        layer: 'Transporte',
        layer_icon: faTruck,
    },
    {
        icon: darkIgmpIcon,
        acronym: 'IGMP',
        rep: '(Internet Group Management Protocol)',
        description: 'Gestiona las pertenencias a grupos de multidifusión IP.',
        layer: 'Transporte',
        layer_icon: faTruck,
    },
    {
        icon: darkDvmrpIcon,
        acronym: 'DVMRP',
        rep: '(Distance Vector Multicast Routing Protocol)',
        description: 'Protocolo de enrutamiento multidestino.',
        layer: 'Transporte',
        layer_icon: faTruck,
    },
    {
        icon: darkPimIcon,
        acronym: 'PIM',
        rep: '(Protocol Independent Multicast)',
        description: 'Familia de protocolos de enrutamiento multidifusión.',
        layer: 'Transporte',
        layer_icon: faTruck,
    },
    {
        icon: darkMsdpIcon,
        acronym: 'MSDP',
        rep: '(Multicast Source Discovery Protocol)',
        description: 'Conecta múltiples dominios PIM-SM.',
        layer: 'Transporte',
        layer_icon: faTruck,
    },
    {
        icon: darkTcpIcon,
        acronym: 'TCP',
        rep: '(Transmission Control Protocol)',
        description: 'Entrega de datos fiable y ordenada.',
        layer: 'Internet',
        layer_icon: faGlobe,
    },
    {
        icon: darkUdpIcon,
        acronym: 'UDP',
        rep: '(User Datagram Protocol)',
        description: 'Modelo de transmisión sin conexión.',
        layer: 'Internet',
        layer_icon: faGlobe,
    },
];

/**
 * Diccionario de estilos para los roles del botón.
 * @type {ButtonRoleConfig}
 */
export const ROLE_CONFIGS = {
    link: {
        className: 'custom-btn',
        icon: faCircleArrowRight,
    },
    back_home: {
        className: 'custom-btn',
        icon: faCircleArrowLeft,
    },
    stop_capture: {
        className: 'custom-btn stop-capture',
        icon: faCircleStop,
    },
    start_capture: {
        className: 'custom-btn start-capture',
        icon: faCirclePlay,
    },
    apply_filter: {
        className: 'custom-btn apply_filter',
        icon: faFilter,
    },
    reset_filter: {
        className: 'custom-btn reset_filter',
        icon: faRotateLeft,
    },
    load_capture: {
        className: 'custom-btn load_capture',
        icon: faFilePen,
    }
};

/**
 * Diccionario de animaciones del icono del botón.
 * @type {IconAnimationConfig}
 */
export const ANIMATION_CONFIGS = {
    none: {
        className: 'custom-btn-icon',
        direction: '',
    },
    right: {
        className: 'custom-btn-icon animate-icon',
        direction: 'move-to-right',
    },
    left: {
        className: 'custom-btn-icon animate-icon',
        direction: 'move-to-left',
    }
};
