import Image from 'next/image'

export default function Arquitectura() {
  return (
    <div className="space-y-6">
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Visión General de la Arquitectura</h2>
        <p className="text-gray-600 mb-4">
          Este proyecto utiliza una arquitectura distribuida que combina servicios en la nube y servidores propios para crear una infraestructura robusta y escalable. Los principales componentes incluyen:
        </p>
        <ul className="list-disc pl-5 text-gray-600 mb-4">
          <li>Cloudflare para gestión de DNS y túneles de seguridad</li>
          <li>AWS EC2 para alojar servicios críticos</li>
          <li>GitHub Pages para el despliegue de la página principal</li>
          <li>Servicios de correo, streaming y descargas alojados en instancias EC2</li>
        </ul>
        <Image
          src="/diagrama-arquitectura.svg"
          alt="Diagrama de Arquitectura"
          width={800}
          height={600}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Configuración DNS</h2>
        <p className="text-gray-600 mb-4">
          La configuración DNS es crucial para dirigir el tráfico a los servicios correctos. Utilizamos Cloudflare como nuestro proveedor de DNS principal debido a su rendimiento y características de seguridad.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Tipo</th>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Valor</th>
                <th className="py-2 px-4 border-b">TTL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">SOA</td>
                <td className="py-2 px-4 border-b">andreavet.cl</td>
                <td className="py-2 px-4 border-b">aaron.ns.cloudflare.com. dns.cloudflare.com. 2048670054 10000 2400 604800 3600</td>
                <td className="py-2 px-4 border-b">3600</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">NS</td>
                <td className="py-2 px-4 border-b">andreavet.cl</td>
                <td className="py-2 px-4 border-b">aaron.ns.cloudflare.com<br/>olivia.ns.cloudflare.com</td>
                <td className="py-2 px-4 border-b">86400</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">A</td>
                <td className="py-2 px-4 border-b">andreavet.cl</td>
                <td className="py-2 px-4 border-b">185.199.111.153<br/>185.199.110.153<br/>185.199.109.153<br/>185.199.108.153</td>
                <td className="py-2 px-4 border-b">1</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">A</td>
                <td className="py-2 px-4 border-b">mail.andreavet.cl</td>
                <td className="py-2 px-4 border-b">23.20.243.69</td>
                <td className="py-2 px-4 border-b">1</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">AAAA</td>
                <td className="py-2 px-4 border-b">andreavet.cl</td>
                <td className="py-2 px-4 border-b">2606:50c0:8003::153<br/>2606:50c0:8002::153<br/>2606:50c0:8001::153<br/>2606:50c0:8000::153</td>
                <td className="py-2 px-4 border-b">1</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">CNAME</td>
                <td className="py-2 px-4 border-b">autodiscover.andreavet.cl</td>
                <td className="py-2 px-4 border-b">mail.andreavet.cl</td>
                <td className="py-2 px-4 border-b">1</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">CNAME</td>
                <td className="py-2 px-4 border-b">download.andreavet.cl</td>
                <td className="py-2 px-4 border-b">3cae25fd-1a76-4375-ae3e-6d99650c99d5.cfargotunnel.com</td>
                <td className="py-2 px-4 border-b">1</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">CNAME</td>
                <td className="py-2 px-4 border-b">stream.andreavet.cl</td>
                <td className="py-2 px-4 border-b">3cae25fd-1a76-4375-ae3e-6d99650c99d5.cfargotunnel.com</td>
                <td className="py-2 px-4 border-b">1</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">CNAME</td>
                <td className="py-2 px-4 border-b">www.andreavet.cl</td>
                <td className="py-2 px-4 border-b">billyflin.github.io</td>
                <td className="py-2 px-4 border-b">1</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">MX</td>
                <td className="py-2 px-4 border-b">andreavet.cl</td>
                <td className="py-2 px-4 border-b">10 mail.andreavet.cl</td>
                <td className="py-2 px-4 border-b">1</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">TXT</td>
                <td className="py-2 px-4 border-b">andreavet.cl</td>
                <td className="py-2 px-4 border-b">"v=spf1 a mx ip4:23.20.243.69 ~all"</td>
                <td className="py-2 px-4 border-b">3600</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">TXT</td>
                <td className="py-2 px-4 border-b">_dmarc.andreavet.cl</td>
                <td className="py-2 px-4 border-b">"v=DMARC1; p=none; rua=mailto:billy@andreavet.cl"</td>
                <td className="py-2 px-4 border-b">1</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">TXT</td>
                <td className="py-2 px-4 border-b">s20241223970._domainkey.andreavet.cl</td>
                <td className="py-2 px-4 border-b">"k=rsa; p=MIIBIjANBgkqhkiG9..."</td>
                <td className="py-2 px-4 border-b">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Diferencias entre Servidores de Correo y Streaming</h3>
        <ul className="list-disc pl-5 text-gray-600">
          <li>El servidor de correo (mail.andreavet.cl) utiliza un certificado TLS gestionado por <strong>Let's Encrypt</strong>.</li>
          <li>El servidor de streaming utiliza un certificado de <strong>Google Trust Services</strong>.</li>
          <li>Estas diferencias en los certificados reflejan las distintas necesidades y configuraciones de cada servicio.</li>
        </ul>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Explicación de Registros DNS Clave</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">SPF (Sender Policy Framework)</h3>
            <p className="text-gray-600">
              El registro SPF (v=spf1 a mx ip4:23.20.243.69 ~all) especifica qué servidores están autorizados a enviar correos electrónicos en nombre del dominio. Esto ayuda a prevenir la suplantación de correo electrónico.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">DKIM (DomainKeys Identified Mail)</h3>
            <p className="text-gray-600">
              El registro DKIM (s20241223970._domainkey) contiene la clave pública utilizada para verificar la firma digital en los correos electrónicos salientes. Esto asegura que los mensajes no han sido alterados en tránsito.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">DMARC (Domain-based Message Authentication, Reporting, and Conformance)</h3>
            <p className="text-gray-600">
              El registro DMARC (v=DMARC1; p=none; rua=mailto:billy@andreavet.cl) especifica cómo manejar los correos electrónicos que fallan en las verificaciones SPF o DKIM. En este caso, está configurado en modo de monitoreo (p=none) y envía informes a billy@andreavet.cl.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Importancia de DMARC</h2>
        <p className="text-gray-600 mb-4">
          DMARC se agregó para mejorar la seguridad del correo electrónico y proteger contra la suplantación de identidad. Funciona en conjunto con SPF y DKIM para proporcionar una capa adicional de autenticación y reportes.
        </p>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Cómo funciona DMARC:</h3>
        <ol className="list-decimal pl-5 text-gray-600 space-y-2">
          <li>Cuando se recibe un correo electrónico, el servidor receptor verifica los registros SPF y DKIM.</li>
          <li>Luego, el servidor comprueba la política DMARC del dominio remitente.</li>
          <li>Basándose en esta política, el servidor decide qué hacer con el correo (rechazar, poner en cuarentena o permitir).</li>
          <li>DMARC también proporciona un mecanismo de retroalimentación, enviando informes sobre los correos electrónicos que fallan en la autenticación.</li>
        </ol>
        <p className="text-gray-600 mt-4">
          En nuestra configuración actual (p=none), DMARC está en modo de monitoreo, lo que nos permite recopilar datos sobre la autenticación de correos electrónicos sin afectar la entrega. Esto es útil para evaluar el impacto antes de implementar una política más estricta.
        </p>
      </section>
    </div>
  )
}

