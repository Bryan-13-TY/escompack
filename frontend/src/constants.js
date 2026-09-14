import {
    faMoon,
    faSun,
    faCircleArrowRight,
    faCircleStop,
    faCirclePlay,
    faCircleArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

import darkPimIcon from './assets/icons/icon-pim-dark.png'
import darkArpIcon from './assets/icons/icon-arp-dark.png';
import darkDvmrpIcon from './assets/icons/icon-dvmrp-dark.png';
import darkIcmpIcon from './assets/icons/icon-icmp-dark.png';
import darkIgmpIcon from './assets/icons/icon-igmp-dark.png';
import darkMsdpIcon from './assets/icons/icon-msdp-dark.png';
import darkTcpIcon from './assets/icons/icon-tcp-dark.png';
import darkUdpIcon from './assets/icons/icon-udp-dark.png';

import lightPimIcon from './assets/icons/icon-pim-light.png'
import lightArpIcon from './assets/icons/icon-arp-light.png';
import lightDvmrpIcon from './assets/icons/icon-dvmrp-light.png';
import lightIcmpIcon from './assets/icons/icon-icmp-light.png';
import lightIgmpIcon from './assets/icons/icon-igmp-light.png';
import lightMsdpIcon from './assets/icons/icon-msdp-light.png';
import lightTcpIcon from './assets/icons/icon-tcp-light.png';
import lightUdpIcon from './assets/icons/icon-udp-light.png';

export const THEME_MODE_ICON = {
    dark: faSun,
    light: faMoon,
};

export const PROTOCOLS = [
    { id: "arp", label: "ARP", icon: {dark: darkArpIcon, light: lightArpIcon}, },
    { id: "icmp", label: "ICMP", icon: {dark: darkIcmpIcon, light: lightIcmpIcon}, },
    { id: "igmp", label: "IGMP", icon: {dark: darkIgmpIcon, light: lightIgmpIcon}, },
    { id: "dvmrp", label: "DVMRP", icon: {dark: darkDvmrpIcon, light: lightDvmrpIcon}, },
    { id: "pim", label: "PIM", icon: {dark: darkPimIcon, light: lightPimIcon}, },
    { id: "msdp", label: "MSDP", icon: {dark: darkMsdpIcon, light: lightMsdpIcon}, },
    { id: "tcp", label: "TCP", icon: {dark: darkTcpIcon, light: lightTcpIcon}, },
    { id: "udp", label: "UDP", icon: {dark: darkUdpIcon, light: lightUdpIcon}, },
];

export const PROTOCOL_CARDS = [
    {
        icon: {dark: darkArpIcon, light: lightArpIcon,},
        acronym: "ARP",
        rep: "(Address Resolution Protocol)",
        description: "Asocia direcciones IP con direcciones MAC.",
    },
    {
        icon: {dark: darkIcmpIcon, light: lightIcmpIcon,},
        acronym: "ICMP",
        rep: "(Internet Control Message Protocol)",
        description: "Se utiliza para diagnósticos y la notificación de errores.",
    },
    {
        icon: {dark: darkIgmpIcon, light: lightIgmpIcon,},
        acronym: "IGMP",
        rep: "(Internet Group Management Protocol)",
        description: "Gestiona las pertenencias a grupos de multidifusión IP.",
    },
    {
        icon: {dark: darkDvmrpIcon, light: lightDvmrpIcon,},
        acronym: "DVMRP",
        rep: "(Distance Vector Multicast Routing Protocol)",
        description: "Protocolo de enrutamiento multidestino.",
    },
    {
        icon: {dark: darkPimIcon, light: lightPimIcon,},
        acronym: "PIM",
        rep: "(Protocol Independent Multicast)",
        description: "Familia de protocolos de enrutamiento multidifusión.",
    },
    {
        icon: {dark: darkMsdpIcon, light: lightMsdpIcon,},
        acronym: "MSDP",
        rep: "(Multicast Source Discovery Protocol)",
        description: "Conecta múltiples dominios PIM-SM.",
    },
    {
        icon: {dark: darkTcpIcon, light: lightTcpIcon,},
        acronym: "TCP",
        rep: "(Transmission Control Protocol)",
        description: "Entrega de datos fiable y ordenada.",
    },
    {
        icon: {dark: darkUdpIcon, light: lightUdpIcon,},
        acronym: "UDP",
        rep: "(User Datagram Protocol)",
        description: "Modelo de transmisión sin conexión.",
    },
];

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
};

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
