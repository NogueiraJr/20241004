import React from 'react';
import { Popover, Tooltip } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

interface ActionMenuProps {
  actions: {
    icon: React.ComponentType<any>;
    color: string;
    text: string;
    action: () => void;
    disabled?: boolean;
  }[];
}

const ActionMenu: React.FC<ActionMenuProps> = ({ actions }) => {
  const iconStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer'
  };

  return (
    <Popover
      content={
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          {actions.map((action, index) => (
            <React.Fragment key={index}>
              {action.text === 'Itens' && <div style={{ borderLeft: '1px solid #ccc', height: '24px', margin: '0 10px' }} />}
              <div 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: action.disabled ? 'not-allowed' : 'pointer' }} 
                onClick={!action.disabled ? action.action : undefined}
              >
                {React.createElement(action.icon, { style: { color: action.disabled ? 'gray' : action.color } })}
                <div style={{ color: action.disabled ? 'gray' : action.color }}>{action.text}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      }
      title="Ações"
      trigger="click"
      placement="bottomRight"
    >
      <Tooltip title="Ações Disponíveis">
        <div style={iconStyle}>
          <UnorderedListOutlined style={{ color: 'blue' }} />
          <div style={{ color: 'blue' }}>Ações</div>
        </div>
      </Tooltip>
    </Popover>
  );
};

export default ActionMenu;
