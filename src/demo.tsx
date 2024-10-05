import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './components/Inicio';
import Operacional from './components/Operacional';
import Dados from './components/Dados';
import ReservaRoupa from './components/ReservaRoupa';

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

interface MenuItem {
  key: string;
  label: string;
  component?: JSX.Element;
  subItems?: MenuItem[];
}

const pathMap: { [key: string]: string[] } = {
  '/1': ['Início'],
  '/2': ['Operacional'],
  '/2.1': ['Operacional', 'Reserva de Roupa'],
  '/3': ['Dados'],
  '/4': ['Relatórios'],
  '/5': ['Utilidades'],
};

const items: MenuItem[] = [
  { key: '1', label: 'Início', component: <Home /> },
  {
    key: '2',
    label: 'Operacional',
    subItems: [{ key: '2.1', label: 'Reserva de Roupa', component: <ReservaRoupa /> }],
    component: <Operacional />,
  },
  { key: '3', label: 'Dados', component: <Dados /> },
  { key: '4', label: 'Relatórios', component: <div>Relatórios Component</div> },
  { key: '5', label: 'Utilidades', component: <div>Utilidades Component</div> },
];

const generateMenuItems = (menuItems: MenuItem[]) => {
  return menuItems.map(item => {
    if (item.subItems) {
      return (
        <SubMenu key={item.key} title={item.label}>
          {item.subItems.map(subItem => (
            <Menu.Item key={subItem.key}>
              <Link to={`/${subItem.key}`}>{subItem.label}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.key}>
          <Link to={`/${item.key}`}>{item.label}</Link>
        </Menu.Item>
      );
    }
  });
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const paths = pathMap[location.pathname] || [];

  return (
    <Breadcrumb style={{ margin: '8px 0' }}>
      {paths.map((path, index) => (
        <Breadcrumb.Item key={index}>{path}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center', padding: '0 8px' }}>
          <div style={{ color: '#fff', marginRight: '20px' }}>OCST App Web 1.0</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ flex: 1, minWidth: 0 }}
          >
            {generateMenuItems(items)}
          </Menu>
        </Header>
        <Content style={{ padding: '0px', margin: '0px', flex: 1 }}>
          <Breadcrumbs />
          <div
            style={{
              background: colorBgContainer,
              minHeight: 'calc(100vh - 64px - 64px)', // Removei padding extra
              padding: 2, // Reduzi para 12 para mais espaço
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/1" element={<Home />} />
              <Route path="/2" element={<Operacional />} />
              <Route path="/2.1" element={<ReservaRoupa />} />
              <Route path="/3" element={<Dados />} />
              <Route path="/4" element={<div>Relatórios Component</div>} />
              <Route path="/5" element={<div>Utilidades Component</div>} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', padding: '8px 0' }}> {/* Menor padding no footer */}
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
