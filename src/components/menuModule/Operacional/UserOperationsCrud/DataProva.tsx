import React from 'react';
import { Form, DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

const DataProva: React.FC = () => (
  <Form
    initialValues={{
      dataProva: dayjs().add(3, 'day').set('hour', 14).set('minute', 0), // Define o valor padrão
    }}
  >
    <Form.Item 
      label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Provar em</span>} 
      name="dataProva" 
      rules={[{ required: true, message: 'Por favor, informe uma data!' }]}
    >
      <DatePicker 
        className="custom-date-picker" 
        placeholder="Informe a data da Prova" 
        format="DD/MM/YYYY HH:mm" 
        showTime={{ 
          format: 'HH:mm', 
          defaultValue: dayjs().set('hour', 14).set('minute', 0), 
          showSecond: false, // Remove os segundos para simplificar o seletor
          hourStep: 1, // Passos de hora
          minuteStep: 5, // Passos de minutos para menos granularidade
        }} 
        style={{ width: '100%' }} 
      />
    </Form.Item>
  </Form>
);

export default DataProva;
