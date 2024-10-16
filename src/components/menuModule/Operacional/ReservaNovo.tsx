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

// Lista de clientes
const clientes = [
	{
		"id" : "cm1wfe41d0001p8795aihoxtu",
		"name" : "Bruno Costa",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.738Z",
		"updatedAt" : "2024-10-05T20:26:02.738Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe41k0003p8791famqx25",
		"name" : "Daniel Santos",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.744Z",
		"updatedAt" : "2024-10-05T20:26:02.744Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe41o0004p879vczh6fkt",
		"name" : "Elisa Pereira",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.748Z",
		"updatedAt" : "2024-10-05T20:26:02.748Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe41r0005p8796jfwz3dg",
		"name" : "Felipe Almeida",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.752Z",
		"updatedAt" : "2024-10-05T20:26:02.752Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe41x0007p879q05ei1zx",
		"name" : "Henrique Ferreira",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.758Z",
		"updatedAt" : "2024-10-05T20:26:02.758Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe4210008p879pf9v6vkt",
		"name" : "Isabela Martins",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.761Z",
		"updatedAt" : "2024-10-05T20:26:02.761Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe427000ap879ehjfxm3u",
		"name" : "Karen Lima",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.767Z",
		"updatedAt" : "2024-10-05T20:26:02.767Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe42a000bp879rqhszcd1",
		"name" : "Lucas Fernandes",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.771Z",
		"updatedAt" : "2024-10-05T20:26:02.771Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe42d000cp879mgxr62gu",
		"name" : "Mariana Rocha",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.773Z",
		"updatedAt" : "2024-10-05T20:26:02.773Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe42j000ep879lg5sk3i8",
		"name" : "Olivia Mendes",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.779Z",
		"updatedAt" : "2024-10-05T20:26:02.779Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe42m000fp8799jb40eo2",
		"name" : "Pedro Azevedo",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.782Z",
		"updatedAt" : "2024-10-05T20:26:02.782Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe42o000gp87980rmxs5p",
		"name" : "Quezia Monteiro",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.785Z",
		"updatedAt" : "2024-10-05T20:26:02.785Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe42t000ip879yub5cefk",
		"name" : "Sofia Nogueira",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.790Z",
		"updatedAt" : "2024-10-05T20:26:02.790Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe42w000jp879adkk3pik",
		"name" : "Thiago Barros",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.792Z",
		"updatedAt" : "2024-10-05T20:26:02.792Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe42y000kp879zkpu2bfr",
		"name" : "Ursula Machado",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.795Z",
		"updatedAt" : "2024-10-05T20:26:02.795Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe433000mp879d6vnjger",
		"name" : "Yasmin Castro",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.800Z",
		"updatedAt" : "2024-10-05T20:26:02.800Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe436000np879vesuh6le",
		"name" : "William Teixeira",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.803Z",
		"updatedAt" : "2024-10-05T20:26:02.803Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe43c000pp87916k4ehg3",
		"name" : "Igor Duarte",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.808Z",
		"updatedAt" : "2024-10-05T20:26:02.808Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe43f000qp879yk2zygye",
		"name" : "Renata Almeida",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.811Z",
		"updatedAt" : "2024-10-05T20:26:02.811Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe43k000sp879zcwoiz6c",
		"name" : "Vanessa Lopes",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.817Z",
		"updatedAt" : "2024-10-05T20:26:02.817Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe43n000tp879rurxfn2f",
		"name" : "Leonardo Gomes",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.820Z",
		"updatedAt" : "2024-10-05T20:26:02.820Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe4180000p879rrl22tk3",
		"name" : "Ana Silva",
		"tags" : null,
		"active" : true,
		"createAt" : "2024-10-05T20:26:02.733Z",
		"updatedAt" : "2024-10-05T20:26:02.733Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe41h0002p8798zojl9gm",
		"name" : "Carla Oliveira",
		"tags" : null,
		"active" : false,
		"createAt" : "2024-10-05T20:26:02.741Z",
		"updatedAt" : "2024-10-05T20:26:02.741Z",
		"deletedAt" : "2024-10-05T20:26:02.764Z"
	},
	{
		"id" : "cm1wfe41v0006p879301bah1q",
		"name" : "Gabriela Rodrigues",
		"tags" : null,
		"active" : false,
		"createAt" : "2024-10-05T20:26:02.755Z",
		"updatedAt" : "2024-10-05T20:26:02.755Z",
		"deletedAt" : "2024-10-05T20:26:02.764Z"
	},
	{
		"id" : "cm1wfe4240009p879yzndrdpj",
		"name" : "João Souza",
		"tags" : null,
		"active" : false,
		"createAt" : "2024-10-05T20:26:02.764Z",
		"updatedAt" : "2024-10-05T20:26:02.764Z",
		"deletedAt" : "2024-10-05T20:26:02.764Z"
	},
	{
		"id" : "cm1wfe42g000dp879lxpfd7sr",
		"name" : "Nelson Carvalho",
		"tags" : null,
		"active" : false,
		"createAt" : "2024-10-05T20:26:02.777Z",
		"updatedAt" : "2024-10-05T20:26:02.777Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe42q000hp879p8yirblm",
		"name" : "Rafael Ribeiro",
		"tags" : null,
		"active" : false,
		"createAt" : "2024-10-05T20:26:02.787Z",
		"updatedAt" : "2024-10-05T20:26:02.787Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe431000lp879hq1v19um",
		"name" : "Victor Dias",
		"tags" : null,
		"active" : false,
		"createAt" : "2024-10-05T20:26:02.797Z",
		"updatedAt" : "2024-10-05T20:26:02.797Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe439000op879geavfsp8",
		"name" : "Camila Moreira",
		"tags" : null,
		"active" : false,
		"createAt" : "2024-10-05T20:26:02.805Z",
		"updatedAt" : "2024-10-05T20:26:02.805Z",
		"deletedAt" : null
	},
	{
		"id" : "cm1wfe43i000rp8799x4pelrp",
		"name" : "Otávio Pires",
		"tags" : null,
		"active" : false,
		"createAt" : "2024-10-05T20:26:02.814Z",
		"updatedAt" : "2024-10-05T20:26:02.814Z",
		"deletedAt" : null
	},
];

const produtos = [
  {
    "id": "cm26i4oqj00012no5y0lymugl",
    "name": "Vestido de Festa",
    "description": "Vestidos elegantes e sofisticados adequados para eventos formais, como casamentos, bailes de formatura e festas de gala.",
    "productTypeId": "product",
    "quantity": 3,
    "price": 35.90,
    "tags": ["casamento", "festa"],
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
    "quantity": 4,
    "price": 25.29,
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
    "quantity": 0,
    "price": 68.30,
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
    "quantity": 8,
    "price": 250.30,
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
    "quantity": 9,
    "price": 15.78,
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
    "quantity": 0,
    "price": 58.67,
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
    "quantity": 3,
    "price": 27.23,
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
    "quantity": 0,
    "price": 44.56,
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
    "quantity": 12,
    "price": 30.30,
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
    "quantity": 6,
    "price": 80.60,
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
    "quantity": 4,
    "price": 60.59,
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
    "quantity": 5,
    "price": 45.50,
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
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedClient, setSelectedClient] = useState(null); // Estado para o cliente selecionado

  const handleProductChange = (value) => {
    setSelectedProducts(value);
    const newQuantities = {};
    value.forEach((id) => {
      if (!quantities[id]) {
        newQuantities[id] = 1; // Default quantity is 1
      }
    });
    setQuantities((prev) => ({ ...prev, ...newQuantities }));
  };

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Calcular o total baseado nos produtos selecionados e suas quantidades
  const totalPrice = selectedProducts.reduce((total, productId) => {
    const product = produtos.find(p => p.id === productId);
    return total + (product?.price || 0) * (quantities[productId] || 1);
  }, 0);

  return (
    <>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 25 }}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        {/* Campo de seleção de cliente */}
        <Form.Item label="Cliente">
          <Select
            showSearch
            placeholder="Selecione um cliente"
            optionFilterProp="children"
            onChange={(value) => setSelectedClient(value)}
            filterOption={(input, option) =>
              option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
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

        <Form.Item
          label={<span style={{ whiteSpace: 'nowrap' }}>{`${selectedProducts.length} selecionados`}</span>}
        >
          <Input
            value={totalPrice.toFixed(2)}
            prefix="R$"
            disabled // Desabilitando a edição do campo total
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
                <div style={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                  {selectedProducts.includes(p.id) && (
                    <Input
                      type="number"
                      min={1}
                      value={quantities[p.id] || 1}
                      onChange={(e) => handleQuantityChange(p.id, parseInt(e.target.value, 10) || 1)}
                      style={{ width: 60, marginBottom: 5 }} // Margem abaixo do campo numérico
                      onMouseDown={(e) => e.stopPropagation()} // Impede a propagação do evento de clique
                      onClick={(e) => e.stopPropagation()} // Impede a propagação do evento de clique
                    />
                  )}
                  <div style={{ flexGrow: 1 }}>
                    <Text strong>
                      {p.productTypeId === 'product' ? 'Produto' : 'Serviço'} R$ {p.price.toFixed(2)} {p.name}
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

        {/* Restante do formulário */}
      </Form>
    </>
  );
};

export default () => <ReservaNovo />;
