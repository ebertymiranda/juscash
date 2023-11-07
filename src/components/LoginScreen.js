import React, { Component } from 'react';
import Logo from './logo-white.svg';

class LoginScreen extends Component {
  render() {
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
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
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
}

export default LoginScreen;
