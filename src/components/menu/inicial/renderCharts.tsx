import React from "react";
import { Line, Bar, Pie } from 'react-chartjs-2';
import { ValoresCobradosLocacaoData } from "./ValoresCobradosLocacaoData";
import { ProdutosMaisUsadosLocacaoData } from "./ProdutosMaisUsadosLocacaoData";
import { ReservasPorDiaData } from "./ReservasPorDiaData";
import { ValoresCobradosData } from "./ValoresCobradosData";
import { ProdutosMaisUsadosData } from "./ProdutosMaisUsadosData";
import { AtendimentosPorDiaData } from "./AtendimentosPorDiaData";

export function renderCharts(system: string) {
  if (system === 'sysOficinaCarro') {
    const atendimentosPorDiaData = AtendimentosPorDiaData();
    const produtosMaisUsadosData = ProdutosMaisUsadosData();
    const valoresCobradosData = ValoresCobradosData();

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
    const reservasPorDiaData = ReservasPorDiaData();
    const produtosMaisUsadosLocacaoData = ProdutosMaisUsadosLocacaoData();
    const valoresCobradosLocacaoData = ValoresCobradosLocacaoData();

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
}
