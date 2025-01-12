import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";

export function ChartsLocacaoRoupa(reservasPorDiaData: { labels: string[]; datasets: { label: string; data: number[]; borderColor: string; backgroundColor: string; fill: boolean; tension: number; }[]; }, produtosMaisUsadosLocacaoData: { labels: string[]; datasets: { label: string; data: number[]; backgroundColor: string; }[]; }, valoresCobradosLocacaoData: { labels: string[]; datasets: { label: string; data: number[]; backgroundColor: string[]; }[]; }) {
  return <div className="charts-container">
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
  </div>;
}
