import React from 'react';
import IconText from './IconText';

interface ActionIconsProps {
  actions: string[];
  actionMap: Record<string, any>;
}

const ActionIcons: React.FC<ActionIconsProps> = ({ actions, actionMap }) => {
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
            onClick={details.action}
            style={{ cursor: 'pointer', width: '55px' }}
          />
        ) : null;
      })}
    </>
  );
};

export default ActionIcons;
