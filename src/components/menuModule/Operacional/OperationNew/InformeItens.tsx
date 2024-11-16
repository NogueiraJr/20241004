import React, { useState } from 'react';
import { Form, Select, Button, Tooltip, Typography, Tag } from 'antd';
import { MinusOutlined, PlusOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';

const { Text } = Typography;

const InformeItens: React.FC<{
  produtos: any[];
  handleProductChange: (value: any) => void;
  handleQuantityChange: (id: string, newQuantity: number) => void;
  quantities: Record<string, number>;
}> = ({ produtos, handleProductChange, handleQuantityChange, quantities }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <>
      <Form.Item label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Informe os Itens</span>}>
        <Select
          mode="multiple"
          showSearch
          placeholder="Selecionar um ou mais itens"
          options={produtos.map(p => ({
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
                      Disponível: {(p.quantity).toString().padStart(3, '0')}
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
                        setShowDetails(!showDetails);
                      }}
                    >
                      {showDetails ? <UpOutlined /> : <DownOutlined />}
                    </Button>
                  </div>
                  {showDetails && (
                    <>
                      <Text strong>
                        {p.productTypeId === 'product' ? 'Produto, ' : 'Serviço, '}
                        R$ {p.price.toFixed(2).replace('.', ',')} -
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'normal', marginLeft: 5 }}>
                        {p.description}
                      </Text>
                      <br />
                      <div style={{ marginTop: 5 }}>
                        {(p.tags || []).map((tag, index) => (
                          <Tag key={index} color="blue" style={{ margin: '2px' }}>
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ),
          }))}
          onChange={handleProductChange}
          filterOption={(input, option) =>
            option?.name.toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>
      <Form.Item>
        <Tooltip title="Caso o Produto ainda não exista cadastrado">
          <Button type="primary">Novo Produto</Button>
        </Tooltip>
      </Form.Item>
    </>
  );
};

export default InformeItens;
