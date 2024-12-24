import { CalculatorOutlined, CalendarOutlined, CarOutlined, ExportOutlined, FileDoneOutlined, ImportOutlined, LoginOutlined, LogoutOutlined, RollbackOutlined, SearchOutlined, SkinOutlined, UploadOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import IconText from "./IconText";
  
const ActionDetails: React.FC<{ actions: string[], system: string, openModal: (moment: string) => void }> = ({ actions, system, openModal }) => {
    const defaultActionMap: Record<string, { icon: React.ComponentType<any>; text: string; tooltip: string; color: string; action?: () => void; }> = {
      reservar: { icon: CalendarOutlined, text: 'Reservas', tooltip: 'Exibe as Reservas', color: 'blue' },
      provar: { icon: SkinOutlined, text: 'Provas', tooltip: 'Exibe as Provas', color: 'green' },
      retirar: { icon: UploadOutlined, text: 'Retiradas', tooltip: 'Exibe as Retiradas', color: 'orange' },
      devolver: { icon: RollbackOutlined, text: 'Devoluções', tooltip: 'Exibe as Devoluções', color: 'red' },
      levar: {
        icon: ExportOutlined,
        text: 'Levar',
        tooltip: 'Levar no Cliente',
        color: 'purple',
        action: () => openGoogleMaps() // Abre o Google Maps ao clicar
      },
      buscar: {
        icon: ImportOutlined,
        text: 'Buscar',
        tooltip: 'Buscar no Cliente',
        color: 'blue',
        action: () => openGoogleMaps() // Abre o Google Maps ao clicar
      },
      orcar: { icon: CalculatorOutlined, text: 'Orçamento', tooltip: 'Orçamento realizado', color: 'blue' },
      executar: { icon: FileDoneOutlined, text: 'Serviço', tooltip: 'Execução do Serviço', color: 'green' },
      checkin: {
        icon: LoginOutlined,
        text: 'Check-in',
        tooltip: 'Verificação de Entrada',
        color: 'blue',
        action: () => openModal('in'),
      },
      checkout: {
        icon: LogoutOutlined,
        text: 'Check-out',
        tooltip: 'Verificação de Saída',
        color: 'green',
        action: () => openModal('out'),
      },
      diagnostico: { icon: SearchOutlined, text: 'Diagnóstico', tooltip: 'Análise e avaliação', color: 'green' },
    };

    const openGoogleMaps = () => {
      // Defina as coordenadas de latitude e longitude ou o endereço
      const latitude = -23.1794; // Exemplo de latitude
      const longitude = -45.8869; // Exemplo de longitude
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

      // Abre o Google Maps
      window.open(url, '_blank');
    };

    const systemOverrides: Record<string, Partial<typeof defaultActionMap>> = {
      sysOficinaCarro: {
        executar: { icon: CarOutlined, text: 'Serviços', tooltip: 'Execução de Serviços Automotivos', color: 'green' },
      },
      sysLocacaoRoupa: {
        checkin: {
          icon: LoginOutlined,
          text: 'Check-in',
          tooltip: 'Verificação de Retorno do Cliente',
          color: 'blue',
          action: () => openModal('in'),
        },
        checkout: {
          icon: LogoutOutlined,
          text: 'Check-out',
          tooltip: 'Verificação de Entrega para o Cliente',
          color: 'purple',
          action: () => openModal('out'),
        },
      },
    };

    const actionMap = { ...defaultActionMap, ...systemOverrides[system] };

    return (
      <>
        {actions.map((action, index) => {
          const details = actionMap[action];
          return details ? (
            <IconText
              key={index}
              icon={details.icon}
              text={details.text}
              tooltip={details.tooltip}
              color={details.color}
              onClick={details.action} // Ação específica para cada item
            />
          ) : null;
        })}
      </>
    );
  };

export default ActionDetails;
