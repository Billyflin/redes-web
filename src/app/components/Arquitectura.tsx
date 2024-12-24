import Image from 'next/image'
import Mermaid from "@/app/components/Mermaid"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Arquitectura() {
    const diagram = `
graph TD
    subgraph Cloudflare
        DNS[Gestión de DNS]
        Tunnel1[Túnel: stream.andreavet.cl]
        Tunnel2[Túnel: download.andreavet.cl]
    end

    subgraph GitHub
        Pages[GitHub Pages]
    end

    subgraph AWS
        EC2_Mail[EC2: mail.andreavet.cl]
        EC2_Stream[EC2: stream.andreavet.cl]
        EC2_Download[EC2: download.andreavet.cl]
    end

    DNS -->|Tráfico web| Pages
    DNS -->|Tráfico de correo| EC2_Mail
    DNS -->|Túnel seguro| Tunnel1
    DNS -->|Túnel seguro| Tunnel2

    EC2_Mail -->|SMTP/IMAP| MailService[Poste.io]
    EC2_Mail -->|Certificado TLS| LetsEncrypt[Let's Encrypt]
    
    Tunnel1 -->|Streaming multimedia| Jellyfin
    Tunnel1 -->|Transferencias FTP| FTPService[Alpine FTP Server]

    Tunnel2 -->|Descargas| Transmission

    EC2_Stream -->|Certificado TLS| GoogleCert[Google Trust Services]
    EC2_Download -->|Certificado TLS| GoogleCert[Google Trust Services]
  `

    const dnsRecords = [
        { type: 'SOA', name: 'andreavet.cl', value: 'aaron.ns.cloudflare.com. dns.cloudflare.com. 2048670054 10000 2400 604800 3600', ttl: '3600' },
        { type: 'NS', name: 'andreavet.cl', value: 'aaron.ns.cloudflare.com\nolivia.ns.cloudflare.com', ttl: '86400' },
        { type: 'A', name: 'andreavet.cl', value: '185.199.111.153\n185.199.110.153\n185.199.109.153\n185.199.108.153', ttl: '1' },
        { type: 'A', name: 'mail.andreavet.cl', value: '23.20.243.69', ttl: '1' },
        { type: 'AAAA', name: 'andreavet.cl', value: '2606:50c0:8003::153\n2606:50c0:8002::153\n2606:50c0:8001::153\n2606:50c0:8000::153', ttl: '1' },
        { type: 'CNAME', name: 'autodiscover.andreavet.cl', value: 'mail.andreavet.cl', ttl: '1' },
        { type: 'CNAME', name: 'download.andreavet.cl', value: '3cae25fd-1a76-4375-ae3e-6d99650c99d5.cfargotunnel.com', ttl: '1' },
        { type: 'CNAME', name: 'stream.andreavet.cl', value: '3cae25fd-1a76-4375-ae3e-6d99650c99d5.cfargotunnel.com', ttl: '1' },
        { type: 'CNAME', name: 'www.andreavet.cl', value: 'billyflin.github.io', ttl: '1' },
        { type: 'MX', name: 'andreavet.cl', value: '10 mail.andreavet.cl', ttl: '1' },
        { type: 'TXT', name: 'andreavet.cl', value: '"v=spf1 a mx ip4:23.20.243.69 ~all"', ttl: '3600' },
        { type: 'TXT', name: '_dmarc.andreavet.cl', value: '"v=DMARC1; p=none; rua=mailto:billy@andreavet.cl"', ttl: '1' },
        { type: 'TXT', name: 's20241223970._domainkey.andreavet.cl', value: '"k=rsa; p=MIIBIjANBgkqhkiG9..."', ttl: '1' },
    ]

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Visión General de la Arquitectura</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">
                        Este proyecto utiliza una arquitectura distribuida que combina servicios en la nube y servidores
                        propios para crear una infraestructura robusta y escalable. Los principales componentes incluyen:
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground mb-6">
                        <li>Cloudflare para gestión de DNS y túneles de seguridad</li>
                        <li>AWS EC2 para alojar servicios críticos</li>
                        <li>GitHub Pages para el despliegue de la página principal</li>
                        <li>Servicios de correo, streaming y descargas alojados en instancias EC2</li>
                    </ul>
                    <div className="bg-muted p-4 rounded-md shadow">
                        <Mermaid chart={diagram} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Configuración DNS</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">
                        La configuración DNS es crucial para dirigir el tráfico a los servicios correctos. Utilizamos
                        Cloudflare como nuestro proveedor de DNS principal debido a su rendimiento y características de
                        seguridad.
                    </p>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Valor</TableHead>
                                    <TableHead>TTL</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dnsRecords.map((record, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{record.type}</TableCell>
                                        <TableCell>{record.name}</TableCell>
                                        <TableCell className="whitespace-pre-wrap">{record.value}</TableCell>
                                        <TableCell>{record.ttl}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Diferencias entre Servidores de Correo y Streaming</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 text-muted-foreground">
                        <li>El servidor de correo (mail.andreavet.cl) utiliza un certificado TLS gestionado
                            por <strong>Let&apos;s Encrypt</strong>.
                        </li>
                        <li>El servidor de streaming utiliza un certificado de <strong>Google Trust Services</strong>.</li>
                        <li>Estas diferencias en los certificados reflejan las distintas necesidades y configuraciones de
                            cada servicio.
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Explicación de Registros DNS Clave</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">SPF (Sender Policy Framework)</h3>
                            <p className="text-muted-foreground">
                                El registro SPF (v=spf1 a mx ip4:23.20.243.69 ~all) especifica qué servidores están
                                autorizados a enviar correos electrónicos en nombre del dominio. Esto ayuda a prevenir la
                                suplantación de correo electrónico.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">DKIM (DomainKeys Identified Mail)</h3>
                            <p className="text-muted-foreground">
                                El registro DKIM (s20241223970._domainkey) contiene la clave pública utilizada para
                                verificar la firma digital en los correos electrónicos salientes. Esto asegura que los
                                mensajes no han sido alterados en tránsito.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">DMARC (Domain-based Message Authentication, Reporting, and Conformance)</h3>
                            <p className="text-muted-foreground">
                                El registro DMARC (v=DMARC1; p=none; rua=mailto:billy@andreavet.cl) especifica cómo manejar
                                los correos electrónicos que fallan en las verificaciones SPF o DKIM. En este caso, está
                                configurado en modo de monitoreo (p=none) y envía informes a billy@andreavet.cl.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Importancia de DMARC</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">
                        DMARC se agregó para mejorar la seguridad del correo electrónico y proteger contra la suplantación
                        de identidad. Funciona en conjunto con SPF y DKIM para proporcionar una capa adicional de
                        autenticación y reportes.
                    </p>
                    <h3 className="text-lg font-semibold mb-2">Cómo funciona DMARC:</h3>
                    <ol className="list-decimal pl-5 text-muted-foreground space-y-2">
                        <li>Cuando se recibe un correo electrónico, el servidor receptor verifica los registros SPF y
                            DKIM.
                        </li>
                        <li>Luego, el servidor comprueba la política DMARC del dominio remitente.</li>
                        <li>Basándose en esta política, el servidor decide qué hacer con el correo (rechazar, poner en
                            cuarentena o permitir).
                        </li>
                        <li>DMARC también proporciona un mecanismo de retroalimentación, enviando informes sobre los correos
                            electrónicos que fallan en la autenticación.
                        </li>
                    </ol>
                    <p className="text-muted-foreground mt-4">
                        En nuestra configuración actual (p=none), DMARC está en modo de monitoreo, lo que nos permite
                        recopilar datos sobre la autenticación de correos electrónicos sin afectar la entrega. Esto es útil
                        para evaluar el impacto antes de implementar una política más estricta.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
