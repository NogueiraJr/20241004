import React from 'react';
import { Form, Select, Button, Tooltip } from 'antd';
import '../../../../index.css';

const Cliente: React.FC<{ handleClienteChange: (value: string) => void; clientes: any[] }> = ({ handleClienteChange, clientes }) => (
  <>
    <Form.Item
      label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">Cliente</span>}
      name="cliente"
      rules={[{ required: true, message: 'Por favor, selecione um cliente!' }]}
    >
      <Select
        showSearch
        className="custom-field"
        placeholder="Selecione um cliente"
        onChange={handleClienteChange} // Chama a função passada como prop
        options={clientes.map(c => ({ value: c.id, label: c.name }))}
        filterOption={(input, option) =>
          option?.label.toLowerCase().includes(input.toLowerCase())
        }
      />
    </Form.Item>
    <Form.Item>
      <Tooltip title="Caso o Cliente ainda não exista cadastrado">
        <Button type="primary" className="custom-button">Novo Cliente</Button>
      </Tooltip>
    </Form.Item>
  </>
);

export default Cliente;
