function SearchAndFilters({
  searchTerm,
  onSearchChange,
  selectedArea,
  onAreaChange,
  selectedCity,
  onCityChange,
  selectedTech,
  onTechChange,
  areas,
  cities,
  techs
}) {
  const handleClearFilters = () => {
    onSearchChange('')
    onAreaChange('')
    onCityChange('')
    onTechChange('')
  }

  const hasActiveFilters = searchTerm || selectedArea || selectedCity || selectedTech

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Buscar Profissionais
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Nome, cargo, habilidade..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Área
          </label>
          <select
            id="area"
            value={selectedArea}
            onChange={(e) => onAreaChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Todas as áreas</option>
            {areas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Localização
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Todas as cidades</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-3">
          <label htmlFor="tech" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tecnologia
          </label>
          <select
            id="tech"
            value={selectedTech}
            onChange={(e) => onTechChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Todas as tecnologias</option>
            {techs.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={handleClearFilters}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchAndFilters
