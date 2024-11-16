// CriarReserva.tsx
import React from 'react';
import { Form, Button, Tooltip } from 'antd';

interface CriarReservaProps {
  form: any;
}

const CriarReserva: React.FC<CriarReservaProps> = ({ form }) => (
  <Form.Item>
    <Tooltip title="Cria a Reserva para o Cliente">
      <Button
        className="custom-button"
        type="primary"
        onClick={async () => {
          try {
            // Validando todos os campos antes de salvar
            await form.validateFields();
            // Lógica de salvar aqui, caso a validação passe
          } catch (error) {
            console.log("Erro na validação");
          }
        }}
      >
        Criar a Reserva
      </Button>
    </Tooltip>
  </Form.Item>
);

export default CriarReserva;
