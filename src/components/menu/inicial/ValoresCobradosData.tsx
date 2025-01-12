import { produtosOficinaCarro } from "../../fields/Dados/sysOficinaCarro/produtosOficinaCarro-json";

export function ValoresCobradosData() {
  return {
    labels: produtosOficinaCarro.map((produto) => produto.name),
    datasets: [
      {
        label: 'Valores',
        data: produtosOficinaCarro.map((produto) => produto.price),
        backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
      },
    ],
  };
}
