import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cronograma = () => {
  const nome = localStorage.getItem("nomeUsuario");
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [fraseAleatoria, setFraseAleatoria] = useState(""); // ✅ novo estado
  const navigate = useNavigate();

  const frases = [
    "📚 Vamos conquistar seus objetivos!",
    "🚀 Um passo de cada vez!",
    "🎯 Foque no seu progresso!",
    "💡 Aprender é um superpoder!",
  ];

  // ✅ Gera a frase apenas uma vez ao carregar o componente
  useEffect(() => {
    const frase = frases[Math.floor(Math.random() * frases.length)];
    setFraseAleatoria(frase);
  }, []);

  const adicionarTarefa = () => {
    if (novaTarefa.trim() === "") return;
    setTarefas([...tarefas, novaTarefa]);
    setNovaTarefa("");
  };


  const sair = () => {
    localStorage.removeItem("nomeUsuario");
    navigate("/");
  };

  const dataHoje = new Date().toLocaleDateString("pt-BR");

  return (
    <div className='container'>
      <h1>Bem-vindo ao Cronograma de Estudos, {nome}!</h1>
      <p>Hoje é {dataHoje}</p>
      <p>{fraseAleatoria}</p>

      <div className='cronograma-section'>
        <h2>Monte sua rotina de estudos</h2>
        <input
          type='text'
          placeholder='Ex: Estudar JavaScript'
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          style={{ fontSize: "14px", marginTop: "10px" }}
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
        <ul>
  {tarefas.map((tarefa, index) => (
    <li key={index} style={{ fontSize: "20px", marginTop: "10px" }}>
      {tarefa}
      <button onClick={() => removerTarefa(index)}>❌</button>
    </li>
  ))}
</ul>


        const removerTarefa = (indexParaRemover) => {
  const novasTarefas = tarefas.filter((_, i) => i !== indexParaRemover);
  setTarefas(novasTarefas);
};



         <li key={index}>
        {tarefa}
       <button onClick={() => removerTarefa(index)}>❌</button>
       </li>

        <ul>
          {tarefas.map((tarefa, index) => (
            <li key={index} style={{ fontSize: "20px", marginTop: "10px" }}>
           {tarefa}
           </li> ))}
        </ul>
      </div>

      <button onClick={sair}>Sair</button>
    </div>
  );
};

export default Cronograma;
