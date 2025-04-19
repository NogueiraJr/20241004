import React, { useState, useEffect, useMemo } from 'react';
import { Space, Table, Tag, Tooltip, Input, Select, Button, Drawer, Form, Switch, Input as AntInput, Button as AntButton, Spin, Modal } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { useParameter } from '../../../context/ParameterContext';
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

export interface ItemType {
  id: string;
  name: string;
  description: string;
  itemTypeId: string;
  quantity: number;
  price: number;
  active: boolean;
  createAt: string;
  updatedAt: string;
  deletedAt: string;
  userId: string;
  systemId: string;
  tags: string[] | null;
}

interface ItemProps {
  itemTypeId: string; // Add itemTypeId as a prop
}

const IconText = ({ icon, text, tooltip, color, onClick }: { icon: React.ComponentType<any>; text: string; tooltip: string, color?: string, onClick?: () => void }) => (
  <Tooltip title={tooltip}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={onClick}>
      {React.createElement(icon, { style: { color: color || 'black', fontSize: '20px' } })}
      <span style={{ color: color || 'black', fontSize: '12px' }}>{text}</span>
    </div>
  </Tooltip>
);

const Item: React.FC<ItemProps> = ({ itemTypeId }) => {
  const { system, userId } = useParameter();
  const navigate = useNavigate();

  const [items, setItems] = useState<ItemType[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [filteredData, setFilteredData] = useState<ItemType[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [currentItem, setCurrentItem] = useState<Partial<ItemType>>({});
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const currencyFormatter = useMemo(() => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }, []);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const baseUrl = process.env.REACT_APP_API_BASE_URL;
        const endpoint = process.env.REACT_APP_API_ITEMS_ENDPOINT;
        const queryParams = `?userId=${userId}&systemId=${system}&itemTypeId=${itemTypeId}`; // Use itemTypeId dynamically
        const response = await fetch(`${baseUrl}${endpoint}${queryParams}`);

        const data: ItemType[] = await response.json();
        const filteredBySystem = data
          .filter((produto) => !produto.deletedAt) // Exclude logically deleted records
          .sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime()); // Sort by creation date (descending)

        setItems(filteredBySystem);
      } catch (error) {
        console.error('Error fetching produtos:', error);
      }
    };

    fetchProdutos();
  }, [system, userId, itemTypeId]); // Add itemTypeId as a dependency

  useEffect(() => {
    const fetchTags = async () => {
      setTagsLoading(true);
      try {
        const endpoint = process.env.REACT_APP_API_USER_TAGS_ENDPOINT;
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${endpoint}`);
        const data = await response.json();
        setAvailableTags(data.filter((tag: { userId: string }) => tag.userId === userId).map((tag: { tag: string }) => tag.tag));
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setTagsLoading(false);
      }
    };

    fetchTags();
  }, [userId]);

  const handleExpand = (expanded: boolean, record: ItemType) => {
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

  const handleOpenDrawer = (mode: 'create' | 'edit', item?: ItemType) => {
    setDrawerMode(mode);
    setCurrentItem(
      mode === 'edit' && item
        ? {
            ...item,
            tags: item.tags
              ? item.tags
                  .toString()
                  .split('|')
                  .filter((tag) => availableTags.includes(tag)) // Align with existing tags
              : [],
          }
        : { id: '', name: '', description: '', itemTypeId: '', price: 0, quantity: 0, active: true, tags: [] }
    );
    setValidationErrors({});
    setDrawerVisible(true);
  };

  const handleSave = async () => {
    const errors: { [key: string]: string } = {};
    if (!currentItem.name) errors.name = 'O campo Nome é obrigatório.';
    if (currentItem.quantity === undefined || currentItem.quantity <= -1) errors.quantity = 'O campo Quantidade é obrigatório e deve ser maior ou igual a 0.';
    if (currentItem.price === undefined || currentItem.price <= -1) errors.price = 'O campo Preço é obrigatório e deve ser maior ou igual a 0.';

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    const endpoint = drawerMode === 'create'
      ? `${process.env.REACT_APP_API_BASE_URL}/items/`
      : `${process.env.REACT_APP_API_BASE_URL}/items/${currentItem.id}/`;

    const method = drawerMode === 'create' ? 'POST' : 'PUT';

    try {
      await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...currentItem,
          price: parseFloat(Number(currentItem.price).toFixed(2)), // Ensure price is a number before formatting
          quantity: parseInt(currentItem.quantity.toString(), 10), // Ensure quantity is an integer
          tags: Array.isArray(currentItem.tags) ? currentItem.tags.join('|') : null,
          systemId: system,
          itemTypeId, // Use itemTypeId dynamically
          userId: userId,
        }),
      });
      setDrawerVisible(false);
      // Refresh item list
      const fetchProdutos = async () => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL;
        const endpoint = process.env.REACT_APP_API_ITEMS_ENDPOINT;
        const queryParams = `?userId=${userId}&systemId=${system}&itemTypeId=${itemTypeId}`;
        const response = await fetch(`${baseUrl}${endpoint}${queryParams}`);
        const data: ItemType[] = await response.json();
        const filteredBySystem = data
          .filter((produto) => !produto.deletedAt) // Exclude logically deleted records
          .sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
        setItems(filteredBySystem);
      };
      fetchProdutos();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Tem certeza que deseja apagar este produto?',
      okText: 'Sim',
      cancelText: 'Não',
      onOk: async () => {
        try {
          const endpoint = `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_ITEMS_ENDPOINT}${id}/`;
          await fetch(endpoint, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              deletedAt: new Date().toISOString(), // Set the current date and time
            }),
          });
          // Atualizar a lista de produtos após a exclusão lógica
          const fetchProdutos = async () => {
            const baseUrl = process.env.REACT_APP_API_BASE_URL;
            const endpoint = process.env.REACT_APP_API_ITEMS_ENDPOINT;
            const queryParams = `?userId=${userId}&systemId=${system}&itemTypeId=${itemTypeId}`;
            const response = await fetch(`${baseUrl}${endpoint}${queryParams}`);
            const data: ItemType[] = await response.json();
            const filteredBySystem = data
              .filter((produto) => !produto.deletedAt) // Exclude logically deleted records
              .sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
            setItems(filteredBySystem);
          };
          fetchProdutos();
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      },
    });
  };

  const handleInputChange = (field: keyof ItemType, value: any) => {
    // Validate quantity if it's being updated
    if (field === 'quantity' && typeof value === 'number' && value < 0) {
      return;
    }
    
    setCurrentItem((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const filtered = items.filter((produto) => {
      const matchesName = produto.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = statusFilter === 'all' || produto.active === (statusFilter === 'active');
      const matchesTag = tagFilter === 'all' || (produto.tags && produto.tags.includes(tagFilter));
      const notDeleted = !produto.deletedAt; // Exclude logically deleted records
      return matchesName && matchesStatus && matchesTag && notDeleted;
    });

    setFilteredData(filtered);
  }, [searchText, statusFilter, tagFilter, items]);

  const columns: TableProps<ItemType>['columns'] = [
    {
      className: 'custom-description',
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
          <IconText
            icon={DeleteOutlined}
            text="APAGAR"
            tooltip="Apagar o Item"
            key="icon-delete"
            color="black"
            onClick={() => handleDelete(record.id)}
          />
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
        <Tooltip title="Cadastrar Novo Item">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginRight: 16 }}
            onClick={() => handleOpenDrawer('create')}
          />
        </Tooltip>
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
          {Array.from(new Set(items.flatMap((produto) => produto.tags ? produto.tags.toString().split('|') || [] : '')))
            .filter((tag) => tag) // Ensure no empty tags
            .map((tag, index) => (
              <Select.Option key={`filter-tag-${index}`} value={tag}>
                {tag.toUpperCase()}
              </Select.Option>
            ))}
        </Select>
      </div>

      <Table<ItemType>
        columns={columns}
        dataSource={filteredData}
        pagination={{
          position: ['topLeft'],
          showTotal: (total) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>Quantidade: {total}</span>
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
          <Form.Item 
            label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">Nome</span>}
            required validateStatus={validationErrors.name ? 'error' : ''} help={validationErrors.name}>
            <AntInput
              className="custom-textarea"
              value={currentItem.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </Form.Item>
          <Form.Item 
            label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">Descrição</span>}>
            <AntInput
              className="custom-textarea"
              value={currentItem.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </Form.Item>
          <Form.Item 
              label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">Quantidade</span>}
              required validateStatus={validationErrors.quantity ? 'error' : ''} help={validationErrors.quantity}>
            <AntInput
              type="number"
              className="custom-textarea"
              value={currentItem.quantity}
              onChange={(e) => handleInputChange('quantity', parseFloat(e.target.value))}
            />
          </Form.Item>
          <Form.Item 
            label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">Preço</span>} 
            required validateStatus={validationErrors.price ? 'error' : ''} help={validationErrors.price}>
            <NumericFormat
              className="custom-textarea"
              value={currentItem.price}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              allowNegative={false}
              decimalScale={2}
              fixedDecimalScale
              onValueChange={(values) => {
                const { floatValue } = values;
                handleInputChange('price', floatValue);
              }}
              customInput={AntInput}
              allowClear
            />
          </Form.Item>
          <Form.Item 
            label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">Etiquetas</span>}>
            {tagsLoading ? (
              <Spin />
            ) : (
              <Select
                mode="multiple"
                placeholder="Selecione as tags"
                value={currentItem.tags || []}
                onChange={(value) => handleInputChange('tags', value)}
                style={{ width: '100%' }}
              >
                {availableTags.map((tag, index) => (
                  <Select.Option key={`drawer-tag-${index}`} value={tag}>
                    {tag}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item 
            label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">Ativo</span>}>
            <Switch
              checked={currentItem.active}
              onChange={(checked) => handleInputChange('active', checked)}
            />
          </Form.Item>
        </Form>
        <AntButton 
          type="primary" 
          onClick={handleSave} 
          style={{ marginTop: 16, width: '100%' }} // Set width to 100%
        >
          Gravar
        </AntButton>
      </Drawer>
    </>
  );
};

export default Item;
