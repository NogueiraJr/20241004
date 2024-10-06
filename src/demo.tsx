import React, { useState } from 'react';
import { AppstoreOutlined, ToolOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Dados from './components/menu/Dados'; // Importando o componente Dados

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub2',
    label: 'OCST App',
    icon: <AppstoreOutlined />,
    children: [
      { key: '/ini', label: 'Inicial' },
      { type: 'divider' }, // Adiciona a linha separadora aqui
      { key: '/adm', label: 'Administrador' },
      { key: '/spt', label: 'Suporte' },
      { key: '/own', label: 'Proprietário' },
      { key: '/opr', label: 'Operacional' },
      { key: '/dds', label: 'Dados' },
      { key: '/rlt', label: 'Relatórios' },
      { key: '/utl', label: 'Utilidades' },
      { key: '/ajd', label: 'Ajuda' },
      { key: '/out', label: 'Sair' },
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
        {selectedKey === '/dds' && <Dados />} {/* Renderiza o componente Dados se 'Option 10' for selecionada */}
      </div>
    </div>
  );
};

export default App;
