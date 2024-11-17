import React, { useState, useEffect } from 'react';
import { Form, ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';
import { useParameter } from '../../../../context/ParameterContext';

import Cliente from './Cliente';
import Etiquetas from './Etiquetas';
import ItensSelecionados from './ItensSelecionados';
import InformeItens from './InformeItens';
import Descricao from './Descricao';
import DataProva from './DataProva';
import DataRetirada from './DataRetirada';
import DataDevolucao from './DataDevolucao';
import DataExecucao from './DataExecucao';
import Anotacoes from './Anotacoes';
import SaveOperationButton from './SaveOperationButton';

import { produtosLocacaoRoupa } from '../../../fields/Dados/sysLocacaoRoupa/produtosLocacaoRoupa-json';
import { clientesLocacaoRoupa } from '../../../fields/Dados/sysLocacaoRoupa/clientesLocacaoRoupa-json';
import { produtosOficinaCarro } from '../../../fields/Dados/sysOficinaCarro/produtosOficinaCarro-json';
import { clientesOficinaCarro } from '../../../fields/Dados/sysOficinaCarro/clientesOficinaCarro-json';
import { userTagsLocacaoRoupa } from '../../../fields/Dados/sysLocacaoRoupa/userTagsLocacaoRoupa-json';
import { userTagsOficinaCarro } from '../../../fields/Dados/sysOficinaCarro/userTagsOficinaCarro-json';

const Operation: React.FC = () => {
  const { system } = useParameter();
  const [form] = Form.useForm();
  const [total, setTotal] = useState('0,00');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  let produtos = [];
  let clientes = [];
  let etiquetas = [];

  switch (system) {
    case 'sysLocacaoRoupa':
      produtos = produtosLocacaoRoupa;
      clientes = clientesLocacaoRoupa;
      etiquetas = userTagsLocacaoRoupa;
      break;
    case 'sysOficinaCarro':
      produtos = produtosOficinaCarro;
      clientes = clientesOficinaCarro;
      etiquetas = userTagsOficinaCarro;
      break;
    default:
      break;
  }

  // Atualiza as quantidades dos produtos
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  };

  // Atualiza a lista de itens selecionados
  const handleProductChange = (values: string[]) => {
    setSelectedItems(values);
  };

  // Recalcula o total sempre que itens ou quantidades mudarem
  useEffect(() => {
    const totalValue = selectedItems.reduce((acc, id) => {
      const product = produtos.find((p) => p.id === id);
      if (product) {
        const quantity = quantities[id] || 1;
        acc += product.price * quantity;
      }
      return acc;
    }, 0);

    setTotal(totalValue.toFixed(2).replace('.', ','));
  }, [selectedItems, quantities, produtos]);

  const handleClienteChange = (value: string) => {
    const clienteSelecionado = clientes.find((c) => c.id === value);
    if (clienteSelecionado) {
      const descricaoPrefix =
        system === 'sysLocacaoRoupa'
          ? `Reserva para ${clienteSelecionado.name}`
          : `Orçamento para ${clienteSelecionado.name}`;
      form.setFieldsValue({ descricao: descricaoPrefix });
    }
  };

  return (
    <ConfigProvider locale={ptBR}>
      <Form layout="vertical" form={form}>
        <Cliente handleClienteChange={handleClienteChange} clientes={clientes} />
        <Etiquetas etiquetas={etiquetas} /> {/* Passando as etiquetas para o componente */}
        <ItensSelecionados total={total} setTotal={setTotal} />
        <InformeItens
          produtos={produtos}
          handleProductChange={handleProductChange}
          handleQuantityChange={handleQuantityChange}
          quantities={quantities}
        />
        <Descricao />
        {system === 'sysLocacaoRoupa' && (
          <>
            <DataProva />
            <DataRetirada />
            <DataDevolucao />
            <Anotacoes />
          </>
        )}
        {system === 'sysOficinaCarro' && (
          <>
            <DataExecucao />
            <Anotacoes />
          </>
        )}
        <SaveOperationButton form={form} />
      </Form>
    </ConfigProvider>
  );
};

export default Operation;
