import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Loadable from 'react-loadable';
import Loader from './components/Loader';
import SchoolContainer from './containers/SchoolContainer';
import NotFoundPage from './pages/404';

const loadable = loader =>
    Loadable({
        loader,
        delay: false,
        loading: () => <Loader />
    });

const routes = [
    {
      path: '/404',
      component: loadable(() => import('./pages/404.js'))
    },
    {
      path: '/teacher',
      component: loadable(() => import('./pages/teacher'))
    },
    {
      path: '/student',
      component: loadable(() => import('./pages/student'))
    },
    {
      path: '/gradebook',
      component: loadable(() => import('./pages/gradebook'))
    },
    {
      path: '/home',
      component: loadable(() => import('./pages/home'))
    },
    {
      path: '/subject',
      component: loadable(() => import('./pages/subject'))
    },
    {
      path: '/studentsubject',
      component: loadable(() => import('./pages/studentsubject'))
    },
];

class Router extends React.Component {
    render() {
      const { history } = this.props;
      return (
        <ConnectedRouter history={history}>
          <SchoolContainer> 
            <Switch>
              <Route exact path='/' render={() => <Redirect to='/home' />} />
              {routes.map(route => (
                <Route
                  path={route.path}
                  component={route.component}
                  key={route.path}
                  exact={route.exact}
                />
              ))}
              <Route component={NotFoundPage} />
            </Switch>
          </SchoolContainer> 
        </ConnectedRouter>
      );
    }
  }
  
  export default Router;