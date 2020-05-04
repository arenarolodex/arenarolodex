import React from 'react';
import { Link } from 'gatsby';

import styles from './header.module.css';

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: '#da6060',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <nav className={styles.nav}>
        <Link to="/" activeClassName={styles.current}>Home</Link>
        <Link to="/courses" activeClassName={styles.current}>How Arena Works</Link>
        <a href="https://forms.gle/JgrnajzCEfNxYCqz8" target="_blank">Feedback form</a>
      </nav>
    </div>
  </div>
);

export default Header;
