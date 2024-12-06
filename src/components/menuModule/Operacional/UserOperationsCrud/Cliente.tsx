import React, { useState } from 'react';
import { Form, Select, Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons'; // Importa o ícone desejado
import NovoClienteModal from './ClienteNovoModal'; // Importe o modal
import '../../../../index.css';

const Cliente: React.FC<{ handleClienteChange: (value: string) => void; clientes: any[] }> = ({ handleClienteChange, clientes }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  const handleSaveClient = (newClient: { name: string; phone: string; email?: string }) => {
    console.log('Novo cliente:', newClient);
    // Aqui você pode adicionar a lógica para salvar o cliente
    handleCloseModal();
  };

  return (
    <>
      <Form.Item
        label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">Cliente</span>}
        name="cliente"
        rules={[{ required: true, message: 'Por favor, selecione um cliente!' }]}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}> {/* Container flex para alinhamento */}
          <Select
            showSearch
            className="custom-field"
            placeholder="Selecione um cliente"
            onChange={handleClienteChange}
            options={clientes.map(c => ({ value: c.id, label: c.name }))}
            filterOption={(input, option) =>
              option?.label.toLowerCase().includes(input.toLowerCase())
            }
            style={{ flex: 1 }} // Faz o Select ocupar o máximo de espaço disponível
          />
          <Tooltip title="Cadastrar Cliente, caso ele ainda não exista">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="custom-button"
              onClick={handleOpenModal} // Abre o modal
            />
          </Tooltip>
        </div>
      </Form.Item>

      {/* Uso do modal separado */}
      <NovoClienteModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveClient}
      />
    </>
  );
};

export default Cliente;
