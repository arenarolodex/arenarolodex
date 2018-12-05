import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './footer'
import './layout.css'

const Layout = ({ children }) => (
  <div style={{minHeight:"100vh", position:"relative"}}>
    <Helmet
      title="arenarolodex"
      meta={[{
        name: 'description',
        content: `Lowell arena helper. A tool to generate schedules
          for Lowell High School students.`
      }]}
    >
      <html lang="en" />
    </Helmet>
    <Header siteTitle="arenarolodex" />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children}
    </div>
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
