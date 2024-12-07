import React, { useState } from 'react';
import { DatePicker, Form } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

const DataDevolucao: React.FC = () => {
  const [defaultValue, setDefaultValue] = useState<dayjs.Dayjs | null>(null);

  return (
    <div>
      <Form.Item 
        label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Devolver em</span>} 
        name="DataDevolucao" 
        rules={[{ required: true, message: 'Por favor, informe uma data!' }]}
      >
        <DatePicker 
          className="custom-date-picker" 
          placeholder="Informe a data da Devolução" 
          format="DD/MM/YYYY HH:mm" 
          showTime={{ 
            format: 'HH:mm', 
            defaultValue: dayjs().set('hour', 10).set('minute', 0), 
            showSecond: false, 
            hourStep: 1, 
            minuteStep: 5, 
          }} 
          style={{ width: '100%' }} 
          defaultValue={defaultValue}
        />
      </Form.Item>
    </div>
  );
};

export default DataDevolucao;
