export default function GitHubPages() {
  return (
    <section id="github-pages" className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">GitHub Pages</h2>
      <div className="space-y-6">
        <p className="text-gray-600">
          La página principal del proyecto se despliega utilizando GitHub Pages.
          Se utiliza un workflow de GitHub Actions para automatizar el proceso de construcción y despliegue.
        </p>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Configuración del Workflow:</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
            <code>{`name: Deploy Next.js site to Pages

on:
  push:
    branches: ["master"]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Build
        run: npm run build
      - name: Deploy
        uses: actions/deploy-pages@v4`}</code>
          </pre>
        </div>
        <p className="mt-4 text-gray-600">
          Este workflow se activa con cada push a la rama master, construye el proyecto Next.js,
          y despliega los archivos estáticos generados a GitHub Pages.
        </p>
      </div>
    </section>
  )
}

