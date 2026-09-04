# Guía de GNS3
Aquí se listan los distintos comandos para **GNS3**, ya que lo vamos a usar para la aplicación.

## Modo configuración
```
R1(config)#interface <interface>
R1(config)exit
R1(config)#ip route <destination_network> <netmask> <gateway>
R1(config)#ip route 0.0.0.0 0.0.0.0 <next_leap>
```

## Modo configuración de la interfaz
```
R1(config-if)#ip address <IP_direction> <netmask>
R1(config-if)#no shutdown
R1(config-if)#do write
R1(config-if)#do show ip route
R1(config-if)#do show ip interface brief
```

## Configurar el protocolo de enrutamiento RIP
```
R1#configure terminal
R1(config)#router rip
R1(config-router)#version 2
R1(config-router)#no auto-summary
R1(config-router)#network <directly_network>
R1(config-router)#passive-interface <interface> 
```

## Configurar el protocolo de enrutamiento OSPF
```
R1#configure terminal
R1(config)#router ospf <process_ID>
R1(config-router)#network <directly_network> <wildcard> area <area_ID>
R1(config-router)#passive-interface <interface>
R1(config-router)#do show ospf neighbors
```

## Configurar el protocolo de enrutamiento EIGRP
```
R1#configure terminal
R1(config)#router eigrp <key>
R1(config-router)#no auto-summary
R1(config-router)#network <network_directly> <wildcard>
R1(config-router)#do show ip neighbors
R1(config-router)#do show ip eigrp neighbors 
```
