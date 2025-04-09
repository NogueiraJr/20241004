import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Tooltip, Input, Select, Button, Drawer, Form, Switch, Input as AntInput, Button as AntButton } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { useParameter } from '../../../context/ParameterContext';
import { useNavigate } from 'react-router-dom';

export interface ProductType {
  id: string;
  name: string;
  description: string;
  itemTypeId: string;
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

const Produto: React.FC = () => {
  const { system } = useParameter();
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState<ProductType[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [filteredData, setFilteredData] = useState<ProductType[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [currentProduct, setCurrentProduct] = useState<Partial<ProductType>>({});

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        
        const baseUrl = process.env.REACT_APP_API_BASE_URL;
        const endpoint = process.env.REACT_APP_API_ITEMS_ENDPOINT;
        const response = await fetch(`${baseUrl}${endpoint}`);

        const data: ProductType[] = await response.json();
        const filteredBySystem = data.filter((produto) => produto.systemId === system && produto.itemTypeId === 'product');


        setProdutos(filteredBySystem);
      } catch (error) {
        console.error('Error fetching produtos:', error);
      }
    };

    fetchProdutos();
  }, [system]);

  const handleExpand = (expanded: boolean, record: ProductType) => {
    setExpandedRowKeys((prevExpandedRowKeys) => {
      return expanded ? [...prevExpandedRowKeys, record.id] : prevExpandedRowKeys.filter((key) => key !== record.id);
    });
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  const handleTagFilter = (value: string) => {
    setTagFilter(value);
  };

  const handleOpenDrawer = (mode: 'create' | 'edit', product?: ProductType) => {
    setDrawerMode(mode);
    setCurrentProduct(
      mode === 'edit' && product
        ? { ...product }
        : { id: '', name: '', description: '', itemTypeId: '', price: 0, active: true, tags: null }
    );
    setDrawerVisible(true);
  };

  const handleSave = async () => {
    const endpoint = drawerMode === 'create'
      ? `${process.env.REACT_APP_API_BASE_URL}/items/`
      : `${process.env.REACT_APP_API_BASE_URL}/items/${currentProduct.id}/`;

    const method = drawerMode === 'create' ? 'POST' : 'PUT';

    try {
      await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(currentProduct),
      });
      setDrawerVisible(false);
      // Refresh product list
      const fetchProdutos = async () => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL;
        const endpoint = process.env.REACT_APP_API_ITEMS_ENDPOINT;
        const response = await fetch(`${baseUrl}${endpoint}`);
        const data: ProductType[] = await response.json();
        const filteredBySystem = data.filter(
          (produto) => produto.systemId === system && produto.itemTypeId === 'product'
        );
        setProdutos(filteredBySystem);
      };
      fetchProdutos();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleInputChange = (field: keyof ProductType, value: any) => {
    setCurrentProduct((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const filtered = produtos.filter((produto) => {
      const matchesName = produto.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = statusFilter === 'all' || produto.active === (statusFilter === 'active');
      const matchesTag = tagFilter === 'all' || (produto.tags && produto.tags.includes(tagFilter));
      return matchesName && matchesStatus && matchesTag;
    });

    setFilteredData(filtered);
  }, [searchText, statusFilter, tagFilter, produtos]);

  const columns: TableProps<ProductType>['columns'] = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      width: '100%',
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Pesquisar por nome"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginBottom: 8, display: 'block' }}
          />
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Ações',
      key: 'action',
      width: '100px',
      render: (_, record) => (
        <Space size="middle">
          <IconText
            icon={EditOutlined}
            text="EDITAR"
            tooltip="Editar o Item"
            key="icon-edit"
            color="black"
            onClick={() => handleOpenDrawer('edit', record)}
          />
          <IconText icon={DeleteOutlined} text="APAGAR" tooltip="Apagar o Item" key="icon-delete" color="black" />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => navigate(-1)}
          icon={<ArrowLeftOutlined />}
          style={{ marginRight: 16 }}
        />
        {/* <Tooltip title="Cadastrar Novo Produto">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginRight: 16 }}
            onClick={() => handleOpenDrawer('create')}
          />
        </Tooltip> */}
        <Select
          placeholder="Filtrar por status"
          onChange={handleStatusFilter}
          style={{ width: 150, marginRight: 8 }}
          defaultValue="all"
        >
          <Select.Option value="all">Todos</Select.Option>
          <Select.Option value="active">Ativo</Select.Option>
          <Select.Option value="inactive">Inativo</Select.Option>
        </Select>

        <Select
          placeholder="Filtrar por tag"
          onChange={handleTagFilter}
          style={{ width: 150 }}
          defaultValue="all"
        >
          <Select.Option value="all">Todos</Select.Option>
          {Array.from(new Set(produtos.flatMap((produto) => produto.tags.toString().split('|') || []))).map((tag) => (
            <Select.Option key={tag} value={tag}>
              {tag.toUpperCase()}
            </Select.Option>
          ))}
        </Select>
      </div>

      <Table<ProductType>
        columns={columns}
        dataSource={filteredData}
        pagination={{
          position: ['topLeft'],
          showTotal: (total) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Cadastrar Novo Produto">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  style={{ marginRight: 16 }}
                  onClick={() => handleOpenDrawer('create')}
                />
              </Tooltip>
              <span>{total} iten(s)</span>
            </div>
          ),
        }}
        expandedRowRender={(record) => {
          const formattedDate = new Date(record.createAt).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          const tagsDisplay = record.tags && record.tags.length > 0
            ? record.tags.toString().split('|').map((tag) => (
              <Tag color={tag.length > 5 ? 'geekblue' : 'green'} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            ))
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
        locale={{
          triggerDesc: 'Clique para ordenar decrescente',
          triggerAsc: 'Clique para ordenar crescente',
          cancelSort: 'Clique para cancelar a ordenação',
        }}
      />

      <Drawer
        title={drawerMode === 'create' ? 'Criar Produto' : 'Editar Produto'}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={400}
      >
        <Form layout="vertical">
          <Form.Item label="Nome">
            <AntInput
              value={currentProduct.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Descrição">
            <AntInput
              value={currentProduct.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Preço">
            <AntInput
              type="number"
              value={currentProduct.price}
              onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
            />
          </Form.Item>
          <Form.Item label="Tags">
            <AntInput
              value={currentProduct.tags?.join('|')}
              onChange={(e) => handleInputChange('tags', e.target.value.split('|'))}
            />
          </Form.Item>
          <Form.Item label="Ativo">
            <Switch
              checked={currentProduct.active}
              onChange={(checked) => handleInputChange('active', checked)}
            />
          </Form.Item>
        </Form>
        <AntButton type="primary" onClick={handleSave} style={{ marginTop: 16 }}>
          Gravar
        </AntButton>
      </Drawer>
    </>
  );
};

export default Produto;
