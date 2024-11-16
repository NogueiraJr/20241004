import React from 'react';
import { Form, Input } from 'antd';

const Anotacoes: React.FC = () => (
  <Form.Item label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Anotações</span>}>
    <Input.TextArea className="custom-textarea" rows={4} />
  </Form.Item>
);

export default Anotacoes;
