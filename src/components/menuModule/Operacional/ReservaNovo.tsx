import React, { useState, useEffect } from 'react';
import { Button, ConfigProvider, DatePicker, Form, Input, Select, Tag, Typography } from 'antd';
import { NumericFormat } from 'react-number-format';
import { produtos } from '../../fields/produtos-json';
import { clientes } from '../../fields/clientes-json';
import { DownOutlined, MinusOutlined, PlusOutlined, UpOutlined } from '@ant-design/icons';

import '../../../index.css'

import ptBR from 'antd/es/locale/pt_BR';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br'); // Configura o dayjs para Português do Brasil

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
      <ConfigProvider locale={ptBR}>
        <Form
          labelCol={{ span: 25 }}
          wrapperCol={{ span: 25 }}
          layout="vertical"
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">Cliente</span>}
          >
            <Select
              // dropdownStyle={{fontSize: 30}}
              // style={{fontSize: 30}}
              // popupClassName="custom-combo" // Para estilizar o dropdown
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

          <Form.Item
            label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>{`${selectedProducts.length} itens selecionados`}</span>}>
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
              className='custom-field-decimal'
              style={{ width: '96%', padding: '8px', borderRadius: '4px', border: '1px solid #d9d9d9', backgroundColor: '#fff' }}
            />
          </Form.Item>

          <Form.Item label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Etiquetas </span>}>
            <Select placeholder="Informe as etiquetas" mode="multiple">
              <Select.Option value="casamento">casamento</Select.Option>
              <Select.Option value="batizado">batizado</Select.Option>
              <Select.Option value="festa">festa</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Informe os Itens</span>}>
            <Select
              mode="multiple"
              showSearch
              placeholder="Selecionr um ou mais itens"
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
                      marginRight: 2,
                      fontSize: 16
                    }}>
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
                };
              })}
              onChange={handleProductChange}
              filterOption={(input, option) =>
                option?.name.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Descrição</span>}>
            <Input />
          </Form.Item>

          <Form.Item label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Provar em</span>} name="dataProva"
            rules={[{ required: true, message: 'Por favor, informe uma data!' }]}
          >
            <DatePicker
              placeholder="Informe a data da Prova"
              format="DD MMMM YYYY, HH:mm"
              showTime={{ format: 'HH:mm' }}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Retirar em</span>} name="dataRetirada"
            rules={[{ required: true, message: 'Por favor, informe uma data!' }]}
          >
            <DatePicker
              placeholder="Informe a data da Retirada"
              format="DD MMMM YYYY, HH:mm"
              showTime={{ format: 'HH:mm' }}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Devolver em</span>} name="dateDevolucao"
            rules={[{ required: true, message: 'Por favor, informe uma data!' }]}
          >
            <DatePicker
              placeholder="Informe a data da Devolução"
              format="DD MMMM YYYY, HH:mm"
              showTime={{ format: 'HH:mm' }}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Anotações</span>}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              GRAVAR
            </Button>
          </Form.Item>

        </Form>
      </ConfigProvider>
    </>
  );
};

export default () => <ReservaNovo />;
