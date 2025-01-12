import React from "react";

function getActionMenuExecute(actions: { icon: React.ComponentType<any>; color: string; text: string; action: () => void; disabled?: boolean; }[]) {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        {actions.map((action, index) => (
          <React.Fragment key={index}>
            {action.text === 'Itens' && <div style={{ borderLeft: '1px solid #ccc', height: '24px', margin: '0 10px' }} />}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: action.disabled ? 'not-allowed' : 'pointer' }} onClick={!action.disabled ? action.action : undefined}>
              {React.createElement(action.icon, { style: { color: action.disabled ? 'gray' : action.color } })}
              <div style={{ color: action.disabled ? 'gray' : action.color }}>{action.text}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }

  export default getActionMenuExecute;