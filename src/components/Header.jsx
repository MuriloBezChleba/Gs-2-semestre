import DarkModeToggle from './DarkModeToggle'

function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400">
              FuturoConecta
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1">
              Conectando profissionais ao futuro do trabalho
            </p>
          </div>
          
          <DarkModeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header

