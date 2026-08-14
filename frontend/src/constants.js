import { faMoon, faS, faSun } from '@fortawesome/free-solid-svg-icons';

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
    dark: faMoon,
    light: faSun,
}

export const PROTOCOLS = [
    { id: "arp", label: "ARP", darkicon: darkArpIcon, lighticon: lightArpIcon, },
    { id: "icmp", label: "ICMP", darkicon: darkIcmpIcon, lighticon: lightIcmpIcon, },
    { id: "igmp", label: "IGMP", darkicon: darkIgmpIcon, lighticon: lightIgmpIcon, },
    { id: "dvmrp", label: "DVMRP", darkicon: darkDvmrpIcon, lighticon: lightDvmrpIcon, },
    { id: "pim", label: "PIM", darkicon: darkPimIcon, lighticon: lightPimIcon, },
    { id: "msdp", label: "MSDP", darkicon: darkMsdpIcon, lighticon: lightMsdpIcon, },
    { id: "tcp", label: "TCP", darkicon: darkTcpIcon, lighticon: lightTcpIcon, },
    { id: "udp", label: "UDP", darkicon: darkUdpIcon, lighticon: lightUdpIcon, },
]

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
]
