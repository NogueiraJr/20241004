import React from "react";
import ActionIcons from './components/ActionIcons';
import { createSystemOverrides, defaultActionMap } from './constants';
const UserOperationsDetails: React.FC<{
  actions: string[];
  system: string;
  userOperationId: string;
  openModal: (moment: string) => void;
}> = ({ actions, system, openModal }) => {

  const openGoogleMaps = () => {
    const latitude = -23.1794;
    const longitude = -45.8869;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const actionMap = { 
    ...defaultActionMap, 
    ...createSystemOverrides(openModal, openGoogleMaps)[system] 
  };

  const columns = [
    { title: "Descrição", dataIndex: "description", key: "description" },
    { title: "Quando", dataIndex: "scheduledAt", key: "scheduledAt" },
    {
      title: "Ações",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: any) => actionMap[record.action]?.icon || null, },
  ];

  return (
      <ActionIcons actions={actions} actionMap={actionMap} />
  );
};

export default UserOperationsDetails;