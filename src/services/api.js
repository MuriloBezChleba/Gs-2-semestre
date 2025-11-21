/**
 * Serviço de API para comunicação com o backend
 * Permite alternar entre API REST e JSON local
 */

// Configuração da API
const API_BASE_URL = 'http://localhost:8000';

// Flag para escolher fonte de dados (pode ser alterada via toggle na UI)
let useAPI = false;

/**
 * Configura se deve usar API ou JSON local
 */
export const setUseAPI = (value) => {
  useAPI = value;
  localStorage.setItem('useAPI', value.toString());
};

/**
 * Verifica se está configurado para usar API
 */
export const isUsingAPI = () => {
  // Carregar do localStorage na inicialização
  const stored = localStorage.getItem('useAPI');
  if (stored !== null) {
    useAPI = stored === 'true';
  }
  return useAPI;
};

/**
 * Busca todos os profissionais da API
 */
export const fetchProfissionais = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    // Adicionar parâmetros de busca e filtros
    if (params.busca) queryParams.append('busca', params.busca);
    if (params.area) queryParams.append('area', params.area);
    if (params.cidade) queryParams.append('cidade', params.cidade);
    if (params.tecnologia) queryParams.append('tecnologia', params.tecnologia);
    if (params.skip !== undefined) queryParams.append('skip', params.skip);
    if (params.limit !== undefined) queryParams.append('limit', params.limit);
    
    const url = `${API_BASE_URL}/api/profissionais${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar profissionais da API:', error);
    throw error;
  }
};

/**
 * Busca um profissional específico por ID
 */
export const fetchProfissionalById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/profissionais/${id}`);
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar profissional por ID:', error);
    throw error;
  }
};

/**
 * Busca áreas únicas
 */
export const fetchAreas = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/areas`);
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar áreas:', error);
    throw error;
  }
};

/**
 * Busca cidades únicas
 */
export const fetchCidades = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cidades`);
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    throw error;
  }
};

/**
 * Busca tecnologias únicas
 */
export const fetchTecnologias = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tecnologias`);
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar tecnologias:', error);
    throw error;
  }
};

/**
 * Busca estatísticas gerais
 */
export const fetchEstatisticas = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/estatisticas`);
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    throw error;
  }
};

/**
 * Cria um novo profissional
 */
export const createProfissional = async (profissionalData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/profissionais`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profissionalData)
    });
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar profissional:', error);
    throw error;
  }
};

/**
 * Atualiza um profissional existente
 */
export const updateProfissional = async (id, profissionalData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/profissionais/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profissionalData)
    });
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao atualizar profissional:', error);
    throw error;
  }
};

/**
 * Deleta um profissional
 */
export const deleteProfissional = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/profissionais/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok && response.status !== 204) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao deletar profissional:', error);
    throw error;
  }
};

/**
 * Verifica se a API está disponível
 */
export const checkAPIHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      return false;
    }
    
    const data = await response.json();
    return data.status === 'ok';
  } catch (error) {
    console.error('API não está disponível:', error);
    return false;
  }
};




