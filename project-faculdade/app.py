import cx_Oracle
import jwt
import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS

# Configuração do Flask
app = Flask(__name__)
CORS(app)

# Configuração do banco de dados Oracle
try:
    dsn = cx_Oracle.makedsn("localhost", 1521, service_name="XEPDB1")  # Confirme o service_name correto
    conn = cx_Oracle.connect(user="JULIANA", password="2233", dsn=dsn)
    print("✅ Conexão com o banco de dados foi bem-sucedida!")
except cx_Oracle.DatabaseError as e:
    print("❌ Erro ao conectar ao banco de dados:", e)
    exit(1)  # Interrompe o programa se a conexão falhar

# Chave secreta para tokens JWT
app.config["SECRET_KEY"] = "minha_chave_secreta"


# 📌 Rota de Login
@app.route("/login", methods=["POST"])
def login():
    dados = request.json
    usuario = dados.get("usuario")
    senha = dados.get("senha")

    if not usuario or not senha:
        return jsonify({"erro": "Usuário e senha são obrigatórios!"}), 400

    try:
        with cx_Oracle.connect(user="JULIANA", password="2233", dsn=dsn) as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT nome FROM usuarios WHERE usuario = :1 AND senha = :2", (usuario, senha))
                user = cursor.fetchone()

        if user:
            return jsonify({"nome": user[0]}), 200
        else:
            return jsonify({"erro": "Usuário ou senha inválidos."}), 401
    except cx_Oracle.DatabaseError as e:
        return jsonify({"erro": "Erro ao acessar o banco de dados", "detalhes": str(e)}), 500

# 📌 Rota de Cadastro
@app.route("/register", methods=["POST"])
def register():
    dados = request.json
    nome = dados.get("nome")
    usuario = dados.get("usuario")
    senha = dados.get("senha")

    if not nome or not usuario or not senha:
        return jsonify({"erro": "Todos os campos são obrigatórios!"}), 400

    try:
        with cx_Oracle.connect(user="JULIANA", password="2233", dsn=dsn) as conn:
            with conn.cursor() as cursor:
                # Verifica se o usuário já existe
                cursor.execute("SELECT COUNT(*) FROM usuarios WHERE usuario = :1", (usuario,))
                (existe,) = cursor.fetchone()
                if existe > 0:
                    return jsonify({"erro": "Usuário já existe no sistema!"}), 409
                
                # Insere um novo usuário
                cursor.execute("INSERT INTO usuarios (nome, usuario, senha) VALUES (:1, :2, :3)", (nome, usuario, senha))
                conn.commit()

        return jsonify({"mensagem": "✅ Usuário cadastrado com sucesso!"}), 201
    except cx_Oracle.DatabaseError as e:
        return jsonify({"erro": "Erro ao acessar o banco de dados", "detalhes": str(e)}), 500


# 📌 Rota do Cronograma
@app.route("/cronograma", methods=["GET"])
def cronograma():
    return jsonify({"mensagem": "Bem-vindo ao cronograma!"}), 200

# Inicia o servidor Flask
if __name__ == "__main__":
    app.run(debug=True)
