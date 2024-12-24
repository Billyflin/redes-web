import {ThemeToggle} from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mi Aplicación</h1>
        <ThemeToggle />
      </div>
    </header>
  )
}

