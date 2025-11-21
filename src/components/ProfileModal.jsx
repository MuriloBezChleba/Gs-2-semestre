import { useState } from 'react'
import TagList from './TagList'

function ProfileModal({ profile, onClose }) {
  const [showMessageForm, setShowMessageForm] = useState(false)
  const [message, setMessage] = useState('')
  const [isRecommended, setIsRecommended] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState(false)

  const formatDate = (dateStr) => {
    if (dateStr === 'Atual') return 'Atual'
    const [year, month] = dateStr.split('-')
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    return `${months[parseInt(month) - 1]}/${year}`
  }

  const handleRecommend = () => {
    setIsRecommended(true)
    setTimeout(() => setIsRecommended(false), 3000)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      setMessageSuccess(true)
      setMessage('')
      setTimeout(() => {
        setMessageSuccess(false)
        setShowMessageForm(false)
      }, 2500)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-colors">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl font-bold z-10"
            aria-label="Fechar modal"
          >
            ×
          </button>

          <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-700 dark:to-primary-800 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center overflow-hidden shadow-lg">
                {profile.foto ? (
                  <img src={profile.foto} alt={profile.nome} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl font-bold text-primary-600 dark:text-primary-400">
                    {profile.nome.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">{profile.nome}</h2>
                <p className="text-xl mb-2">{profile.cargo}</p>
                <p className="flex items-center gap-2 justify-center md:justify-start mb-1">
                  <span>📍</span> {profile.localizacao}
                </p>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <span>💼</span> {profile.area}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {isRecommended && (
              <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                ✓ Profissional recomendado com sucesso!
              </div>
            )}

            {messageSuccess && (
              <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                ✓ Mensagem enviada com sucesso (simulação)
              </div>
            )}

            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleRecommend}
                disabled={isRecommended}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  isRecommended
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }`}
              >
                {isRecommended ? '✓ Recomendado!' : '👍 Recomendar Profissional'}
              </button>

              <button
                onClick={() => setShowMessageForm(!showMessageForm)}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                💬 Enviar Mensagem
              </button>
            </div>

            {showMessageForm && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <form onSubmit={handleSendMessage}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sua mensagem para {profile.nome.split(' ')[0]}:
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                    placeholder="Digite sua mensagem..."
                    required
                  />
                  <div className="flex gap-2 mt-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Enviar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowMessageForm(false)
                        setMessage('')
                      }}
                      className="px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            <section className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Sobre</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{profile.resumo}</p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                💼 Experiências Profissionais
              </h3>
              <div className="space-y-4">
                {profile.experiencias.map((exp, index) => (
                  <div key={index} className="border-l-4 border-primary-500 dark:border-primary-400 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{exp.cargo}</h4>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">{exp.empresa}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(exp.inicio)} - {formatDate(exp.fim)}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">{exp.descricao}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                🛠️ Habilidades Técnicas (Hard Skills)
              </h3>
              <TagList tags={profile.habilidadesTecnicas} variant="primary" />
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                🌟 Soft Skills
              </h3>
              <TagList tags={profile.softSkills} variant="secondary" />
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                🎓 Formação Acadêmica
              </h3>
              <div className="space-y-3">
                {profile.formacao.map((form, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{form.curso}</h4>
                    <p className="text-gray-700 dark:text-gray-300">{form.instituicao}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Ano: {form.ano}</p>
                  </div>
                ))}
              </div>
            </section>

            {profile.projetos && profile.projetos.length > 0 && (
              <section className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  🚀 Projetos e Portfólio
                </h3>
                <div className="space-y-3">
                  {profile.projetos.map((proj, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{proj.titulo}</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">{proj.descricao}</p>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
                        >
                          🔗 Ver projeto
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {profile.certificacoes && profile.certificacoes.length > 0 && (
              <section className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  📜 Certificações
                </h3>
                <TagList tags={profile.certificacoes} variant="success" />
              </section>
            )}

            {profile.idiomas && profile.idiomas.length > 0 && (
              <section className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  🌍 Idiomas
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profile.idiomas.map((idioma, index) => (
                    <div key={index} className="bg-blue-50 dark:bg-blue-900 px-4 py-2 rounded-lg">
                      <span className="font-semibold text-blue-900 dark:text-blue-200">{idioma.idioma}</span>
                      <span className="text-blue-700 dark:text-blue-300 text-sm ml-2">- {idioma.nivel}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {profile.areaInteresses && profile.areaInteresses.length > 0 && (
              <section className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  💡 Áreas de Interesse
                </h3>
                <TagList tags={profile.areaInteresses} variant="warning" />
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal
