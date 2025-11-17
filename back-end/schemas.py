"""
Schemas Pydantic para validação de dados da API
"""

from pydantic import BaseModel, Field
from typing import List, Optional


class ExperienciaSchema(BaseModel):
    """Schema para experiência profissional"""
    empresa: str
    cargo: str
    inicio: str
    fim: str
    descricao: str


class FormacaoSchema(BaseModel):
    """Schema para formação acadêmica"""
    curso: str
    instituicao: str
    ano: int


class ProjetoSchema(BaseModel):
    """Schema para projetos"""
    titulo: str
    link: str
    descricao: str


class IdiomaSchema(BaseModel):
    """Schema para idiomas"""
    idioma: str
    nivel: str


class ProfissionalBase(BaseModel):
    """Schema base do profissional"""
    nome: str = Field(..., min_length=3, max_length=200)
    foto: str = ""
    cargo: str = Field(..., min_length=3, max_length=200)
    resumo: str = Field(..., min_length=10)
    localizacao: str = Field(..., min_length=3, max_length=100)
    area: str = Field(..., min_length=3, max_length=100)
    habilidades_tecnicas: List[str] = Field(..., min_items=1)
    soft_skills: List[str] = Field(..., min_items=1)
    experiencias: List[ExperienciaSchema] = Field(..., min_items=1)
    formacao: List[FormacaoSchema] = Field(..., min_items=1)
    projetos: List[ProjetoSchema] = []
    certificacoes: List[str] = []
    idiomas: List[IdiomaSchema] = Field(..., min_items=1)
    area_interesses: List[str] = []


class ProfissionalCreate(ProfissionalBase):
    """Schema para criação de profissional"""
    pass


class ProfissionalUpdate(BaseModel):
    """Schema para atualização de profissional (todos os campos opcionais)"""
    nome: Optional[str] = None
    foto: Optional[str] = None
    cargo: Optional[str] = None
    resumo: Optional[str] = None
    localizacao: Optional[str] = None
    area: Optional[str] = None
    habilidades_tecnicas: Optional[List[str]] = None
    soft_skills: Optional[List[str]] = None
    experiencias: Optional[List[ExperienciaSchema]] = None
    formacao: Optional[List[FormacaoSchema]] = None
    projetos: Optional[List[ProjetoSchema]] = None
    certificacoes: Optional[List[str]] = None
    idiomas: Optional[List[IdiomaSchema]] = None
    area_interesses: Optional[List[str]] = None


class ProfissionalResponse(ProfissionalBase):
    """Schema para resposta da API"""
    id: int

    class Config:
        from_attributes = True

