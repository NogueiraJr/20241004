import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Typography } from 'antd';
import { NumericFormat } from 'react-number-format'; // Importando NumericFormat
import { produtos } from '../../fields/produtos-json';
import { clientes } from '../../fields/clientes-json';

const { Text } = Typography;

const ReservaNovo: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedClient, setSelectedClient] = useState(null);
  const [editableTotalPrice, setEditableTotalPrice] = useState('0,00');

  const handleProductChange = (value) => {
    setSelectedProducts(value);
    const newQuantities = {};
    value.forEach((id) => {
      if (!quantities[id]) {
        newQuantities[id] = 1; // Default quantity is 1
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
        style={{ maxWidth: 600 }}
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
            style={{ width: '96%', padding: '8px', borderRadius: '4px', border: '1px solid #d9d9d9', backgroundColor: '#fff' }} // Estilo para se assemelhar ao Input do Ant Design
            // Estilo semelhante ao Input do Ant Design
          />
        </Form.Item>
        <Form.Item label="Produtos">
          <Select
            mode="multiple"
            showSearch
            placeholder="Selecione os produtos"
            options={produtos.map(p => ({
              value: p.id,
              label: (
                <div style={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                  {selectedProducts.includes(p.id) && (
                    <Input
                      type="number"
                      min={1}
                      value={quantities[p.id] || 1}
                      onChange={(e) => handleQuantityChange(p.id, parseInt(e.target.value, 10) || 1)}
                      style={{ width: 60, marginBottom: 5 }}
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                  <div style={{ flexGrow: 1 }}>
                    <Text strong>
                      {p.productTypeId === 'product' ? 'Produto' : 'Serviço'} R$ {p.price.toFixed(2).replace('.', ',')} {p.name}
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'normal' }}>
                      {p.description}
                    </Text>
                    <br />
                    <Text style={{ fontSize: 12, color: p.quantity <= 0 ? 'red' : 'inherit' }}>
                      Disponível: {p.quantity}
                    </Text>
                    <br />
                    <Text style={{ fontSize: 12, color: '#1890ff' }}>
                      {(p.tags || []).join(', ')}
                    </Text>
                  </div>
                </div>
              ),
            }))}
            onChange={handleProductChange}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default () => <ReservaNovo />;
