import React, { useState } from 'react';
import { Form, Select, Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import NovoClienteItemModal from './ClienteItemNovoModal';
import '../../../../index.css';
import { useParameter } from '../../../../context/ParameterContext';

const ClienteItem: React.FC<{ handleClienteItemChange: (value: string) => void; clientes: any[] }> = ({ handleClienteItemChange, clientes }) => {
  const { system } = useParameter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClientItem, setSelectedClientItem] = useState<string | undefined>(undefined); // Estado para armazenar o cliente item selecionado

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  const handleSaveClientItem = (newClientItem: { name: string; phone: string; email?: string }) => {
    console.log('Novo cliente item:', newClientItem);
    // Aqui você pode adicionar a lógica para salvar o cliente item
    handleCloseModal();
  };

  const handleClientItemSelect = (value: string) => {
    setSelectedClientItem(value);  // Atualiza o estado quando um cliente item é selecionado
    handleClienteItemChange(value); // Chama a função de alteração do cliente item
  };

  return (
    <>
      <Form.Item
        label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">ClienteItem</span>}
        name="clienteItem"
        rules={[
          { required: true, message: 'Por favor, selecione um cliente item!', validateTrigger: 'onBlur' },  // Garante que a validação só ocorra no onBlur ou quando for necessário
        ]}
        hasFeedback
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Form.Item
            name="clienteItem"
            noStyle
          >
            <Select
              showSearch
              className="custom-field"
              placeholder="Selecione um cliente item"
              onChange={handleClientItemSelect}  // Atualiza o estado quando um cliente item é selecionado
              value={selectedClientItem}  // Vincula o valor selecionado ao estado
              options={clientes.map(c => ({ value: c.id, label: c.name }))}
              filterOption={(input, option) =>
                option?.label.toLowerCase().includes(input.toLowerCase())
              }
              style={{ flex: 1 }}
            />
          </Form.Item>
          <Tooltip title="Cadastrar Cliente Item, caso ele ainda não exista">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="custom-button"
              onClick={handleOpenModal}
            />
          </Tooltip>
        </div>
      </Form.Item>

      <NovoClienteItemModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveClientItem}
      />
    </>
  );
};

export default ClienteItem;
