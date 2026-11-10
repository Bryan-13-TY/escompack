from scapy.all import rdpcap

for numero, paquete in enumerate(rdpcap("captura.pcap"), start=1):
    print(numero, paquete.summary())
