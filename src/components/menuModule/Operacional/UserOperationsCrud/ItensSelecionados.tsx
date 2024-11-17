import React from 'react';
import { Form } from 'antd';
import { NumericFormat } from 'react-number-format';

const ItensSelecionados: React.FC<{ total: string; setTotal: (value: string) => void }> = ({ total }) => (
  // <Form.Item label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>{`${selectedProducts.length} itens selecionados`}</span>}>
  <Form.Item label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Itens selecionados</span>}>
    <NumericFormat
      value={total}
      prefix="R$ "
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      thousandSeparator="."
      allowNegative={false}
      className='custom-field-decimal'
      // style={{ width: '96%', padding: '8px', borderRadius: '4px', border: '1px solid #d9d9d9' }}
      // disabled
    />
  </Form.Item>
);

export default ItensSelecionados;
