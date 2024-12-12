import React, { useEffect, useState } from 'react';
import './ReportList.css';
import axios from 'axios';
import { api_url } from '../../config';

const ReportList = () => {
  const [loading, setLoading] = useState(true);
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api_url}/reporte/`);
        setReportes(response.data);
      } catch (error) {
        console.log(error);
        setReportes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading-message">
          <span>Cargando reportes...</span>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="report-list-container">
          <h1>Lista de Reportes de Usuarios</h1>
          {reportes.length === 0 ? (
            <div className="no-reports-message">
              <span>No existen reportes.</span>
            </div>
          ) : (
            <table className="report-table">
              <thead>
                <tr>
                  <th className='td-id'>ID</th>
                  <th>Usuario</th>
                  <th>Motivo</th>
                  <th className='td-description'>Descripcion</th>
                </tr>
              </thead>
              <tbody>
                {reportes.map((report) => (
                  <tr key={report.id}>
                    <td data-label="ID">{report.id}</td>
                    <td data-label="Usuario">{report.usuario.nombre}</td>
                    <td data-label="Motivo">{report.motivo}</td>
                    <td className="td-description-cell" data-label="Descripción">{report.descripcion}</td>
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