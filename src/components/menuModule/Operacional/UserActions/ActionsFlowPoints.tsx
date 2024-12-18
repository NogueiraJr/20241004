import React, { useState } from 'react';
import { Modal, List, Checkbox, Button, Input, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons'; // Ícone para o botão de anotações
import { MultiSelectListProps } from '../UserOperationsList/MultiSelectListProps';
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
  const [noteModalVisible, setNoteModalVisible] = useState(false); // Controle de visibilidade do modal de anotações
  const [currentItem, setCurrentItem] = useState<ActionFlowPoint | null>(null); // Item atual para anotações
  const [note, setNote] = useState<string>(''); // Estado para o texto da anotação

  // Filtra os dados de ActionsFlowPoints com base no systemId e moment
  const filteredData = data.ActionsFlowPoints.filter(
    (item: ActionFlowPoint) => item.systemId === systemId && item.moment === moment
  );

  // Função para abrir o modal de anotações
  const handleOpenNoteModal = (item: ActionFlowPoint) => {
    setCurrentItem(item);
    setNote(''); // Limpa o campo de anotação ao abrir
    setNoteModalVisible(true);
  };

  // Função para salvar a anotação
  const handleSaveNote = () => {
    console.log(`Anotação salva para o item ${currentItem?.name}: ${note}`);
    setNoteModalVisible(false);
  };

  // Função para o botão "Gravar"
  const handleSave = () => {
    console.log('Itens selecionados gravados!');
    onCancel(); // Fecha o modal após salvar
  };

  return (
    <>
      <Modal
        title={title} // Usa o título passado como parâmetro
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
                  <EditOutlined
                    style={{
                      fontSize: '20px', 
                      color: '#1890ff', // Usa a cor padrão do Ant Design para ícones clicáveis
                      cursor: 'pointer', // Adiciona um cursor de ponteiro para indicar clicável
                    }}
                    onClick={() => handleOpenNoteModal(item)}
                  />
                </Tooltip>
              </div>
            </List.Item>
          )}
        />
      </Modal>

      {/* Modal de anotações */}
      <Modal        
        title="Anotações"
        visible={noteModalVisible}
        onCancel={() => setNoteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setNoteModalVisible(false)}>
            Cancelar
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveNote}>
            Gravar
          </Button>,
        ]}
      >
        <p className="custom-label-list-detail"><strong className="custom-label-list">Item:</strong> {currentItem?.name}</p>
        <Input.TextArea
          className="ant-input css-dev-only-do-not-override-ccdg5a ant-input-outlined custom-textarea"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Digite suas anotações aqui..."
        />
      </Modal>
    </>
  );
};

export default MultiSelectList;
