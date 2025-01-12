import { produtosOficinaCarro } from "../../fields/Dados/sysOficinaCarro/produtosOficinaCarro-json";

export function ProdutosMaisUsadosData() {
  return {
    labels: produtosOficinaCarro.map((produto) => produto.name),
    datasets: [
      {
        label: 'Quantidade',
        data: produtosOficinaCarro.map((produto) => produto.quantity),
        backgroundColor: '#8884d8',
      },
    ],
  };
}
