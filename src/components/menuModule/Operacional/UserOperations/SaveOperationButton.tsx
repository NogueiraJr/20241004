// SaveOperation.tsx
import React from 'react';
import { Form, Button, Tooltip } from 'antd';

interface SaveOperationProps {
  form: any;
}

const SaveOperation: React.FC<SaveOperationProps> = ({ form }) => (
  <Form.Item>
    <Tooltip title="Grava os dados">
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
        Gravar
      </Button>
    </Tooltip>
  </Form.Item>
);

export default SaveOperation;
