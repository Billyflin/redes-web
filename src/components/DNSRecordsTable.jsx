import { motion } from "framer-motion";

export default function DNSRecordsTable() {
  const dnsRecords = [
    { type: "A", name: "andreavet.cl", value: "185.199.111.153, 185.199.110.153, 185.199.109.153, 185.199.108.153", ttl: "3600" },
    { type: "A", name: "mail.andreavet.cl", value: "23.20.243.69", ttl: "3600" },
    { type: "AAAA", name: "andreavet.cl", value: "2606:50c0:8003::153, 2606:50c0:8002::153, 2606:50c0:8001::153, 2606:50c0:8000::153", ttl: "3600" },
    { type: "CNAME", name: "autodiscover.andreavet.cl", value: "mail.andreavet.cl", ttl: "3600" },
    { type: "CNAME", name: "stream.andreavet.cl", value: "3cae25fd-1a76-4375-ae3e-6d99650c99d5.cfargotunnel.com", ttl: "3600" },
    { type: "CNAME", name: "download.andreavet.cl", value: "3cae25fd-1a76-4375-ae3e-6d99650c99d5.cfargotunnel.com", ttl: "3600" },
    { type: "CNAME", name: "www.andreavet.cl", value: "billyflin.github.io", ttl: "3600" },
    { type: "MX", name: "andreavet.cl", value: "10 mail.andreavet.cl", ttl: "3600" },
    { type: "TXT", name: "andreavet.cl", value: `"v=spf1 a mx ip4:23.20.243.69 ~all"`, ttl: "3600" },
    { type: "TXT", name: "_dmarc.andreavet.cl", value: `"v=DMARC1; p=none; rua=mailto:billy@andreavet.cl"`, ttl: "3600" },
  ];

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Configuración DNS Literal</h2>
      <p className="text-gray-600 text-center mb-4">
        Un resumen directo de la configuración DNS en un formato claro y organizado.
      </p>
      <div className="overflow-x-auto">
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full table-auto border border-gray-300 rounded-md"
        >
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Tipo</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nombre</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Valor</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">TTL</th>
            </tr>
          </thead>
          <tbody>
            {dnsRecords.map((record, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-b border-gray-200`}
              >
                <td className="px-4 py-2 text-sm text-gray-600">{record.type}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{record.name}</td>
                <td className="px-4 py-2 text-sm text-gray-600 break-words">
                  {record.value}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">{record.ttl}</td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
}
