import React, { useState } from 'react';
import { X } from 'react-feather';

function LeadModal({ isOpen, closeModal, addLead }) {
  const [leadData, setLeadData] = useState({
    nome: '',
    email: '',
    telefone: '',
    checkboxes: {
      todos: false,
      honorariosSucumbenciais: false,
      honorariosContratuais: false,
      honorariosDativos: false,
      creditoAutor: false,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData({
      ...leadData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setLeadData({
      ...leadData,
      checkboxes: {
        ...leadData.checkboxes,
        [name]: checked,
      },
    });
  };

  const handleAddLead = () => {
    // Valide os dados do novo lead, se necessário

    // Adicione o novo lead à lista de leads
    addLead(leadData);

    // Limpe os campos
    setLeadData({
      nome: '',
      email: '',
      telefone: '',
      checkboxes: {
        todos: false,
        honorariosSucumbenciais: false,
        honorariosContratuais: false,
        honorariosDativos: false,
        creditoAutor: false,
      },
    });

    // Feche o modal
    closeModal();
  };

  const overlayStyle = {
    display: isOpen ? 'block' : 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center" style={overlayStyle}>
        <div className="bg-white p-4 rounded shadow-md w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-semibold mb-4">Dados do Lead</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Nome Completo:</label>
            <input
              type="text"
              name="nome"
              value={leadData.nome}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">E-mail:</label>
            <input
              type="email"
              name="email"
              value={leadData.email}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Telefone:</label>
            <input
              type="tel"
              name="telefone"
              value={leadData.telefone}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Oportunidades:</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="checkboxes.todos"
                  checked={leadData.checkboxes.todos}
                  onChange={handleCheckboxChange}
                />{' '}
                Todos
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="checkboxes.honorariosSucumbenciais"
                  checked={leadData.checkboxes.honorariosSucumbenciais}
                  onChange={handleCheckboxChange}
                />{' '}
                Honorários Sucumbenciais
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="checkboxes.honorariosContratuais"
                  checked={leadData.checkboxes.honorariosContratuais}
                  onChange={handleCheckboxChange}
                />{' '}
                Honorários Contratuais
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="checkboxes.honorariosDativos"
                  checked={leadData.checkboxes.honorariosDativos}
                  onChange={handleCheckboxChange}
                />{' '}
                Honorários Dativos
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="checkboxes.creditoAutor"
                  checked={leadData.checkboxes.creditoAutor}
                  onChange={handleCheckboxChange}
                />{' '}
                Crédito do Autor
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleAddLead}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded w-24"
            >
              Cadastrar
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 hover-bg-gray-400 text-gray-700 font-semibold py-2 px-3 rounded w-24"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadModal;
