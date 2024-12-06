import React, { useState } from 'react';
import { Form, Select, Button, Tooltip, Typography, Tag, Row, Col } from 'antd';
import { MinusOutlined, PlusOutlined, DownOutlined, UpOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useParameter } from '../../../../context/ParameterContext';
import CadastrarNovoItemModal from './ItemNovoModal'; // Importando o novo Modal

const { Text } = Typography;

const InformeItens: React.FC<{
  produtos: any[];
  handleProductChange: (value: string[]) => void;
  handleQuantityChange: (id: string, newQuantity: number) => void;
  quantities: Record<string, number>;
}> = ({ produtos, handleProductChange, handleQuantityChange, quantities }) => {
  const { system } = useParameter(); // Obtendo o valor de system a partir do hook useParameter
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    productTypeId: 'product',
    quantity: 1,
    price: 0,
    tags: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setNewItem((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleSelectChange = (value: any, field: string) => {
    setNewItem((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSaveNewItem = (newItem: any) => {
    // Salve o novo item conforme necessário, por exemplo, enviar para o backend.
    console.log('Novo item:', newItem);
    setModalVisible(false); // Fechar o modal
  };

  // Definindo as opções de etiquetas com base no valor de system
  const getTagOptions = () => {
    if (system === 'sysLocacaoRoupa') {
      return ['Casamento', 'Batizado'];
    } else if (system === 'sysOficinaCarro') {
      return ['Revisão', 'Reparo'];
    }
    return []; // Caso contrário, retorna um array vazio ou outro valor padrão
  };

  return (
    <>
      <Form.Item
        name="itens"
        label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Informe os Itens</span>}
        rules={[{ required: true, message: 'Por favor, informe ao menos um item!' }]}>
        <Select
          mode="multiple"
          showSearch
          placeholder="Selecionar um ou mais itens"
          options={produtos.map((p) => ({
            value: p.id,
            name: p.name,
            label: (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'left',
                  flexDirection: 'column',
                  borderLeft: '1px solid black',
                  paddingLeft: 10,
                  marginRight: 2,
                  fontSize: 16,
                }}
              >
                <div style={{ flexGrow: 1 }}>
                  <Text strong style={{ fontSize: 16 }}>
                    {p.name}
                  </Text>
                  <br />
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: 5 }}>
                    <span style={{ marginRight: 10 }}>
                      Disponível: {p.quantity.toString().padStart(3, '0')}
                    </span>
                    <Button
                      type="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newQuantity = (quantities[p.id] || 1) - 1;
                        if (newQuantity >= 1) {
                          handleQuantityChange(p.id, newQuantity);
                        }
                      }}
                      disabled={(quantities[p.id] || 1) <= 1}
                    >
                      <MinusOutlined />
                    </Button>
                    <span style={{ margin: '0 10px' }}>
                      {(quantities[p.id] || 1).toString().padStart(3, '0')}
                    </span>
                    <Button
                      type="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newQuantity = (quantities[p.id] || 1) + 1;
                        if (newQuantity <= p.quantity) {
                          handleQuantityChange(p.id, newQuantity);
                        }
                      }}
                      disabled={(quantities[p.id] || 1) >= p.quantity}
                    >
                      <PlusOutlined />
                    </Button>
                    <Button
                      type="primary"
                      size="small"
                      style={{ marginLeft: 10 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedItemId(expandedItemId === p.id ? null : p.id); // Toggle the expanded item
                      }}
                    >
                      {expandedItemId === p.id ? <UpOutlined /> : <DownOutlined />}
                    </Button>
                  </div>
                  {expandedItemId === p.id && (
                    <>
                      <Text strong>
                        {p.productTypeId === 'product' ? 'Produto, ' : 'Serviço, '}
                        <span style={{ color: 'gray', fontSize: 12 }}>{p.description}</span>
                      </Text>
                      <br />
                      {p.tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                      ))}
                    </>
                  )}
                </div>
              </div>
            ),
          }))}
          onChange={handleProductChange}
        />
      </Form.Item>

      <Row justify="end" style={{ marginTop: -20 }}>
        <Col>
          <Tooltip title="Adicionar Novo Item">
            <Button
              type="link"
              icon={<PlusCircleOutlined />}
              onClick={() => setModalVisible(true)}
            >
              Adicionar Novo Item
            </Button>
          </Tooltip>
        </Col>
      </Row>

      <CadastrarNovoItemModal
        modalVisible={modalVisible}
        handleModalClose={handleModalClose}
        handleSaveNewItem={handleSaveNewItem}
        newItem={newItem}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
      />
    </>
  );
};

export default InformeItens;
