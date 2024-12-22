import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import versionHistoryData from './fields/Login/versionHistory.json';
import { useParameter } from '../context/ParameterContext';

interface VersionHistory {
  version: string;
  date: string;
  description: string;
  details: string[];
  system: string;
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
        item.system.split(',').includes(system)
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
            <p><strong>Descrição:</strong> {item.description}</p>
            <ul>
              {item.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default VersionHistoryModal;
