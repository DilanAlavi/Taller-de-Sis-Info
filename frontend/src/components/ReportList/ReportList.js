import React from 'react';
import './ReportList.css';

const ReportList = () => {
  // Datos hardcodeados 
  const reports = [
    {
      id: 1,
      userName: 'Juan Pérez',
      reason: 'Publicación de contenido inapropiado',
      date: '2024-11-01',
    },
    {
      id: 2,
      userName: 'María López',
      reason: 'Comportamiento ofensivo',
      date: '2024-11-10',
    },
    {
      id: 3,
      userName: 'Carlos García',
      reason: 'Uso de lenguaje inapropiado',
      date: '2024-11-15',
    },
  ];

  return (
    <div className="report-list-container">
      <h1>Lista de Reportes de Usuarios</h1>
      <table className="report-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Motivo</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.userName}</td>
              <td>{report.reason}</td>
              <td>{report.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportList;
