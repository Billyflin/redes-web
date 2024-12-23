import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion"
import { Badge } from "@/app/components/ui/badge"

export default function WebmailSection() {
  const [expandedStep, setExpandedStep] = useState(null)

  const steps = [
    { id: "config", title: "Configuración del servidor", description: "Instalación y configuración del servidor de correo (por ejemplo, Postfix)" },
    { id: "install", title: "Instalación del webmail", description: "Instalación y configuración de la interfaz webmail (por ejemplo, Roundcube)" },
    { id: "dns", title: "Configuración de DNS", description: "Configuración de los registros DNS para mail.andreavet.cl" },
    { id: "security", title: "Seguridad", description: "Implementación de SSL/TLS para conexiones seguras" },
  ]

  const errors = [
    { title: "Error de autenticación", solution: "Verificar la configuración de IMAP/SMTP" },
    { title: "Problemas de entrega de correo", solution: "Revisar los registros MX y SPF" },
    { title: "Interfaz no carga", solution: "Comprobar la configuración del servidor web" },
  ]

  return (
    (<Card>
      <CardHeader>
        <CardTitle className="text-2xl">Webmail Funcional</CardTitle>
        <CardDescription>
          Alojado en <a
          href="https://mail.andreavet.cl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline">mail.andreavet.cl</a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-4">Pasos de Implementación</h3>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}>
              <Card
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex items-center">
                    <Badge variant="outline" className="mr-2">{index + 1}</Badge>
                    {step.title}
                  </CardTitle>
                </CardHeader>
                {expandedStep === step.id && (
                  <CardContent className="p-4 pt-0">
                    <p>{step.description}</p>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4">Errores Comunes y Soluciones</h3>
        <Accordion type="single" collapsible className="w-full">
          {errors.map((error, index) => (
            <AccordionItem key={index} value={`error-${index}`}>
              <AccordionTrigger>{error.title}</AccordionTrigger>
              <AccordionContent>{error.solution}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>)
  );
}

