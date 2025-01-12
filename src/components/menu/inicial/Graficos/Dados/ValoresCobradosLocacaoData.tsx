import { produtosLocacaoRoupa } from "../../../../fields/Dados/sysLocacaoRoupa/produtosLocacaoRoupa-json";

export function ValoresCobradosLocacaoData() {
  return {
    labels: produtosLocacaoRoupa.map((produto) => produto.name),
    datasets: [
      {
        label: 'Valores',
        data: produtosLocacaoRoupa.map((produto) => produto.price),
        backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
      },
    ],
  };
}
