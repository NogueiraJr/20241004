import React, { useState } from 'react';
import { Form, Select, Button, Tooltip, Modal, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons'; // Importa o ícone desejado
import '../../../../index.css';

const Cliente: React.FC<{ handleClienteChange: (value: string) => void; clientes: any[] }> = ({ handleClienteChange, clientes }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para o modal
  const [form] = Form.useForm(); // Instância do formulário

  const handleOpenModal = () => setIsModalVisible(true); // Abre o modal
  const handleCloseModal = () => {
    setIsModalVisible(false); // Fecha o modal
    form.resetFields(); // Reseta os campos do formulário
  };

  const handleSaveClient = () => {
    form
      .validateFields() // Valida os campos do formulário
      .then((values) => {
        console.log('Novo cliente:', values);
        // Lógica para salvar os dados do cliente
        handleCloseModal(); // Fecha o modal após salvar
      })
      .catch((errorInfo) => {
        console.log('Erro na validação:', errorInfo);
      });
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
            onChange={handleClienteChange} // Chama a função passada como prop
            options={clientes.map(c => ({ value: c.id, label: c.name }))}
            filterOption={(input, option) =>
              option?.label.toLowerCase().includes(input.toLowerCase())
            }
            style={{ flex: 1 }} // Faz o Select ocupar o máximo de espaço disponível
          />
          <Tooltip title="Cadastrar Cliente, caso ele ainda não exista">
            <Button
              type="primary" // Mantém a cor original
              icon={<PlusOutlined />} // Apenas o ícone
              className="custom-button"
              onClick={handleOpenModal} // Abre o modal
            />
          </Tooltip>
        </div>
      </Form.Item>

      {/* Modal para novo cliente */}
      <Modal
        title="Cadastrar Novo Cliente"
        visible={isModalVisible}
        onCancel={handleCloseModal} // Fecha o modal ao clicar fora ou no "Cancelar"
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancelar
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveClient}>
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
    </>
  );
};

export default Cliente;
