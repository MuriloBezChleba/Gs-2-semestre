import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import SearchAndFilters from './components/SearchAndFilters'
import ProfileCard from './components/ProfileCard'
import ProfileModal from './components/ProfileModal'
import AddProfessionalModal from './components/AddProfessionalModal'
import Footer from './components/Footer'
import DataSourceToggle from './components/DataSourceToggle'
import profissionaisData from './data/profissionais.json'
import { isUsingAPI, fetchProfissionais, fetchAreas, fetchCidades, fetchTecnologias } from './services/api'

function App() {
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArea, setSelectedArea] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedTech, setSelectedTech] = useState('')
  const [profissionais, setProfissionais] = useState(profissionaisData)
  const [areas, setAreas] = useState([])
  const [cities, setCities] = useState([])
  const [techs, setTechs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [useAPI, setUseAPI] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    if (isDark) {
      document.documentElement.classList.add('dark')
    }

    const shouldUseAPI = isUsingAPI()
    setUseAPI(shouldUseAPI)
    
    if (shouldUseAPI) {
      loadDataFromAPI()
    } else {
      loadDataFromJSON()
    }
  }, [])

  const loadDataFromJSON = () => {
    setProfissionais(profissionaisData)
    
    const uniqueAreas = [...new Set(profissionaisData.map(p => p.area))].sort()
    const uniqueCities = [...new Set(profissionaisData.map(p => p.localizacao))].sort()
    const uniqueTechs = [...new Set(profissionaisData.flatMap(p => p.habilidadesTecnicas))].sort()
    
    setAreas(uniqueAreas)
    setCities(uniqueCities)
    setTechs(uniqueTechs)
    setError(null)
  }

  const loadDataFromAPI = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const profissionaisAPI = await fetchProfissionais()
      
      const profissionaisFormatados = profissionaisAPI.map(prof => ({
        ...prof,
        habilidadesTecnicas: prof.habilidades_tecnicas || prof.habilidadesTecnicas,
        softSkills: prof.soft_skills || prof.softSkills,
        areaInteresses: prof.area_interesses || prof.areaInteresses
      }))
      
      setProfissionais(profissionaisFormatados)
      
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
      loadDataFromJSON()
    } finally {
      setLoading(false)
    }
  }

  const handleDataSourceToggle = (shouldUseAPI) => {
    setUseAPI(shouldUseAPI)
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

  const handleAddSuccess = (novoProfissional) => {
    if (useAPI) {
      loadDataFromAPI()
    }
  }

  const filteredProfessionals = useMemo(() => {
    return profissionais.filter(prof => {
      const habilidades = prof.habilidadesTecnicas || prof.habilidades_tecnicas || []
      
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = searchTerm === '' || 
        prof.nome.toLowerCase().includes(searchLower) ||
        prof.cargo.toLowerCase().includes(searchLower) ||
        prof.resumo.toLowerCase().includes(searchLower) ||
        habilidades.some(skill => skill.toLowerCase().includes(searchLower))

      const matchesArea = selectedArea === '' || prof.area === selectedArea
      const matchesCity = selectedCity === '' || prof.localizacao === selectedCity
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
        <div className="mb-6">
          <DataSourceToggle onToggle={handleDataSourceToggle} />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg">
            <p className="font-medium">⚠️ {error}</p>
          </div>
        )}

        {loading && (
          <div className="mb-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Carregando dados da API...</p>
          </div>
        )}

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

      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-3xl font-bold z-40 group"
        aria-label="Adicionar profissional"
        title="Cadastrar novo profissional"
      >
        <span className="group-hover:rotate-90 transition-transform duration-300">+</span>
      </button>

      {selectedProfile && (
        <ProfileModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}

      <AddProfessionalModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  )
}

export default App
