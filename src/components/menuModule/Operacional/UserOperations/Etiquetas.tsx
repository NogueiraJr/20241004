import React from 'react';
import { Form, Select } from 'antd';

interface EtiquetasProps {
  etiquetas: { id: string; tag: string; description: string }[];
}

const Etiquetas: React.FC<EtiquetasProps> = ({ etiquetas }) => (
  <Form.Item label={<span className="custom-label" style={{ whiteSpace: 'nowrap' }}>Etiquetas</span>}>
    <Select className="custom-field" placeholder="Informe as etiquetas" mode="multiple">
      {etiquetas.map((etiqueta) => (
        <Select.Option key={etiqueta.id} value={etiqueta.tag}>
          {etiqueta.tag.toUpperCase()}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
);

export default Etiquetas;
