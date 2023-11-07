import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeadModal from './LeadModal';
import Logo from './logo-white.svg';

function Leads() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem('columns');
    if (savedColumns) {
      return JSON.parse(savedColumns);
    }
    return [
      { id: 1, title: 'Cliente Potencial', items: [] },
      { id: 2, title: 'Dados Confirmados', items: [] },
      { id: 3, title: 'Análise de Leads', items: [] },
    ];
  });

  const [draggedItem, setDraggedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movedItems, setMovedItems] = useState(new Set()); // Estado para controlar os nomes movidos

  useEffect(() => {
    const savedLeads = localStorage.getItem('leads');
    if (savedLeads) {
      const leadsData = JSON.parse(savedLeads);
      const clientPotencialItems = leadsData.map((lead) => lead.nome);
      setColumns((prevColumns) => {
        const updatedColumns = [...prevColumns];
        // Verifica se a coluna "Cliente Potencial" está vazia antes de adicionar nomes
        if (updatedColumns[0].items.length === 0) {
          updatedColumns[0].items = clientPotencialItems;
        }
        return updatedColumns;
      });
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onDragStart = (e, item, columnIndex) => {
    if (columnIndex === 1 || columnIndex === 2) {
      e.dataTransfer.setData('text/plain', JSON.stringify({ item, columnIndex }));
      setDraggedItem({ item, columnIndex });
    } else {
      e.preventDefault();
    }
  };

  const onDragOver = (e, columnIndex) => {
    e.preventDefault();
  };

  const onDrop = (e, targetColumnIndex) => {
    e.preventDefault();

    if (draggedItem) {
      const { item, columnIndex } = draggedItem;

      if (
        (columnIndex === 1 && targetColumnIndex === 2) ||
        (columnIndex === 2 && targetColumnIndex === 3)
      ) {
        const updatedColumns = [...columns];
        updatedColumns[columnIndex - 1].items = updatedColumns[columnIndex - 1].items.filter((i) => i !== item);
        updatedColumns[targetColumnIndex - 1].items = [...updatedColumns[targetColumnIndex - 1].items, item];
        setColumns(updatedColumns);
        setDraggedItem(null);
        movedItems.add(item);
        setMovedItems(new Set(movedItems));
        // Salvar as colunas no localStorage
        localStorage.setItem('columns', JSON.stringify(updatedColumns));
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">
          <img className="mx-auto" src={Logo} alt="Logotipo" />
        </h2>
        <button
          onClick={openModal}
          className="bg-blue-500 hover-bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          + Novo Lead
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {columns.map((column) => (
          <div
            key={column.id}
            onDragOver={(e) => onDragOver(e, column.id)}
            onDrop={(e) => onDrop(e, column.id)}
            className="col-span-1 bg-gray-200 p-2 rounded text-center"
          >
            <h3 className="mb-2">{column.title}</h3>
            {column.items.map((item) => (
              <div
                key={item}
                draggable
                onDragStart={(e) => onDragStart(e, item, column.id)}
                className="bg-white p-2 mb-2 rounded cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
      <LeadModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default Leads;
