import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import NovoClienteItemModal from './ClienteItemNovoModal';
import '../../../../index.css';
import { useParameter } from '../../../../context/ParameterContext';

interface ClienteItemProps {
  handleClienteItemChange: (value: string) => void;
  clientes: any[];
  label: string;
  placeholder: string;
  selectedClientItem?: string;
}

const ClienteItem: React.FC<ClienteItemProps> = ({ handleClienteItemChange, clientes, label, placeholder, selectedClientItem }) => {
  const { system } = useParameter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  const handleSaveClientItem = (newClientItem: { name: string; plate: string; chassis?: string }) => {
    console.log('Novo cliente item:', newClientItem);
    // Aqui você pode adicionar a lógica para salvar o cliente item
    handleCloseModal();
  };

  const handleClientItemSelect = (value: string) => {
    handleClienteItemChange(value); // Chama a função de alteração do cliente item
  };

  useEffect(() => {
    if (selectedClientItem === undefined) {
      handleClienteItemChange(''); // Limpa o item selecionado do cliente anterior
    }
  }, [selectedClientItem]);

  return (
    <>
      <Form.Item
        label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">{label}</span>}
        name="clienteItem"
        rules={[
          { required: true, message: `Por favor, selecione um ${label.toLowerCase()}!`, validateTrigger: 'onBlur' },  // Garante que a validação só ocorra no onBlur ou quando for necessário
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
              placeholder={placeholder}  // Atualiza o placeholder com base na prop
              onChange={handleClientItemSelect}  // Atualiza o estado quando um cliente item é selecionado
              value={selectedClientItem}  // Vincula o valor selecionado ao estado
              options={clientes.map(c => ({ value: c.id, label: c.name }))}
              filterOption={(input, option) =>
                option?.label.toLowerCase().includes(input.toLowerCase())
              }
              style={{ flex: 1 }}
            />
          </Form.Item>
          <Tooltip title={`Cadastrar ${label}, caso ele ainda não exista`}>
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
