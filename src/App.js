import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  // O segundo parametro da useEffect e uma variavel, quando ela for alterada busca as informacoes novamente.
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('/repositories', {
      "title": `Repositório ${Date.now()}`,
      "url": "http://www.github.com/yvescleuder/licitadoc",
      "techs": [
        "PHP",
        "Laravel",
        "MySQL"
      ]
    });

    // Adiciona o resultado dentro do repositories
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {

    await api.delete(`/repositories/${id}`);

    // O find e um filtro para filtrar de acordo com a condicao
    // Neste caso: buscar todos os repository que sao diferente do ID que estou recebendo
    const repositoriesFilter = repositories.filter(repository => repository.id !== id);
    console.log(repositoriesFilter);
    
    // Adiciona o repositoriesFilter dentro do repositories
    setRepositories(repositoriesFilter);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => {

            return (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            );
          })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
