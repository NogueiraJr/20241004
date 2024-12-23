import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import versionHistoryData from './fields/Login/versionHistory.json';
import { useParameter } from '../context/ParameterContext';

interface HistoryItem {
  system: string;
  description: string;
  details: string[];
}

interface VersionHistory {
  version: string;
  date: string;
  history: HistoryItem[];
}

interface VersionHistoryModalProps {
  visible: boolean;
  onClose: () => void;
}

const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({ visible, onClose }) => {
  const [versionHistory, setVersionHistory] = useState<VersionHistory[]>([]);
  const { system } = useParameter();

  useEffect(() => {
    // Filtra os dados de histórico de versões com base no sistema informado
    if (system) {
      const filteredData = versionHistoryData.filter((item) =>
        item.history.some((historyItem) =>
          historyItem.system.split(',').includes(system) || historyItem.system === 'all'
        )
      );
      setVersionHistory(filteredData);
    } else {
      setVersionHistory(versionHistoryData);
    }
  }, [system]);

  return (
    <Modal
      title="Histórico de Versões"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          Fechar
        </Button>,
      ]}
      bodyStyle={{ maxHeight: '300px', overflowY: 'auto' }}
    >
      <ul>
        {versionHistory.map((item, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            <strong>Versão {item.version} - {item.date}</strong>
            {item.history
              .filter((historyItem) =>
                historyItem.system.split(',').includes(system) || system === undefined || historyItem.system === 'all'
              )
              .map((historyItem, historyIndex) => (
                <div key={historyIndex}>
                  <p><strong>Descrição:</strong> {historyItem.description}</p>
                  <ul>
                    {historyItem.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            {/* Se não houver histórico para o sistema, mostra "Descrição: Produtos" */}
            {item.history.filter((historyItem) =>
              historyItem.system.split(',').includes(system) || system === undefined || historyItem.system === 'all'
            ).length === 0 && (
              <div>
                <p><strong>Descrição:</strong> Melhorias e correções</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default VersionHistoryModal;
