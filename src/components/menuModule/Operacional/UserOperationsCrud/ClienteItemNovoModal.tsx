import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { useParameter } from '../../../../context/ParameterContext';

interface ClienteItemNovoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (newClientItem: { name: string; plate?: string; chassis?: string; porte?: string; especie?: string }) => void;
}

const ClienteItemNovoModal: React.FC<ClienteItemNovoModalProps> = ({ visible, onClose, onSave }) => {
  const { system } = useParameter();
  console.log('system:', system);
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then(values => {
      onSave(values);
      form.resetFields();
    }).catch((errorInfo) => {
      console.log('Erro na validação:', errorInfo);
    });
  };

  const getTitle = () => {
    switch (system) {
      case 'sysOficinaCarro':
        return 'Cadastrar Novo Veículo';
      case 'sysPetShop':
      case 'sysClinicaVeterinaria':
        return 'Cadastrar Novo Animal';
      default:
        return 'Cadastrar Novo Item';
    }
  };

  const getNameLabel = () => {
    switch (system) {
      case 'sysOficinaCarro':
        return 'Nome do Veículo';
      case 'sysPetShop':
      case 'sysClinicaVeterinaria':
        return 'Nome do Animal';
      default:
        return 'Nome do Item';
    }
  };

  return (
    <Modal
      visible={visible}
      title={getTitle()}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Salvar
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label={getNameLabel()}
          rules={[{ required: true, message: `Por favor, insira o ${getNameLabel().toLowerCase()}!` }]}
        >
          <Input />
        </Form.Item>
        {system === 'sysOficinaCarro' && (
          <>
            <Form.Item
              name="plate"
              label="Placa"
              rules={[{ required: true, message: 'Por favor, insira a placa do veículo!' }]}
            >
              <Input maxLength={7} placeholder="ABC1234" />
            </Form.Item>
            <Form.Item
              name="chassis"
              label="Chassi"
            >
              <Input maxLength={17} placeholder="17 caracteres" />
            </Form.Item>
          </>
        )}
        {['sysPetShop', 'sysClinicaVeterinaria'].includes(system) && (
          <>
            <Form.Item
              name="porte"
              label="Porte"
              rules={[{ required: true, message: 'Por favor, selecione o porte do animal!' }]}
            >
              <Select placeholder="Selecione o porte">
                <Select.Option value="Pequeno">Pequeno</Select.Option>
                <Select.Option value="Médio">Médio</Select.Option>
                <Select.Option value="Grande">Grande</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="especie"
              label="Espécie"
            >
              <Input placeholder="Espécie do animal" />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default ClienteItemNovoModal;
