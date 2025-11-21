from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import uvicorn

from database import engine, Base, SessionLocal
from models import Profissional
from schemas import ProfissionalCreate, ProfissionalResponse, ProfissionalUpdate
from crud import (
    criar_profissional,
    obter_profissional_por_id,
    obter_todos_profissionais,
    atualizar_profissional,
    deletar_profissional,
    buscar_profissionais,
    obter_areas_unicas,
    obter_cidades_unicas,
    obter_tecnologias_unicas,
    contar_profissionais_por_area,
    obter_profissionais_com_tecnologia
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FuturoConecta API",
    description="API REST para gerenciamento de perfis profissionais",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "API FuturoConecta - Rede Profissional",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "profissionais": "/api/profissionais",
            "areas": "/api/areas",
            "cidades": "/api/cidades",
            "tecnologias": "/api/tecnologias",
            "estatisticas": "/api/estatisticas"
        }
    }


@app.get("/health")
def health_check():
    return {"status": "ok", "message": "API funcionando corretamente"}


@app.post("/api/profissionais", response_model=ProfissionalResponse, status_code=201)
def criar_novo_profissional(profissional: ProfissionalCreate):
    db = SessionLocal()
    try:
        novo_profissional = criar_profissional(db, profissional)
        return novo_profissional
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        db.close()


@app.get("/api/profissionais", response_model=List[ProfissionalResponse])
def listar_profissionais(
    skip: int = Query(0, ge=0, description="Número de registros para pular"),
    limit: int = Query(100, ge=1, le=100, description="Número máximo de registros"),
    area: Optional[str] = Query(None, description="Filtrar por área"),
    cidade: Optional[str] = Query(None, description="Filtrar por cidade"),
    tecnologia: Optional[str] = Query(None, description="Filtrar por tecnologia"),
    busca: Optional[str] = Query(None, description="Busca textual")
):
    db = SessionLocal()
    try:
        if busca or area or cidade or tecnologia:
            profissionais = buscar_profissionais(
                db=db,
                termo_busca=busca,
                area=area,
                cidade=cidade,
                tecnologia=tecnologia,
                skip=skip,
                limit=limit
            )
        else:
            profissionais = obter_todos_profissionais(db, skip=skip, limit=limit)
        
        return profissionais
    finally:
        db.close()


@app.get("/api/profissionais/{profissional_id}", response_model=ProfissionalResponse)
def obter_profissional(profissional_id: int):
    db = SessionLocal()
    try:
        profissional = obter_profissional_por_id(db, profissional_id)
        
        if profissional is None:
            raise HTTPException(
                status_code=404,
                detail=f"Profissional com ID {profissional_id} não encontrado"
            )
        
        return profissional
    finally:
        db.close()


@app.put("/api/profissionais/{profissional_id}", response_model=ProfissionalResponse)
def atualizar_dados_profissional(profissional_id: int, profissional: ProfissionalUpdate):
    db = SessionLocal()
    try:
        profissional_atualizado = atualizar_profissional(db, profissional_id, profissional)
        
        if profissional_atualizado is None:
            raise HTTPException(
                status_code=404,
                detail=f"Profissional com ID {profissional_id} não encontrado"
            )
        
        return profissional_atualizado
    finally:
        db.close()


@app.delete("/api/profissionais/{profissional_id}", status_code=204)
def deletar_profissional_por_id(profissional_id: int):
    db = SessionLocal()
    try:
        sucesso = deletar_profissional(db, profissional_id)
        
        if not sucesso:
            raise HTTPException(
                status_code=404,
                detail=f"Profissional com ID {profissional_id} não encontrado"
            )
        
        return None
    finally:
        db.close()


@app.get("/api/areas", response_model=List[str])
def listar_areas():
    db = SessionLocal()
    try:
        areas = obter_areas_unicas(db)
        return areas
    finally:
        db.close()


@app.get("/api/cidades", response_model=List[str])
def listar_cidades():
    db = SessionLocal()
    try:
        cidades = obter_cidades_unicas(db)
        return cidades
    finally:
        db.close()


@app.get("/api/tecnologias", response_model=List[str])
def listar_tecnologias():
    db = SessionLocal()
    try:
        tecnologias = obter_tecnologias_unicas(db)
        return tecnologias
    finally:
        db.close()


@app.get("/api/estatisticas")
def obter_estatisticas():
    db = SessionLocal()
    try:
        total_profissionais = len(obter_todos_profissionais(db, skip=0, limit=1000))
        profissionais_por_area = contar_profissionais_por_area(db)
        total_areas = len(obter_areas_unicas(db))
        total_cidades = len(obter_cidades_unicas(db))
        total_tecnologias = len(obter_tecnologias_unicas(db))
        
        return {
            "total_profissionais": total_profissionais,
            "total_areas": total_areas,
            "total_cidades": total_cidades,
            "total_tecnologias": total_tecnologias,
            "profissionais_por_area": profissionais_por_area
        }
    finally:
        db.close()


@app.get("/api/profissionais/tecnologia/{tecnologia}", response_model=List[ProfissionalResponse])
def listar_profissionais_por_tecnologia(tecnologia: str):
    db = SessionLocal()
    try:
        profissionais = obter_profissionais_com_tecnologia(db, tecnologia)
        return profissionais
    finally:
        db.close()


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
