import React from 'react';
import { Form, DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

const DataRetirada: React.FC = () => (
  <Form
    initialValues={{
      dataRetirada: dayjs().add(7, 'day').set('hour', 14).set('minute', 0), // Define o valor padrão
    }}
  >
    <Form.Item 
      label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Retirar em</span>} 
      name="dataRetirada" 
      rules={[{ required: true, message: 'Por favor, informe uma data!' }]}
    >
      <DatePicker 
        className="custom-date-picker" 
        placeholder="Informe a data da Retirada" 
        format="DD/MM/YYYY, HH:mm" 
        showTime={{ format: 'HH:mm' }} 
        style={{ width: '100%' }} 
      />
    </Form.Item>
  </Form>
);

export default DataRetirada;
