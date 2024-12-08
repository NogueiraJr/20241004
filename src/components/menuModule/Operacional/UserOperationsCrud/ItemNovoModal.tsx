import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useParameter } from '../../../../context/ParameterContext';
import { NumericFormat } from 'react-number-format';

const CadastrarNovoItemModal: React.FC<{
  modalVisible: boolean;
  handleModalClose: () => void;
  handleSaveNewItem: (newItem: any) => void;
  newItem: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
  handleSelectChange: (value: any, field: string) => void;
}> = ({
  modalVisible,
  handleModalClose,
  handleSaveNewItem,
  newItem,
  handleInputChange,
  handleSelectChange,
}) => {
    const [form] = Form.useForm(); // Adicionando o hook do formulário

    const { system } = useParameter();

    const getTagOptions = () => {
      if (system === 'sysLocacaoRoupa') {
        return ['Casamento', 'Batizado'];
      } else if (system === 'sysOficinaCarro') {
        return ['Revisão', 'Reparo'];
      }
      return [];
    };

    const handleGravarClick = () => {
      form.validateFields()
        .then(() => {
          handleSaveNewItem(newItem); // Só chama handleSaveNewItem se os campos forem válidos
        })
        .catch((error) => {
          console.log('Validation failed:', error); // Caso haja erro na validação, ele é capturado aqui
        });
    };

    return (
<Modal
  title="Cadastrar Novo Item"
  visible={modalVisible}
  onCancel={handleModalClose}
  footer={[
    <Button key="cancel" onClick={handleModalClose}>
      Cancelar
    </Button>,
    <Button key="save" type="primary" onClick={handleGravarClick}>
      Gravar
    </Button>,
  ]}
  style={{ top: 100 }}
  bodyStyle={{
    maxHeight: '50vh',
    overflowY: 'auto',
    overflowX: 'hidden', // Evita o scroll horizontal
  }}
  width="100%" // Ajusta a largura do modal, se necessário
>
        <Form form={form} layout="vertical">
          <Form.Item
            label={<span className="custom-label">Nome</span>}
            name="name"
            rules={[{ required: true, message: 'O nome do item é obrigatório!' }]} // Validação de campo obrigatório
          >
            <Input
              value={newItem.name}
              onChange={(e) => handleInputChange(e, 'name')}
              placeholder="Nome do item"
              className="custom-field"
            />
          </Form.Item>
          <Form.Item
            label={<span className="custom-label">Descrição</span>}
            name="description"
            rules={[{ required: true, message: 'A descrição do item é obrigatória!' }]} // Validação de campo obrigatório
          >
            <Input
              value={newItem.description}
              onChange={(e) => handleInputChange(e, 'description')}
              placeholder="Descrição do item"
              className="custom-field"
            />
          </Form.Item>
          <Form.Item label={<span className="custom-label">Tipo</span>}>
            <Select
              value={newItem.productTypeId}
              onChange={(value) => handleSelectChange(value, 'productTypeId')}
              className="custom-field"
            >
              <Select.Option value="product">Produto</Select.Option>
              <Select.Option value="service">Serviço</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label={<span className="custom-label">Etiquetas</span>}>
            <Select
              mode="multiple"
              value={newItem.tags}
              onChange={(value) => handleSelectChange(value, 'tags')}
              className="custom-field"
            >
              {getTagOptions().map((tag) => (
                <Select.Option key={tag} value={tag}>
                  {tag}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={<span className="custom-label">Quantidade</span>}
            name="quantity"
            initialValue={1}
            rules={[
              { required: true, message: 'A quantidade é obrigatória!' }, // Validação obrigatória
              {
                validator: (_, value) => {
                  if (value === undefined || value === null || value < 1) {
                    return Promise.reject('A quantidade deve ser no mínimo 1!');
                  }
                  return Promise.resolve();
                }
              },
            ]}
          >
            <Input
              type="number"
              value={newItem.quantity}
              onChange={(e) => handleInputChange(e, 'quantity')}
              placeholder="Quantidade"
              min={1}
              step={1}
              className="custom-field"
            />
          </Form.Item>
          <Form.Item label={<span className="custom-label">Preço</span>}>
  <NumericFormat
    value={newItem.price !== undefined && newItem.price !== null ? newItem.price.toString() : '0'}
    prefix="R$ "
    decimalSeparator=","
    decimalScale={2}
    fixedDecimalScale
    thousandSeparator="."
    allowNegative={false}
    className="custom-field custom-field-decimal"
    placeholder="Preço"
  />
</Form.Item>
        </Form>
      </Modal>
    );
  };

export default CadastrarNovoItemModal;
