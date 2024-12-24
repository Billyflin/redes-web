import { Button } from "@/components/ui/button"
import { CopyIcon, MailIcon, Shield, Server, AlertTriangle, CheckCircle2, BarChart2 } from 'lucide-react'

export default function Mail() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
          <MailIcon className="mr-2 h-6 w-6" />
          Resumen Técnico Ampliado del EC2 de Mail
        </h2>
        <p className="text-gray-600 mb-4">
          Este resumen detalla la configuración y gestión del servidor de correo para el dominio andreavet.cl.
        </p>
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-700 flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Credenciales de Prueba:
          </h3>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <span className="font-medium mr-2">Usuario:</span>
              <code className="bg-gray-200 px-2 py-1 rounded">profe@andreavet.cl</code>
              <Button 
                className="ml-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard('profe@andreavet.cl')}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">Contraseña:</span>
              <code className="bg-gray-200 px-2 py-1 rounded">Prueba1234</code>
              <Button 
                className="ml-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard('Prueba1234')}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Acceso a través del webmail: https://mail.andreavet.cl</p>
        </div>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700 flex items-center">
          <Server className="mr-2 h-5 w-5" />
          1. Configuración Inicial del Servidor
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Instalación de Docker y Docker Compose:</h4>
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER`}</code>
              </pre>
              <Button 
                className="absolute top-2 right-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Configuración del Firewall (UFW):</h4>
            <p className="text-gray-600 mb-2">Puertos habilitados para servicios de correo:</p>
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`sudo apt install ufw
sudo ufw allow OpenSSH
sudo ufw allow 25       # SMTP
sudo ufw allow 80       # HTTP
sudo ufw allow 443      # HTTPS
sudo ufw allow 110      # POP3
sudo ufw allow 143      # IMAP
sudo ufw allow 587      # Submission
sudo ufw allow 993      # IMAP sobre TLS
sudo ufw allow 995      # POP3 sobre TLS
sudo ufw allow 4190     # Sieve
sudo ufw enable`}</code>
              </pre>
              <Button 
                className="absolute top-2 right-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`sudo apt install ufw
sudo ufw allow OpenSSH
sudo ufw allow 25       # SMTP
sudo ufw allow 80       # HTTP
sudo ufw allow 443      # HTTPS
sudo ufw allow 110      # POP3
sudo ufw allow 143      # IMAP
sudo ufw allow 587      # Submission
sudo ufw allow 993      # IMAP sobre TLS
sudo ufw allow 995      # POP3 sobre TLS
sudo ufw allow 4190     # Sieve
sudo ufw enable`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700 flex items-center">
          <MailIcon className="mr-2 h-5 w-5" />
          2. Configuración del Contenedor de Correo
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Archivo `docker-compose.yml`:</h4>
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`version: '3.8'

services:
  mail:
    image: analogic/poste.io:latest
    container_name: poste
    hostname: mail.andreavet.cl
    environment:
      - TZ=America/Santiago
      - HTTPS=1
      - SSL_LE_EMAIL=billy@andreavet.cl
    network_mode: "host"
    volumes:
      - ./data:/data
    restart: always`}</code>
              </pre>
              <Button 
                className="absolute top-2 right-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`version: '3.8'

services:
  mail:
    image: analogic/poste.io:latest
    container_name: poste
    hostname: mail.andreavet.cl
    environment:
      - TZ=America/Santiago
      - HTTPS=1
      - SSL_LE_EMAIL=billy@andreavet.cl
    network_mode: "host"
    volumes:
      - ./data:/data
    restart: always`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Inicio del Contenedor:</h4>
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`docker-compose up -d`}</code>
              </pre>
              <Button 
                className="absolute top-2 right-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`docker-compose up -d`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700 flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          3. Gestión de Certificados
        </h3>
        <p className="text-gray-600 mb-4">
          <strong>Let&apos;s Encrypt:</strong> El contenedor genera automáticamente certificados TLS para `mail.andreavet.cl`.
          Esto garantiza conexiones seguras para servicios webmail y clientes de correo.
        </p>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700 flex items-center">
          <Server className="mr-2 h-5 w-5" />
          4. Configuración DNS del Dominio
        </h3>
        <p className="text-gray-600 mb-2"><strong>Registros DNS configurados:</strong></p>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li><strong>Registro A:</strong> `mail.andreavet.cl` → `23.20.243.69`</li>
          <li><strong>Registro MX:</strong> Prioridad `10` apunta a `mail.andreavet.cl`</li>
          <li><strong>Registro CNAME:</strong> `autodiscover.andreavet.cl` → `mail.andreavet.cl`</li>
          <li><strong>Registros TXT:</strong>
            <ul className="list-disc pl-5 mt-2">
              <li>SPF: `&quot;v=spf1 a mx ip4:23.20.243.69 ~all&quot;`</li>
              <li>DMARC: `&quot;v=DMARC1; p=none; rua=mailto:billy@andreavet.cl&quot;`</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700 flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5" />
          5. Problemas Encontrados
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Bloqueo del Puerto 25:</h4>
            <p className="text-gray-600">
              AWS no otorgó permisos para el uso del puerto 25, lo que impide enviar correos a dominios como Gmail. Sin embargo:
            </p>
            <ul className="list-disc pl-5 text-gray-600 mt-2">
              <li><strong>Correos internos funcionan:</strong> Correos enviados entre cuentas del dominio `andreavet.cl` funcionan sin problemas.</li>
              <li><strong>Recepción de correos:</strong> El servidor puede recibir correos de cualquier dominio externo.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Solicitud a AWS:</h4>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Se llenó el formulario de habilitación del puerto 25, pero no fue aprobado.</li>
              <li>Como solución parcial, se utiliza el puerto 587 para clientes configurados.</li>
            </ul>
          </div>
        </div>
      </section>


      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700 flex items-center">
          <CheckCircle2 className="mr-2 h-5 w-5" />
          6. Validación de Funcionalidad
        </h3>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li><strong>Webmail:</strong>
            <ul className="list-disc pl-5 mt-2">
              <li>Accesible desde `https://mail.andreavet.cl`.</li>
              <li>Gestión de correos con interfaz intuitiva de `poste.io`.</li>
            </ul>
          </li>
          <li><strong>Clientes de Correo:</strong> Configurados para IMAP/SMTP en los puertos habilitados.</li>
          <li><strong>Pruebas Internas:</strong> Correos enviados entre cuentas del dominio funcionan correctamente.</li>
        </ul>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700 flex items-center">
          <BarChart2 className="mr-2 h-5 w-5" />
          7. Monitoreo y Logs
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Ver logs del contenedor:</h4>
            <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`docker logs -f poste`}</code>
              </pre>
              <Button 
                className="absolute top-2 right-2" 
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`docker logs -f poste`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-700">Estado del certificado:</h4>
            <p className="text-gray-600">Verificado automáticamente por Let&apos;s Encrypt.</p>
          </div>
        </div>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700 flex items-center">
          <CheckCircle2 className="mr-2 h-5 w-5" />
          8. Conclusión
        </h3>
        <p className="text-gray-600">
          Este EC2 está optimizado para gestionar el correo del dominio `andreavet.cl`, soportando envíos internos y recepción desde dominios externos. 
          Las limitaciones para enviar correos a Gmail están relacionadas con políticas de AWS sobre el puerto 25.
        </p>
      </section>
    </div>
  )
}

