import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";

export function ChartsOficinaCarro(atendimentosPorDiaData: { labels: string[]; datasets: { label: string; data: number[]; borderColor: string; backgroundColor: string; fill: boolean; tension: number; }[]; }, produtosMaisUsadosData: { labels: string[]; datasets: { label: string; data: number[]; backgroundColor: string; }[]; }, valoresCobradosData: { labels: string[]; datasets: { label: string; data: number[]; backgroundColor: string[]; }[]; }) {
  return <div className="charts-container">
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
  </div>;
}
