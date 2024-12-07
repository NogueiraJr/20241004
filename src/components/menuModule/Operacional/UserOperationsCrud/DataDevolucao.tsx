import React from 'react';
import { Form, DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

const DataDevolucao: React.FC = () => (
  <Form
    initialValues={{
      dateDevolucao: dayjs().add(14, 'day').set('hour', 14).set('minute', 0), // Define o valor padrão
    }}
  >
    <Form.Item 
      label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Devolver em</span>} 
      name="dateDevolucao" 
      rules={[{ required: true, message: 'Por favor, informe uma data!' }]}
    >
      <DatePicker 
        className="custom-date-picker" 
        placeholder="Informe a data da Devolução" 
        format="DD/MM/YYYY, HH:mm" 
        showTime={{ format: 'HH:mm' }} 
        style={{ width: '100%' }} 
      />
    </Form.Item>
  </Form>
);

export default DataDevolucao;
