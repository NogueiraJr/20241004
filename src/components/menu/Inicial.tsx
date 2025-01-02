import React from 'react';
import { useParameter } from '../../context/ParameterContext';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { produtosOficinaCarro } from '../fields/Dados/sysOficinaCarro/produtosOficinaCarro-json';
import { produtosLocacaoRoupa } from '../fields/Dados/sysLocacaoRoupa/produtosLocacaoRoupa-json';
import '../../index.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Inicial: React.FC = () => {
  const { system } = useParameter();

  const renderCharts = () => {
    if (system === 'sysOficinaCarro') {
      const atendimentosPorDiaData = {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [
          {
            label: 'Diagnósticos',
            data: [1, 2, 1, 3, 2, 0, 0],
            borderColor: '#ffc658',
            backgroundColor: '#ffc658',
            fill: false,
            tension: 0.4, // Aplicar curvas suaves
          },
          {
            label: 'Orçamentos',
            data: [2, 3, 4, 2, 1, 0, 0],
            borderColor: '#82ca9d',
            backgroundColor: '#82ca9d',
            fill: false,
            tension: 0.4, // Aplicar curvas suaves
          },
          {
            label: 'Atendimentos',
            data: [4, 8, 5, 9, 3, 0, 0],
            borderColor: '#8884d8',
            backgroundColor: '#8884d8',
            fill: false,
            tension: 0.4, // Aplicar curvas suaves
          },
        ],
      };

      const produtosMaisUsadosData = {
        labels: produtosOficinaCarro.map((produto) => produto.name),
        datasets: [
          {
            label: 'Quantidade',
            data: produtosOficinaCarro.map((produto) => produto.quantity),
            backgroundColor: '#8884d8',
          },
        ],
      };

      const valoresCobradosData = {
        labels: produtosOficinaCarro.map((produto) => produto.name),
        datasets: [
          {
            label: 'Valores',
            data: produtosOficinaCarro.map((produto) => produto.price),
            backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
          },
        ],
      };

      return (
        <div className="charts-container">
          <div className="cardChart large">
            <h3>Atendimentos, Orçamentos e Diagnósticos por Dia da Semana</h3>
            <div className="chart-container">
              <Line data={atendimentosPorDiaData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="cardChart">
            <h3>Serviços/Produtos Usados Mensalmente</h3>
            <div className="chart-container">
              <Bar data={produtosMaisUsadosData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="cardChart">
            <h3>Valores Cobrados nos Atendimentos</h3>
            <div className="chart-container">
              <Pie data={valoresCobradosData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      );
    } else if (system === 'sysLocacaoRoupa') {
      const reservasPorDiaData = {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [
          {
            label: 'Reservas',
            data: [3, 2, 11, 5, 9, 12, 0],
            borderColor: '#8884d8',
            backgroundColor: '#8884d8',
            fill: false,
            tension: 0.4, // Aplicar curvas suaves
          },
          {
            label: 'Provas',
            data: [2, 3, 10, 2, 1, 9, 0],
            borderColor: '#82ca9d',
            backgroundColor: '#82ca9d',
            fill: false,
            tension: 0.4, // Aplicar curvas suaves
          },
          {
            label: 'Retiradas',
            data: [1, 12, 1, 13, 2, 4, 0],
            borderColor: '#ffc658',
            backgroundColor: '#ffc658',
            fill: false,
            tension: 0.4, // Aplicar curvas suaves
          },
          {
            label: 'Devoluções',
            data: [2, 3, 14, 1, 8, 7, 0],
            borderColor: '#ff8042',
            backgroundColor: '#ff8042',
            fill: false,
            tension: 0.4, // Aplicar curvas suaves
          },
        ],
      };

      const produtosMaisUsadosLocacaoData = {
        labels: produtosLocacaoRoupa.map((produto) => produto.name),
        datasets: [
          {
            label: 'Quantidade',
            data: produtosLocacaoRoupa.map((produto) => produto.quantity),
            backgroundColor: '#8884d8',
          },
        ],
      };

      const valoresCobradosLocacaoData = {
        labels: produtosLocacaoRoupa.map((produto) => produto.name),
        datasets: [
          {
            label: 'Valores',
            data: produtosLocacaoRoupa.map((produto) => produto.price),
            backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
          },
        ],
      };

      return (
        <div className="charts-container">
          <div className="cardChart large">
            <h3>Reservas, Provas, Retiradas e Devoluções por Dia da Semana</h3>
            <div className="chart-container">
              <Line data={reservasPorDiaData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="cardChart">
            <h3>Serviços/Produtos Usados Mensalmente</h3>
            <div className="chart-container">
              <Bar data={produtosMaisUsadosLocacaoData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="cardChart">
            <h3>Valores Cobrados nas Locações</h3>
            <div className="chart-container">
              <Pie data={valoresCobradosLocacaoData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      );
    } else {
      return <p>Use o menu do canto superior esquerdo</p>;
    }
  };

  const getTitle = () => {
    if (system === 'sysOficinaCarro') {
      return 'Oficina de Carros';
    } else if (system === 'sysLocacaoRoupa') {
      return 'Locação de Roupas';
    } else {
      return 'Inicial (em breve)';
    }
  };

  return (
    <div className="inicial-container">
      <h2>{getTitle()}</h2>
      {renderCharts()}
    </div>
  );
};

export default Inicial;
