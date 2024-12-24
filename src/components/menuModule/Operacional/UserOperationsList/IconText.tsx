import { Tooltip } from "antd";
import React from "react";

const IconText: React.FC<{ icon: React.ComponentType<any>; text: string; tooltip: string; color?: string; onClick?: () => void }> = ({ icon, text, tooltip, color, onClick }) => (
    <Tooltip title={tooltip}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={onClick}>
            {React.createElement(icon, { style: { color: color || 'black', fontSize: '20px' } })}
            <span style={{ color: color || 'black', fontSize: '12px' }}>{text}</span>
        </div>
    </Tooltip>
);

export default IconText;