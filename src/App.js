import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';

import './global.css';

import UserPage from './pages/User/index';
import ExamPage from './pages/Exam/index';
import SchedulePage from './pages/Schedule/index';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [
        {
          title: 'Usuarios',
          key: 'user',
          link: '/',
          component: UserPage
        },
        {
          title: 'Exames/Cursos',
          key: 'exams',
          link: '/exams',
          component: ExamPage
        },
        {
          title: 'Agenda',
          key: 'schedule',
          link: '/schedule',
          component: SchedulePage
        }
      ]
    };
  }

  renderMenuItems() {
    const state = this.state;
    const { routes } = state;

    return routes.map(route => {
      return (
        <Link to={route.link} key={route.key}>
          <div className="menu-item">{route.title}</div>
        </Link>
      );
    });
  }

  renderRoutes() {
    const state = this.state;
    const { routes } = state;

    return routes.map(route => {
      const routeKey = `${route.key} ${route.title}`;
      return <Route exact key={routeKey} path={route.link} component={route.component}/>;
    });
  }

  render() {
    return (
      <div className="layout">
        <div className="nav-menu">
          {this.renderMenuItems()}
        </div>
        <div className="page-container">
          <Switch>
            {this.renderRoutes()}
          </Switch>
        </div>
      </div>
    );
  }
};
