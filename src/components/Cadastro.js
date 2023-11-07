import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Logo from './logo-white.svg';
import { Eye, EyeOff } from 'react-feather'; 

Modal.setAppElement('#root'); 

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmacaoSenha: '',
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const toggleMostrarSenha = () => {
    setMostrarSenha((prev) => !prev);
  };

  const toggleMostrarConfirmarSenha = () => {
    setMostrarConfirmarSenha((prev) => !prev);
  };

  const adicionarUsuario = (usuario) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação de senha
    const senha = formData.senha;
    const senhaValida = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{8,}$/.test(senha);
  
    if (!senhaValida) {
      setModalMessage('A senha deve ter pelo menos 8 caracteres, incluindo um número, um caracter especial e um caracter alfanumérico.');
      openModal();
      return;
    }
  
    // Validação de confirmação de senha
    if (formData.senha !== formData.confirmacaoSenha) {
      setModalMessage('A senha e a confirmação de senha não coincidem.');
      openModal();
      return;
    }
  
    // Criar objeto de usuário
    const novoUsuario = {
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
    };

    // Adicionar o novo usuário ao localStorage
    adicionarUsuario(novoUsuario);

    // Limpar os campos do formulário ou redirecionar para outra página, se necessário.
    setFormData({
      nome: '',
      email: '',
      senha: '',
      confirmacaoSenha: '',
    });

    navigate('/');
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '300px', 
    },
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Cadastro</h2>
        <div className="flex items-center justify-center mb-3">
            <img className="mx-auto" src={Logo} alt="Logotipo" />
          </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full rounded-md border px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">E-mail:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Senha:</label>
            <div className="relative">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              className="w-full rounded-md border px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="button"
              onClick={toggleMostrarSenha}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              {mostrarSenha ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium">Confirmação de Senha:</label>
            <div className="relative">
              <input
                type={mostrarConfirmarSenha ? 'text' : 'password'}
                name="confirmacaoSenha"
                value={formData.confirmacaoSenha}
                onChange={handleChange}
                required
                className="w-full rounded-md border px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                type="button"
                onClick={toggleMostrarConfirmarSenha}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-600 cursor-pointer"
              >
                {mostrarConfirmarSenha ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
          >
            Cadastrar
          </button>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Erro Modal"
        style={customStyles}
      >
        <h2 className="text-2xl font-semibold mb-4">Erro</h2>
        <p>{modalMessage}</p>
        <button onClick={closeModal} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4">Fechar</button>
      </Modal>
    </div>
  );
}

export default Cadastro;
