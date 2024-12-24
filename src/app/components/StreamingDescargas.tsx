import { Button } from "@/components/ui/button"
import { CopyIcon } from 'lucide-react'

export default function StreamingDescargas() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Resumen Técnico del EC2 de Streaming</h2>
        <p className="text-gray-600 mb-4">
          Este resumen incluye los comandos esenciales y configuraciones aplicadas en el EC2 utilizado para el subdominio `stream.andreavet.cl`.
        </p>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">1. Configuración Inicial del EC2</h3>
        <p className="text-gray-600 mb-2"><strong>Sistema Operativo:</strong> Ubuntu Server</p>
        <p className="text-gray-600 mb-2"><strong>Actualización del Sistema:</strong></p>
        <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
          <pre className="text-sm overflow-x-auto">
            <code>{`sudo apt update && sudo apt upgrade -y
sudo apt install ufw docker.io docker-compose -y`}</code>
          </pre>
          <Button 
            className="absolute top-2 right-2" 
            size="sm"
            variant="ghost"
            onClick={() => copyToClipboard(`sudo apt update && sudo apt upgrade -y
sudo apt install ufw docker.io docker-compose -y`)}
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-gray-600 mb-2"><strong>Configuración del Firewall:</strong></p>
        <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
          <pre className="text-sm overflow-x-auto">
            <code>{`sudo ufw allow OpenSSH
sudo ufw allow 21          # FTP
sudo ufw allow 21000:21010 # FTP conexiones pasivas
sudo ufw allow 32400       # Jellyfin
sudo ufw enable`}</code>
          </pre>
          <Button 
            className="absolute top-2 right-2" 
            size="sm"
            variant="ghost"
            onClick={() => copyToClipboard(`sudo ufw allow OpenSSH
sudo ufw allow 21          # FTP
sudo ufw allow 21000:21010 # FTP conexiones pasivas
sudo ufw allow 32400       # Jellyfin
sudo ufw enable`)}
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">2. Configuración de Docker Compose</h3>
        <p className="text-gray-600 mb-2"><strong>Archivo `docker-compose.yml`:</strong></p>
        <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
          <pre className="text-sm overflow-x-auto">
            <code>{`version: "3.7"

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
      - /home/ubuntu/movies:/home/ftpuser`}</code>
          </pre>
          <Button 
            className="absolute top-2 right-2" 
            size="sm"
            variant="ghost"
            onClick={() => copyToClipboard(`version: "3.7"

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
      - /home/ubuntu/movies:/home/ftpuser`)}
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-gray-600 mb-2"><strong>Inicio de Contenedores:</strong></p>
        <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
          <pre className="text-sm overflow-x-auto">
            <code>{`sudo docker-compose up -d`}</code>
          </pre>
          <Button 
            className="absolute top-2 right-2" 
            size="sm"
            variant="ghost"
            onClick={() => copyToClipboard(`sudo docker-compose up -d`)}
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">3. Configuración de Servicios</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Jellyfin (Streaming Multimedia)</h4>
            <p className="text-gray-600 mb-2"><strong>Propósito:</strong> Servir contenido multimedia desde `/home/ubuntu/movies`.</p>
            <p className="text-gray-600 mb-2"><strong>Configuración:</strong></p>
            <ul className="list-disc pl-5 text-gray-600 mb-2">
              <li>Mapeo de volumen para medios: `/home/ubuntu/movies:/media`.</li>
              <li>Puerto: `32400`.</li>
            </ul>
            <p className="text-gray-600 mb-2"><strong>Comando para verificar estado:</strong></p>
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`sudo docker logs jellyfin`}</code>
              </pre>
              <Button 
                className="absolute top-2 right-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`sudo docker logs jellyfin`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Transmission (Gestión de Descargas)</h4>
            <p className="text-gray-600 mb-2"><strong>Propósito:</strong> Descargar torrents y almacenarlos en `/home/ubuntu/movies`.</p>
            <p className="text-gray-600 mb-2"><strong>Configuración:</strong></p>
            <ul className="list-disc pl-5 text-gray-600 mb-2">
              <li>Mapeo de volumen: `/home/ubuntu/movies:/downloads`.</li>
              <li>Puerto: `9091`.</li>
            </ul>
            <p className="text-gray-600 mb-2"><strong>Comando para verificar estado:</strong></p>
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`sudo docker logs transmission`}</code>
              </pre>
              <Button 
                className="absolute top-2 right-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`sudo docker logs transmission`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">FTP Server (Transferencia de Archivos)</h4>
            <p className="text-gray-600 mb-2"><strong>Propósito:</strong> Compartir archivos mediante FTP.</p>
            <p className="text-gray-600 mb-2"><strong>Configuración:</strong></p>
            <ul className="list-disc pl-5 text-gray-600 mb-2">
              <li>Mapeo de volumen: `/home/ubuntu/movies:/home/ftpuser`.</li>
              <li>Puertos: `21` (activo), `21000-21010` (pasivo).</li>
            </ul>
            <p className="text-gray-600 mb-2"><strong>Comando para verificar estado:</strong></p>
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`sudo docker logs ftp`}</code>
              </pre>
              <Button 
                className="absolute top-2 right-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`sudo docker logs ftp`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Cloudflare Tunnel (Conexión Segura)</h4>
            <p className="text-gray-600 mb-2"><strong>Propósito:</strong> Enrutar tráfico de `stream.andreavet.cl` a través de Cloudflare.</p>
            <p className="text-gray-600 mb-2"><strong>Comando para configurar el túnel:</strong></p>
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`cloudflared tunnel --no-autoupdate run --token <TOKEN>`}</code>
              </pre>
              <Button 
                className="absolute top-2 right-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`cloudflared tunnel --no-autoupdate run --token <TOKEN>`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">4. Configuración de DNS</h3>
        <p className="text-gray-600 mb-2">Configuraciones DNS en Cloudflare para conectar servicios:</p>
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`CNAME Record:
Name: stream.andreavet.cl
Target: <Túnel Cloudflare>
TTL: Auto
Proxy status: Proxied`}</code>
          </pre>
        </div>
        <p className="text-gray-600">FTP Server: No requiere cambios en DNS, se conecta usando la IP pública.</p>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">5. Verificaciones y Pruebas</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Verificar Jellyfin:</h4>
            <p className="text-gray-600">Abrir en el navegador:</p>
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`http://stream.andreavet.cl:32400`}</code>
              </pre>
              <Button 
                className="absolute top-2 right-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`http://stream.andreavet.cl:32400`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Verificar Transmission:</h4>
            <p className="text-gray-600">Acceso desde el navegador:</p>
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`http://stream.andreavet.cl:9091`}</code>
              </pre>
              <Button 
                className="absolute top-2 right-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`http://stream.andreavet.cl:9091`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Verificar FTP:</h4>
            <p className="text-gray-600">Conectar usando cliente FTP (ejemplo con FileZilla):</p>
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`Host: stream.andreavet.cl
User: ftpuser
Password: ftppass
Port: 21`}</code>
              </pre>
              <Button 
                className="absolute top-2 right-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`Host: stream.andreavet.cl
User: ftpuser
Password: ftppass
Port: 21`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">6. Diagnóstico</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Ver logs de contenedores:</h4>
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`sudo docker logs <nombre_contenedor>`}</code>
              </pre>
              <Button 
                className="absolute top-2 right-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`sudo docker logs <nombre_contenedor>`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Reiniciar contenedores:</h4>
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`sudo docker-compose restart`}</code>
              </pre>
              <Button 
                className="absolute top-2 right-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`sudo docker-compose restart`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Revisar puertos abiertos:</h4>
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`sudo ufw status`}</code>
              </pre>
              <Button 
                className="absolute top-2 right-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`sudo ufw status`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Verificar conexiones activas:</h4>
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`sudo netstat -tuln`}</code>
              </pre>
              <Button 
                className="absolute top-2 right-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`sudo netstat -tuln`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Resultado</h3>
        <p className="text-gray-600">
          El servidor de streaming (`stream.andreavet.cl`) está configurado para:
        </p>
        <ol className="list-decimal pl-5 text-gray-600 space-y-2">
          <li>Proveer contenido multimedia con Jellyfin.</li>
          <li>Gestionar descargas con Transmission.</li>
          <li>Ofrecer transferencia de archivos mediante FTP.</li>
          <li>Todo protegido y enrutable usando un túnel seguro de Cloudflare.</li>
        </ol>
      </section>
    </div>
  )
}

