import React from 'react';
import { AppstoreOutlined, ToolOutlined, QuestionCircleOutlined, UserOutlined, DatabaseOutlined, FileOutlined, SettingOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'; // Importa useLocation
import Inicial from './components/menu/Inicial';
import Administrador from './components/menu/Administrador';
import Suporte from './components/menu/Suporte';
import Proprietario from './components/menu/Proprietario';
import Operacional from './components/menu/Operacional';
import Dados from './components/menu/Dados';
import Relatorios from './components/menu/Relatorios';
import Utilidades from './components/menu/Utilidades';
import Ajuda from './components/menu/Ajuda';
import Sair from './components/menu/Sair';
import Cliente from './components/menuModule/Dados/Cliente';
import Produto from './components/menuModule/Dados/Produto';
import Reserva from './components/menuModule/Operacional/Reserva';
import Retirada from './components/menuModule/Operacional/Retirada';
import Devolucao from './components/menuModule/Operacional/Devolucao';
import Fornecedor from './components/menuModule/Dados/Fornecedor';
import Parceiro from './components/menuModule/Dados/Parceiro';
import ReservaNovo from './components/menuModule/Operacional/ReservaNovo';

type MenuItem = Required<MenuProps>['items'][number];

const App: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegação programática
  const location = useLocation(); // Hook para obter a localização atual

  const handleMenuClick = (key: string) => {
    navigate(key); // Usa o navigate para alterar a rota
  };

  // Mapeia o caminho atual para o nome da tela
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/ini':
        return 'Inicial';
      case '/adm':
        return 'Administrador';
      case '/spt':
        return 'Suporte';
      case '/own':
        return 'Proprietário';
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
      case '/produto':
        return 'Produtos';
      case '/fornecedor':
        return 'Fornecedores';
      case '/parceiro':
        return 'Parceiros';
  
      case '/reserva':
        return 'Reserva';
      case '/reserva-novo':
        return 'Nova Reserva';
      case '/retirada':
      return 'Retirada';
      case '/devolucao':
        return 'Devolução';
        
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
        // { key: '/adm', label: 'Administrador', icon: <SettingOutlined /> },
        // { key: '/spt', label: 'Suporte', icon: <ToolOutlined /> },
        // { key: '/own', label: 'Proprietário', icon: <UserOutlined /> },
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
      {/* Menu fixo no topo */}
      <Menu
        mode="horizontal"
        theme="dark"
        items={items}
        onClick={({ key }) => handleMenuClick(key)}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}
      />
      {/* Container para os ícones à direita */}
      <div style={{ position: 'fixed', right: '20px', top: '10px', display: 'flex', gap: '10px', zIndex: 1000 }}>
        <ToolOutlined title="Utilidades" style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }} />
        <QuestionCircleOutlined title="Ajuda" style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }} />
        <UserOutlined title="Usuário" style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }} />
      </div>
      {/* Espaçamento para o conteúdo renderizado */}
      <div style={{ marginTop: '38px', flexGrow: 1 }}>
        <Routes>
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
          <Route path="/produto" element={<Produto />} />
          <Route path="/fornecedor" element={<Fornecedor />} />
          <Route path="/parceiro" element={<Parceiro />} />
          
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/reserva-novo" element={<ReservaNovo />} />
          <Route path="/retirada" element={<Retirada />} />
          <Route path="/devolucao" element={<Devolucao />} />
        </Routes>
      </div>
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
