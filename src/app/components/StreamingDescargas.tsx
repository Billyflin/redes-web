import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card"
import {CopyIcon, ExternalLink, Shield} from 'lucide-react'
import {useToast} from "@/hooks/use-toast";

export default function StreamingDescargas() {
    const {toast} = useToast()

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast({
                title: "Texto copiado al portapapeles." ,
                description:  text ,
            })
        }, (err) => {
            console.error('Error al copiar texto: ', err);
            toast({
                title: "Error",
                description: "No se pudo copiar el texto al portapapeles.",
                variant: "destructive",
            })
        });
    }

    const CodeBlock = ({code}: { code: string }) => (
        <div className="relative">
      <pre className="text-sm overflow-x-auto bg-muted p-4 rounded-md">
        <code>{code}</code>
      </pre>
            <Button
                className="absolute top-2 right-2"
                size="icon"
                variant="ghost"
                onClick={() => copyToClipboard(code)}
            >
                <CopyIcon className="h-4 w-4"/>
            </Button>
        </div>
    )

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Resumen Técnico del EC2 de Streaming</CardTitle>
                    <CardDescription>
                        Este resumen incluye los comandos esenciales y configuraciones aplicadas en el EC2 utilizado
                        para el subdominio `stream.andreavet.cl`.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-lg">
                                <Shield className="mr-2 h-5 w-5"/>
                                Credenciales de Prueba
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <span className="font-medium mr-2">Usuario:</span>
                                    <code className="bg-muted px-2 py-1 rounded">profe@andreavet.cl</code>
                                    <Button
                                        className="ml-2"
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => copyToClipboard('profe@andreavet.cl')}
                                    >
                                        <CopyIcon className="h-4 w-4"/>
                                    </Button>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium mr-2">Contraseña:</span>
                                    <code className="bg-muted px-2 py-1 rounded">Prueba1234</code>
                                    <Button
                                        className="ml-2"
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => copyToClipboard('Prueba1234')}
                                    >
                                        <CopyIcon className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Acceso a través de la web stream:
                                </p>
                                <div className="flex items-center space-x-2">
                                    <a
                                        href="https://stream.andreavet.cl"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        https://stream.andreavet.cl
                                    </a>
                                    <Button
                                        onClick={() => window.open('https://stream.andreavet.cl', '_blank')}
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center"
                                    >
                                        <ExternalLink className="mr-2 h-4 w-4"/>
                                        Abrir Stream
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>1. Configuración Inicial del EC2</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="font-semibold">Sistema Operativo:</p>
                        <p>Ubuntu Server</p>
                    </div>
                    <div>
                        <p className="font-semibold">Actualización del Sistema:</p>
                        <CodeBlock code={`sudo apt update && sudo apt upgrade -y
sudo apt install ufw docker.io docker-compose -y`}/>
                    </div>
                    <div>
                        <p className="font-semibold">Configuración del Firewall:</p>
                        <CodeBlock code={`sudo ufw allow OpenSSH
sudo ufw allow 21          # FTP
sudo ufw allow 21000:21010 # FTP conexiones pasivas
sudo ufw allow 32400       # Jellyfin
sudo ufw enable`}/>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>2. Configuración de Docker Compose</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="font-semibold">Archivo `docker-compose.yml`:</p>
                        <CodeBlock code={`version: "3.7"

services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    network_mode: "host"
    restart: unless-stopped
    environment:
      - TZ=America/Argentina/Mendoza
    volumes:
      - ./config:/config
      - ./cache:/cache
      - /home/ubuntu/movies:/media

  cloudflared:
    image: cloudflare/cloudflared:latest
    container_name: cloudflared
    command: tunnel --no-autoupdate run --token <TOKEN>
    network_mode: "host"
    restart: unless-stopped

  transmission:
    image: linuxserver/transmission:latest
    container_name: transmission
    network_mode: "host"
    restart: unless-stopped
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Argentina/Mendoza
    volumes:
      - ./transmission:/config
      - /home/ubuntu/movies:/downloads

  ftp:
    image: delfer/alpine-ftp-server
    container_name: ftp
    restart: unless-stopped
    ports:
      - "21:21"
      - "21000-21010:21000-21010"
    environment:
      - USERS=ftpuser|ftppass
    volumes:
      - /home/ubuntu/movies:/home/ftpuser`}/>
                    </div>
                    <div>
                        <p className="font-semibold">Inicio de Contenedores:</p>
                        <CodeBlock code={`sudo docker-compose up -d`}/>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>3. Configuración de Servicios</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {[
                        {
                            title: "Jellyfin (Streaming Multimedia)",
                            purpose: "Servir contenido multimedia desde `/home/ubuntu/movies`.",
                            config: [
                                "Mapeo de volumen para medios: `/home/ubuntu/movies:/media`.",
                                "Puerto: `32400`."
                            ],
                            command: "sudo docker logs jellyfin"
                        },
                        {
                            title: "Transmission (Gestión de Descargas)",
                            purpose: "Descargar torrents y almacenarlos en `/home/ubuntu/movies`.",
                            config: [
                                "Mapeo de volumen: `/home/ubuntu/movies:/downloads`.",
                                "Puerto: `9091`."
                            ],
                            command: "sudo docker logs transmission"
                        },
                        {
                            title: "FTP Server (Transferencia de Archivos)",
                            purpose: "Compartir archivos mediante FTP.",
                            config: [
                                "Mapeo de volumen: `/home/ubuntu/movies:/home/ftpuser`.",
                                "Puertos: `21` (activo), `21000-21010` (pasivo)."
                            ],
                            command: "sudo docker logs ftp"
                        },
                        {
                            title: "Cloudflare Tunnel (Conexión Segura)",
                            purpose: "Enrutar tráfico de `stream.andreavet.cl` a través de Cloudflare.",
                            config: [],
                            command: "cloudflared tunnel --no-autoupdate run --token <TOKEN>"
                        }
                    ].map((service, index) => (
                        <div key={index} className="space-y-2">
                            <h4 className="text-lg font-semibold">{service.title}</h4>
                            <p><strong>Propósito:</strong> {service.purpose}</p>
                            {service.config.length > 0 && (
                                <>
                                    <p><strong>Configuración:</strong></p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {service.config.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            <p><strong>Comando para verificar estado:</strong></p>
                            <CodeBlock code={service.command}/>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>4. Configuración de DNS</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>Configuraciones DNS en Cloudflare para conectar servicios:</p>
                    <CodeBlock code={`CNAME Record:
Name: stream.andreavet.cl
Target: <Túnel Cloudflare>
TTL: Auto
Proxy status: Proxied`}/>
                    <p>FTP Server: No requiere cambios en DNS, se conecta usando la IP pública.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>5. Verificaciones y Pruebas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {[
                        {
                            title: "Verificar Jellyfin:",
                            instruction: "Abrir en el navegador:",
                            code: "http://stream.andreavet.cl:32400"
                        },
                        {
                            title: "Verificar Transmission:",
                            instruction: "Acceso desde el navegador:",
                            code: "http://stream.andreavet.cl:9091"
                        },
                        {
                            title: "Verificar FTP:",
                            instruction: "Conectar usando cliente FTP (ejemplo con FileZilla):",
                            code: `Host: stream.andreavet.cl
User: ftpuser
Password: ftppass
Port: 21`
                        }
                    ].map((item, index) => (
                        <div key={index} className="space-y-2">
                            <h4 className="text-lg font-semibold">{item.title}</h4>
                            <p>{item.instruction}</p>
                            <CodeBlock code={item.code}/>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>6. Diagnóstico</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {[
                        {
                            title: "Ver logs de contenedores:",
                            code: "sudo docker logs <nombre_contenedor>"
                        },
                        {
                            title: "Reiniciar contenedores:",
                            code: "sudo docker-compose restart"
                        },
                        {
                            title: "Revisar puertos abiertos:",
                            code: "sudo ufw status"
                        },
                        {
                            title: "Verificar conexiones activas:",
                            code: "sudo netstat -tuln"
                        }
                    ].map((item, index) => (
                        <div key={index} className="space-y-2">
                            <h4 className="text-lg font-semibold">{item.title}</h4>
                            <CodeBlock code={item.code}/>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Resultado</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        El servidor de streaming (`stream.andreavet.cl`) está configurado para:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 mt-2">
                        <li>Proveer contenido multimedia con Jellyfin.</li>
                        <li>Gestionar descargas con Transmission.</li>
                        <li>Ofrecer transferencia de archivos mediante FTP.</li>
                        <li>Todo protegido y enrutable usando un túnel seguro de Cloudflare.</li>
                    </ol>
                </CardContent>
            </Card>
        </div>
    )
}

