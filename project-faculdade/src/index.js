import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [modoCadastro, setModoCadastro] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate(); // Para redirecionamento interno

  // Função de Login
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Bem-vindo, ${data.nome}!`);
        navigate("/cronograma"); // Redireciona para a página do cronograma
      } else {
        setErro(data.erro);
      }
    } catch (error) {
      setErro("Erro ao conectar ao servidor.");
    }
  };

  // Função de Cadastro
  const handleCadastro = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, usuario, senha }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setErro(""); // Limpa erros anteriores
        alert("✅ Cadastro realizado com sucesso!");
        setModoCadastro(false); // Redireciona para login
      } else {
        if (response.status === 409) {
          setErro("⚠️ Usuário já existe! Escolha outro nome de usuário.");
        } else {
          setErro(data.erro);
        }
      }
    } catch (error) {
      setErro("❌ Erro ao conectar ao servidor.");
    }
  };
  


  return (
    <div className="container">
      <div className="header">
        <h1>CRONOGRAMA DE ESTUDOS</h1>
        <img src="/image/livrorosa.png" alt="Livros" className="books-image" />
      </div>

      <div className="content">
        <div className="login-container">
          <h2>{modoCadastro ? "Cadastro" : "Login"}</h2>
          {erro && <p style={{ color: "red" }}>{erro}</p>}

          <form onSubmit={modoCadastro ? handleCadastro : handleLogin}>
            {modoCadastro && (
              <>
                <label>Nome:</label>
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </>
            )}

            <label>Usuário:</label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />

            <label>Senha:</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <button type="submit">{modoCadastro ? "Cadastrar" : "Login"}</button>
          </form>

          <p>
            {modoCadastro ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
            <button
              onClick={() => {
                setModoCadastro(!modoCadastro);
                setErro("");
              }}
              style={{
                background: "none",
                border: "none",
                color: "blue",
                cursor: "pointer",
              }}
            >
              {modoCadastro ? "Faça login" : "Cadastre-se"}
            </button>
          </p>
        </div>

        <div className="motivational-box">
          <p>"O sucesso é a soma de pequenos esforços repetidos dia após dia."</p>
        </div>
      </div>
    </div>
  );
};

const Cronograma = () => {
  return (
    <div className="container">
      <h1>Bem-vindo ao Cronograma</h1>
      <p>Aqui será exibido o cronograma do usuário.</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cronograma" element={<Cronograma />} />
    </Routes>
  </Router>
);


/*const App = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>CRONOGRAMA DE ESTUDOS</h1>
        <img src="/image/livrorosa.png" alt="Livros" className="books-image" />
      </header>
      <Login />
    </div>

    
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);*/


/*import React from "react";
import ReactDOM from "react-dom/client";
import FaceRecognition from "./components/FaceRecognition";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FaceRecognition />);
import * as faceapi from "face-api.js";

const loadModels = async () => {
  const MODEL_URL = "/models"; // Aponta para public/models

  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    console.log("Modelos carregados com sucesso!");
  } catch (error) {
    console.error("Erro ao carregar modelos:", error);
  }
};

loadModels();*/
