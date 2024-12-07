import React, { useState } from 'react';
import { Form, Select, Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import NovoClienteModal from './ClienteNovoModal';
import '../../../../index.css';

const Cliente: React.FC<{ handleClienteChange: (value: string) => void; clientes: any[] }> = ({ handleClienteChange, clientes }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | undefined>(undefined); // Estado para armazenar o cliente selecionado

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  const handleSaveClient = (newClient: { name: string; phone: string; email?: string }) => {
    console.log('Novo cliente:', newClient);
    // Aqui você pode adicionar a lógica para salvar o cliente
    handleCloseModal();
  };

  const handleClientSelect = (value: string) => {
    setSelectedClient(value);  // Atualiza o estado quando um cliente é selecionado
    handleClienteChange(value); // Chama a função de alteração do cliente
  };

  return (
    <>
      <Form.Item
        label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">Cliente</span>}
        name="cliente"
        rules={[
          { required: true, message: 'Por favor, selecione um cliente!', validateTrigger: 'onBlur' },  // Garante que a validação só ocorra no onBlur ou quando for necessário
        ]}
        hasFeedback
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Form.Item
            name="cliente"
            noStyle
          >
            <Select
              showSearch
              className="custom-field"
              placeholder="Selecione um cliente"
              onChange={handleClientSelect}  // Atualiza o estado quando um cliente é selecionado
              value={selectedClient}  // Vincula o valor selecionado ao estado
              options={clientes.map(c => ({ value: c.id, label: c.name }))}
              filterOption={(input, option) =>
                option?.label.toLowerCase().includes(input.toLowerCase())
              }
              style={{ flex: 1 }}
            />
          </Form.Item>
          <Tooltip title="Cadastrar Cliente, caso ele ainda não exista">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="custom-button"
              onClick={handleOpenModal}
            />
          </Tooltip>
        </div>
      </Form.Item>

      <NovoClienteModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveClient}
      />
    </>
  );
};

export default Cliente;
