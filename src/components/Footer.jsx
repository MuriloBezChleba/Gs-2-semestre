function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              FuturoConecta
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Conectando profissionais ao futuro do trabalho. Plataforma fictícia desenvolvida para atividade acadêmica.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Links Rápidos
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Informações
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Esta é uma aplicação de demonstração desenvolvida como parte de um projeto acadêmico.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Todos os perfis são fictícios.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} FuturoConecta. Projeto Acadêmico - Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
