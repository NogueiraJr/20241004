import React from "react";
import { ValoresCobradosLocacaoData } from "./Dados/ValoresCobradosLocacaoData";
import { ProdutosMaisUsadosLocacaoData } from "./Dados/ProdutosMaisUsadosLocacaoData";
import { ReservasPorDiaData } from "./Dados/ReservasPorDiaData";
import { ValoresCobradosData } from "./Dados/ValoresCobradosData";
import { ProdutosMaisUsadosData } from "./Dados/ProdutosMaisUsadosData";
import { AtendimentosPorDiaData } from "./Dados/AtendimentosPorDiaData";
import { ChartsLocacaoRoupa } from "./PorSistema/ChartsLocacaoRoupa";
import { ChartsOficinaCarro } from "./PorSistema/ChartsOficinaCarro";

export function renderCharts(system: string) {
  if (system === 'sysOficinaCarro') {
    const atendimentosPorDiaData = AtendimentosPorDiaData();
    const produtosMaisUsadosData = ProdutosMaisUsadosData();
    const valoresCobradosData = ValoresCobradosData();

    return (
      ChartsOficinaCarro(atendimentosPorDiaData, produtosMaisUsadosData, valoresCobradosData)
    );
  } else if (system === 'sysLocacaoRoupa') {
    const reservasPorDiaData = ReservasPorDiaData();
    const produtosMaisUsadosLocacaoData = ProdutosMaisUsadosLocacaoData();
    const valoresCobradosLocacaoData = ValoresCobradosLocacaoData();

    return (
      ChartsLocacaoRoupa(reservasPorDiaData, produtosMaisUsadosLocacaoData, valoresCobradosLocacaoData)
    );
  } else {
    return <p>Use o menu do canto superior esquerdo</p>;
  }
}
