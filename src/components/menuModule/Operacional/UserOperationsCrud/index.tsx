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

interface OperationProps {
  action: string; // Tipo do parâmetro (modifique conforme necessário)
}

const Operation: React.FC<OperationProps> = ({ action }) => {
  // console.log('action: ' + action);
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
    const defaultValue = 'Atendimento de';
    const clienteSelecionado = clientes.find((c) => c.id === value);
    if (clienteSelecionado) {
      const descricaoPrefixMap = {
        sysLocacaoRoupa: {
          reserva: `Reserva para ${clienteSelecionado.name}`,
          default: `${defaultValue} ${clienteSelecionado.name}`
        },
        sysOficinaCarro: {
          diagnostico: `Diagnóstico para ${clienteSelecionado.name}`,
          orcamento: `Orçamento para ${clienteSelecionado.name}`,
          default: `${defaultValue} ${clienteSelecionado.name}`
        }
      };

      const descricaoPrefix =
        descricaoPrefixMap[system]?.[action] || descricaoPrefixMap[system]?.default || 'Cliente ';

      form.setFieldsValue({ descricao: descricaoPrefix });
    }
  };

  return (
    <ConfigProvider locale={ptBR}>
      <Form layout="vertical" form={form}>
        <Cliente handleClienteChange={handleClienteChange} clientes={clientes} />
        <Descricao />
        {system === 'sysLocacaoRoupa' && action === 'reserva' && (
          <>
            <Etiquetas etiquetas={etiquetas} />
            <InformeItens
              produtos={produtos}
              handleProductChange={handleProductChange}
              handleQuantityChange={handleQuantityChange}
              quantities={quantities}
            />
            <ItensSelecionados total={total} setTotal={setTotal} />
          </>
        )}

        {system === 'sysLocacaoRoupa' && (
          <>
            <DataProva />
            <DataRetirada />
            <DataDevolucao />
          </>
        )}
        {system === 'sysOficinaCarro' && action === 'orcamento' && (
          <>
            <Etiquetas etiquetas={etiquetas} />
            <InformeItens
              produtos={produtos}
              handleProductChange={handleProductChange}
              handleQuantityChange={handleQuantityChange}
              quantities={quantities}
            />
            <ItensSelecionados total={total} setTotal={setTotal} />
            <DataExecucao />
          </>
        )}
        <Anotacoes />
        <SaveOperationButton form={form} />
      </Form>
    </ConfigProvider>
  );
};

export default Operation;
