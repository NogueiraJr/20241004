import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { useParameter } from '../../../../context/ParameterContext';

interface ClienteItemNovoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (newClientItem: { name: string; plate?: string; chassis?: string; porte?: string; especie?: string }) => void;
}

const ClienteItemNovoModal: React.FC<ClienteItemNovoModalProps> = ({ visible, onClose, onSave }) => {
  const { system } = useParameter();
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then(values => {
      onSave(values);
      form.resetFields();
    }).catch((errorInfo) => {
      console.log('Erro na validação:', errorInfo);
    });
  };

  const getTitle = () => {
    switch (system) {
      case 'sysOficinaCarro':
        return 'Cadastrar Novo Veículo';
      case 'sysPetShop':
      case 'sysClinicaVeterinaria':
        return 'Cadastrar Novo Animal';
      default:
        return 'Cadastrar Novo Item';
    }
  };

  const getNameLabel = () => {
    switch (system) {
      case 'sysOficinaCarro':
        return 'Nome do Veículo';
      case 'sysPetShop':
      case 'sysClinicaVeterinaria':
        return 'Nome do Animal';
      default:
        return 'Nome do Item';
    }
  };

  return (
    <Modal
      visible={visible}
      title={getTitle()}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Gravar
        </Button>,
      ]}
      className="custom-modal"
    >
      <Form form={form} layout="vertical" className="custom-form">
        <Form.Item
          name="name"
          label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">{getNameLabel()}</span>}
          rules={[{ required: true, message: `Por favor, insira o ${getNameLabel().toLowerCase()}!` }]}
          className="custom-form-item"
        >
          <Input className="custom-field" />
        </Form.Item>
        {system === 'sysOficinaCarro' && (
          <>
            <Form.Item
              name="plate"
              label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">Placa</span>}
              rules={[{ required: true, message: 'Por favor, insira a placa do veículo!' }]}
              className="custom-form-item"
            >
              <Input maxLength={7} placeholder="ABC1234" className="custom-field" />
            </Form.Item>
            <Form.Item
              name="chassis"
              label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">Chassi</span>}
              className="custom-form-item"
            >
              <Input maxLength={17} placeholder="17 caracteres" className="custom-field" />
            </Form.Item>
          </>
        )}
        {['sysPetShop', 'sysClinicaVeterinaria'].includes(system) && (
          <>
            <Form.Item
              name="porte"
              label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">Porte</span>}
              rules={[{ required: true, message: 'Por favor, selecione o porte do animal!' }]}
              className="custom-form-item"
            >
              <Select placeholder="Selecione o porte" className="custom-select">
                <Select.Option value="Pequeno">Pequeno</Select.Option>
                <Select.Option value="Médio">Médio</Select.Option>
                <Select.Option value="Grande">Grande</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="especie"
              label={<span style={{ whiteSpace: 'nowrap' }} className="custom-label">Espécie</span>}
              className="custom-form-item"
            >
              <Input placeholder="Espécie do animal" className="custom-field" />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default ClienteItemNovoModal;
