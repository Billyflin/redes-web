import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {CopyIcon, MailIcon, Shield, Server, AlertTriangle, CheckCircle2, BarChart2, ExternalLink} from 'lucide-react'
import {toast} from "@/hooks/use-toast";



export default function Mail() {
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

  return (
    <div className="space-y-6">
     <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MailIcon className="mr-2 h-6 w-6" />
            Resumen Técnico Ampliado del EC2 de Mail
          </CardTitle>
          <CardDescription>
            Este resumen detalla la configuración y gestión del servidor de correo para el dominio andreavet.cl.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Shield className="mr-2 h-5 w-5" />
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
                    <CopyIcon className="h-4 w-4" />
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
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Acceso a través del webmail:
                </p>
                <div className="flex items-center space-x-2">
                  <a
                    href="https://mail.andreavet.cl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    https://mail.andreavet.cl
                  </a>
                  <Button
                    onClick={() => window.open('https://mail.andreavet.cl', '_blank')}
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Abrir Webmail
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Server className="mr-2 h-5 w-5" />
            1. Configuración Inicial del Servidor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-lg font-medium mb-2">Instalación de Docker y Docker Compose:</h4>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto relative">
              <code>{`sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER`}</code>
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
            </pre>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2">Configuración del Firewall (UFW):</h4>
            <p className="text-muted-foreground mb-2">Puertos habilitados para servicios de correo:</p>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto relative">
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
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MailIcon className="mr-2 h-5 w-5" />
            2. Configuración del Contenedor de Correo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-lg font-medium mb-2">Archivo `docker-compose.yml`:</h4>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto relative">
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
            </pre>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2">Inicio del Contenedor:</h4>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto relative">
              <code>{`docker-compose up -d`}</code>
              <Button
                className="absolute top-2 right-2"
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`docker-compose up -d`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            3. Gestión de Certificados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            <strong>Let&apos;s Encrypt:</strong> El contenedor genera automáticamente certificados TLS para `mail.andreavet.cl`.
            Esto garantiza conexiones seguras para servicios webmail y clientes de correo.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Server className="mr-2 h-5 w-5" />
            4. Configuración DNS del Dominio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium mb-2">Registros DNS configurados:</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>A</TableCell>
                <TableCell>mail.andreavet.cl</TableCell>
                <TableCell>23.20.243.69</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>MX</TableCell>
                <TableCell>andreavet.cl</TableCell>
                <TableCell>10 mail.andreavet.cl</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>CNAME</TableCell>
                <TableCell>autodiscover.andreavet.cl</TableCell>
                <TableCell>mail.andreavet.cl</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>TXT (SPF)</TableCell>
                <TableCell>andreavet.cl</TableCell>
                <TableCell>&quot;v=spf1 a mx ip4:23.20.243.69 ~all&quot;</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>TXT (DMARC)</TableCell>
                <TableCell>_dmarc.andreavet.cl</TableCell>
                <TableCell>&quot;v=DMARC1; p=none; rua=mailto:billy@andreavet.cl&quot;</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            5. Problemas Encontrados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-lg font-medium mb-2">Bloqueo del Puerto 25:</h4>
            <p className="text-muted-foreground">
              AWS no otorgó permisos para el uso del puerto 25, lo que impide enviar correos a dominios como Gmail. Sin embargo:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground mt-2">
              <li><strong>Correos internos funcionan:</strong> Correos enviados entre cuentas del dominio `andreavet.cl` funcionan sin problemas.</li>
              <li><strong>Recepción de correos:</strong> El servidor puede recibir correos de cualquier dominio externo.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2">Solicitud a AWS:</h4>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>Se llenó el formulario de habilitación del puerto 25, pero no fue aprobado.</li>
              <li>Como solución parcial, se utiliza el puerto 587 para clientes configurados.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            6. Validación de Funcionalidad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 text-muted-foreground space-y-2">
            <li><strong>Webmail:</strong>
              <ul className="list-disc pl-5 mt-2">
                <li>Accesible desde `https://mail.andreavet.cl`.</li>
                <li>Gestión de correos con interfaz intuitiva de `poste.io`.</li>
              </ul>
            </li>
            <li><strong>Clientes de Correo:</strong> Configurados para IMAP/SMTP en los puertos habilitados.</li>
            <li><strong>Pruebas Internas:</strong> Correos enviados entre cuentas del dominio funcionan correctamente.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart2 className="mr-2 h-5 w-5" />
            7. Monitoreo y Logs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-lg font-medium mb-2">Ver logs del contenedor:</h4>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto relative">
              <code>{`docker logs -f poste`}</code>
              <Button
                className="absolute top-2 right-2"
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(`docker logs -f poste`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </pre>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2">Estado del certificado:</h4>
            <p className="text-muted-foreground">Verificado automáticamente por Let&apos;s Encrypt.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            8. Conclusión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Este EC2 está optimizado para gestionar el correo del dominio `andreavet.cl`, soportando envíos internos y recepción desde dominios externos.
            Las limitaciones para enviar correos a Gmail están relacionadas con políticas de AWS sobre el puerto 25.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

