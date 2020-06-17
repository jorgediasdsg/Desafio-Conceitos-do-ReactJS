import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);
  
  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title:  `Novo Repositório ${Date.now()}`,
      url :  `http://www.${Date.now()}.com`,
      techs: ['Shell','PHP','Python', 'Javascript']
    })

    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {

    const repositoryFiltred = repositories.filter(repository => repository.id !== id);

    await api.delete(`repositories/${id}`)
      .then((response) => {
        if (response.status === 204) setRepositories(repositoryFiltred);
      })
      .catch((error) => console.log(error));;
  }
    
  return (
    <div>

      <button onClick={handleAddRepository}>Adicionar</button>

      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title}<button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>)}
      </ul>

    </div>
  );
}

export default App;