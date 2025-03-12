import React from "react";
import ReactDOM from "react-dom/client";

const Cronograma = () => {
  return (
    <div className="container">
      <h1>Bem-vindo ao Cronograma de Estudos!</h1>
      <p>Aqui você poderá organizar seu plano de estudos.</p>
      <button onClick={() => (window.location.href = "/")}>Sair</button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Cronograma />);
