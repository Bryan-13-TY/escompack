import pimIcon from './assets/icon-pim.png'
import arpIcon from './assets/icon-arp.png';
import dvmrpIcon from './assets/icon-dvmrp.png';
import icmpIcon from './assets/icon-icmp.png';
import igmpIcon from './assets/icon-igmp.png';
import msdpIcon from './assets/icon-msdp.png';
import tcpIcon from './assets/icon-tcp.png';
import udpIcon from './assets/icon-udp.png';

export const PROTOCOL_ICONS = [
    {
        "icon": arpIcon,
        "acronym": "arp",},
    {
        "icon": icmpIcon,
        "acronym": "icmp",
    },
    {
        "icon": igmpIcon,
        "acronym": "igmp",
    },
    {
        "icon": dvmrpIcon,
        "acronym": "dvmrp",
    },
    {
        "icon": pimIcon,
        "acronym": "pim",
    },
    {
        "icon": msdpIcon,
        "acronym": "msdp",
    },
    {
        "icon": tcpIcon,
        "acronym": "tcp",
    },
    {
        "icon": udpIcon,
        "acronym": "udp",
    },
]

export const INFO_PROTOCOL_CARDS = [
    {
        "icon": arpIcon,
        "acronym": "ARP",
        "rep_es": "Protocolo de Resolución de Direcciones",
        "rep_en": "(Address Resolution Protocol)",
        "tcpip_layer": "Acceso a la Red",
        "functions": "Asocia una dirección lógica IP con una dirección física MAC dentro de una misma red local para poder entregar las traamas Ethernet al destinatario correcto.",
        "features": ["Elemento 1", "Elemento 2"],
    },
    {
        "icon": icmpIcon,
        "acronym": "ICMP",
        "rep_es": "Protocolo de Mensajes de Control de Internet",
        "rep_en": "(Internet Control Message Protocol)",
        "tcpip_layer": "Internet",
        "functions": "Notifica errores, problemas de conectividad, cogestión y realiza diagnósticos en el transporte de datagramas.",
        "features": ["Elemento 1", "Elemento 2"],
    },
    {
        "icon": igmpIcon,
        "acronym": "IGMP",
        "rep_es": "Protocolo de Gestión de Grupos de Internet",
        "rep_en": "(Internet Group Management Protocol)",
        "tcpip_layer": "Internet",
        "functions": "Permite a los hosts comunicar a sus routers locales su intención de unirse o salir de un grupo Multicast específico para recibir transmisiones multipunto.",
        "features": ["Elemento 1", "Elemento 2"],
    },
    {
        "icon": dvmrpIcon,
        "acronym": "DVMRP",
        "rep_es": "Protocolo de Enrutamiento Multicast por Vector Distancia",
        "rep_en": "(Distance Vector Multicast Routing Protocol)",
        "tcpip_layer": "Internet",
        "functions": "Enruta pquetes Multicast entre distintas redes a través de routers, construyendo árboles de distribución basados en el algoritmo de vector de distancia.",
        "features": ["Elemento 1", "Elemento 2"],
    },
    {
        "icon": pimIcon,
        "acronym": "PIM",
        "rep_es": "Multicast Independiente del Protocolo",
        "rep_en": "(Protocol Independent Multicast)",
        "tcpip_layer": "Internet",
        "functions": "Construye las tablas de reenvío y árboles de distribución Multicast aprovechando la tabla de rutas unicast existente en los routers.",
        "features": ["Elemento 1", "Elemento 2"],
    },
    {
        "icon": msdpIcon,
        "acronym": "MSDP",
        "rep_es": "Protocolo de Descubrimiento de Fuentes Multicast",
        "rep_en": "(Multicast Source Discovery Protocol)",
        "tcpip_layer": "Aplicación",
        "functions": "Interconecta múltiples dominios independientes que ejecutan PIM-SM, permitiéndoles compartir información sobre las fuentes Multicast activas sin consolidar una sola infraestructura global.",
        "features": ["Elemento 1", "Elemento 2"],
    },
    {
        "icon": tcpIcon,
        "acronym": "TCP",
        "rep_es": "Protocolo de Control de Transmisión",
        "rep_en": "(Transmission Control Protocol)",
        "tcpip_layer": "Transporte",
        "functions": "Proporciona un canal de comunicación confiable, ordenado y libre de errores punto a punto entre dos aplicaciones de software.",
        "features": ["Elemento 1", "Elemento 2"],
    },
    {
        "icon": udpIcon,
        "acronym": "UDP",
        "rep_es": "Protocolo de Datagramas de Usuario",
        "rep_en": "(User Datagram Protocol)",
        "tcpip_layer": "Transporte",
        "functions": "Ofrece un servicio de envío de datagramas liviano, de baja latencia y directo, sin verificación de entrega ni mantenimiento de estado.",
        "features": ["Elemento 1", "Elemento 2"],
    },
]
