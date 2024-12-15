"""
Teste de carga para uma API de gerenciamento de ambientes usando Locust.

Objetivo:
- Validar a performance e o comportamento da API sob diferentes cargas de requisições.
- Garantir que as operações de CRUD (Create, Read, Update, Delete) funcionem corretamente e dentro dos limites de tempo esperados.

Configurações:
- Cada usuário simula requisições com um tempo de espera aleatório entre 1 e 3 segundos.
- As tarefas possuem pesos diferentes para simular padrões reais de uso:
  - Listar ambientes: 2x mais frequente que criar, atualizar ou deletar.
  - Operações aleatórias para obter, atualizar e deletar utilizam IDs simulados.

Tecnologias:
- Locust: Ferramenta de teste de carga para simular múltiplos usuários realizando ações concorrentes na API.

objetivo:
- Identificar gargalos de desempenho em operações comuns (CRUD).
- Garantir que a API mantém estabilidade com múltiplos usuários concorrentes.
- Validar o comportamento da API em diferentes cenários (sucesso, erro 404, etc.).

Exemplo:
Cenário 1: A API falha ao processar mais de 100 usuários concorrentes. 
A solução seria identificar o gargalo no servidor e aumentar os recursos disponíveis (CPU ou memória).

Cenário 2: As operações de atualização são mais lentas do que criar novos ambientes.
Nesse caso, otimizar a lógica de banco de dados para melhorar a performance.
"""


import random
from locust import HttpUser, task, between

class EnvironmentUser(HttpUser):
    wait_time = between(1, 3)

    def on_start(self):
        """
        Inicializa os IDs existentes no banco de dados.
        Aqui você deve substituir pela lógica que obtém os IDs reais do banco.
        """
        self.environment_ids = [
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47
        ]

    @task(1)
    def create_environment(self):
        """
        Testa a criação de novos ambientes.
        Dados dinâmicos são usados, mas podem ser adaptados conforme necessário.
        """
        data = {
            "name": f"Environment {len(self.environment_ids) + 1}",
            "type": "Development",
            "location": "Building 2",
            "condition": "Operational",
            "maintenance_team": "Team C",
            "maintenances_done": 0
        }
        response = self.client.post("/environments/", json=data)
        if response.status_code == 201:
            new_id = response.json()["id"]
            self.environment_ids.append(new_id)
        else:
            print(f"Erro ao criar ambiente: {response.status_code} - {response.text}")

    @task(2)
    def list_environments(self):
        """
        Testa a listagem de todos os ambientes.
        """
        response = self.client.get("/environments/")
        assert response.status_code == 200, f"Erro na listagem: {response.status_code} - {response.text}"

    @task(3)
    def get_environment(self):
        """
        Testa a obtenção de um ambiente específico usando IDs reais.
        """
        if self.environment_ids:
            env_id = random.choice(self.environment_ids)
            response = self.client.get(f"/environments/{env_id}")
            assert response.status_code in [200, 404], f"Erro ao obter ambiente: {response.status_code} - {response.text}"

    @task(1)
    def update_environment(self):
        """
        Testa a atualização de ambientes com base nos IDs do banco.
        """
        if self.environment_ids:
            env_id = random.choice(self.environment_ids)
            data = {
                "name": "Updated Environment",
                "type": "Production",
                "location": "Building 3",
                "condition": "Maintenance",
                "maintenance_team": "Team B",
                "maintenances_done": random.randint(5, 15)
            }
            response = self.client.put(f"/environments/{env_id}", json=data)
            assert response.status_code in [200, 404], f"Erro na atualização: {response.status_code} - {response.text}"

    @task(1)
    def delete_environment(self):
        """
        Testa a exclusão de ambientes.
        """
        if self.environment_ids:
            env_id = random.choice(self.environment_ids)
            response = self.client.delete(f"/environments/{env_id}")
            if response.status_code == 200:
                self.environment_ids.remove(env_id)
            else:
                print(f"Erro ao deletar ambiente: {response.status_code} - {response.text}")

