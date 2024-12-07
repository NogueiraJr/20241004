import React from 'react';
import { Form, DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importa o locale para português do Brasil
dayjs.locale('pt-br'); // Configura o locale para pt-BR

const DataExecucao: React.FC = () => (
  <Form
    initialValues={{
      dataExecucao: dayjs().add(1, 'day').set('hour', 14).set('minute', 0), // Define o valor padrão
    }}
  >
    <Form.Item 
      label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Executar em</span>} 
      name="dataExecucao" 
      rules={[{ required: true, message: 'Por favor, informe uma data!' }]}
    >
      <DatePicker 
        className="custom-date-picker" 
        placeholder="Informe a data da Execução" 
        format="DD/MM/YYYY, HH:mm" 
        showTime={{ format: 'HH:mm' }} 
        style={{ width: '100%' }} 
      />
    </Form.Item>
  </Form>
);

export default DataExecucao;
