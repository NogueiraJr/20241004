import React from 'react';
import { Form, DatePicker } from 'antd';

const DataProva: React.FC = () => (
  <Form.Item label="Provar em" name="dataProva" rules={[{ required: true, message: 'Por favor, informe uma data!' }]}>
    <DatePicker placeholder="Informe a data da Prova" format="DD MMMM YYYY, HH:mm" showTime={{ format: 'HH:mm' }} style={{ width: '100%' }} />
  </Form.Item>
);

export default DataProva;
