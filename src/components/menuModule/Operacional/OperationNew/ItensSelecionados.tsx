import React from 'react';
import { Form } from 'antd';
import { NumericFormat } from 'react-number-format';

const ItensSelecionados: React.FC<{ total: string; setTotal: (value: string) => void }> = ({ total, setTotal }) => (
  <Form.Item label="Itens Selecionados">
    <NumericFormat
      value={total}
      prefix="R$ "
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      thousandSeparator="."
      allowNegative={false}
      onValueChange={({ formattedValue }) => setTotal(formattedValue)}
      style={{ width: '96%', padding: '8px', borderRadius: '4px', border: '1px solid #d9d9d9' }}
    />
  </Form.Item>
);

export default ItensSelecionados;
