import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import SearchAndFilters from './components/SearchAndFilters'
import ProfileCard from './components/ProfileCard'
import ProfileModal from './components/ProfileModal'
import Footer from './components/Footer'
import profissionaisData from './data/profissionais.json'

function App() {
  // Estado para controlar qual profissional está selecionado para modal
  const [selectedProfile, setSelectedProfile] = useState(null)
  
  // Estados para busca e filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArea, setSelectedArea] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedTech, setSelectedTech] = useState('')

  // Aplicar dark mode baseado no localStorage ao carregar a página
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Filtrar profissionais com base na busca e filtros
  const filteredProfessionals = useMemo(() => {
    return profissionaisData.filter(prof => {
      // Filtro de busca textual (nome, cargo, resumo, habilidades)
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = searchTerm === '' || 
        prof.nome.toLowerCase().includes(searchLower) ||
        prof.cargo.toLowerCase().includes(searchLower) ||
        prof.resumo.toLowerCase().includes(searchLower) ||
        prof.habilidadesTecnicas.some(skill => skill.toLowerCase().includes(searchLower))

      // Filtro por área
      const matchesArea = selectedArea === '' || prof.area === selectedArea

      // Filtro por cidade
      const matchesCity = selectedCity === '' || prof.localizacao === selectedCity

      // Filtro por tecnologia
      const matchesTech = selectedTech === '' || 
        prof.habilidadesTecnicas.some(skill => 
          skill.toLowerCase().includes(selectedTech.toLowerCase())
        )

      return matchesSearch && matchesArea && matchesCity && matchesTech
    })
  }, [searchTerm, selectedArea, selectedCity, selectedTech])

  // Extrair áreas únicas para o filtro
  const uniqueAreas = useMemo(() => {
    const areas = profissionaisData.map(p => p.area)
    return [...new Set(areas)].sort()
  }, [])

  // Extrair cidades únicas para o filtro
  const uniqueCities = useMemo(() => {
    const cities = profissionaisData.map(p => p.localizacao)
    return [...new Set(cities)].sort()
  }, [])

  // Extrair tecnologias únicas para o filtro
  const uniqueTechs = useMemo(() => {
    const techs = profissionaisData.flatMap(p => p.habilidadesTecnicas)
    return [...new Set(techs)].sort()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Busca e Filtros */}
        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedArea={selectedArea}
          onAreaChange={setSelectedArea}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          selectedTech={selectedTech}
          onTechChange={setSelectedTech}
          areas={uniqueAreas}
          cities={uniqueCities}
          techs={uniqueTechs}
        />

        {/* Contador de resultados */}
        <div className="mb-6 text-gray-700 dark:text-gray-300">
          <p className="text-sm">
            {filteredProfessionals.length} {filteredProfessionals.length === 1 ? 'profissional encontrado' : 'profissionais encontrados'}
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProfessionals.map(profile => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onClick={() => setSelectedProfile(profile)}
            />
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {filteredProfessionals.length === 0 && (
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

