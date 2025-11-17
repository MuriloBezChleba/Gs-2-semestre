"""
Models do banco de dados usando SQLAlchemy ORM
"""

from sqlalchemy import Column, Integer, String, Text, JSON
from database import Base


class Profissional(Base):
    """
    Model que representa um profissional no banco de dados
    """
    __tablename__ = "profissionais"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(200), nullable=False, index=True)
    foto = Column(String(500), default="")
    cargo = Column(String(200), nullable=False, index=True)
    resumo = Column(Text, nullable=False)
    localizacao = Column(String(100), nullable=False, index=True)
    area = Column(String(100), nullable=False, index=True)
    
    # Campos JSON para armazenar arrays
    habilidades_tecnicas = Column(JSON, nullable=False)
    soft_skills = Column(JSON, nullable=False)
    experiencias = Column(JSON, nullable=False)
    formacao = Column(JSON, nullable=False)
    projetos = Column(JSON, nullable=False)
    certificacoes = Column(JSON, nullable=False)
    idiomas = Column(JSON, nullable=False)
    area_interesses = Column(JSON, nullable=False)

    def __repr__(self):
        return f"<Profissional(id={self.id}, nome='{self.nome}', cargo='{self.cargo}')>"

