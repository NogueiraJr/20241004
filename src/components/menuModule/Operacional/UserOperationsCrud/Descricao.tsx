import React from 'react';
import { Form, Input } from 'antd';

const Descricao: React.FC = () => (
  <Form.Item label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Descrição</span>} rules={[{ required: true, message: 'Por favor, informe uma Descrição!' }]} name="descricao">
    <Input className="custom-field"/>
  </Form.Item>
);

export default Descricao;
