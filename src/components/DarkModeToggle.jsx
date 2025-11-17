import { useState, useEffect } from 'react'

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  // Carregar preferência do localStorage ao montar
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true'
    setIsDark(savedMode)
  }, [])

  // Alternar dark mode
  const toggleDarkMode = () => {
    const newMode = !isDark
    setIsDark(newMode)
    localStorage.setItem('darkMode', newMode.toString())
    
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex items-center h-8 w-14 rounded-full bg-gray-300 dark:bg-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      aria-label="Toggle dark mode"
    >
      <span
        className={`${
          isDark ? 'translate-x-7' : 'translate-x-1'
        } inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 shadow-lg`}
      />
      <span className="sr-only">
        {isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      </span>
      
      {/* Ícones de sol e lua */}
      <span className={`absolute left-2 text-xs ${isDark ? 'text-gray-400' : 'text-yellow-500'}`}>
        ☀️
      </span>
      <span className={`absolute right-2 text-xs ${isDark ? 'text-yellow-300' : 'text-gray-400'}`}>
        🌙
      </span>
    </button>
  )
}

export default DarkModeToggle

