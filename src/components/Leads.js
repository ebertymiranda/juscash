import React, { useState } from 'react';

function Leads() {
  const [leads, setLeads] = useState([
    { id: '1', name: 'Eberty' },
    { id: '2', name: 'Lead 2' },
    { id: '3', name: 'Lead 3' },
  ]);

  const [draggedLead, setDraggedLead] = useState(null);
  const [draggedOverLead, setDraggedOverLead] = useState(null);

  const handleDragStart = (lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (e, lead) => {
    if (draggedLead) {
      e.preventDefault();
      setDraggedOverLead(lead);
    }
  };

  const handleDragEnd = () => {
    if (draggedLead && draggedOverLead) {
      const leadsCopy = [...leads];
      const draggedIndex = leadsCopy.indexOf(draggedLead);
      const targetIndex = leadsCopy.indexOf(draggedOverLead);
      if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
        leadsCopy.splice(draggedIndex, 1);
        leadsCopy.splice(targetIndex, 0, draggedLead);
        setLeads(leadsCopy);
      }
    }
    setDraggedLead(null);
    setDraggedOverLead(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Leads</h2>
        <button className="bg-blue-500 hover.bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          + Novo Lead
        </button>
      </div>
      <div className="p-4 bg-gray-200">
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-400">Cliente Potencial</th>
              <th className="py-2 px-4 bg-gray-400">Dados Confirmados</th>
              <th className="py-2 px-4 bg-gray-400">Análise de Leads</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr
                key={lead.id}
                draggable
                onDragStart={() => handleDragStart(lead)}
                onDragOver={(e) => handleDragOver(e, lead)}
                onDragEnd={handleDragEnd}
              >
                <td className="py-2 px-4 border border-gray-300">{lead.name}</td>
                <td className="py-2 px-4 border border-gray-300">fdsfsd</td>
                <td className="py-2 px-4 border border-gray-300"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leads;
