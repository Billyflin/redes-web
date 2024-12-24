import {useMemo, useState} from "react";
import { Cloud, Globe, Mail, Server, Shield, Sun, Moon, Search } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "@/app/hooks/useDarkMode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/app/lib/utils"

const dnsRecords = [
  {
    type: "A Record",
    name: "andreavet.cl",
    value: ["185.199.111.153", "185.199.110.153", "185.199.109.153", "185.199.108.153"],
    icon: <Globe className="w-8 h-8" />,
    connection: "Apunta al hosting de GitHub Pages para servir la página principal del proyecto.",
    internalSetup: "Configuración no necesaria en el servidor ya que GitHub Pages gestiona el contenido.",
  },
  {
    type: "A Record",
    name: "mail.andreavet.cl",
    value: "23.20.243.69",
    icon: <Mail className="w-8 h-8" />,
    connection: "Conecta al servidor de correo configurado en AWS.",
    internalSetup: (
      <>
        El servidor corre un contenedor <code>poste.io</code> configurado con Docker:
        <ul className="mt-2 list-disc ml-4 text-sm">
          <li>Network mode: Host (acceso directo a los puertos).</li>
          <li>Puertos abiertos: 25, 80, 110, 143, 443, 587, 993, 995, 4190.</li>
          <li>SSL gestionado automáticamente con Let's Encrypt.</li>
        </ul>
      </>
    ),
  },
  {
    type: "CNAME Record",
    name: "stream.andreavet.cl",
    value: "3cae25fd-1a76-4375-ae3e-6d99650c99d5.cfargotunnel.com",
    icon: <Cloud className="w-8 h-8" />,
    connection: "Redirige al servidor de streaming usando un túnel seguro de Cloudflare.",
    internalSetup: (
      <>
        En este servidor corren los servicios:
        <ul className="mt-2 list-disc ml-4 text-sm">
          <li><strong>Jellyfin:</strong> Para transmisión multimedia.</li>
          <li><strong>Transmission:</strong> Para descargas y administración de torrents.</li>
          <li><strong>FTP Server:</strong> Para transferencias de archivos usando Alpine FTP Server.</li>
          <li>Puertos abiertos: 21, 21000-21010 (FTP), 32400 (Jellyfin).</li>
        </ul>
      </>
    ),
  },
  {
    type: "CNAME Record",
    name: "download.andreavet.cl",
    value: "3cae25fd-1a76-4375-ae3e-6d99650c99d5.cfargotunnel.com",
    icon: <Cloud className="w-8 h-8" />,
    connection: "Dirige las solicitudes de descarga al túnel seguro de Cloudflare.",
    internalSetup: (
      <>
        Usa el mismo túnel que <strong>stream.andreavet.cl</strong> para gestionar las descargas,
        integrando el servicio <code>Transmission</code> configurado en el contenedor.
      </>
    ),
  },
  {
    type: "MX Record",
    name: "andreavet.cl",
    value: "10 mail.andreavet.cl",
    icon: <Server className="w-8 h-8" />,
    connection: "Especifica el servidor para gestionar correos.",
    internalSetup: "Se integra con el servidor configurado en el subdominio mail.andreavet.cl.",
  },
  {
    type: "TXT Record",
    name: "andreavet.cl",
    value: `"v=spf1 a mx ip4:23.20.243.69 ~all"`,
    icon: <Shield className="w-8 h-8" />,
    connection: "Define políticas SPF para evitar que correos no autorizados utilicen el dominio.",
    internalSetup: "Configuración externa para autenticación de correos. No requiere ajustes adicionales en EC2.",
  },
];

export default function DNSArchitecture() {
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const filteredRecords = useMemo(() => {
    return dnsRecords.filter((record) =>
      Object.values(record).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className={`p-8 rounded-lg shadow-lg transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100'
    }`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Conexiones DNS: ¿Cómo se conectan las cosas?</h2>
        <Button
          onClick={toggleDarkMode}
          variant="outline"
          size="icon"
          aria-label={isDarkMode ? "Activar modo claro" : "Activar modo oscuro"}
        >
          {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </div>
      <p className={`text-center mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Esta sección explica cómo las configuraciones DNS conectan cada servicio del dominio con su destino, además de las configuraciones internas de cada servidor.
      </p>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Buscar registros DNS..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredRecords.map((record, index) => (
            <motion.div
              key={record.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={`p-6 rounded-md shadow-md flex flex-col space-y-4 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={isDarkMode ? 'text-blue-400' : 'text-blue-500'}>
                  {record.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{record.name}</h3>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <strong>Tipo:</strong> {record.type}
                  </p>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <strong>Valor:</strong>{" "}
                    {Array.isArray(record.value) ? record.value.join(", ") : record.value}
                  </p>
                </div>
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  <strong>Conexión:</strong> {record.connection}
                </p>
                <div className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  <strong>Configuración Interna:</strong> {record.internalSetup}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className={`text-center mt-8 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              ¿Necesitas ayuda con términos técnicos? ¡Haz clic aquí!
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>DNS: Sistema de Nombres de Dominio</p>
            <p>A Record: Registro de dirección</p>
            <p>CNAME: Nombre Canónico</p>
            <p>MX: Intercambio de Correo</p>
            <p>TXT: Texto</p>
            <p>SPF: Marco de Política del Remitente</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

