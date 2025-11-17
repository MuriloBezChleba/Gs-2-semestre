import { useState, useEffect } from 'react'
import { isUsingAPI, setUseAPI, checkAPIHealth } from '../services/api'

function DataSourceToggle({ onToggle }) {
  const [useAPIState, setUseAPIState] = useState(false)
  const [apiAvailable, setApiAvailable] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Carregar estado inicial
    const currentState = isUsingAPI()
    setUseAPIState(currentState)
    
    // Verificar se API está disponível
    checkAPIHealth().then(available => {
      setApiAvailable(available)
      setChecking(false)
    })
  }, [])

  const handleToggle = () => {
    const newState = !useAPIState
    setUseAPIState(newState)
    setUseAPI(newState)
    
    // Notificar componente pai para recarregar dados
    if (onToggle) {
      onToggle(newState)
    }
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Fonte de Dados:
        </span>
        <span className={`text-sm font-bold ${useAPIState ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}`}>
          {useAPIState ? 'API Backend' : 'JSON Local'}
        </span>
      </div>

      <button
        onClick={handleToggle}
        disabled={checking || (useAPIState && !apiAvailable)}
        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
          useAPIState 
            ? 'bg-primary-600' 
            : 'bg-gray-300 dark:bg-gray-600'
        } ${(checking || (useAPIState && !apiAvailable)) ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Alternar fonte de dados"
      >
        <span
          className={`${
            useAPIState ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-lg`}
        />
      </button>

      {/* Indicador de status da API */}
      {!checking && (
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${apiAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {apiAvailable ? 'API Online' : 'API Offline'}
          </span>
        </div>
      )}

      {checking && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Verificando...
        </span>
      )}

      {/* Tooltip de informação */}
      <div className="group relative">
        <span className="text-gray-500 dark:text-gray-400 cursor-help">ⓘ</span>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          {useAPIState 
            ? 'Usando API REST do backend (http://localhost:8000)'
            : 'Usando arquivo JSON local (src/data/profissionais.json)'
          }
        </div>
      </div>
    </div>
  )
}

export default DataSourceToggle

