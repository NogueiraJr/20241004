import React, { useState } from 'react';
import {
  EllipsisOutlined,
  PlusSquareOutlined,
  UnorderedListOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  CalendarOutlined,
  RollbackOutlined,
  UploadOutlined,
  SkinOutlined,
  CarOutlined,
  CalculatorOutlined,
  ToolOutlined,
  SettingOutlined,
  FileDoneOutlined, // Novo ícone para Manutenção de Oficina
} from '@ant-design/icons';
import { Avatar, Card, Dropdown, Menu, Tooltip, Typography, Drawer, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useParameter } from '../../context/ParameterContext';
import Operation from '../menuModule/Operacional/UserOperations';

const { Text } = Typography;
const { Link } = Typography;

const IconText = ({ icon, text, tooltip, color, onClick }: { icon: React.ComponentType<any>; text: string; tooltip: string, color?: string, onClick?: () => void }) => (
  <Tooltip title={tooltip}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={onClick}>
      {React.createElement(icon, { style: { color: color || 'black', fontSize: '20px' } })}
      <span style={{ color: color || 'black', fontSize: '12px' }}>{text}</span>
    </div>
  </Tooltip>
);

const Operacional: React.FC = () => {
  const { system } = useParameter();
  console.log('system: ' + system);

  const navigate = useNavigate();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleListaTodasReservas = () => {
    navigate('/reserva');
  };

  const handleListaTodasProvas = () => {
    navigate('/prova');
  };

  const handleReservaNovo = () => {
    showDrawer(); 
  };

  const handleOrcamentoNovo = () => {
    showDrawer(); 
  };

  const handleListaTodasRetiradas = () => {
    navigate('/retirada');
  };

  const handleListaTodasDevolucoes = () => {
    navigate('/devolucao');
  };

  const handleListaTodosOrcamentos = () => {
    navigate('/orcamento');
  };

  const handleListaTodosServicos = () => {
    navigate('/execucao');
  };

  const actions = [
    <IconText icon={PlusSquareOutlined} text="NOVO" tooltip="Adicionar Novo" key="icon-new" color="#FF4C00" />,
    <IconText icon={UnorderedListOutlined} text="0" tooltip="Lista com Todos" key="icon-all-itens" color="blue" />,
    <IconText icon={CheckCircleOutlined} text="0" tooltip="Apenas os Ativos" key="icon-actived-itens" color="green" />,
    <IconText icon={CloseCircleOutlined} text="0" tooltip="Apenas os Inativos" key="icon-desatived-itens" color="gray" />,
    <IconText icon={DeleteOutlined} text="0" tooltip="Apenas os Apagados" key="icon-deleted-itens" color="red" />,
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="1">casamento</Menu.Item>
          <Menu.Item key="2">batizado</Menu.Item>
          <Menu.Item key="3">festa</Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Tooltip title="Etiquetas">
        <EllipsisOutlined key="ellipsis" style={{ color: 'black' }} />
      </Tooltip>
    </Dropdown>,
  ];

  //Locação de Roupas
  const actionsReserva = [
    <IconText icon={PlusSquareOutlined} text="NOVO" tooltip="Nova Reserva" key="icon-new" color="black" onClick={handleReservaNovo} />,
    <IconText icon={UnorderedListOutlined} text="0" tooltip="Todas as Reservas" key="icon-all-itens" color="blue" onClick={handleListaTodasReservas} />,
    <IconText icon={CheckCircleOutlined} text="0" tooltip="Apenas Reservas Ativas" key="icon-actived-itens" color="green" />,
    <IconText icon={CloseCircleOutlined} text="0" tooltip="Apenas Reservas Inativas" key="icon-desatived-itens" color="gray" />,
    <IconText icon={DeleteOutlined} text="0" tooltip="Apenas Reservas Apagadas" key="icon-deleted-itens" color="red" />,
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="1">casamento</Menu.Item>
          <Menu.Item key="2">batizado</Menu.Item>
          <Menu.Item key="3">festa</Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Tooltip title="Etiquetas">
        <EllipsisOutlined key="ellipsis" style={{ color: 'black' }} />
      </Tooltip>
    </Dropdown>,
  ];

  const actionsProva = [
    <IconText icon={PlusSquareOutlined} text="NOVO" tooltip="Nova Prova" key="icon-new" color="black" />,
    <IconText icon={UnorderedListOutlined} text="0" tooltip="Todas as Provas" key="icon-all-itens" color="blue" onClick={handleListaTodasProvas}/>,
    <IconText icon={CheckCircleOutlined} text="0" tooltip="Apenas Provas Ativas" key="icon-actived-itens" color="green" />,
    <IconText icon={CloseCircleOutlined} text="0" tooltip="Apenas Provas Inativas" key="icon-desatived-itens" color="gray" />,
    <IconText icon={DeleteOutlined} text="0" tooltip="Apenas Provas Apagadas" key="icon-deleted-itens" color="red" />,
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="1">casamento</Menu.Item>
          <Menu.Item key="2">batizado</Menu.Item>
          <Menu.Item key="3">festa</Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Tooltip title="Etiquetas">
        <EllipsisOutlined key="ellipsis" style={{ color: 'black' }} />
      </Tooltip>
    </Dropdown>,
  ];

  const actionsRetirada = [
    <IconText icon={PlusSquareOutlined} text="NOVO" tooltip="Nova Retirada" key="icon-new" color="black" />,
    <IconText icon={UnorderedListOutlined} text="0" tooltip="Todas as Retiradas" key="icon-all-itens" color="blue" onClick={handleListaTodasRetiradas}/>,
    <IconText icon={CheckCircleOutlined} text="0" tooltip="Apenas Retiradas Ativas" key="icon-actived-itens" color="green" />,
    <IconText icon={CloseCircleOutlined} text="0" tooltip="Apenas Retiradas Inativas" key="icon-desatived-itens" color="gray" />,
    <IconText icon={DeleteOutlined} text="0" tooltip="Apenas Retiradas Apagadas" key="icon-deleted-itens" color="red" />,
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="1">casamento</Menu.Item>
          <Menu.Item key="2">batizado</Menu.Item>
          <Menu.Item key="3">festa</Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Tooltip title="Etiquetas">
        <EllipsisOutlined key="ellipsis" style={{ color: 'black' }} />
      </Tooltip>
    </Dropdown>,
  ];

  const actionsDevolucao = [
    <IconText icon={PlusSquareOutlined} text="NOVO" tooltip="Nova Devolução" key="icon-new" color="black" />,
    <IconText icon={UnorderedListOutlined} text="0" tooltip="Todas as Devoluções" key="icon-all-itens" color="blue" onClick={handleListaTodasDevolucoes}/>,
    <IconText icon={CheckCircleOutlined} text="0" tooltip="Apenas Devoluções Ativas" key="icon-actived-itens" color="green" />,
    <IconText icon={CloseCircleOutlined} text="0" tooltip="Apenas Devoluções Inativas" key="icon-desatived-itens" color="gray" />,
    <IconText icon={DeleteOutlined} text="0" tooltip="Apenas Devoluções Apagadas" key="icon-deleted-itens" color="red" />,
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="1">casamento</Menu.Item>
          <Menu.Item key="2">batizado</Menu.Item>
          <Menu.Item key="3">festa</Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Tooltip title="Etiquetas">
        <EllipsisOutlined key="ellipsis" style={{ color: 'black' }} />
      </Tooltip>
    </Dropdown>,
  ];

  //Oficina de Carros
  const actionsOrcamento = [
    <IconText icon={PlusSquareOutlined} text="NOVO" tooltip="Novo Orçamento" key="icon-new" color="black" onClick={handleOrcamentoNovo} />,
    <IconText icon={UnorderedListOutlined} text="0" tooltip="Todos os Orçamentos" key="icon-all-itens" color="blue" onClick={handleListaTodosOrcamentos}/>,
    <IconText icon={CheckCircleOutlined} text="0" tooltip="Apenas Orçamentos Ativos" key="icon-actived-itens" color="green" />,
    <IconText icon={CloseCircleOutlined} text="0" tooltip="Apenas Orçamentos Inativos" key="icon-desatived-itens" color="gray" />,
    <IconText icon={DeleteOutlined} text="0" tooltip="Apenas Orçamentos Apagados" key="icon-deleted-itens" color="red" />,
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="1">revisão</Menu.Item>
          <Menu.Item key="2">troca de óleo</Menu.Item>
          <Menu.Item key="3">alinhamento</Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Tooltip title="Etiquetas">
        <EllipsisOutlined key="ellipsis" style={{ color: 'black' }} />
      </Tooltip>
    </Dropdown>,
  ];

  const actionsServico = [
    <IconText icon={PlusSquareOutlined} text="NOVO" tooltip="Novo Serviço" key="icon-new" color="black" />,
    <IconText icon={UnorderedListOutlined} text="0" tooltip="Todos as Serviços" key="icon-all-itens" color="blue" onClick={handleListaTodosServicos}/>,
    <IconText icon={CheckCircleOutlined} text="0" tooltip="Apenas Serviços Ativos" key="icon-actived-itens" color="green" />,
    <IconText icon={CloseCircleOutlined} text="0" tooltip="Apenas Serviços Inativos" key="icon-desatived-itens" color="gray" />,
    <IconText icon={DeleteOutlined} text="0" tooltip="Apenas Serviços Apagados" key="icon-deleted-itens" color="red" />,
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="1">revisão</Menu.Item>
          <Menu.Item key="2">troca de óleo</Menu.Item>
          <Menu.Item key="3">alinhamento</Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Tooltip title="Etiquetas">
        <EllipsisOutlined key="ellipsis" style={{ color: 'black' }} />
      </Tooltip>
    </Dropdown>,
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {system === 'sysLocacaoRoupa' && (
        <>
          <Card
            actions={actionsReserva}
            style={{
              flex: '1 1 calc(33.333% - 5px)',
              minWidth: 350,
              borderColor: 'black',
              borderWidth: '2px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Card.Meta
              avatar={
                <Tooltip title="Reservas">
                  <Avatar icon={<CalendarOutlined style={{ color: 'black' }} />} />
                </Tooltip>
              }
              title="Reservas"
              description={
                <>
                  <Text strong style={{ fontSize: '15px' }}>As Reservas da sua Empresa</Text>
                  <Link onClick={() => { console.log('Texto clicado!'); }}>
                    <div>12 reservas feitas nesta semana</div>
                  </Link>
                  <Link onClick={() => { console.log('Texto clicado!'); }}>
                    <div>04 reservas feitas nos últimos 3 dias</div>
                  </Link>
                </>
              }
            />
          </Card>

          <Card
            actions={actionsProva}
            style={{
              flex: '1 1 calc(33.333% - 5px)',
              minWidth: 350,
              borderColor: 'black',
              borderWidth: '2px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Card.Meta
              avatar={
                <Tooltip title="Provas">
                  <Avatar icon={<SkinOutlined style={{ color: 'black' }} />} />
                </Tooltip>
              }
              title="Provas"
              description={
                <>
                  <Text strong style={{ fontSize: '15px' }}>As Provas da sua Empresa</Text>
                  <Link onClick={() => { console.log('Texto clicado!'); }}>
                    <div>02 provas feitas nesta semana</div>
                  </Link>
                  <Link onClick={() => { console.log('Texto clicado!'); }}>
                    <div>04 provas feitas nos últimos 3 dias</div>
                  </Link>
                </>
              }
            />
          </Card>

          <Card
            actions={actionsRetirada}
            style={{
              flex: '1 1 calc(33.333% - 5px)',
              minWidth: 350,
              borderColor: 'black',
              borderWidth: '2px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Card.Meta
              avatar={
                <Tooltip title="Retiradas">
                  <Avatar icon={<UploadOutlined style={{ color: 'black' }} />} />
                </Tooltip>
              }
              title="Retiradas"
              description={
                <>
                  <Text strong style={{ fontSize: '15px' }}>As Retiradas da sua Empresa</Text>
                  <Link onClick={() => { console.log('Texto clicado!'); }}>
                    <div>08 retiradas previstas para hoje</div>
                  </Link>
                  <Link onClick={() => { console.log('Texto clicado!'); }}>
                    <div>03 retiradas previstas para amanhã</div>
                  </Link>
                </>
              }
            />
          </Card>

          <Card
            actions={actionsDevolucao}
            style={{
              flex: '1 1 calc(33.333% - 5px)',
              minWidth: 350,
              borderColor: 'black',
              borderWidth: '2px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Card.Meta
              avatar={
                <Tooltip title="Devoluções">
                  <Avatar icon={<RollbackOutlined style={{ color: 'black' }} />} />
                </Tooltip>
              }
              title="Devoluções"
              description={
                <>
                  <Text strong style={{ fontSize: '15px' }}>As Devoluções da sua Empresa</Text>
                  <Link onClick={() => { console.log('Texto clicado!'); }}>
                    <div>08 devoluções previstas para hoje</div>
                  </Link>
                  <Link onClick={() => { console.log('Texto clicado!'); }}>
                    <div>03 devoluções previstas para amanhã</div>
                  </Link>
                </>
              }
            />
          </Card>

          <Drawer
            title="Nova Reserva"
            placement="right"
            onClose={closeDrawer}
            open={isDrawerVisible}
            width={500}
          >
            {/* <ReservaNovo /> */}
            <Operation />
          </Drawer>
        </>
      )}

      {system === 'sysOficinaCarro' && (
        <>
          <Card
            actions={actionsOrcamento}
            style={{
              flex: '1 1 calc(33.333% - 5px)',
              minWidth: 350,
              borderColor: 'black',
              borderWidth: '2px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Card.Meta
              avatar={
                <Tooltip title="Orçamentos">
                  <Avatar icon={<CalculatorOutlined style={{ color: 'black' }} />} />
                </Tooltip>
              }
              title="Orçamentos"
              description={
                <>
                  <Text strong style={{ fontSize: '15px' }}>Os Orçamentos da sua Oficina</Text>
                  <Link onClick={() => { console.log('Texto clicado!'); }}>
                    <div>12 orçamentos criados nesta semana</div>
                  </Link>
                  <Link onClick={() => { console.log('Texto clicado!'); }}>
                    <div>04 orçamentos criados nos últimos 3 dias</div>
                  </Link>
                </>
              }
            />
          </Card>

          <Card
            actions={actionsServico}
            style={{
              flex: '1 1 calc(33.333% - 5px)',
              minWidth: 350,
              borderColor: 'black',
              borderWidth: '2px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Card.Meta
              avatar={
                <Tooltip title="Manutenção">
                  <Avatar icon={<FileDoneOutlined style={{ color: 'black' }} />} />
                </Tooltip>
              }
              title="Manutenção"
              description={
                <>
                  <Text strong style={{ fontSize: '15px' }}>As Manutenções da sua Oficina</Text>
                  <Link onClick={() => { console.log('Texto clicado!'); }}>
                    <div>09 serviços realizados nesta semana</div>
                  </Link>
                  <Link onClick={() => { console.log('Texto clicado!'); }}>
                    <div>02 serviços realizados nos últimos 3 dias</div>
                  </Link>
                </>
              }
            />
          </Card>

          <Drawer
            title="Novo Orçamento"
            placement="right"
            onClose={closeDrawer}
            open={isDrawerVisible}
            width={500}
          >
            {/* <OrcamentoNovo /> */}
            <Operation />
          </Drawer>

        </>
      )}
    </div>
  );
};

export default Operacional;
