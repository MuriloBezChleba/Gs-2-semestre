from sqlalchemy.orm import Session
from typing import List, Optional
from models import Profissional
from schemas import ProfissionalCreate, ProfissionalUpdate


def criar_profissional(db: Session, profissional: ProfissionalCreate) -> Profissional:
    db_profissional = Profissional(
        nome=profissional.nome,
        foto=profissional.foto,
        cargo=profissional.cargo,
        resumo=profissional.resumo,
        localizacao=profissional.localizacao,
        area=profissional.area,
        habilidades_tecnicas=[skill for skill in profissional.habilidades_tecnicas],
        soft_skills=[skill for skill in profissional.soft_skills],
        experiencias=[exp.dict() for exp in profissional.experiencias],
        formacao=[form.dict() for form in profissional.formacao],
        projetos=[proj.dict() for proj in profissional.projetos],
        certificacoes=profissional.certificacoes,
        idiomas=[idioma.dict() for idioma in profissional.idiomas],
        area_interesses=profissional.area_interesses
    )
    
    db.add(db_profissional)
    db.commit()
    db.refresh(db_profissional)
    
    return db_profissional


def obter_profissional_por_id(db: Session, profissional_id: int) -> Optional[Profissional]:
    profissional = db.query(Profissional).filter(Profissional.id == profissional_id).first()
    
    if profissional is None:
        return None
    
    return profissional


def obter_todos_profissionais(db: Session, skip: int = 0, limit: int = 100) -> List[Profissional]:
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
    query = db.query(Profissional)
    
    if termo_busca:
        termo_lower = termo_busca.lower()
        query = query.filter(
            (Profissional.nome.ilike(f"%{termo_busca}%")) |
            (Profissional.cargo.ilike(f"%{termo_busca}%")) |
            (Profissional.resumo.ilike(f"%{termo_busca}%"))
        )
    
    if area:
        query = query.filter(Profissional.area == area)
    
    if cidade:
        query = query.filter(Profissional.localizacao == cidade)
    
    profissionais = query.offset(skip).limit(limit).all()
    
    if tecnologia:
        profissionais_filtrados = []
        for prof in profissionais:
            for tech in prof.habilidades_tecnicas:
                if tecnologia.lower() in tech.lower():
                    profissionais_filtrados.append(prof)
                    break
        return profissionais_filtrados
    
    return profissionais


def atualizar_profissional(
    db: Session,
    profissional_id: int,
    profissional_update: ProfissionalUpdate
) -> Optional[Profissional]:
    db_profissional = obter_profissional_por_id(db, profissional_id)
    
    if db_profissional is None:
        return None
    
    update_data = profissional_update.dict(exclude_unset=True)
    
    for campo, valor in update_data.items():
        if hasattr(db_profissional, campo):
            if campo in ['experiencias', 'formacao', 'projetos', 'idiomas']:
                valor_processado = [item.dict() if hasattr(item, 'dict') else item for item in valor]
                setattr(db_profissional, campo, valor_processado)
            else:
                setattr(db_profissional, campo, valor)
    
    db.commit()
    db.refresh(db_profissional)
    
    return db_profissional


def deletar_profissional(db: Session, profissional_id: int) -> bool:
    db_profissional = obter_profissional_por_id(db, profissional_id)
    
    if db_profissional is None:
        return False
    
    db.delete(db_profissional)
    db.commit()
    
    return True


def obter_areas_unicas(db: Session) -> List[str]:
    profissionais = db.query(Profissional).all()
    areas = set()
    
    for prof in profissionais:
        areas.add(prof.area)
    
    return sorted(list(areas))


def obter_cidades_unicas(db: Session) -> List[str]:
    profissionais = db.query(Profissional).all()
    cidades = set()
    
    for prof in profissionais:
        cidades.add(prof.localizacao)
    
    return sorted(list(cidades))


def obter_tecnologias_unicas(db: Session) -> List[str]:
    profissionais = db.query(Profissional).all()
    tecnologias = set()
    
    for prof in profissionais:
        for tech in prof.habilidades_tecnicas:
            tecnologias.add(tech)
    
    return sorted(list(tecnologias))


def contar_profissionais_por_area(db: Session) -> dict:
    profissionais = db.query(Profissional).all()
    contagem = {}
    
    for prof in profissionais:
        if prof.area in contagem:
            contagem[prof.area] += 1
        else:
            contagem[prof.area] = 1
    
    return contagem


def obter_profissionais_com_tecnologia(db: Session, tecnologia: str) -> List[Profissional]:
    profissionais = db.query(Profissional).all()
    resultado = []
    
    for prof in profissionais:
        encontrou = False
        
        for tech in prof.habilidades_tecnicas:
            if tecnologia.lower() in tech.lower():
                encontrou = True
                break
        
        if encontrou:
            resultado.append(prof)
    
    return resultado


def calcular_experiencia_total(profissional: Profissional) -> int:
    anos_totais = 0
    
    for exp in profissional.experiencias:
        ano_inicio = int(exp['inicio'].split('-')[0])
        
        if exp['fim'] == 'Atual':
            ano_fim = 2024
        else:
            ano_fim = int(exp['fim'].split('-')[0])
        
        anos = ano_fim - ano_inicio
        anos_totais += anos
    
    return anos_totais


def buscar_profissionais_com_minimo_experiencia(db: Session, anos_minimos: int) -> List[Profissional]:
    profissionais = db.query(Profissional).all()
    resultado = []
    
    for prof in profissionais:
        anos = calcular_experiencia_total(prof)
        
        if anos >= anos_minimos:
            resultado.append(prof)
    
    return resultado


def buscar_profissionais_por_idioma(db: Session, idioma: str, nivel_minimo: Optional[str] = None) -> List[Profissional]:
    profissionais = db.query(Profissional).all()
    
    niveis_ordem = {
        'Básico': 1,
        'Intermediário': 2,
        'Avançado': 3,
        'Fluente': 4,
        'Nativo': 5
    }
    
    resultado = []
    
    for prof in profissionais:
        for lang in prof.idiomas:
            if lang['idioma'].lower() == idioma.lower():
                if nivel_minimo:
                    nivel_prof = niveis_ordem.get(lang['nivel'], 0)
                    nivel_req = niveis_ordem.get(nivel_minimo, 0)
                    
                    if nivel_prof >= nivel_req:
                        resultado.append(prof)
                        break
                else:
                    resultado.append(prof)
                    break
    
    return resultado
