import { CalendarOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Popover, Steps, Tag, Tooltip } from "antd";
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");
import React from "react";

function getColumnsForTab(getColorForTag: (tag: string) => string, getStepStatus: (date: string | undefined) => "finish" | "wait", getStepIconColor: (date: string | undefined, color: string) => string, getNextActionIcon: (actionId: string, executedAt: string | null, finishedAt: string | null, userActionId?: string) => React.JSX.Element) {
    return [
      {
        title: "Descrição",
        dataIndex: "description",
        key: "description",
        width: '100%',
        render: (text: string, record: any) => (
          <>
            <Tooltip title={record.notes}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
                <span style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{record.description}</span>
                <div>
                  {record.tags?.split('|').map((tag: string, index: number) => (
                    <Tag color={getColorForTag(tag)} key={index}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </Tooltip>
          </>
        )
      },
      {
        title: "Quando",
        dataIndex: "scheduledAt",
        key: "scheduledAt",
        width: 120,
        render: (text: string, record: any) => {
          const lastDateColor = record.finishedAt
            ? 'green'
            : record.executedAt
              ? 'red'
              : record.scheduledAt
                ? 'blue'
                : 'gray';

          return (
            <Popover
              content={<Steps direction="vertical" size="small">
                <Steps.Step
                  title="Agendamento"
                  description={`${moment(record.scheduledAt).format("DD/MM/YYYY HH:mm")} ${moment(record.scheduledAt).locale("pt-br").format("ddd")}`}
                  status={getStepStatus(record.scheduledAt)}
                  icon={<CalendarOutlined style={{ color: getStepIconColor(record.scheduledAt, 'blue') }} />} />
                {record.executedAt && (
                  <Steps.Step
                    title="Execução"
                    description={`${moment(record.executedAt).format("DD/MM/YYYY HH:mm")} ${moment(record.executedAt).locale("pt-br").format("ddd")}`}
                    status={getStepStatus(record.executedAt)}
                    icon={<CalendarOutlined style={{ color: getStepIconColor(record.executedAt, 'red') }} />} />
                )}
                {record.finishedAt && (
                  <Steps.Step
                    title="Finalização"
                    description={`${moment(record.finishedAt).format("DD/MM/YYYY HH:mm")} ${moment(record.finishedAt).locale("pt-br").format("ddd")}`}
                    status={getStepStatus(record.finishedAt)}
                    icon={<CalendarOutlined style={{ color: getStepIconColor(record.finishedAt, 'green') }} />} />
                )}
              </Steps>}
              title="Quando"
              trigger="click"
              placement="bottom"
            >
              <Tooltip title="Passos da Ação">
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', cursor: 'pointer' }}>
                  <CalendarOutlined style={{ color: lastDateColor }} />
                  <div style={{ color: lastDateColor }}>
                    {record.finishedAt 
                      ? moment(record.finishedAt).format("DD/MM/YYYY") 
                      : record.executedAt 
                        ? moment(record.executedAt).format("DD/MM/YYYY") 
                        : moment(record.scheduledAt).format("DD/MM/YYYY")
                    }
                  </div>
                </div>
              </Tooltip>
            </Popover>
          );
        }
      },
      {
        title: "Ações",
        dataIndex: "action",
        key: "action",
        width: 80,
        render: (text: string, record: any) => (
          <Popover
            content={getNextActionIcon(record.actionId, record.executedAt, record.finishedAt, record.id)}
            title="Ações"
            trigger="click"
            placement="bottomRight"
          >
            <Tooltip title="Ações Disponíveis">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                <UnorderedListOutlined style={{ color: 'blue' }} />
                <div style={{ color: 'blue' }}>Ações</div>
              </div>
            </Tooltip>
          </Popover>
        ),
      },
    ];
  }

  export default getColumnsForTab;