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
        "rep": "(Address Resolution Protocol)",
        "tcpip_layer": "Acceso a la Red",
        "layer": "nal-layer",
        "functions": "Asocia una dirección lógica IP con una dirección física MAC dentro de una misma red local para poder entregar las traamas Ethernet al destinatario correcto.",
    },
    {
        "icon": icmpIcon,
        "acronym": "ICMP",
        "rep": "(Internet Control Message Protocol)",
        "tcpip_layer": "Internet",
        "layer": "il-layer",
        "functions": "Notifica errores, problemas de conectividad, cogestión y realiza diagnósticos en el transporte de datagramas.",
    },
    {
        "icon": igmpIcon,
        "acronym": "IGMP",
        "rep": "(Internet Group Management Protocol)",
        "tcpip_layer": "Internet",
        "layer": "il-layer",
        "functions": "Permite a los hosts comunicar a sus routers locales su intención de unirse o salir de un grupo Multicast específico para recibir transmisiones multipunto.",
    },
    {
        "icon": dvmrpIcon,
        "acronym": "DVMRP",
        "rep": "(Distance Vector Multicast Routing Protocol)",
        "tcpip_layer": "Internet",
        "layer": "il-layer",
        "functions": "Enruta pquetes Multicast entre distintas redes a través de routers, construyendo árboles de distribución basados en el algoritmo de vector de distancia.",
    },
    {
        "icon": pimIcon,
        "acronym": "PIM",
        "rep": "(Protocol Independent Multicast)",
        "tcpip_layer": "Internet",
        "layer": "il-layer",
        "functions": "Construye las tablas de reenvío y árboles de distribución Multicast aprovechando la tabla de rutas unicast existente en los routers.",
    },
    {
        "icon": msdpIcon,
        "acronym": "MSDP",
        "rep": "(Multicast Source Discovery Protocol)",
        "tcpip_layer": "Aplicación",
        "layer": "al-layer",
        "functions": "Interconecta múltiples dominios independientes que ejecutan PIM-SM, permitiéndoles compartir información sobre las fuentes Multicast activas sin consolidar una sola infraestructura global.",
    },
    {
        "icon": tcpIcon,
        "acronym": "TCP",
        "rep": "(Transmission Control Protocol)",
        "tcpip_layer": "Transporte",
        "layer": "tl-layer",
        "functions": "Proporciona un canal de comunicación confiable, ordenado y libre de errores punto a punto entre dos aplicaciones de software.",
    },
    {
        "icon": udpIcon,
        "acronym": "UDP",
        "rep": "(User Datagram Protocol)",
        "tcpip_layer": "Transporte",
        "layer": "tl-layer",
        "functions": "Ofrece un servicio de envío de datagramas liviano, de baja latencia y directo, sin verificación de entrega ni mantenimiento de estado.",
    },
]
