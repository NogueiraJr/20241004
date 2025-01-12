import { produtosLocacaoRoupa } from "../../../../fields/Dados/sysLocacaoRoupa/produtosLocacaoRoupa-json";

export function ProdutosMaisUsadosLocacaoData() {
  return {
    labels: produtosLocacaoRoupa.map((produto) => produto.name),
    datasets: [
      {
        label: 'Quantidade',
        data: produtosLocacaoRoupa.map((produto) => produto.quantity),
        backgroundColor: '#8884d8',
      },
    ],
  };
}
