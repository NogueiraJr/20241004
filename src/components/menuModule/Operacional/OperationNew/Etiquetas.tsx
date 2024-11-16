import React from 'react';
import { Form, Select } from 'antd';

const Etiquetas: React.FC = () => (
  <Form.Item label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Etiquetas </span>}>
    <Select className="custom-field" placeholder="Informe as etiquetas" mode="multiple">
      <Select.Option value="casamento">Casamento</Select.Option>
      <Select.Option value="batizado">Batizado</Select.Option>
      <Select.Option value="festa">Festa</Select.Option>
    </Select>
  </Form.Item>
);

export default Etiquetas;
