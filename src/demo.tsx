import React, { useState, lazy, Suspense } from 'react';
import { Button, Drawer } from 'antd';
import { MenuOutlined, LeftOutlined } from '@ant-design/icons';

// Lazy load components
const Administrador = lazy(() => import('./components/menu/Administrador'));
const Suporte = lazy(() => import('./components/menu/Suporte'));
const Proprietario = lazy(() => import('./components/menu/Proprietario'));
const Operacional = lazy(() => import('./components/menu/Operacional'));
const Dados = lazy(() => import('./components/menu/Dados'));
const Relatorios = lazy(() => import('./components/menu/Relatorios'));
const Utilidades = lazy(() => import('./components/menu/Utilidades'));
const Ajuda = lazy(() => import('./components/menu/Ajuda'));
const Sair = lazy(() => import('./components/menu/Sair'));

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode | null>(null);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleContentClick = (key) => {
    console.log(`Clicked content item ${key}`);
    onClose();
    switch (key) {
      case '/adm':
        setSelectedComponent(<Administrador />);
        break;
      case '/spt':
        setSelectedComponent(<Suporte />);
        break;
      case '/own':
        setSelectedComponent(<Proprietario />);
        break;
      case '/opr':
        setSelectedComponent(<Operacional />);
        break;
      case '/dds':
        setSelectedComponent(<Dados />);
        break;
      case '/rlt':
        setSelectedComponent(<Relatorios />);
        break;
      case '/utl':
        setSelectedComponent(<Utilidades />);
        break;
      case '/ajd':
        setSelectedComponent(<Ajuda />);
        break;
      case '/out':
        setSelectedComponent(<Sair />);
        break;
      default:
        setSelectedComponent(null);
        break;
    }
  };

  const menuGroups = [
    {
      title: 'Inicial',
      items: [{ key: '/ini', label: 'Inicial' }],
    },
    {
      title: 'Administração',
      items: [
        { key: '/adm', label: 'Administrador' },
        { key: '/spt', label: 'Suporte' },
        { key: '/own', label: 'Proprietário' },
      ],
    },
    {
      title: 'Operações',
      items: [
        { key: '/opr', label: 'Operacional' },
        { key: '/dds', label: 'Dados' },
        { key: '/rlt', label: 'Relatórios' },
      ],
    },
    {
      title: 'Utilidades',
      items: [
        { key: '/utl', label: 'Utilidades' },
        { key: '/ajd', label: 'Ajuda' },
        { key: '/out', label: 'Sair' },
      ],
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        icon={<MenuOutlined />}
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <span style={{ marginLeft: '8px' }}>Nome do App</span>
      </Button>

      <Drawer
        title={null}
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        bodyStyle={{ padding: 0 }}
      >
        <Button
          type="primary"
          icon={<LeftOutlined />}
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            zIndex: 1000,
          }}
        />
        <div style={{ padding: '16px', marginTop: '60px' }}>
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex} style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: 'bold', padding: '10px 16px', backgroundColor: '#f0f0f0' }}>
                {group.title}
              </div>
              {group.items.map((item) => (
                <div
                  key={item.key}
                  onClick={() => handleContentClick(item.key)}
                  style={{
                    padding: '10px 16px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f0f0f0',
                    backgroundColor: '#ffffff',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget).style.backgroundColor = '#f5f5f5';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget).style.backgroundColor = '#ffffff';
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Drawer>

      <div style={{ marginTop: '100px', padding: '20px' }}>
        <Suspense fallback={<div>Carregando...</div>}>
          {selectedComponent}
        </Suspense>
      </div>
    </>
  );
};

export default App;
