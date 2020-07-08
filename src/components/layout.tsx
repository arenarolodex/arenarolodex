import React from 'react';

import { Helmet } from 'react-helmet';

import Header from './header';
import Footer from './footer';

import './layout.css';

const Layout: React.FunctionComponent = ({ children }) => (
  <div style={{minHeight:'100vh', position:'relative'}}>
    <Helmet
      title="arenarolodex"
      meta={[{
        name: 'description',
        content: `Lowell arena helper. A tool to generate schedules for Lowell High School students.`
      }]}
    />
    <Header siteTitle="arenarolodex" />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 8rem',
        paddingTop: 0,
      }}
    >
      {children}
    </div>
    <Footer />
  </div>
);

export default Layout;
