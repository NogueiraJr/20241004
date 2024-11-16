import React from 'react';
import { Form, Input } from 'antd';

const Anotacoes: React.FC = () => (
  <Form.Item label="Anotações">
    <Input.TextArea rows={4} />
  </Form.Item>
);

export default Anotacoes;
