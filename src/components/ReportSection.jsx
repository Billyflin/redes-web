import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReportSection() {
  const reportSections = [
    { id: "intro", title: "Introducción", content: "Breve descripción del proyecto y sus objetivos principales." },
    { id: "webmail", title: "Implementación Webmail", content: "Detalles sobre la configuración y despliegue del servidor de correo y la interfaz webmail." },
    { id: "streaming", title: "Implementación Streaming", content: "Explicación del proceso de configuración del servidor de streaming y su optimización." },
    { id: "challenges", title: "Desafíos y Soluciones", content: "Discusión sobre los principales obstáculos encontrados y cómo se superaron." },
    { id: "conclusion", title: "Conclusiones", content: "Resumen de los aprendizajes y logros del proyecto." },
  ]

  return (
    (<Card>
      <CardHeader>
        <CardTitle className="text-2xl">Informe del Proyecto</CardTitle>
        <CardDescription>
          Alojado en <a
          href="https://resumen.andreavet.cl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline">resumen.andreavet.cl</a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="intro" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {reportSections.map((section) => (
              <TabsTrigger key={section.id} value={section.id}>
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {reportSections.map((section) => (
            <TabsContent key={section.id} value={section.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{section.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <h3 className="text-xl font-semibold mt-8 mb-4">Formato y Presentación</h3>
        <p>
          El informe se presenta en formato web, utilizando HTML y CSS para una presentación clara y atractiva.
          Se incluyen capturas de pantalla, diagramas y código relevante para ilustrar los puntos clave del proyecto.
        </p>
      </CardContent>
    </Card>)
  );
}

