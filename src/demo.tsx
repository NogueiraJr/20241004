import React, { useState } from 'react';
import { AppstoreOutlined, ToolOutlined, QuestionCircleOutlined, UserOutlined, DatabaseOutlined, FileOutlined, SettingOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
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

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '/ini',
    label: 'OCST App',
    icon: <AppstoreOutlined />,
    children: [
      { key: '/ini', label: 'Inicial', icon: <HomeOutlined /> },
      { key: '/adm', label: 'Administrador', icon: <SettingOutlined /> },
      { key: '/spt', label: 'Suporte', icon: <ToolOutlined /> },
      { key: '/own', label: 'Proprietário', icon: <UserOutlined /> },
      { key: '/opr', label: 'Operacional', icon: <AppstoreOutlined /> },
      { key: '/dds', label: 'Dados', icon: <DatabaseOutlined /> },
      { key: '/rlt', label: 'Relatórios', icon: <FileOutlined /> },
      { key: '/utl', label: 'Utilidades', icon: <ToolOutlined /> },
      { key: '/ajd', label: 'Ajuda', icon: <QuestionCircleOutlined /> },
      { key: '/out', label: 'Sair', icon: <LogoutOutlined /> },
    ],
  },
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true); // Começa colapsado
  const [selectedKey, setSelectedKey] = useState<string | null>(null); // Estado para gerenciar a opção selecionada

  const handleMenuClick = (key: string) => {
    setSelectedKey(key); // Atualiza a chave selecionada
    setCollapsed(true); // Colapsa o menu
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Menu fixo no topo */}
      <Menu
        defaultOpenKeys={collapsed ? [] : ['sub2']}
        mode="horizontal" // Alterado para modo horizontal
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={({ key }) => handleMenuClick(key)} // Chama handleMenuClick ao clicar em um item
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }} // Adiciona estilos para fixar o menu
      />
      {/* Container para os ícones à direita */}
      <div style={{ position: 'fixed', right: '20px', top: '10px', display: 'flex', gap: '10px', zIndex: 1000 }}>
        <ToolOutlined title="Utilidades" style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }} />
        <QuestionCircleOutlined title="Ajuda" style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }} />
        <UserOutlined title="Usuário" style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }} />
      </div>
      {/* Espaçamento para o conteúdo renderizado, para não ficar atrás do menu */}
      <div style={{ marginTop: '38px', flexGrow: 1 }}> {/* Ajuste a altura de acordo com a altura do menu */}
        {selectedKey === '/ini' && <Inicial />}
        {selectedKey === '/adm' && <Administrador />}
        {selectedKey === '/spt' && <Suporte />}
        {selectedKey === '/own' && <Proprietario />}
        {selectedKey === '/opr' && <Operacional />}
        {selectedKey === '/dds' && <Dados />}
        {selectedKey === '/rlt' && <Relatorios />}
        {selectedKey === '/utl' && <Utilidades />}
        {selectedKey === '/ajd' && <Ajuda />}
        {selectedKey === '/out' && <Sair />}
      </div>
    </div>
  );
};

export default App;
