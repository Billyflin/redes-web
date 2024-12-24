export default function Navigation() {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-4">
          <li><a href="#arquitectura" className="hover:text-blue-300">Arquitectura</a></li>
          <li><a href="#mail" className="hover:text-blue-300">Mail</a></li>
          <li><a href="#streaming-descargas" className="hover:text-blue-300">Streaming y Descargas</a></li>
          <li><a href="#github-pages" className="hover:text-blue-300">GitHub Pages</a></li>
        </ul>
      </div>
    </nav>
  )
}

