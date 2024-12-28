import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface ClienteItemNovoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (newClientItem: { name: string; plate: string; chassis?: string }) => void;
}

const ClienteItemNovoModal: React.FC<ClienteItemNovoModalProps> = ({ visible, onClose, onSave }) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then(values => {
      onSave(values);
      form.resetFields();
    }).catch((errorInfo) => {
      console.log('Erro na validação:', errorInfo);
    });
  };

  return (
    <Modal
      visible={visible}
      title="Cadastrar Novo Veículo"
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
          label="Nome do Veículo"
          rules={[{ required: true, message: 'Por favor, insira o nome do veículo!' }]}
        >
          <Input />
        </Form.Item>
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
      </Form>
    </Modal>
  );
};

export default ClienteItemNovoModal;
