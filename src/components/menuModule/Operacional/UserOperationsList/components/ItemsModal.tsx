import React from 'react';
import { Modal, Collapse, List, Tag, Tooltip } from 'antd';
import { getColorForTag, formatCurrency } from '../utils';

const { Panel } = Collapse;

interface ItemsModalProps {
  isVisible: boolean;
  onClose: () => void;
  modalData: any[];
  title: string;
}

const ItemsModal: React.FC<ItemsModalProps> = ({ isVisible, onClose, modalData, title }) => {
  return (
    <Modal
      title={title}
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      style={{ top: 100 }}
      bodyStyle={{
        maxHeight: '50vh',
        overflowY: 'auto',
      }}
    >
      <Collapse accordion>
        {modalData
          .sort((a, b) => (a.productTypeId === 'service' ? -1 : 1))
          .map((group: any) => (
            <Panel header={group.productTypeId === 'service' ? 'Serviços' : 'Produtos'} key={group.key}>
              <List
                itemLayout="horizontal"
                dataSource={group.products}
                renderItem={(product: any) => (
                  <List.Item style={{ width: '100%', padding: '2px 0' }}>
                    <List.Item.Meta
                      title={
                        <Tooltip title={product.description}>
                          <span>
                            {product.name}{" "}
                            {product.tags.split('|').map((tag: string, index: number) => (
                              <Tag color={getColorForTag(tag)} key={index}>{tag}</Tag>
                            ))}
                          </span>
                        </Tooltip>
                      }
                      description={
                        <p style={{ margin: '0px 0' }}>
                          {product.quantity} x {formatCurrency(product.price)} = 
                          <strong>{formatCurrency(product.quantity * product.price)}</strong>
                        </p>
                      }
                    />
                  </List.Item>
                )}
              />
            </Panel>
          ))}
      </Collapse>
    </Modal>
  );
};

export default ItemsModal;
