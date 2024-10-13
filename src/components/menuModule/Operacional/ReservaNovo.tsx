import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';

import { Typography } from 'antd';
const { Text } = Typography;

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const produtos = [
  {
    "id": "cm26i4oqj00012no5y0lymugl",
    "name": "Vestido de Festa",
    "description": "Vestidos elegantes e sofisticados adequados para eventos formais, como casamentos, bailes de formatura e festas de gala.",
    "productTypeId": "product",
    "price": 0E-30,
    "tags": null,
    "active": true,
    "createAt": "2024-10-12 18:40:23.611",
    "updatedAt": "2024-10-12 18:40:23.611",
    "deletedAt": null,
    "userId": "idProprietario01",
    "systemId": "sysLocacaoRoupa"
  },
  {
    "id": "cm26i4oqq00032no5gotu98se",
    "name": "Terno",
    "description": "Conjunto de calça e paletó elegante para homens, adequado para eventos formais, reuniões de negócios e ocasiões especiais.",
    "productTypeId": "product",
    "price": 0E-30,
    "tags": null,
    "active": true,
    "createAt": "2024-10-12 18:40:23.618",
    "updatedAt": "2024-10-12 18:40:23.618",
    "deletedAt": null,
    "userId": "idProprietario01",
    "systemId": "sysLocacaoRoupa"
  },
  {
    "id": "cm26i4oqu00052no5w1yea8cs",
    "name": "Vestido de Noiva",
    "description": "Vestidos de noiva em uma variedade de estilos, cortes e designs para o dia mais especial na vida de uma mulher.",
    "productTypeId": "product",
    "price": 0E-30,
    "tags": null,
    "active": true,
    "createAt": "2024-10-12 18:40:23.622",
    "updatedAt": "2024-10-12 18:40:23.622",
    "deletedAt": null,
    "userId": "idProprietario01",
    "systemId": "sysLocacaoRoupa"
  },
  {
    "id": "cm26i7oqu00053no5w1yea8cs",
    "name": "Leva e Traz",
    "description": "Levar e Trazer os Produtos para o Clinte.",
    "productTypeId": "service",
    "price": 250.00,
    "tags": ["casamento", "festa"],
    "active": true,
    "createAt": "2024-10-12 18:40:23.622",
    "updatedAt": "2024-10-12 18:40:23.622",
    "deletedAt": null,
    "userId": "idProprietario01",
    "systemId": "sysLocacaoRoupa"
  },
  {
    "id": "cm26i4oqx00072no5qy72f2xs",
    "name": "Smoking",
    "description": "Traje formal para homens, geralmente usado em eventos de gala, casamentos formais e ocasiões de luxo à noite.",
    "productTypeId": "product",
    "price": 0E-30,
    "tags": null,
    "active": true,
    "createAt": "2024-10-12 18:40:23.626",
    "updatedAt": "2024-10-12 18:40:23.626",
    "deletedAt": null,
    "userId": "idProprietario01",
    "systemId": "sysLocacaoRoupa"
  },
  {
    "id": "cm26i4or000092no5k7m4jhbn",
    "name": "Vestido de Cocktail",
    "description": "Vestidos semi-formais mais curtos, ideais para eventos semi-formais, coquetéis, festas de aniversário e eventos corporativos descontraídos.",
    "productTypeId": "product",
    "price": 0E-30,
    "tags": null,
    "active": true,
    "createAt": "2024-10-12 18:40:23.629",
    "updatedAt": "2024-10-12 18:40:23.629",
    "deletedAt": null,
    "userId": "idProprietario01",
    "systemId": "sysLocacaoRoupa"
  },
  {
    "id": "cm26i4or3000b2no55vcu8vwn",
    "name": "Vestido de Dama de Honra",
    "description": "Vestidos elegantes e coordenados para as damas de honra em casamentos, disponíveis em uma variedade de cores e estilos.",
    "productTypeId": "product",
    "price": 0E-30,
    "tags": null,
    "active": true,
    "createAt": "2024-10-12 18:40:23.632",
    "updatedAt": "2024-10-12 18:40:23.632",
    "deletedAt": null,
    "userId": "idProprietario01",
    "systemId": "sysLocacaoRoupa"
  },
  {
    "id": "cm26i4or6000d2no57m5h8iqc",
    "name": "Traje Infantil",
    "description": "Conjuntos de roupas formais para crianças, incluindo ternos para meninos e vestidos elegantes para meninas, para ocasiões especiais.",
    "productTypeId": "product",
    "price": 0E-30,
    "tags": null,
    "active": true,
    "createAt": "2024-10-12 18:40:23.634",
    "updatedAt": "2024-10-12 18:40:23.634",
    "deletedAt": null,
    "userId": "idProprietario01",
    "systemId": "sysLocacaoRoupa"
  },
  {
    "id": "cm26i4or9000f2no563zsa517",
    "name": "Acessórios de Noiva",
    "description": "Acessórios como véus, tiaras, luvas e joias para complementar o vestido de noiva e completar o visual da noiva.",
    "productTypeId": "product",
    "price": 0E-30,
    "tags": null,
    "active": true,
    "createAt": "2024-10-12 18:40:23.637",
    "updatedAt": "2024-10-12 18:40:23.637",
    "deletedAt": null,
    "userId": "idProprietario01",
    "systemId": "sysLocacaoRoupa"
  },
  {
    "id": "cm26i4orc000h2no5307ceiho",
    "name": "Roupa de Convidados",
    "description": "Opções de trajes formais e semi-formais para convidados de casamentos, festas de gala, eventos corporativos e outras ocasiões especiais.",
    "productTypeId": "product",
    "price": 0E-30,
    "tags": null,
    "active": true,
    "createAt": "2024-10-12 18:40:23.641",
    "updatedAt": "2024-10-12 18:40:23.641",
    "deletedAt": null,
    "userId": "idProprietario01",
    "systemId": "sysLocacaoRoupa"
  },
  {
    "id": "cm26i4orf000j2no5izi5uvzl",
    "name": "Vestido de Madrinha",
    "description": "Vestidos elegantes e coordenados para as madrinhas em casamentos, disponíveis em uma variedade de estilos e cores.",
    "productTypeId": "product",
    "price": 0E-30,
    "tags": null,
    "active": true,
    "createAt": "2024-10-12 18:40:23.644",
    "updatedAt": "2024-10-12 18:40:23.644",
    "deletedAt": null,
    "userId": "idProprietario01",
    "systemId": "sysLocacaoRoupa"
  },
  {
    "id": "cm26i4ori000l2no5iftbcb8i",
    "name": "Smoking Infantil",
    "description": "Versões em miniatura de smokings para meninos, perfeitos para eventos formais, casamentos e festas.",
    "productTypeId": "product",
    "price": 0E-30,
    "tags": null,
    "active": true,
    "createAt": "2024-10-12 18:40:23.646",
    "updatedAt": "2024-10-12 18:40:23.646",
    "deletedAt": null,
    "userId": "idProprietario01",
    "systemId": "sysLocacaoRoupa"
  }
];


const ReservaNovo: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleProductChange = (selectedIds: string[]) => {
    setSelectedProducts(selectedIds);
    const selectedProductDetails = produtos.filter(p => selectedIds.includes(p.id));
    const sum = selectedProductDetails.reduce((acc, p) => acc + p.price, 0);
    setTotalPrice(sum);
  };

  const handleTotalPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setTotalPrice(isNaN(value) ? 0 : value);
  };
  return (
    <>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
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




        <Form.Item
          label={<span style={{ whiteSpace: 'nowrap' }}>{`${selectedProducts.length} selecionado(s)`}</span>}
        >
          <Input
            value={totalPrice.toFixed(2)}
            onChange={handleTotalPriceChange}
            prefix="R$"
          />
        </Form.Item>
        <Form.Item label="Produtos">
          <Select
            mode="multiple"
            showSearch
            placeholder="Selecione os produtos"
            filterOption={(input, option) => {
              const searchValue = input.toLowerCase();
              const product = produtos.find(p => p.id === option.value);
              return product &&
                (product.name.toLowerCase().includes(searchValue) ||
                  product.description.toLowerCase().includes(searchValue));
            }}
            options={produtos.map(p => ({
              value: p.id,
              label: (
                <>
                  <Text strong>
                    {p.productTypeId === 'product' ? 'Produto' : 'Serviço'} R$ {p.price.toFixed(2)} {p.name}
                  </Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'normal' }}>
                    {p.description}
                  </Text>
                  <br />
                  <Text style={{ fontSize: 12 }}>R$ {p.price.toFixed(2)}</Text>
                  <br />
                  <Text style={{ fontSize: 12, color: '#1890ff' }}>
                    {(p.tags || []).join(', ')}
                  </Text>
                </>
              ),
            }))}
            onChange={handleProductChange}
          />
        </Form.Item>




        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
        <Form.Item label="Slider">
          <Slider />
        </Form.Item>
        <Form.Item label="ColorPicker">
          <ColorPicker />
        </Form.Item>
        <Form.Item label="Rate">
          <Rate />
        </Form.Item>
      </Form>
    </>
  );
};

export default () => <ReservaNovo />;