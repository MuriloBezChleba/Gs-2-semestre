"""
Script para popular o banco de dados com dados iniciais
Importa os 60 perfis do frontend para o banco de dados

Estruturas utilizadas:
- FUNÇÕES
- ESTRUTURAS DE REPETIÇÃO (for, while)
- ESTRUTURAS DE DECISÃO (if/else, try/except)
"""

import json
import os
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Profissional


def limpar_banco_dados():
    """
    Remove todas as tabelas e recria
    
    Estrutura: FUNÇÃO com DECISÃO
    """
    print("Limpando banco de dados...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("Banco de dados limpo e recriado!")


def carregar_dados_json() -> list:
    """
    Carrega dados do arquivo JSON do frontend
    
    Estruturas:
    - FUNÇÃO
    - DECISÃO (verificação de arquivo)
    """
    # Caminho para o arquivo JSON do frontend
    caminho_json = os.path.join("..", "src", "data", "profissionais.json")
    
    # DECISÃO: verificar se arquivo existe
    if not os.path.exists(caminho_json):
        print(f"[ERRO] Arquivo nao encontrado em {caminho_json}")
        return []
    
    # Ler e parsear JSON
    try:
        with open(caminho_json, 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)
            print(f"[OK] Carregados {len(dados)} perfis do arquivo JSON")
            return dados
    except Exception as e:
        print(f"[ERRO] Erro ao ler arquivo JSON: {e}")
        return []


def mapear_campos_json_para_db(perfil_json: dict) -> dict:
    """
    Mapeia os campos do JSON para o formato do banco de dados
    
    Estruturas:
    - FUNÇÃO
    - DECISÃO (validação de campos)
    - REPETIÇÃO (processamento de listas)
    """
    # Mapeamento dos campos (alguns nomes são diferentes)
    mapeamento = {
        "habilidadesTecnicas": "habilidades_tecnicas",
        "softSkills": "soft_skills",
        "areaInteresses": "area_interesses"
    }
    
    # Criar dicionário mapeado
    perfil_db = {}
    
    # REPETIÇÃO: processar cada campo do JSON
    for campo, valor in perfil_json.items():
        # DECISÃO: usar nome mapeado ou original
        if campo in mapeamento:
            campo_db = mapeamento[campo]
        else:
            campo_db = campo
        
        perfil_db[campo_db] = valor
    
    return perfil_db


def validar_perfil(perfil: dict) -> bool:
    """
    Valida se um perfil tem todos os campos obrigatórios
    
    Estruturas:
    - FUNÇÃO
    - DECISÃO MÚLTIPLA
    - REPETIÇÃO
    """
    campos_obrigatorios = [
        'nome', 'cargo', 'resumo', 'localizacao', 'area',
        'habilidades_tecnicas', 'soft_skills', 'experiencias',
        'formacao', 'idiomas'
    ]
    
    # REPETIÇÃO: verificar cada campo obrigatório
    for campo in campos_obrigatorios:
        # DECISÃO: verificar se campo existe e não está vazio
        if campo not in perfil or not perfil[campo]:
            print(f"[AVISO] Perfil invalido: campo '{campo}' ausente ou vazio")
            return False
    
    return True


def inserir_perfil(db: Session, perfil_json: dict) -> bool:
    """
    Insere um perfil no banco de dados
    
    Estruturas:
    - FUNÇÃO
    - DECISÃO (try/except)
    """
    try:
        # Mapear campos
        perfil_db = mapear_campos_json_para_db(perfil_json)
        
        # DECISÃO: validar perfil
        if not validar_perfil(perfil_db):
            return False
        
        # Criar objeto Profissional
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
        
        # Adicionar ao banco
        db.add(novo_profissional)
        return True
        
    except Exception as e:
        print(f"[ERRO] Erro ao inserir perfil: {e}")
        return False


def popular_banco_dados():
    """
    Função principal para popular o banco de dados
    
    Estruturas:
    - FUNÇÃO PRINCIPAL
    - REPETIÇÃO (for, while)
    - DECISÃO (if/else, try/except)
    """
    print("\n" + "="*60)
    print("INICIANDO POPULACAO DO BANCO DE DADOS")
    print("="*60 + "\n")
    
    # Limpar banco existente
    limpar_banco_dados()
    
    # Carregar dados do JSON
    perfis_json = carregar_dados_json()
    
    # DECISÃO: verificar se carregou dados
    if not perfis_json:
        print("[ERRO] Nenhum dado para inserir. Encerrando...")
        return
    
    # Criar sessão do banco
    db = SessionLocal()
    
    try:
        total_perfis = len(perfis_json)
        sucesso = 0
        erros = 0
        
        print(f"Processando {total_perfis} perfis...\n")
        
        # REPETIÇÃO: processar cada perfil
        for indice, perfil in enumerate(perfis_json, start=1):
            # DECISÃO: inserir perfil
            if inserir_perfil(db, perfil):
                sucesso += 1
                print(f"[OK] [{indice}/{total_perfis}] {perfil['nome']} - {perfil['cargo']}")
            else:
                erros += 1
                print(f"[ERRO] [{indice}/{total_perfis}] Erro ao inserir: {perfil.get('nome', 'Desconhecido')}")
        
        # Commit de todas as inserções
        db.commit()
        
        # Estatísticas finais
        print("\n" + "="*60)
        print("ESTATISTICAS FINAIS")
        print("="*60)
        print(f"[OK] Perfis inseridos com sucesso: {sucesso}")
        print(f"[ERRO] Erros: {erros}")
        print(f"Taxa de sucesso: {(sucesso/total_perfis)*100:.1f}%")
        
        # DECISÃO: mostrar estatísticas por área
        if sucesso > 0:
            print("\n" + "-"*60)
            print("DISTRIBUICAO POR AREA")
            print("-"*60)
            
            # Contar por área
            contagem_areas = {}
            
            # REPETIÇÃO: contar profissionais por área
            for perfil in perfis_json:
                area = perfil['area']
                # DECISÃO: incrementar contador
                if area in contagem_areas:
                    contagem_areas[area] += 1
                else:
                    contagem_areas[area] = 1
            
            # REPETIÇÃO: mostrar estatísticas
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
    """
    Verifica se o banco foi populado corretamente
    
    Estruturas:
    - FUNÇÃO
    - DECISÃO
    - REPETIÇÃO
    """
    print("\n" + "="*60)
    print("VERIFICANDO BANCO DE DADOS")
    print("="*60 + "\n")
    
    db = SessionLocal()
    
    try:
        # Contar total de profissionais
        total = db.query(Profissional).count()
        
        print(f"Total de profissionais no banco: {total}")
        
        # DECISÃO: verificar se tem dados
        if total == 0:
            print("[AVISO] Banco esta vazio!")
            return False
        
        # Mostrar alguns exemplos
        print("\nPrimeiros 5 profissionais:")
        print("-"*60)
        
        primeiros = db.query(Profissional).limit(5).all()
        
        # REPETIÇÃO: mostrar profissionais
        for prof in primeiros:
            print(f"  - ID {prof.id}: {prof.nome} - {prof.cargo} ({prof.area})")
        
        # Estatísticas por área
        print("\nProfissionais por area:")
        print("-"*60)
        
        todos = db.query(Profissional).all()
        areas = {}
        
        # REPETIÇÃO + DECISÃO: contar por área
        for prof in todos:
            if prof.area in areas:
                areas[prof.area] += 1
            else:
                areas[prof.area] = 1
        
        # REPETIÇÃO: mostrar contagem
        for area, qtd in sorted(areas.items()):
            print(f"  - {area}: {qtd} profissionais")
        
        print("\n[OK] Verificacao concluida!")
        return True
        
    except Exception as e:
        print(f"[ERRO] Erro durante verificacao: {e}")
        return False
    finally:
        db.close()


# ==================== EXECUÇÃO ====================

if __name__ == "__main__":
    # Popular banco de dados
    popular_banco_dados()
    
    # Verificar se funcionou
    verificar_banco_populado()
    
    print("\nProcesso finalizado! O banco de dados esta pronto para uso.")
    print("Execute 'python main.py' para iniciar a API.\n")

