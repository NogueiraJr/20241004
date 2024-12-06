// CadastrarNovoItemModal.tsx
import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useParameter } from '../../../../context/ParameterContext';
import { NumericFormat } from 'react-number-format'; // Não se esqueça de importar o NumericFormat

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
    const { system } = useParameter(); // Obtendo o valor de system a partir do hook useParameter

    const getTagOptions = () => {
      if (system === 'sysLocacaoRoupa') {
        return ['Casamento', 'Batizado'];
      } else if (system === 'sysOficinaCarro') {
        return ['Revisão', 'Reparo'];
      }
      return []; // Caso contrário, retorna um array vazio ou outro valor padrão
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
          <Button key="save" type="primary" onClick={() => handleSaveNewItem(newItem)}>
            Gravar
          </Button>,
        ]}
        style={{ top: 100 }} // Move o modal mais para cima na tela
        bodyStyle={{ maxHeight: '50vh', overflowY: 'auto' }} // Define uma altura fixa para o corpo do modal
      >
        <Form layout="vertical">
          <Form.Item label="Nome">
            <Input
              value={newItem.name}
              onChange={(e) => handleInputChange(e, 'name')}
              placeholder="Nome do item"
            />
          </Form.Item>
          <Form.Item label="Descrição">
            <Input
              value={newItem.description}
              onChange={(e) => handleInputChange(e, 'description')}
              placeholder="Descrição do item"
            />
          </Form.Item>
          <Form.Item label="Tipo">
            <Select
              value={newItem.productTypeId}
              onChange={(value) => handleSelectChange(value, 'productTypeId')}
            >
              <Select.Option value="product">Produto</Select.Option>
              <Select.Option value="service">Serviço</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Etiquetas">
            <Select
              mode="multiple"
              value={newItem.tags}
              onChange={(value) => handleSelectChange(value, 'tags')}
            >
              {getTagOptions().map((tag) => (
                <Select.Option key={tag} value={tag}>
                  {tag}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Quantidade">
            <Input
              type="number"
              value={newItem.quantity}
              onChange={(e) => handleInputChange(e, 'quantity')}
              placeholder="Quantidade"
              min={1} // Define o valor mínimo para 1
              step={1} // Garante que o incremento será de 1
            />
          </Form.Item>
          <Form.Item label="Preço">
            <NumericFormat
              value={newItem.price !== undefined && newItem.price !== null ? newItem.price.toString() : '0'} // Garante que o valor inicial seja '0' se não houver valor
              // onValueChange={(values) => handleInputChange({ target: { value: values.floatValue ?? 0 } }, 'price')}
              prefix="R$ "
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              thousandSeparator="."
              allowNegative={false}
              className="custom-field-decimal"
              placeholder="Preço"
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

export default CadastrarNovoItemModal;
