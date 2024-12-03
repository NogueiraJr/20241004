import React from 'react';
import { Modal, List, Checkbox, Button } from 'antd';
import { MultiSelectListProps } from '../components/menuModule/Operacional/UserOperationsList/MultiSelectListProps';
import { ActionFlowPoint } from './ActionFlowPoint';

const MultiSelectList: React.FC<MultiSelectListProps> = ({
  visible,
  onCancel,
  data,
  systemId,
  moment,
  title,
}) => {
  // Filtra os dados de ActionsFlowPoints com base no systemId e moment
  const filteredData = data.ActionsFlowPoints.filter(
    (item: ActionFlowPoint) => item.systemId === systemId && item.moment === moment
  );

  // Função para o botão "Gravar"
  const handleSave = () => {
    console.log('Itens selecionados gravados!');
    onCancel(); // Fecha o modal após salvar
  };

  return (
    <Modal
      title={title} // Usa o título passado como parâmetro
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Gravar
        </Button>,
      ]}
      style={{ top: 100 }}
      bodyStyle={{
        maxHeight: '65vh',
        overflowY: 'auto',
      }}
    >
      <List
        dataSource={filteredData}
        renderItem={(item: ActionFlowPoint) => (
          <List.Item>
            <Checkbox value={item.id}>
              <strong>{item.name}</strong> {/* Propriedade 'name' já é reconhecida */}
              <div>{item.description}</div>
            </Checkbox>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default MultiSelectList;
