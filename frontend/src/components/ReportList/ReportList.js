import React, { useEffect, useState } from 'react';
import './ReportList.css';
import axios from 'axios';

const ReportList = () => {
  const [loading, setLoading] = useState(true);
  const [reportes, setReportes] = useState(null);

  useEffect(() => {
      const data = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/reporte/');
          setReportes(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      data();
  }, []);

  return (
    <div>
      {(loading && !reportes) ? (
        <div className="loading-message">
          <span>Cargando reportes...</span>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="report-list-container">
          <h1>Lista de Reportes de Usuarios</h1>
          {!reportes ? (
            <div className="no-reports-message">
              <span>No existen reportes.</span>
            </div>
          ) : ( 
            <table className="report-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Motivo</th>
                  <th style={{ textAlign: 'left' }}>Descripcion</th>
                </tr>
              </thead>
              <tbody>
                {reportes && reportes.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.usuario.nombre}</td>
                    <td>{report.motivo}</td>
                    <td style={{ textAlign: 'left' }}>{report.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportList;
