export function AtendimentosPorDiaData() {
  return {
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
        tension: 0.4,
      },
    ],
  };
}
