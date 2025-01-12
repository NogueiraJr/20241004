import { Table, Tabs } from "antd";
import React from "react";
import { OperationType } from "../../../../../interfaces/UserOperationsType";

function tableOperations(columns, filteredData: OperationType[], renderTabs: (actions: string[], record: OperationType) => React.JSX.Element[], action: string, expandedRowKeys: string[], handleExpand: (expanded: boolean, record: OperationType) => void) {
    return <Table<OperationType>
      columns={columns}
      dataSource={filteredData}
      pagination={{ position: ['topLeft'] }}
      expandedRowRender={(record) => (
        <div className="expanded-row-content">
          <div className="cost-charged">
            <span>
              <strong>Custo:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(record.priceActions))}
              {' | '}
              <strong>Cobrado:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(record.priceCharged))}
            </span>
          </div>
  
          <Tabs defaultActiveKey="1">
            {renderTabs(action ? action.split('|') : [], record)}
          </Tabs>
        </div>
      )}
      expandedRowKeys={expandedRowKeys}
      onExpand={handleExpand}
      rowKey="id"
      locale={{
        triggerDesc: 'Clique para ordenar decrescente',
        triggerAsc: 'Clique para ordenar crescente',
        cancelSort: 'Clique para cancelar a ordenação',
      }} />;
  }

  export default tableOperations;