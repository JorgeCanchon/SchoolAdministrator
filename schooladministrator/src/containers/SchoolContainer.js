import React from 'react';
import { Layout, Menu } from 'antd';
import '../index.css';

const { Header, Content, Footer } = Layout;
const styleLogo = {
  width: '120px',
  height: '31px',
  background: 'rgba(255, 255, 255, 0.2)',
  margin: '16px 24px 16px 0',
  float: 'left',
}
const menu = [{
  key: 1,
  url: '#/teacher',
  name: 'Profesor'
},
{
  key: 2,
  url: '#/student',
  name: 'Alumno'
},
{
  key: 3,
  url: '#/subject',
  name: 'Asignatura'
},
{
  key: 4,
  url: '#/gradebook',
  name: 'Calificaciones'
},
{
  key: 5,
  url: '#/studentsubject',
  name: 'Asignar asignaturas'
}];

export const SchoolContainer = ({ children }) => {
  return (
    <Layout className="layout">
      <Header>
        <div style={styleLogo} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
          {menu.map(x => (
            <Menu.Item key={x.key}>
             <a href={x.url}>
              {x.name}
             </a>
           </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ margin: '15px' }}>
        {children}
      </Content>
      <Footer>Copyright&copy; 2020 - Página creada por Jorge Canchón - Todos los derechos reservados </Footer>
    </Layout>
  );
}

export default SchoolContainer;