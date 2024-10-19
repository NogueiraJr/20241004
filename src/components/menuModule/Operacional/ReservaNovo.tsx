import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Tag, Typography } from 'antd';
import { NumericFormat } from 'react-number-format';
import { produtos } from '../../fields/produtos-json';
import { clientes } from '../../fields/clientes-json';
import { DownOutlined, MinusOutlined, PlusOutlined, UpOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ReservaNovo: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedClient, setSelectedClient] = useState(null);
  const [editableTotalPrice, setEditableTotalPrice] = useState('0,00');
  const [filterValue, setFilterValue] = useState(''); // Novo estado para armazenar o valor do filtro

  const handleProductChange = (value) => {
    setSelectedProducts(value);
    const newQuantities = {};
    value.forEach((id) => {
      if (!quantities[id]) {
        newQuantities[id] = 1; // Quantidade padrão é 1
      }
    });
    setQuantities((prev) => ({ ...prev, ...newQuantities }));

    // Atualiza o totalPrice quando os produtos mudam
    const newTotalPrice = calculateTotalPrice(value, newQuantities);
    setEditableTotalPrice(newTotalPrice.toFixed(2).replace('.', ','));
  };

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
    const newTotalPrice = calculateTotalPrice(selectedProducts, {
      ...quantities,
      [id]: value,
    });
    setEditableTotalPrice(newTotalPrice.toFixed(2).replace('.', ','));
  };

  const calculateTotalPrice = (products, quantities) => {
    return products.reduce((total, productId) => {
      const product = produtos.find(p => p.id === productId);
      return total + (product?.price || 0) * (quantities[productId] || 1);
    }, 0);
  };

  useEffect(() => {
    const initialTotalPrice = calculateTotalPrice(selectedProducts, quantities);
    setEditableTotalPrice(initialTotalPrice.toFixed(2).replace('.', ','));
  }, [selectedProducts, quantities]);

  return (
    <>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 25 }}
        layout="vertical"
        style={{ maxWidth: 300 }}
      >
        <Form.Item label="Cliente">
          <Select
            showSearch
            placeholder="Selecione um cliente"
            onChange={(value) => setSelectedClient(value)}
            options={clientes.map(c => ({
              value: c.id,
              label: c.name,
            }))}
            filterOption={(input, option) =>
              option?.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item label="Descrição">
          <Input />
        </Form.Item>
        <Form.Item label="Anotações">
          <Input />
        </Form.Item>
        <Form.Item label="Etiquetas">
          <Select mode="multiple">
            <Select.Option value="casamento">casamento</Select.Option>
            <Select.Option value="batizado">batizado</Select.Option>
            <Select.Option value="festa">festa</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label={<span style={{ whiteSpace: 'nowrap' }}>{`${selectedProducts.length} selecionados`}</span>}>
          <NumericFormat
            value={editableTotalPrice}
            prefix="R$ "
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale={true}
            thousandSeparator="."
            allowNegative={false}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              setEditableTotalPrice(formattedValue);
            }}
            style={{ width: '96%', padding: '8px', borderRadius: '4px', border: '1px solid #d9d9d9', backgroundColor: '#fff' }}
          />
        </Form.Item>

        <Form.Item label="Produtos">
          <Select
            mode="multiple"
            showSearch
            placeholder="Selecione os produtos"
            options={produtos.map(p => {
              const [showDetails, setShowDetails] = useState(false);

              return {
                value: p.id,
                name: p.name,
                label: (
                  <div style={{
                    display: 'flex',
                    alignItems: 'left',
                    flexDirection: 'column',
                    borderLeft: '1px solid black',
                    paddingLeft: 10,
                    marginRight: 2
                  }}>
                    <div style={{ flexGrow: 1 }}>
                      <Text strong>
                        {p.productTypeId === 'product' ? 'Produto' : 'Serviço'} R$ {p.price.toFixed(2).replace('.', ',')} {p.name}
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
                          <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'normal', marginTop: 0 }}>
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
              };
            })}
            onChange={handleProductChange}
            filterOption={(input, option) =>
              option?.name.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default () => <ReservaNovo />;
