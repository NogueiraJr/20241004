import React from 'react';
import { Form, DatePicker } from 'antd';

const DataReserva: React.FC = () => (
  <Form.Item label="Reservar em" name="dataReserva" rules={[{ required: true, message: 'Por favor, informe uma data!' }]}>
    <DatePicker placeholder="Informe a data da Reserva" format="DD MMMM YYYY, HH:mm" showTime={{ format: 'HH:mm' }} style={{ width: '100%' }} />
  </Form.Item>
);

export default DataReserva;
