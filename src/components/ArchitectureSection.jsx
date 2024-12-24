import DNSArchitecture from "./DNSArchitecture";
import DNSRecordsTable from "./DNSRecordsTable";

export default function ArchitectureSection() {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold text-center mb-10">Arquitectura del Proyecto</h1>
      <DNSArchitecture />
      <DNSRecordsTable />
    </div>
  );
}

