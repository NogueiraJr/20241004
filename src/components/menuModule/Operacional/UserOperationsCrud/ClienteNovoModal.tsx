import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface NovoClienteModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (values: { name: string; phone: string; email?: string }) => void;
}

const NovoClienteModal: React.FC<NovoClienteModalProps> = ({ visible, onClose, onSave }) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
        form.resetFields(); // Reseta os campos após salvar
      })
      .catch((errorInfo) => {
        console.log('Erro na validação:', errorInfo);
      });
  };

  return (
    <Modal
      title="Cadastrar Novo Cliente"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Gravar
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nome"
          name="name"
          rules={[{ required: true, message: 'O nome é obrigatório!' }]}
        >
          <Input placeholder="Digite o nome" />
        </Form.Item>
        <Form.Item
          label="Celular"
          name="phone"
          rules={[{ required: true, message: 'O celular é obrigatório!' }]}
        >
          <Input placeholder="Digite o celular" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="Digite o email" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NovoClienteModal;
