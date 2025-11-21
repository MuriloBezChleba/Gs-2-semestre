import { useState } from 'react'
import { createProfissional } from '../services/api'

function AddProfessionalModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    resumo: '',
    localizacao: '',
    area: '',
    foto: ''
  })

  const [habilidadesTecnicas, setHabilidadesTecnicas] = useState('')
  const [softSkills, setSoftSkills] = useState('')
  const [areaInteresses, setAreaInteresses] = useState('')
  const [certificacoes, setCertificacoes] = useState('')

  const [experiencia, setExperiencia] = useState({
    empresa: '',
    cargo: '',
    inicio: '',
    fim: '',
    descricao: ''
  })

  const [formacao, setFormacao] = useState({
    curso: '',
    instituicao: '',
    ano: ''
  })

  const [projeto, setProjeto] = useState({
    titulo: '',
    link: '',
    descricao: ''
  })

  const [idioma, setIdioma] = useState({
    idioma: '',
    nivel: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const resetForm = () => {
    setFormData({
      nome: '',
      cargo: '',
      resumo: '',
      localizacao: '',
      area: '',
      foto: ''
    })
    setHabilidadesTecnicas('')
    setSoftSkills('')
    setAreaInteresses('')
    setCertificacoes('')
    setExperiencia({
      empresa: '',
      cargo: '',
      inicio: '',
      fim: '',
      descricao: ''
    })
    setFormacao({
      curso: '',
      instituicao: '',
      ano: ''
    })
    setProjeto({
      titulo: '',
      link: '',
      descricao: ''
    })
    setIdioma({
      idioma: '',
      nivel: ''
    })
    setError(null)
    setSuccessMessage(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const profissionalData = {
        nome: formData.nome,
        cargo: formData.cargo,
        resumo: formData.resumo,
        localizacao: formData.localizacao,
        area: formData.area,
        foto: formData.foto || '',
        habilidades_tecnicas: habilidadesTecnicas
          .split(',')
          .map(skill => skill.trim())
          .filter(skill => skill !== ''),
        soft_skills: softSkills
          .split(',')
          .map(skill => skill.trim())
          .filter(skill => skill !== ''),
        area_interesses: areaInteresses
          .split(',')
          .map(interesse => interesse.trim())
          .filter(interesse => interesse !== ''),
        certificacoes: certificacoes
          .split(',')
          .map(cert => cert.trim())
          .filter(cert => cert !== ''),
        experiencias: experiencia.empresa ? [experiencia] : [],
        formacao: formacao.curso ? [formacao] : [],
        projetos: projeto.titulo ? [projeto] : [],
        idiomas: idioma.idioma ? [idioma] : []
      }

      const novoProfissional = await createProfissional(profissionalData)
      setSuccessMessage(true)
      
      if (onSuccess) {
        onSuccess(novoProfissional)
      }

      setTimeout(() => {
        resetForm()
        onClose()
      }, 2000)

    } catch (err) {
      console.error('Erro ao criar profissional:', err)
      setError('Erro ao cadastrar profissional. Verifique os dados e tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

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
            <h2 className="text-3xl font-bold mb-2">➕ Cadastrar Novo Profissional</h2>
            <p className="text-lg opacity-90">Preencha os dados para adicionar um novo perfil à plataforma</p>
          </div>

          <div className="p-8">
            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                ✓ Profissional cadastrado com sucesso! Redirecionando...
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <section className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b pb-2">
                  📋 Informações Básicas
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Ex: João Silva"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cargo *
                    </label>
                    <input
                      type="text"
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Ex: Desenvolvedor Full Stack"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Localização *
                    </label>
                    <input
                      type="text"
                      name="localizacao"
                      value={formData.localizacao}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Ex: São Paulo/SP"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Área *
                    </label>
                    <select
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="">Selecione uma área</option>
                      <option value="Desenvolvimento">Desenvolvimento</option>
                      <option value="Design">Design</option>
                      <option value="Dados">Dados</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Saúde">Saúde</option>
                      <option value="Educação">Educação</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    URL da Foto (opcional)
                  </label>
                  <input
                    type="url"
                    name="foto"
                    value={formData.foto}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="https://exemplo.com/foto.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Resumo Profissional *
                  </label>
                  <textarea
                    name="resumo"
                    value={formData.resumo}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Descreva sua experiência e objetivos profissionais..."
                  />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b pb-2">
                  🛠️ Habilidades
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Habilidades Técnicas (separadas por vírgula) *
                  </label>
                  <input
                    type="text"
                    value={habilidadesTecnicas}
                    onChange={(e) => setHabilidadesTecnicas(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Ex: JavaScript, React, Python, Node.js"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Soft Skills (separadas por vírgula) *
                  </label>
                  <input
                    type="text"
                    value={softSkills}
                    onChange={(e) => setSoftSkills(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Ex: Liderança, Comunicação, Trabalho em equipe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Áreas de Interesse (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={areaInteresses}
                    onChange={(e) => setAreaInteresses(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Ex: Inteligência Artificial, Cloud Computing"
                  />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b pb-2">
                  💼 Experiência Profissional (opcional)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Empresa
                    </label>
                    <input
                      type="text"
                      value={experiencia.empresa}
                      onChange={(e) => setExperiencia({ ...experiencia, empresa: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Nome da empresa"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cargo
                    </label>
                    <input
                      type="text"
                      value={experiencia.cargo}
                      onChange={(e) => setExperiencia({ ...experiencia, cargo: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Cargo ocupado"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Início (YYYY-MM)
                    </label>
                    <input
                      type="text"
                      value={experiencia.inicio}
                      onChange={(e) => setExperiencia({ ...experiencia, inicio: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="2020-01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fim (YYYY-MM ou "Atual")
                    </label>
                    <input
                      type="text"
                      value={experiencia.fim}
                      onChange={(e) => setExperiencia({ ...experiencia, fim: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Atual ou 2023-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descrição
                  </label>
                  <textarea
                    value={experiencia.descricao}
                    onChange={(e) => setExperiencia({ ...experiencia, descricao: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Descreva suas atividades e conquistas..."
                  />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b pb-2">
                  🎓 Formação Acadêmica (opcional)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Curso
                    </label>
                    <input
                      type="text"
                      value={formacao.curso}
                      onChange={(e) => setFormacao({ ...formacao, curso: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Nome do curso"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Instituição
                    </label>
                    <input
                      type="text"
                      value={formacao.instituicao}
                      onChange={(e) => setFormacao({ ...formacao, instituicao: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Nome da instituição"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Ano
                    </label>
                    <input
                      type="number"
                      value={formacao.ano}
                      onChange={(e) => setFormacao({ ...formacao, ano: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="2024"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b pb-2">
                  🚀 Projeto em Destaque (opcional)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={projeto.titulo}
                      onChange={(e) => setProjeto({ ...projeto, titulo: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Nome do projeto"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Link
                    </label>
                    <input
                      type="url"
                      value={projeto.link}
                      onChange={(e) => setProjeto({ ...projeto, link: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descrição
                  </label>
                  <textarea
                    value={projeto.descricao}
                    onChange={(e) => setProjeto({ ...projeto, descricao: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Descreva o projeto..."
                  />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b pb-2">
                  🌍 Idiomas e Certificações (opcional)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Idioma
                    </label>
                    <input
                      type="text"
                      value={idioma.idioma}
                      onChange={(e) => setIdioma({ ...idioma, idioma: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Ex: Inglês"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nível
                    </label>
                    <select
                      value={idioma.nivel}
                      onChange={(e) => setIdioma({ ...idioma, nivel: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="">Selecione o nível</option>
                      <option value="Básico">Básico</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                      <option value="Fluente">Fluente</option>
                      <option value="Nativo">Nativo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Certificações (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={certificacoes}
                    onChange={(e) => setCertificacoes(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Ex: AWS Solutions Architect, Scrum Master"
                  />
                </div>
              </section>

              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700'
                  }`}
                >
                  {isSubmitting ? '⏳ Cadastrando...' : '✓ Cadastrar Profissional'}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProfessionalModal
