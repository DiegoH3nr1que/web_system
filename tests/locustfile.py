from locust import HttpUser, task, between
import random

class EnvironmentUser(HttpUser):
    # Aguardar entre 1 e 3 segundos entre as requisições
    wait_time = between(1, 3)

    @task(1)
    def create_environment(self):
        # Dados para criar um novo ambiente
        data = {
            "name": "Test Environment",
            "type": "Development",
            "location": "Building 1",
            "condition": "Operational",
            "maintenance_team": "Team A",  # Pode ser omitido se for None
            "maintenances_done": 5
        }
        response = self.client.post("/environments/", json=data)
        print(response.status_code, response.text)

    @task(2)
    def list_environments(self):
        # Obter todos os ambientes
        response = self.client.get("/environments/")
        print(response.status_code, response.text)

    @task(3)
    def get_environment(self):
        # Obter um ambiente específico
        env_id = random.randint(1, 10)  # ID aleatório para simulação
        response = self.client.get(f"/environments/{env_id}")
        print(response.status_code, response.text)

    @task(1)
    def update_environment(self):
        # Atualizar um ambiente específico
        env_id = random.randint(1, 10)  # ID aleatório para simulação
        data = {
            "name": "Updated Test Environment",
            "type": "Production",
            "location": "Building 2",
            "condition": "Maintenance",
            "maintenance_team": "Team B",  # Pode ser None também
            "maintenances_done": 10
        }
        response = self.client.put(f"/environments/{env_id}", json=data)
        print(response.status_code, response.text)

    @task(1)
    def delete_environment(self):
        # Deletar um ambiente específico
        env_id = random.randint(1, 10)  # ID aleatório para simulação
        response = self.client.delete(f"/environments/{env_id}")
        print(response.status_code, response.text)
