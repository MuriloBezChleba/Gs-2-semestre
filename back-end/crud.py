"""
CRUD Operations (Create, Read, Update, Delete)
Implementa todas as operações com o banco de dados

Este arquivo demonstra o uso de:
- FUNÇÕES
- ESTRUTURAS DE DECISÃO (if/else)
- ESTRUTURAS DE REPETIÇÃO (for, while)
"""

from sqlalchemy.orm import Session
from typing import List, Optional
from models import Profissional
from schemas import ProfissionalCreate, ProfissionalUpdate


# ==================== CREATE ====================

def criar_profissional(db: Session, profissional: ProfissionalCreate) -> Profissional:
    """
    Cria um novo profissional no banco de dados
    
    Estruturas utilizadas:
    - FUNÇÃO
    - DECISÃO: validação de dados
    """
    # Criar objeto do model
    db_profissional = Profissional(
        nome=profissional.nome,
        foto=profissional.foto,
        cargo=profissional.cargo,
        resumo=profissional.resumo,
        localizacao=profissional.localizacao,
        area=profissional.area,
        habilidades_tecnicas=[skill for skill in profissional.habilidades_tecnicas],  # REPETIÇÃO
        soft_skills=[skill for skill in profissional.soft_skills],  # REPETIÇÃO
        experiencias=[exp.dict() for exp in profissional.experiencias],  # REPETIÇÃO
        formacao=[form.dict() for form in profissional.formacao],  # REPETIÇÃO
        projetos=[proj.dict() for proj in profissional.projetos],  # REPETIÇÃO
        certificacoes=profissional.certificacoes,
        idiomas=[idioma.dict() for idioma in profissional.idiomas],  # REPETIÇÃO
        area_interesses=profissional.area_interesses
    )
    
    # Adicionar e salvar no banco
    db.add(db_profissional)
    db.commit()
    db.refresh(db_profissional)
    
    return db_profissional


# ==================== READ ====================

def obter_profissional_por_id(db: Session, profissional_id: int) -> Optional[Profissional]:
    """
    Busca um profissional por ID
    
    Estruturas utilizadas:
    - FUNÇÃO
    - DECISÃO: retorna None se não encontrar
    """
    profissional = db.query(Profissional).filter(Profissional.id == profissional_id).first()
    
    # DECISÃO: verificar se encontrou
    if profissional is None:
        return None
    
    return profissional


def obter_todos_profissionais(db: Session, skip: int = 0, limit: int = 100) -> List[Profissional]:
    """
    Retorna todos os profissionais com paginação
    
    Estruturas utilizadas:
    - FUNÇÃO
    - REPETIÇÃO: query retorna lista
    """
    profissionais = db.query(Profissional).offset(skip).limit(limit).all()
    return profissionais


def buscar_profissionais(
    db: Session,
    termo_busca: Optional[str] = None,
    area: Optional[str] = None,
    cidade: Optional[str] = None,
    tecnologia: Optional[str] = None,
    skip: int = 0,
    limit: int = 100
) -> List[Profissional]:
    """
    Busca profissionais com filtros múltiplos
    
    Estruturas utilizadas:
    - FUNÇÃO
    - DECISÃO: múltiplos if para aplicar filtros
    - REPETIÇÃO: processamento de resultados
    """
    # Iniciar query base
    query = db.query(Profissional)
    
    # DECISÃO: aplicar filtro de busca textual
    if termo_busca:
        termo_lower = termo_busca.lower()
        # Buscar em nome, cargo ou resumo
        query = query.filter(
            (Profissional.nome.ilike(f"%{termo_busca}%")) |
            (Profissional.cargo.ilike(f"%{termo_busca}%")) |
            (Profissional.resumo.ilike(f"%{termo_busca}%"))
        )
    
    # DECISÃO: filtrar por área
    if area:
        query = query.filter(Profissional.area == area)
    
    # DECISÃO: filtrar por cidade
    if cidade:
        query = query.filter(Profissional.localizacao == cidade)
    
    # Executar query
    profissionais = query.offset(skip).limit(limit).all()
    
    # DECISÃO + REPETIÇÃO: filtrar por tecnologia (campo JSON)
    if tecnologia:
        profissionais_filtrados = []
        # REPETIÇÃO: iterar sobre profissionais
        for prof in profissionais:
            # REPETIÇÃO: verificar se tem a tecnologia
            for tech in prof.habilidades_tecnicas:
                # DECISÃO: comparar tecnologia
                if tecnologia.lower() in tech.lower():
                    profissionais_filtrados.append(prof)
                    break
        return profissionais_filtrados
    
    return profissionais


# ==================== UPDATE ====================

def atualizar_profissional(
    db: Session,
    profissional_id: int,
    profissional_update: ProfissionalUpdate
) -> Optional[Profissional]:
    """
    Atualiza os dados de um profissional
    
    Estruturas utilizadas:
    - FUNÇÃO
    - DECISÃO: verificar existência e quais campos atualizar
    - REPETIÇÃO: iterar sobre campos
    """
    # Buscar profissional
    db_profissional = obter_profissional_por_id(db, profissional_id)
    
    # DECISÃO: verificar se existe
    if db_profissional is None:
        return None
    
    # Dicionário com dados para atualizar
    update_data = profissional_update.dict(exclude_unset=True)
    
    # REPETIÇÃO: iterar sobre campos para atualizar
    for campo, valor in update_data.items():
        # DECISÃO: verificar se campo existe no model
        if hasattr(db_profissional, campo):
            # DECISÃO: tratar campos especiais
            if campo in ['experiencias', 'formacao', 'projetos', 'idiomas']:
                # Converter para dict se necessário
                valor_processado = [item.dict() if hasattr(item, 'dict') else item for item in valor]
                setattr(db_profissional, campo, valor_processado)
            else:
                setattr(db_profissional, campo, valor)
    
    # Salvar alterações
    db.commit()
    db.refresh(db_profissional)
    
    return db_profissional


# ==================== DELETE ====================

def deletar_profissional(db: Session, profissional_id: int) -> bool:
    """
    Deleta um profissional do banco de dados
    
    Estruturas utilizadas:
    - FUNÇÃO
    - DECISÃO: verificar se profissional existe
    """
    # Buscar profissional
    db_profissional = obter_profissional_por_id(db, profissional_id)
    
    # DECISÃO: verificar se existe
    if db_profissional is None:
        return False
    
    # Deletar
    db.delete(db_profissional)
    db.commit()
    
    return True


# ==================== FUNÇÕES AUXILIARES ====================

def obter_areas_unicas(db: Session) -> List[str]:
    """
    Retorna lista de áreas únicas
    
    Estruturas utilizadas:
    - FUNÇÃO
    - REPETIÇÃO: processar resultados
    - DECISÃO: remover duplicatas
    """
    profissionais = db.query(Profissional).all()
    
    areas = set()  # Set para evitar duplicatas
    
    # REPETIÇÃO: iterar sobre profissionais
    for prof in profissionais:
        areas.add(prof.area)
    
    # Converter para lista ordenada
    return sorted(list(areas))


def obter_cidades_unicas(db: Session) -> List[str]:
    """
    Retorna lista de cidades únicas
    
    Estruturas utilizadas:
    - FUNÇÃO
    - REPETIÇÃO
    """
    profissionais = db.query(Profissional).all()
    
    cidades = set()
    
    # REPETIÇÃO
    for prof in profissionais:
        cidades.add(prof.localizacao)
    
    return sorted(list(cidades))


def obter_tecnologias_unicas(db: Session) -> List[str]:
    """
    Retorna lista de tecnologias únicas
    
    Estruturas utilizadas:
    - FUNÇÃO
    - REPETIÇÃO ANINHADA (for dentro de for)
    """
    profissionais = db.query(Profissional).all()
    
    tecnologias = set()
    
    # REPETIÇÃO: iterar sobre profissionais
    for prof in profissionais:
        # REPETIÇÃO ANINHADA: iterar sobre habilidades
        for tech in prof.habilidades_tecnicas:
            tecnologias.add(tech)
    
    return sorted(list(tecnologias))


def contar_profissionais_por_area(db: Session) -> dict:
    """
    Conta quantos profissionais existem em cada área
    
    Estruturas utilizadas:
    - FUNÇÃO
    - REPETIÇÃO
    - DECISÃO
    """
    profissionais = db.query(Profissional).all()
    
    contagem = {}
    
    # REPETIÇÃO: iterar sobre profissionais
    for prof in profissionais:
        # DECISÃO: verificar se área já existe no dicionário
        if prof.area in contagem:
            contagem[prof.area] += 1
        else:
            contagem[prof.area] = 1
    
    return contagem


def obter_profissionais_com_tecnologia(db: Session, tecnologia: str) -> List[Profissional]:
    """
    Retorna profissionais que dominam uma tecnologia específica
    
    Estruturas utilizadas:
    - FUNÇÃO
    - REPETIÇÃO ANINHADA
    - DECISÃO
    """
    profissionais = db.query(Profissional).all()
    
    resultado = []
    
    # REPETIÇÃO: iterar sobre profissionais
    for prof in profissionais:
        encontrou = False
        
        # REPETIÇÃO ANINHADA: verificar habilidades
        for tech in prof.habilidades_tecnicas:
            # DECISÃO: comparar tecnologia (case insensitive)
            if tecnologia.lower() in tech.lower():
                encontrou = True
                break
        
        # DECISÃO: adicionar se encontrou
        if encontrou:
            resultado.append(prof)
    
    return resultado


def calcular_experiencia_total(profissional: Profissional) -> int:
    """
    Calcula anos totais de experiência de um profissional
    
    Estruturas utilizadas:
    - FUNÇÃO
    - REPETIÇÃO
    - DECISÃO
    """
    anos_totais = 0
    
    # REPETIÇÃO: iterar sobre experiências
    for exp in profissional.experiencias:
        # Extrair anos de início e fim
        ano_inicio = int(exp['inicio'].split('-')[0])
        
        # DECISÃO: verificar se ainda está trabalhando
        if exp['fim'] == 'Atual':
            ano_fim = 2024
        else:
            ano_fim = int(exp['fim'].split('-')[0])
        
        anos = ano_fim - ano_inicio
        anos_totais += anos
    
    return anos_totais


def buscar_profissionais_com_minimo_experiencia(db: Session, anos_minimos: int) -> List[Profissional]:
    """
    Busca profissionais com pelo menos X anos de experiência
    
    Estruturas utilizadas:
    - FUNÇÃO
    - REPETIÇÃO
    - DECISÃO
    """
    profissionais = db.query(Profissional).all()
    
    resultado = []
    
    # REPETIÇÃO: verificar cada profissional
    for prof in profissionais:
        anos = calcular_experiencia_total(prof)
        
        # DECISÃO: verificar se atende o mínimo
        if anos >= anos_minimos:
            resultado.append(prof)
    
    return resultado


def buscar_profissionais_por_idioma(db: Session, idioma: str, nivel_minimo: Optional[str] = None) -> List[Profissional]:
    """
    Busca profissionais que falam um idioma específico
    
    Estruturas utilizadas:
    - FUNÇÃO
    - REPETIÇÃO ANINHADA
    - DECISÃO MÚLTIPLA
    """
    profissionais = db.query(Profissional).all()
    
    # Mapa de níveis para comparação
    niveis_ordem = {
        'Básico': 1,
        'Intermediário': 2,
        'Avançado': 3,
        'Fluente': 4,
        'Nativo': 5
    }
    
    resultado = []
    
    # REPETIÇÃO: verificar cada profissional
    for prof in profissionais:
        # REPETIÇÃO ANINHADA: verificar idiomas
        for lang in prof.idiomas:
            # DECISÃO: comparar idioma
            if lang['idioma'].lower() == idioma.lower():
                # DECISÃO: verificar nível se especificado
                if nivel_minimo:
                    nivel_prof = niveis_ordem.get(lang['nivel'], 0)
                    nivel_req = niveis_ordem.get(nivel_minimo, 0)
                    
                    # DECISÃO: verificar se atende o nível mínimo
                    if nivel_prof >= nivel_req:
                        resultado.append(prof)
                        break
                else:
                    resultado.append(prof)
                    break
    
    return resultado

