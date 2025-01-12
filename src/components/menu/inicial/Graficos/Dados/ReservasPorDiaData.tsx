export function ReservasPorDiaData() {
  return {
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
        tension: 0.4,
      },
    ],
  };
}
