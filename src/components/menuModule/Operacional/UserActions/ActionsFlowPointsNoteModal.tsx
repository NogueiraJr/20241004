import React from 'react';
import { Modal, Input, Button } from 'antd';
import { ActionFlowPoint } from '../../../../interfaces/ActionFlowPoint';

interface NoteModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (note: string) => void;
  currentItem: ActionFlowPoint | null;
  note: string;
  setNote: (value: string) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({
  visible,
  onCancel,
  onSave,
  currentItem,
  note,
  setNote,
}) => {
  return (
    <Modal
      title="Anotações"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="save" type="primary" onClick={() => onSave(note)}>
          Gravar
        </Button>,
      ]}
    >
      <p className="custom-label-list-detail">
        <strong className="custom-label-list">Item:</strong> {currentItem?.name}
      </p>
      <Input.TextArea
        className="ant-input css-dev-only-do-not-override-ccdg5a ant-input-outlined custom-textarea"
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Digite suas anotações aqui..."
      />
    </Modal>
  );
};

export default NoteModal;
