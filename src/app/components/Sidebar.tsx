import Link from 'next/link'

const navItems = [
  { name: 'Arquitectura', href: '#arquitectura' },
  { name: 'Mail', href: '#mail' },
  { name: 'Streaming y Descargas', href: '#streaming-descargas' },
  { name: 'GitHub Pages', href: '#github-pages' },
]

export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <div className="text-2xl font-semibold text-center mb-6 text-blue-300">
          Infraestructura
        </div>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

