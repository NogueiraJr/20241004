import React from 'react';
import { Form, Button, Tooltip } from 'antd';

const CriarReserva: React.FC = () => (
  <Form.Item>
    <Tooltip title="Cria a Reserva para o Cliente">
      <Button type="primary">Criar a Reserva</Button>
    </Tooltip>
  </Form.Item>
);

export default CriarReserva;
