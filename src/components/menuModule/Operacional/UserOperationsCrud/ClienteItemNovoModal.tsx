import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import InputMask from 'react-input-mask';

interface NovoClienteItemModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (values: { name: string; phone: string; email?: string }) => void;
}

const NovoClienteItemModal: React.FC<NovoClienteItemModalProps> = ({ visible, onClose, onSave }) => {
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
      title="Cadastrar Novo ClienteItem"
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
          label={<span className="custom-label">Nome</span>}
          name="name"
          rules={[{ required: true, message: 'O nome é obrigatório!' }]}
        >
          <Input className="custom-field" placeholder="Digite o nome" />
        </Form.Item>
        <Form.Item
          label={<span className="custom-label">Celular</span>}
          name="phone"
          rules={[
            { required: true, message: 'O celular é obrigatório!' },
            {
              pattern: /^\(\d{2}\)\s\d{5}-\d{4}$/,
              message: 'Formato inválido! O formato correto é (DD) 9XXXX-XXXX.'
            },
          ]}
        >
          <InputMask
            mask="(99) 99999-9999"
            placeholder="(DD) 9XXXX-XXXX"
            maskChar={null} // Garante que caracteres extras não sejam enviados
          >
            {(inputProps: any) => <Input {...inputProps} className="custom-field" />}
          </InputMask>
        </Form.Item>

        <Form.Item
          label={<span className="custom-label">Email</span>}
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Por favor, insira um e-mail válido!',
            },
          ]}
        >
          <Input className="custom-field" placeholder="Digite o email" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NovoClienteItemModal;
