import { CalendarOutlined } from "@ant-design/icons";
import { Popover, Steps, Tooltip } from "antd";
import moment from "moment";
import React from "react";

function getWhenOperation(userAction: { id: string; userOperationId: string; userClientId: string; actionId: string; userActionId: any; description: string; notes: string; scheduledAt: string; executedAt: string; finishedAt: string; priceItems: string; tags: string; active: boolean; createAt: string; updatedAt: string; deletedAt: any; }, getStepStatus: (date: string | undefined) => "finish" | "wait", getStepIconColor: (date: string | undefined, color: string) => string): React.JSX.Element {
    const lastDateColor = userAction.finishedAt
        ? 'green'
        : userAction.executedAt
            ? 'red'
            : userAction.scheduledAt
                ? 'blue'
                : 'gray';
    return <Popover
        content={<Steps direction="vertical" size="small">
            <Steps.Step
                title="Agendamento"
                description={moment(userAction.scheduledAt).format("DD/MM/YYYY HH:mm")}
                status={getStepStatus(userAction.scheduledAt)}
                icon={<CalendarOutlined style={{ color: getStepIconColor(userAction.scheduledAt, 'blue') }} />} />
            {userAction.executedAt && (
                <Steps.Step
                    title="Execução"
                    description={moment(userAction.executedAt).format("DD/MM/YYYY HH:mm")}
                    status={getStepStatus(userAction.executedAt)}
                    icon={<CalendarOutlined style={{ color: getStepIconColor(userAction.executedAt, 'red') }} />} />
            )}
            {userAction.finishedAt && (
                <Steps.Step
                    title="Finalização"
                    description={moment(userAction.finishedAt).format("DD/MM/YYYY HH:mm")}
                    status={getStepStatus(userAction.finishedAt)}
                    icon={<CalendarOutlined style={{ color: getStepIconColor(userAction.finishedAt, 'green') }} />} />
            )}
        </Steps>}
        title="Quando"
        trigger="click"
        placement="bottom"
    >
        <Tooltip title="Passos da Ação">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                <CalendarOutlined style={{ color: lastDateColor }} />
                <div style={{ color: lastDateColor }}>Quando</div>
            </div>
        </Tooltip>
    </Popover>;
}

export default getWhenOperation;