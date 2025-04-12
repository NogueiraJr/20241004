import React, { useState } from 'react';
import { AppstoreOutlined, ToolOutlined, QuestionCircleOutlined, UserOutlined, DatabaseOutlined, FileOutlined, SettingOutlined, HomeOutlined, LogoutOutlined, HistoryOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import VersionHistoryModal from './components/VersionHistoryModal';  // Importe o modal
import Inicial from './components/menu/inicial/Inicial';
import Administrador from './components/menu/Administrador';
import Suporte from './components/menu/Suporte';
import Proprietario from './components/menu/Proprietario';
import Operacional from './components/menu/Operacional';
import Dados from './components/menu/Dados';
import Relatorios from './components/menu/Relatorios';
import Utilidades from './components/menu/Utilidades';
import Ajuda from './components/menu/Ajuda';
import Sair from './components/menu/Sair';
import Login from './components/Login';
import Cliente from './components/menuModule/Dados/Cliente';
import Item from './components/menuModule/Dados/Item';
import Servico from './components/menuModule/Dados/Servico';
import Actions from './components/menuModule/Operacional/UserOperationsList';
import Fornecedor from './components/menuModule/Dados/Fornecedor';
import Parceiro from './components/menuModule/Dados/Parceiro';
import { ParameterProvider, useParameter } from './context/ParameterContext';

type MenuItem = Required<MenuProps>['items'][number];

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Obtém a rota atual
  const { setParameter } = useParameter(); // Obtém o método para definir o 'system'
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

  const handleMenuClick = (key: string) => {
    if (key === '/out') {
      setParameter(null, null);
      navigate('/'); // Redireciona para a página de login
    } else {
      navigate(key);
    }
  };

  const showVersionHistoryModal = () => {
    setIsModalVisible(true);
  };

  const closeVersionHistoryModal = () => {
    setIsModalVisible(false);
  };

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/ini':
        return 'Inicial';
      case '/opr':
        return 'Operacional';
      case '/dds':
        return 'Dados';
      case '/rlt':
        return 'Relatórios';
      case '/utl':
        return 'Utilidades';
      case '/ajd':
        return 'Ajuda';
      case '/out':
        return 'Sair';

      case '/cliente':
        return 'Clientes';
      case '/item':
        return 'Produtos';
      case '/servico':
        return 'Serviços';
      case '/fornecedor':
        return 'Fornecedores';
      case '/parceiro':
        return 'Parceiros';

      case '/reserva':
        return 'Reservas';
      case '/reserva-novo':
        return 'Nova Reserva';
      case '/prova':
        return 'Prova';
      case '/retirada':
        return 'Retirada';
      case '/devolucao':
        return 'Devolução';

      case '/diagnostico':
        return 'Diagnósticos';
      case '/orcamento':
        return 'Orçamentos';
      case '/execucao':
        return 'Atendimentos';
      case '/conveniencia':
        return 'Conveniência';
  
      default:
        return '';
    }
  };

  const pageTitle = getPageTitle(location.pathname);

  const items: MenuItem[] = [
    {
      key: '/ini',
      label: (
        <span>
          OCST App {pageTitle && <span style={{ marginLeft: '2px' }}> - {pageTitle}</span>}
        </span>
      ),
      icon: <AppstoreOutlined />,
      children: [
        { key: '/ini', label: 'Inicial', icon: <HomeOutlined /> },
        { key: '/opr', label: 'Operacional', icon: <AppstoreOutlined /> },
        { key: '/dds', label: 'Dados', icon: <DatabaseOutlined /> },
        { key: '/rlt', label: 'Relatórios', icon: <FileOutlined /> },
        { key: '/utl', label: 'Utilidades', icon: <ToolOutlined /> },
        { key: '/ajd', label: 'Ajuda', icon: <QuestionCircleOutlined /> },
        { key: '/out', label: 'Sair', icon: <LogoutOutlined /> },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Exibe o menu somente se não estiver na página de login */}
      {location.pathname !== '/' && (
        <>
          <Menu
            mode="horizontal"
            theme="dark"
            items={items}
            onClick={({ key }) => handleMenuClick(key)}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}
          />
          <div
            style={{
              position: 'fixed',
              right: '20px',
              top: '10px',
              display: 'flex',
              gap: '10px',
              zIndex: 1000,
            }}
          >
            <HistoryOutlined title="Histórico de Versões" style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }} onClick={showVersionHistoryModal} />
            <ToolOutlined title="Utilidades" style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }} />
            <QuestionCircleOutlined title="Ajuda" style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }} />
            <UserOutlined title="Usuário" style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }} />
          </div>
        </>
      )}
      {/* Espaçamento dinâmico para o conteúdo renderizado */}
      <div style={{ marginTop: location.pathname !== '/' ? '30px' : '0', marginRight: '-25px', marginLeft: '-25px', flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ini" element={<Inicial />} />
          <Route path="/adm" element={<Administrador />} />
          <Route path="/spt" element={<Suporte />} />
          <Route path="/own" element={<Proprietario />} />
          <Route path="/opr" element={<Operacional />} />
          <Route path="/dds" element={<Dados />} />
          <Route path="/rlt" element={<Relatorios />} />
          <Route path="/utl" element={<Utilidades />} />
          <Route path="/ajd" element={<Ajuda />} />
          <Route path="/out" element={<Sair />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/item" element={<Item />} />
          <Route path="/servico" element={<Servico />} />
          <Route path="/fornecedor" element={<Fornecedor />} />
          <Route path="/parceiro" element={<Parceiro />} />

          <Route path="/reserva" element={<Actions userActionsMain="editar|apagar|ativo|reservar" userActionsAux="" />} />
          <Route path="/prova" element={<Actions userActionsMain="editar|apagar|ativo|reservar|provar" userActionsAux="" />} />
          <Route path="/retirada" element={<Actions userActionsMain="editar|apagar|ativo|retirar" userActionsAux="checkout|levar" />} />
          <Route path="/devolucao" element={<Actions userActionsMain="editar|apagar|ativo|devolver" userActionsAux="buscar|checkin" />} />

          <Route path="/diagnostico" element={<Actions userActionsMain="editar|apagar|ativo|diagnostico" userActionsAux="" />} />
          <Route path="/orcamento" element={<Actions userActionsMain="editar|apagar|ativo|diagnostico|orcar" userActionsAux="" />} />
          <Route path="/execucao" element={<Actions userActionsMain="editar|apagar|ativo|executar|conveniencia" userActionsAux="buscar|checkin|checkout|levar" />} />
        </Routes>
      </div>
      {/* Modal de Histórico de Versões */}
      <VersionHistoryModal visible={isModalVisible} onClose={closeVersionHistoryModal} />
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <ParameterProvider>
      <App />
    </ParameterProvider>
  </Router>
);

export default WrappedApp;
