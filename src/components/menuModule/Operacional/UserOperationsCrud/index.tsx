import React, { useState, useEffect } from 'react';
import { Form, ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';
import { useParameter } from '../../../../context/ParameterContext';

import Cliente from './Cliente';
import ClienteItem from './ClienteItem'; // Importe o componente ClienteItem
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
          reserva: `Reserva de ${clienteSelecionado.name}`,
          default: `${defaultValue} ${clienteSelecionado.name}`
        },
        sysOficinaCarro: {
          diagnostico: `Diagnóstico de ${clienteSelecionado.name}`,
          orcamento: `Orçamento de ${clienteSelecionado.name}`,
          default: `${defaultValue} ${clienteSelecionado.name}`
        }
      };

      const descricaoPrefix =
        descricaoPrefixMap[system]?.[action] || descricaoPrefixMap[system]?.default || 'Cliente ';

      form.setFieldsValue({ descricao: descricaoPrefix });
    }
  };

  const handleClienteItemChange = (value: string) => {
    console.log('Cliente Item selecionado:', value);
  };

  const getClienteItemLabel = () => {
    switch (system) {
      case 'sysOficinaCarro':
        return 'Veículo';
      case 'sysPetShop':
      case 'sysClinicaVeterinaria':
        return 'Animal';
      default:
        return 'Cliente Item';
    }
  };

  const getClienteItemPlaceholder = () => {
    switch (system) {
      case 'sysOficinaCarro':
        return 'Selecione um veículo';
      case 'sysPetShop':
      case 'sysClinicaVeterinaria':
        return 'Selecione um animal';
      default:
        return 'Selecione um cliente item';
    }
  };

  return (
    <ConfigProvider locale={ptBR}>
      <Form layout="vertical" form={form}>
        <Cliente handleClienteChange={handleClienteChange} clientes={clientes} />
        {system === 'sysOficinaCarro' && (
          <ClienteItem
            handleClienteItemChange={handleClienteItemChange}
            clientes={clientes}
            label={getClienteItemLabel()}
            placeholder={getClienteItemPlaceholder()}
          />
        )}
        {['sysPetShop', 'sysClinicaVeterinaria'].includes(system) && (
          <ClienteItem
            handleClienteItemChange={handleClienteItemChange}
            clientes={clientes}
            label={getClienteItemLabel()}
            placeholder={getClienteItemPlaceholder()}
          />
        )}
        <Descricao />
        {system === 'sysLocacaoRoupa' && action === 'reserva' && (
          <>
            <Etiquetas etiquetas={etiquetas} />
            <ItensSelecionados total={total} setTotal={setTotal} />
            <InformeItens
              produtos={produtos}
              handleProductChange={handleProductChange}
              handleQuantityChange={handleQuantityChange}
              quantities={quantities}
            />
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
            <ItensSelecionados total={total} setTotal={setTotal} />
            <InformeItens
              produtos={produtos}
              handleProductChange={handleProductChange}
              handleQuantityChange={handleQuantityChange}
              quantities={quantities}
            />
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
