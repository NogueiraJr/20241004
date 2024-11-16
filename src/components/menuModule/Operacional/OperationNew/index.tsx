import React, { useState } from 'react';
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
import CriarReservaButton from './CriarReservaButton';
import CriarOrcamentoButton from './CriarOrcamentoButton';

import { produtosLocacaoRoupa } from '../../../fields/Dados/sysLocacaoRoupa/produtosLocacaoRoupa-json';
import { clientesLocacaoRoupa } from '../../../fields/Dados/sysLocacaoRoupa/clientesLocacaoRoupa-json';
import { produtosOficinaCarros } from '../../../fields/Dados/sysOficinaCarros/produtosOficinaCarros-json';
import { clientesOficinaCarros } from '../../../fields/Dados/sysOficinaCarros/clientesOficinaCarros-json';

const OperationNew: React.FC = () => {
  const { system } = useParameter();
  const [form] = Form.useForm(); // Inicializa o formulário
  const [total, setTotal] = useState('0,00');
  
  // Estado para armazenar as quantidades dos produtos
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  let produtos = [];
  let clientes = [];
  
  switch (system) {
    case 'sysLocacaoRoupa':
      produtos = produtosLocacaoRoupa;
      clientes = clientesLocacaoRoupa;
      break;
    case 'sysOficinaCarros':
      produtos = produtosOficinaCarros;
      clientes = clientesOficinaCarros;
      break;
    default:
      break;
  }

  // Função para atualizar as quantidades dos produtos
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  };

  // Atualiza o campo Descrição ao selecionar um cliente
  const handleClienteChange = (value: string) => {
    const clienteSelecionado = clientes.find(c => c.id === value);
    if (clienteSelecionado) {
      const descricaoPrefix = system === 'sysLocacaoRoupa' 
        ? `Reserva para ${clienteSelecionado.name}` 
        : `Orçamento para ${clienteSelecionado.name}`;
      form.setFieldsValue({ descricao: descricaoPrefix });
    }
  };

  return (
    <ConfigProvider locale={ptBR}>
      <Form layout="vertical" form={form}>
        <Cliente handleClienteChange={handleClienteChange} clientes={clientes} />
        <Etiquetas />
        <ItensSelecionados total={total} setTotal={setTotal} />
        <InformeItens 
          produtos={produtos} 
          handleProductChange={() => {}} 
          handleQuantityChange={handleQuantityChange} // Passa a função handleQuantityChange
          quantities={quantities} // Passa o estado quantities
        />
        <Descricao />
        {system === 'sysLocacaoRoupa' && (
          <>
            <DataProva />
            <DataRetirada />
            <DataDevolucao />
            <Anotacoes />
            <CriarReservaButton />
          </>
        )}
        {system === 'sysOficinaCarros' && (
          <>
            <DataExecucao />
            <Anotacoes />
            <CriarOrcamentoButton />
          </>
        )}
      </Form>
    </ConfigProvider>
  );
};

export default OperationNew;
