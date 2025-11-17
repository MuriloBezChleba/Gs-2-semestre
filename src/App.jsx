import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import SearchAndFilters from './components/SearchAndFilters'
import ProfileCard from './components/ProfileCard'
import ProfileModal from './components/ProfileModal'
import Footer from './components/Footer'
import DataSourceToggle from './components/DataSourceToggle'
import profissionaisData from './data/profissionais.json'
import { isUsingAPI, fetchProfissionais, fetchAreas, fetchCidades, fetchTecnologias } from './services/api'

function App() {
  // Estado para controlar qual profissional está selecionado para modal
  const [selectedProfile, setSelectedProfile] = useState(null)
  
  // Estados para busca e filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArea, setSelectedArea] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedTech, setSelectedTech] = useState('')

  // Estados para dados da API
  const [profissionais, setProfissionais] = useState(profissionaisData)
  const [areas, setAreas] = useState([])
  const [cities, setCities] = useState([])
  const [techs, setTechs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [useAPI, setUseAPI] = useState(false)

  // Aplicar dark mode baseado no localStorage ao carregar a página
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    if (isDark) {
      document.documentElement.classList.add('dark')
    }

    // Verificar se deve usar API
    const shouldUseAPI = isUsingAPI()
    setUseAPI(shouldUseAPI)
    
    if (shouldUseAPI) {
      loadDataFromAPI()
    } else {
      loadDataFromJSON()
    }
  }, [])

  // Carregar dados do JSON local
  const loadDataFromJSON = () => {
    setProfissionais(profissionaisData)
    
    // Extrair dados únicos do JSON
    const uniqueAreas = [...new Set(profissionaisData.map(p => p.area))].sort()
    const uniqueCities = [...new Set(profissionaisData.map(p => p.localizacao))].sort()
    const uniqueTechs = [...new Set(profissionaisData.flatMap(p => p.habilidadesTecnicas))].sort()
    
    setAreas(uniqueAreas)
    setCities(uniqueCities)
    setTechs(uniqueTechs)
    setError(null)
  }

  // Carregar dados da API
  const loadDataFromAPI = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Buscar profissionais
      const profissionaisAPI = await fetchProfissionais()
      
      // Converter campos do backend para formato do frontend
      const profissionaisFormatados = profissionaisAPI.map(prof => ({
        ...prof,
        habilidadesTecnicas: prof.habilidades_tecnicas || prof.habilidadesTecnicas,
        softSkills: prof.soft_skills || prof.softSkills,
        areaInteresses: prof.area_interesses || prof.areaInteresses
      }))
      
      setProfissionais(profissionaisFormatados)
      
      // Buscar listas auxiliares
      const [areasAPI, cidadesAPI, techsAPI] = await Promise.all([
        fetchAreas(),
        fetchCidades(),
        fetchTecnologias()
      ])
      
      setAreas(areasAPI)
      setCities(cidadesAPI)
      setTechs(techsAPI)
    } catch (err) {
      console.error('Erro ao carregar dados da API:', err)
      setError('Erro ao conectar com a API. Usando dados locais como fallback.')
      // Fallback para JSON local em caso de erro
      loadDataFromJSON()
    } finally {
      setLoading(false)
    }
  }

  // Handler para mudança de fonte de dados
  const handleDataSourceToggle = (shouldUseAPI) => {
    setUseAPI(shouldUseAPI)
    
    // Limpar filtros ao trocar fonte de dados
    setSearchTerm('')
    setSelectedArea('')
    setSelectedCity('')
    setSelectedTech('')
    
    if (shouldUseAPI) {
      loadDataFromAPI()
    } else {
      loadDataFromJSON()
    }
  }

  // Filtrar profissionais com base na busca e filtros (funciona para ambas as fontes)
  const filteredProfessionals = useMemo(() => {
    // Se estiver usando API e houver filtros, fazer nova requisição seria mais eficiente
    // Mas para manter compatibilidade, filtramos localmente
    return profissionais.filter(prof => {
      // Normalizar nomes de campos (suporta ambos os formatos)
      const habilidades = prof.habilidadesTecnicas || prof.habilidades_tecnicas || []
      
      // Filtro de busca textual (nome, cargo, resumo, habilidades)
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = searchTerm === '' || 
        prof.nome.toLowerCase().includes(searchLower) ||
        prof.cargo.toLowerCase().includes(searchLower) ||
        prof.resumo.toLowerCase().includes(searchLower) ||
        habilidades.some(skill => skill.toLowerCase().includes(searchLower))

      // Filtro por área
      const matchesArea = selectedArea === '' || prof.area === selectedArea

      // Filtro por cidade
      const matchesCity = selectedCity === '' || prof.localizacao === selectedCity

      // Filtro por tecnologia
      const matchesTech = selectedTech === '' || 
        habilidades.some(skill => 
          skill.toLowerCase().includes(selectedTech.toLowerCase())
        )

      return matchesSearch && matchesArea && matchesCity && matchesTech
    })
  }, [profissionais, searchTerm, selectedArea, selectedCity, selectedTech])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Toggle para alternar entre API e JSON local */}
        <div className="mb-6">
          <DataSourceToggle onToggle={handleDataSourceToggle} />
        </div>

        {/* Mensagem de erro se houver */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg">
            <p className="font-medium">⚠️ {error}</p>
          </div>
        )}

        {/* Indicador de carregamento */}
        {loading && (
          <div className="mb-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Carregando dados da API...</p>
          </div>
        )}

        {/* Busca e Filtros */}
        {!loading && (
          <SearchAndFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedArea={selectedArea}
            onAreaChange={setSelectedArea}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
            selectedTech={selectedTech}
            onTechChange={setSelectedTech}
            areas={areas}
            cities={cities}
            techs={techs}
          />
        )}

        {/* Contador de resultados */}
        {!loading && (
          <div className="mb-6 text-gray-700 dark:text-gray-300">
            <p className="text-sm">
              {filteredProfessionals.length} {filteredProfessionals.length === 1 ? 'profissional encontrado' : 'profissionais encontrados'}
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                ({useAPI ? 'via API Backend' : 'via JSON Local'})
              </span>
            </p>
          </div>
        )}

        {/* Grid de Cards */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredProfessionals.map(profile => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onClick={() => setSelectedProfile(profile)}
              />
            ))}
          </div>
        )}

        {/* Mensagem quando não há resultados */}
        {!loading && filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Nenhum profissional encontrado com os critérios selecionados.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedArea('')
                setSelectedCity('')
                setSelectedTech('')
              }}
              className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </main>

      <Footer />

      {/* Modal de Detalhes */}
      {selectedProfile && (
        <ProfileModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </div>
  )
}

export default App

