import React from 'react';
import { Form, Button, Tooltip } from 'antd';

const CriarOrcamento: React.FC = () => (
  <Form.Item>
    <Tooltip title="Cria o Orçamento para o Cliente">
      <Button className="custom-button" type="primary">Criar o Orçamento</Button>
    </Tooltip>
  </Form.Item>
);

export default CriarOrcamento;
