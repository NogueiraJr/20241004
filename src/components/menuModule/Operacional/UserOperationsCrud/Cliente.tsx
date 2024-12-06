import React from 'react';
import { Form, Select, Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons'; // Importa o ícone desejado
import '../../../../index.css';

const Cliente: React.FC<{ handleClienteChange: (value: string) => void; clientes: any[] }> = ({ handleClienteChange, clientes }) => (
  <Form.Item
    label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">Cliente</span>}
    name="cliente"
    rules={[{ required: true, message: 'Por favor, selecione um cliente!' }]}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}> {/* Container flex para alinhamento */}
      <Select
        showSearch
        className="custom-field"
        placeholder="Selecione um cliente"
        onChange={handleClienteChange} // Chama a função passada como prop
        options={clientes.map(c => ({ value: c.id, label: c.name }))}
        filterOption={(input, option) =>
          option?.label.toLowerCase().includes(input.toLowerCase())
        }
        style={{ flex: 1 }} // Faz o Select ocupar o máximo de espaço disponível
      />
      <Tooltip title="Cadastrar Cliente, caso ele ainda não exista">
        <Button
          type="primary" // Mantém a cor original
          icon={<PlusOutlined />} // Apenas o ícone
          className="custom-button"
        />
      </Tooltip>
    </div>
  </Form.Item>
);

export default Cliente;
