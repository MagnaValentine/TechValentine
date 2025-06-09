import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const coresGradientes = {
  rosaRoxo: "linear-gradient(135deg, #f8bbd0, #bbdefb)",
  azulVerde: "linear-gradient(135deg, #a8edea, #fed6e3)",
  lilas: "linear-gradient(135deg, #c2e9fb, #f9f9f9)",
  amareloRosa: "linear-gradient(135deg, #fddb92, #d1fdff)",
};

const Cronograma = () => {
  const nome = localStorage.getItem("nomeUsuario");
  const navigate = useNavigate();

  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [dia, setDia] = useState("");
  const [duracao, setDuracao] = useState("");
  const [link, setLink] = useState("");
  const [corFundo, setCorFundo] = useState(
    localStorage.getItem("corFundo") || "rosaRoxo"
  );

  useEffect(() => {
    document.body.style.background = coresGradientes[corFundo];
    const salvas = JSON.parse(localStorage.getItem(`${nome}_tarefas`)) || [];
    setTarefas(salvas);
  }, [nome, corFundo]);

  const salvarTarefas = (novas) => {
    localStorage.setItem(`${nome}_tarefas`, JSON.stringify(novas));
  };

  const adicionarTarefa = () => {
    if (!descricao || !dia || !duracao) return;

    const nova = {
      descricao,
      dia,
      duracao,
      link,
      dataCriacao: new Date().toLocaleString("pt-BR"),
      concluida: false,
    };

    const novas = [...tarefas, nova];
    setTarefas(novas);
    salvarTarefas(novas);

    setDescricao("");
    setDia("");
    setDuracao("");
    setLink("");
  };

  const removerTarefa = (index) => {
    const novas = tarefas.filter((_, i) => i !== index);
    setTarefas(novas);
    salvarTarefas(novas);
  };

  const marcarConcluida = (index) => {
    const novas = [...tarefas];
    novas[index].concluida = !novas[index].concluida;
    setTarefas(novas);
    salvarTarefas(novas);

    if (novas[index].concluida) {
      alert("🎉 Parabéns por concluir essa tarefa!");
    }
  };

  const sair = () => {
    localStorage.removeItem("nomeUsuario");
    navigate("/");
  };

  const trocarCorFundo = (novaCor) => {
    setCorFundo(novaCor);
    localStorage.setItem("corFundo", novaCor);
  };

  return (
    <div className="cronograma-container">
      <div className="topo">
        <h1>Cronograma de Estudos</h1>
        <div className="seletor-cores">
          {Object.keys(coresGradientes).map((cor) => (
            <button
              key={cor}
              style={{
                background: coresGradientes[cor],
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                border: cor === corFundo ? "2px solid black" : "none",
                cursor: "pointer",
              }}
              onClick={() => trocarCorFundo(cor)}
              title={cor}
            ></button>
          ))}
        </div>
      </div>

      <div className="formulario">
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <select value={dia} onChange={(e) => setDia(e.target.value)}>
          <option value="">Selecione o dia</option>
          <option value="Segunda">Segunda</option>
          <option value="Terça">Terça</option>
          <option value="Quarta">Quarta</option>
          <option value="Quinta">Quinta</option>
          <option value="Sexta">Sexta</option>
        </select>
        <select value={duracao} onChange={(e) => setDuracao(e.target.value)}>
          <option value="">Duração</option>
          <option value="1h">1 hora</option>
          <option value="2h">2 horas</option>
          <option value="3h">3 horas</option>
          <option value="4h">4 horas</option>
        </select>
        <input
          type="text"
          placeholder="Link (opcional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>

      <h2 className="titulo-lista">Minhas Tarefas</h2>
      <ul className="lista-tarefas">
        {tarefas.map((tarefa, index) => (
          <li
            key={index}
            className={`card-tarefa ${tarefa.concluida ? "concluida" : ""}`}
          >
            <div className="cabecalho">
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => marcarConcluida(index)}
              />
              <strong>{tarefa.descricao}</strong>
            </div>
            <p>
              📅 {tarefa.dia} | ⏱ {tarefa.duracao}
              {tarefa.link && (
                <a href={tarefa.link} target="_blank" rel="noreferrer"> 🔗</a>
              )}
            </p>
            <p className="criada">Criada em: {tarefa.dataCriacao}</p>
            <button onClick={() => removerTarefa(index)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={sair}>Sair</button>
    </div>
  );
};

export default Cronograma;
