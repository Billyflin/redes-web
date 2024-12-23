import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { ArrowRight } from 'lucide-react'

export default function ArchitectureSection() {
  const services = [
    { name: "Servidor de correo y webmail", domain: "mail.andreavet.cl" },
    { name: "Servidor de streaming", domain: "stream.andreavet.cl" },
    { name: "Servidor web para el informe", domain: "resumen.andreavet.cl" },
  ]

  return (
    (<Card>
      <CardHeader>
        <CardTitle className="text-2xl">Arquitectura del Sistema</CardTitle>
        <CardDescription>Visión general de la infraestructura del proyecto</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-6">
          La arquitectura del sistema se compone de tres servicios principales alojados en subdominios separados:
        </p>
        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}>
              <Card>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <h4 className="font-semibold">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">{service.domain}</p>
                  </div>
                  <ArrowRight className="text-primary" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 mb-4">
          Cada servicio se ejecuta en su propio contenedor o máquina virtual para garantizar el aislamiento y la seguridad.
        </p>
        <div className="bg-muted p-6 rounded-md">
          <p className="text-center text-muted-foreground">
            [Aquí se insertará un diagrama de la arquitectura del sistema]
          </p>
        </div>
      </CardContent>
    </Card>)
  );
}

