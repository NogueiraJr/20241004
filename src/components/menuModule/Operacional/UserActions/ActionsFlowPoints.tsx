import React, { useState } from 'react';
import { Modal, List, Checkbox, Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import NoteModal from './ActionsFlowPointsNoteModal';
import { MultiSelectListProps } from '../../../../interfaces/MultiSelectListProps';
import { ActionFlowPoint } from '../../../../interfaces/ActionFlowPoint';
import '../../../../index.css';

const MultiSelectList: React.FC<MultiSelectListProps> = ({
  visible,
  onCancel,
  data,
  systemId,
  moment,
  title,
}) => {
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<ActionFlowPoint | null>(null);
  const [note, setNote] = useState<string>('');

  const filteredData = data.ActionsFlowPoints.filter(
    (item: ActionFlowPoint) => item.systemId === systemId && item.moment === moment
  );

  const handleOpenNoteModal = (item: ActionFlowPoint) => {
    setCurrentItem(item);
    setNote('');
    setNoteModalVisible(true);
  };

  const handleSaveNote = (note: string) => {
    console.log(`Anotação salva para o item ${currentItem?.name}: ${note}`);
    setNoteModalVisible(false);
  };

  const handleSave = () => {
    console.log('Itens selecionados gravados!');
    onCancel();
  };

  return (
    <>
      <Modal
        title={title}
        visible={visible}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancelar
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Gravar
          </Button>,
        ]}
        style={{ top: 100 }}
        bodyStyle={{
          maxHeight: '50vh',
          overflowY: 'auto',
        }}
      >
        <List
          dataSource={filteredData}
          renderItem={(item: ActionFlowPoint) => (
            <List.Item>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Checkbox value={item.id}>
                  <strong className="custom-label-list">{item.name}</strong>
                  <div className="custom-label-list-detail">{item.description}</div>
                </Checkbox>
                <Tooltip title="Informações relevantes">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleOpenNoteModal(item)}>
                    <EditOutlined style={{ fontSize: '25px', color: '#1890ff' }} />
                    <div style={{ color: '#1890ff' }}>Anotações</div>
                  </div>
                </Tooltip>
              </div>
            </List.Item>
          )}
        />
      </Modal>

      <NoteModal
        visible={noteModalVisible}
        onCancel={() => setNoteModalVisible(false)}
        onSave={handleSaveNote}
        currentItem={currentItem}
        note={note}
        setNote={setNote}
      />
    </>
  );
};

export default MultiSelectList;
