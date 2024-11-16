import React from 'react';
import { Form, DatePicker } from 'antd';

const DataRetirada: React.FC = () => (
  <Form.Item label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Retirar em</span>} name="dataRetirada" rules={[{ required: true, message: 'Por favor, informe uma data!' }]}>
    <DatePicker className="custom-date-picker" placeholder="Informe a data da Retirada" format="DD MMMM YYYY, HH:mm" showTime={{ format: 'HH:mm' }} style={{ width: '100%' }} />
  </Form.Item>
);

export default DataRetirada;
