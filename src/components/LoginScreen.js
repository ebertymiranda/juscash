import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './logo-white.svg';

function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleLogin = () => {

    var dadosSalvos = localStorage.getItem('usuarios');

    console.log(dadosSalvos)
    if (dadosSalvos) {
      var cadastros = JSON.parse(dadosSalvos);


      var inputEmail = document.getElementById('username');
      var inputSenha = document.getElementById('password');

      var emailUsuario = inputEmail.value;
      var senhaUsuario = inputSenha.value;

      // Iterar sobre os dados de cada usuário
      var loginBemSucedido = false;
      for (var i = 0; i < cadastros.length; i++) {
        var usuario = cadastros[i];
      
        if (emailUsuario === usuario.email && senhaUsuario === usuario.senha) {
          loginBemSucedido = true;
          localStorage.setItem("isAuthenticated", "true");
          break;
        }
      }

      if (loginBemSucedido) {

        navigate('/leads');
      } else {
        console.log('Credenciais inválidas');
      }
    } else {
      console.log('Nenhum dado de cadastro encontrado');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80 rounded-lg">
        <div className="flex items-center justify-center mb-3">
          <img className="mx-auto" src={Logo} alt="Logotipo" />
        </div>
        <form className="text-left">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Nome de usuário"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Senha:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            onClick={handleLogin}
          >
            Entrar
          </button>
          <p className="mt-4 text-gray-600 text-sm text-right text-blue-800 font-bold">
            <a href="/cadastro">Cadastre-se</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
