import React from 'react';
import { Form, DatePicker } from 'antd';

const DataExecucao: React.FC = () => (
  <Form.Item label="Execução em" name="dataExecucao" rules={[{ required: true, message: 'Por favor, informe uma data!' }]}>
    <DatePicker placeholder="Informe a data da Execução" format="DD MMMM YYYY, HH:mm" showTime={{ format: 'HH:mm' }} style={{ width: '100%' }} />
  </Form.Item>
);

export default DataExecucao;
