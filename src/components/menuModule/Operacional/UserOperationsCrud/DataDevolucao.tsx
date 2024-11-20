import React from 'react';
import { Form, DatePicker } from 'antd';

const DataReserva: React.FC = () => (
  <Form.Item label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Devolver em</span>} name="dateDevolucao" rules={[{ required: true, message: 'Por favor, informe uma data!' }]}>
    <DatePicker className="custom-date-picker" placeholder="Informe a data da Devolução" format="DD MMMM YYYY, HH:mm" showTime={{ format: 'HH:mm' }} style={{ width: '100%' }} />
  </Form.Item>
);

export default DataReserva;
