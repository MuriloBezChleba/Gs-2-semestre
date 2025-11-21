import json
import os
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Profissional


def limpar_banco_dados():
    print("Limpando banco de dados...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("Banco de dados limpo e recriado!")


def carregar_dados_json() -> list:
    caminho_json = os.path.join("..", "src", "data", "profissionais.json")
    
    if not os.path.exists(caminho_json):
        print(f"[ERRO] Arquivo nao encontrado em {caminho_json}")
        return []
    
    try:
        with open(caminho_json, 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)
            print(f"[OK] Carregados {len(dados)} perfis do arquivo JSON")
            return dados
    except Exception as e:
        print(f"[ERRO] Erro ao ler arquivo JSON: {e}")
        return []


def mapear_campos_json_para_db(perfil_json: dict) -> dict:
    mapeamento = {
        "habilidadesTecnicas": "habilidades_tecnicas",
        "softSkills": "soft_skills",
        "areaInteresses": "area_interesses"
    }
    
    perfil_db = {}
    
    for campo, valor in perfil_json.items():
        if campo in mapeamento:
            campo_db = mapeamento[campo]
        else:
            campo_db = campo
        
        perfil_db[campo_db] = valor
    
    return perfil_db


def validar_perfil(perfil: dict) -> bool:
    campos_obrigatorios = [
        'nome', 'cargo', 'resumo', 'localizacao', 'area',
        'habilidades_tecnicas', 'soft_skills', 'experiencias',
        'formacao', 'idiomas'
    ]
    
    for campo in campos_obrigatorios:
        if campo not in perfil or not perfil[campo]:
            print(f"[AVISO] Perfil invalido: campo '{campo}' ausente ou vazio")
            return False
    
    return True


def inserir_perfil(db: Session, perfil_json: dict) -> bool:
    try:
        perfil_db = mapear_campos_json_para_db(perfil_json)
        
        if not validar_perfil(perfil_db):
            return False
        
        novo_profissional = Profissional(
            nome=perfil_db['nome'],
            foto=perfil_db.get('foto', ''),
            cargo=perfil_db['cargo'],
            resumo=perfil_db['resumo'],
            localizacao=perfil_db['localizacao'],
            area=perfil_db['area'],
            habilidades_tecnicas=perfil_db['habilidades_tecnicas'],
            soft_skills=perfil_db['soft_skills'],
            experiencias=perfil_db['experiencias'],
            formacao=perfil_db['formacao'],
            projetos=perfil_db.get('projetos', []),
            certificacoes=perfil_db.get('certificacoes', []),
            idiomas=perfil_db['idiomas'],
            area_interesses=perfil_db.get('area_interesses', [])
        )
        
        db.add(novo_profissional)
        return True
        
    except Exception as e:
        print(f"[ERRO] Erro ao inserir perfil: {e}")
        return False


def popular_banco_dados():
    print("\n" + "="*60)
    print("INICIANDO POPULACAO DO BANCO DE DADOS")
    print("="*60 + "\n")
    
    limpar_banco_dados()
    perfis_json = carregar_dados_json()
    
    if not perfis_json:
        print("[ERRO] Nenhum dado para inserir. Encerrando...")
        return
    
    db = SessionLocal()
    
    try:
        total_perfis = len(perfis_json)
        sucesso = 0
        erros = 0
        
        print(f"Processando {total_perfis} perfis...\n")
        
        for indice, perfil in enumerate(perfis_json, start=1):
            if inserir_perfil(db, perfil):
                sucesso += 1
                print(f"[OK] [{indice}/{total_perfis}] {perfil['nome']} - {perfil['cargo']}")
            else:
                erros += 1
                print(f"[ERRO] [{indice}/{total_perfis}] Erro ao inserir: {perfil.get('nome', 'Desconhecido')}")
        
        db.commit()
        
        print("\n" + "="*60)
        print("ESTATISTICAS FINAIS")
        print("="*60)
        print(f"[OK] Perfis inseridos com sucesso: {sucesso}")
        print(f"[ERRO] Erros: {erros}")
        print(f"Taxa de sucesso: {(sucesso/total_perfis)*100:.1f}%")
        
        if sucesso > 0:
            print("\n" + "-"*60)
            print("DISTRIBUICAO POR AREA")
            print("-"*60)
            
            contagem_areas = {}
            
            for perfil in perfis_json:
                area = perfil['area']
                if area in contagem_areas:
                    contagem_areas[area] += 1
                else:
                    contagem_areas[area] = 1
            
            for area, quantidade in sorted(contagem_areas.items()):
                print(f"  - {area}: {quantidade} profissionais")
        
        print("\n" + "="*60)
        print("POPULACAO CONCLUIDA COM SUCESSO!")
        print("="*60 + "\n")
        
    except Exception as e:
        print(f"\n[ERRO] Erro fatal durante populacao do banco: {e}")
        db.rollback()
    finally:
        db.close()


def verificar_banco_populado():
    print("\n" + "="*60)
    print("VERIFICANDO BANCO DE DADOS")
    print("="*60 + "\n")
    
    db = SessionLocal()
    
    try:
        total = db.query(Profissional).count()
        
        print(f"Total de profissionais no banco: {total}")
        
        if total == 0:
            print("[AVISO] Banco esta vazio!")
            return False
        
        print("\nPrimeiros 5 profissionais:")
        print("-"*60)
        
        primeiros = db.query(Profissional).limit(5).all()
        
        for prof in primeiros:
            print(f"  - ID {prof.id}: {prof.nome} - {prof.cargo} ({prof.area})")
        
        print("\nProfissionais por area:")
        print("-"*60)
        
        todos = db.query(Profissional).all()
        areas = {}
        
        for prof in todos:
            if prof.area in areas:
                areas[prof.area] += 1
            else:
                areas[prof.area] = 1
        
        for area, qtd in sorted(areas.items()):
            print(f"  - {area}: {qtd} profissionais")
        
        print("\n[OK] Verificacao concluida!")
        return True
        
    except Exception as e:
        print(f"[ERRO] Erro durante verificacao: {e}")
        return False
    finally:
        db.close()


if __name__ == "__main__":
    popular_banco_dados()
    verificar_banco_populado()
    
    print("\nProcesso finalizado! O banco de dados esta pronto para uso.")
    print("Execute 'python main.py' para iniciar a API.\n")
