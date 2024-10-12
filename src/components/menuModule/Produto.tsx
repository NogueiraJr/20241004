import React, { useState } from 'react';
import { Space, Table, Tag, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface ProductType {
  id: string;
  name: string;
  description: string;
  productTypeId: string;
  price: number;
  active: boolean;
  createAt: string;
  updatedAt: string;
  deletedAt: string;
  userId: string;
  systemId: string;
  tags: string[] | null;
}

const IconText = ({ icon, text, tooltip, color, onClick }: { icon: React.ComponentType<any>; text: string; tooltip: string, color?: string, onClick?: () => void }) => (
  <Tooltip title={tooltip}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={onClick}>
      {React.createElement(icon, { style: { color: color || 'black', fontSize: '20px' } })}
      <span style={{ color: color || 'black', fontSize: '12px' }}>{text}</span>
    </div>
  </Tooltip>
);

const columns: TableProps<ProductType>['columns'] = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    width: '100%',
  },
  {
    title: 'Ações',
    key: 'action',
    width: '100px',
    render: (_, record) => (
      <Space size="middle">
        <IconText icon={EditOutlined} text="EDITAR" tooltip="Editar o Item" key="icon-edit" color="black" />
        <IconText icon={DeleteOutlined} text="APAGAR" tooltip="Apagar o Item" key="icon-delete" color="black" />
      </Space>
    ),
  },
];

const data: ProductType[] = [
  {
		id : "cm26i4oqj00012no5y0lymugl",
		name : "Vestido de Festa",
		description : "Vestidos elegantes e sofisticados adequados para eventos formais, como casamentos, bailes de formatura e festas de gala.",
		productTypeId : "product",
		price : 0.00,
		tags : ['casamento', 'festa'],
		active : true,
		createAt : "2024-10-12 18:40:23.611",
		updatedAt : "2024-10-12 18:40:23.611",
		deletedAt : null,
		userId : "idProprietario01",
		systemId : "sysLocacaoRoupa"
	},
	{
		id : "cm26i4oqq00032no5gotu98se",
		name : "Terno",
		description : "Conjunto de calça e paletó elegante para homens, adequado para eventos formais, reuniões de negócios e ocasiões especiais.",
		productTypeId : "product",
		price : 0.00,
		tags : ['casamento', 'festa'],
		active : false,
		createAt : "2024-10-12 18:40:23.618",
		updatedAt : "2024-10-12 18:40:23.618",
		deletedAt : null,
		userId : "idProprietario01",
		systemId : "sysLocacaoRoupa"
	},
	{
		id : "cm26i4oqu00052no5w1yea8cs",
		name : "Vestido de Noiva",
		description : "Vestidos de noiva em uma variedade de estilos, cortes e designs para o dia mais especial na vida de uma mulher.",
		productTypeId : "product",
		price : 0.00,
		tags : ['casamento'],
		active : true,
		createAt : "2024-10-12 18:40:23.622",
		updatedAt : "2024-10-12 18:40:23.622",
		deletedAt : null,
		userId : "idProprietario01",
		systemId : "sysLocacaoRoupa"
	},
	{
		id : "cm26i4oqx00072no5qy72f2xs",
		name : "Smoking",
		description : "Traje formal para homens, geralmente usado em eventos de gala, casamentos formais e ocasiões de luxo à noite.",
		productTypeId : "product",
		price : 0.00,
		tags : null,
		active : false,
		createAt : "2024-10-12 18:40:23.626",
		updatedAt : "2024-10-12 18:40:23.626",
		deletedAt : null,
		userId : "idProprietario01",
		systemId : "sysLocacaoRoupa"
	},
	{
		id : "cm26i4or000092no5k7m4jhbn",
		name : "Vestido de Cocktail",
		description : "Vestidos semi-formais mais curtos, ideais para eventos semi-formais, coquetéis, festas de aniversário e eventos corporativos descontraídos.",
		productTypeId : "product",
		price : 0.00,
		tags : null,
		active : true,
		createAt : "2024-10-12 18:40:23.629",
		updatedAt : "2024-10-12 18:40:23.629",
		deletedAt : null,
		userId : "idProprietario01",
		systemId : "sysLocacaoRoupa"
	},
	{
		id : "cm26i4or3000b2no55vcu8vwn",
		name : "Vestido de Dama de Honra",
		description : "Vestidos elegantes e coordenados para as damas de honra em casamentos, disponíveis em uma variedade de cores e estilos.",
		productTypeId : "product",
		price : 0.00,
		tags : ['casamento', 'festa'],
		active : true,
		createAt : "2024-10-12 18:40:23.632",
		updatedAt : "2024-10-12 18:40:23.632",
		deletedAt : null,
		userId : "idProprietario01",
		systemId : "sysLocacaoRoupa"
	},
	{
		id : "cm26i4or6000d2no57m5h8iqc",
		name : "Traje Infantil",
		description : "Conjuntos de roupas formais para crianças, incluindo ternos para meninos e vestidos elegantes para meninas, para ocasiões especiais.",
		productTypeId : "product",
		price : 0.00,
		tags : null,
		active : true,
		createAt : "2024-10-12 18:40:23.634",
		updatedAt : "2024-10-12 18:40:23.634",
		deletedAt : null,
		userId : "idProprietario01",
		systemId : "sysLocacaoRoupa"
	},
	{
		id : "cm26i4or9000f2no563zsa517",
		name : "Acessórios de Noiva",
		description : "Acessórios como véus, tiaras, luvas e joias para complementar o vestido de noiva e completar o visual da noiva.",
		productTypeId : "product",
		price : 0.00,
		tags : ['batizado', 'festa'],
		active : false,
		createAt : "2024-10-12 18:40:23.637",
		updatedAt : "2024-10-12 18:40:23.637",
		deletedAt : null,
		userId : "idProprietario01",
		systemId : "sysLocacaoRoupa"
	},
	{
		id : "cm26i4orc000h2no5307ceiho",
		name : "Roupa de Convidados",
		description : "Opções de trajes formais e semi-formais para convidados de casamentos, festas de gala, eventos corporativos e outras ocasiões especiais.",
		productTypeId : "product",
		price : 0.00,
		tags : null,
		active : true,
		createAt : "2024-10-12 18:40:23.641",
		updatedAt : "2024-10-12 18:40:23.641",
		deletedAt : null,
		userId : "idProprietario01",
		systemId : "sysLocacaoRoupa"
	},
	{
		id : "cm26i4orf000j2no5izi5uvzl",
		name : "Vestido de Madrinha",
		description : "Vestidos elegantes e coordenados para as madrinhas em casamentos, disponíveis em uma variedade de estilos e cores.",
		productTypeId : "product",
		price : 0.00,
		tags : ['casamento', 'festa'],
		active : true,
		createAt : "2024-10-12 18:40:23.644",
		updatedAt : "2024-10-12 18:40:23.644",
		deletedAt : null,
		userId : "idProprietario01",
		systemId : "sysLocacaoRoupa"
	},
	{
		id : "cm26i4ori000l2no5iftbcb8i",
		name : "Smoking Infantil",
		description : "Versões em miniatura de smokings para meninos, perfeitos para eventos formais, casamentos e festas.",
		productTypeId : "product",
		price : 0.00,
		tags : null,
		active : false,
		createAt : "2024-10-12 18:40:23.646",
		updatedAt : "2024-10-12 18:40:23.646",
		deletedAt : null,
		userId : "idProprietario01",
		systemId : "sysLocacaoRoupa"
	},
];

const Produto: React.FC = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const handleExpand = (expanded: boolean, record: ProductType) => {
    setExpandedRowKeys((prevExpandedRowKeys) => {
      if (expanded) {
        // Adiciona a chave do item expandido à lista
        return [...prevExpandedRowKeys, record.id];
      } else {
        // Remove a chave do item contraído da lista
        return prevExpandedRowKeys.filter((key) => key !== record.id);
      }
    });
  };

  return (
    <Table<ProductType>
      columns={columns}
      dataSource={data}
      pagination={{ position: ['topLeft'] }}
      expandedRowRender={(record) => {
        const formattedDate = new Date(record.createAt).toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        const tagsDisplay = record.tags && record.tags.length > 0 
          ? record.tags.map((tag) => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })
          : null;

        return (
          <div style={{ color: 'gray' }}>
            <div>{record.description}</div>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ marginRight: '8px' }}>Criado em {formattedDate}</span> |
              <Tooltip title={'Situação do item'}>
                <span style={{ cursor: 'pointer', marginLeft: '8px', color: record.active ? 'green' : 'red' }}>
                  {record.active ? 'ATIVO' : 'INATIVO'}
                </span>
              </Tooltip>
              {tagsDisplay && tagsDisplay.length > 0 && (
                <span style={{ cursor: 'pointer', marginLeft: '8px' }}>
                  | {tagsDisplay}
                </span>
              )}
            </div>
          </div>
        );
      }}
      expandedRowKeys={expandedRowKeys}
      onExpand={handleExpand}
      rowKey="id"
    />
  );
};

export default Produto;
