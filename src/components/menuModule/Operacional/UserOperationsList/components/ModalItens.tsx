import { Collapse, List, Modal, Table, Tag, Tooltip } from "antd";
import React from "react";
import { formatCurrency } from "../utils";
const { Panel } = Collapse;

function ModalItens(modalTitle: string, isModalOpen: boolean, closeModal: () => void, modalData: any[], getColorForTag: (tag: string) => string, columns) {
    return <Modal
      title={modalTitle}
      visible={isModalOpen}
      onCancel={closeModal}
      footer={null}
      style={{ top: 100 }}
      bodyStyle={{
        maxHeight: '50vh',
        overflowY: 'auto',
      }}
    >
      {modalTitle === "Itens" ? (
        <Collapse accordion>
          {modalData
            .sort((a, b) => (a.productTypeId === 'service' ? -1 : 1)) // Sort to ensure 'service' comes first
            .map((group: any) => (
              <Panel header={group.productTypeId === 'service' ? 'Serviços' : 'Produtos'} key={group.key}>
                <List
                  itemLayout="horizontal"
                  dataSource={group.products}
                  renderItem={(product: any) => (
                    <List.Item style={{ width: '100%', padding: '2px 0' }}>
                      <List.Item.Meta
                        title={<>
                          <Tooltip title={product.description}>
                            <span>
                              {product.name}{" "}
                              {product.tags.split('|').map((tag: string, index: number) => (
                                <Tag color={getColorForTag(tag)} key={index}>{tag}</Tag>
                              ))}
                            </span>
                          </Tooltip>
                        </>}
                        description={<>
                          <p style={{ margin: '0px 0' }}>{product.quantity} x {formatCurrency(product.price)} = <strong>{formatCurrency(product.quantity * product.price)}</strong></p>
                        </>} />
                    </List.Item>
                  )} />
              </Panel>
            ))}
        </Collapse>
      ) : (
        <Table dataSource={modalData} columns={columns} pagination={false} />
      )}
    </Modal>;
  }

  export default ModalItens;