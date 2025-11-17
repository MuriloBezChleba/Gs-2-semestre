import TagList from './TagList'

function ProfileCard({ profile, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Foto de perfil */}
      <div className="relative h-48 bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-800 flex items-center justify-center overflow-hidden">
        {profile.foto ? (
          <img
            src={profile.foto}
            alt={profile.nome}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-32 h-32 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-5xl font-bold text-primary-600 dark:text-primary-400">
              {profile.nome.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo do card */}
      <div className="p-5">
        {/* Nome e Cargo */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
          {profile.nome}
        </h3>
        <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">
          {profile.cargo}
        </p>

        {/* Localização */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-1">
          <span>📍</span>
          {profile.localizacao}
        </p>

        {/* Resumo */}
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
          {profile.resumo}
        </p>

        {/* Habilidades Técnicas (primeiras 5) */}
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Habilidades:
          </p>
          <TagList tags={profile.habilidadesTecnicas} limit={5} variant="primary" />
        </div>

        {/* Área */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            {profile.area}
          </span>
        </div>
      </div>

      {/* Overlay de hover */}
      <div className="absolute inset-0 bg-primary-600 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 pointer-events-none" />
    </div>
  )
}

export default ProfileCard

