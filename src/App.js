import React, { Component } from 'react';
import { Switch, NavLink, Route } from 'react-router-dom';

import './global.css';

import UserPage from './pages/User/index';
import ExamPage from './pages/Exam/index';
import SchedulePage from './pages/Schedule/index';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 'user',
      routes: [
        {
          title: 'Usuarios',
          key: 'user',
          link: '/user',
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
        <NavLink to={route.link} activeStyle={activeStyle} key={route.key}>
          <div className="menu-item">{route.title}</div>
        </NavLink>
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
          <img style={imgStyle} src={'/src/assets/logo.jpg'}/>
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

const activeStyle = {
  background: '#426928',
};

const imgStyle = {
  height: '25px',
  paddingRight: '25px',
};
