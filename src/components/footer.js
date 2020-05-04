import React from 'react';

const Footer = () => (
  <div style={{
    background: '#454141',
    position: 'absolute',
    width: '100%',
    bottom: '0',
    padding: '1rem 2rem',
  }}>
    <small style={{
      margin: '0',
      color: 'white',
      textDecoration: 'none',
    }}>
        Created by <a style={{color: 'red'}} href="https://github.com/areyoualex" target="_blank">Alex Ruiz</a>
        &nbsp;and <a style={{color: 'red'}} href="https://github.com/WhizardXD" target="_blank">Chris Yuan</a>
      <br />
        View source code: <a style={{color: 'red'}} href="https://github.com/WhizardXD/arenarolodex" target="_blank">https://github.com/WhizardXD/arenarolodex</a>
      <br />
        <a style={{color: 'red', textAlign: 'right'}} href="/privpolicy" target="_blank">Privacy Policy</a>
    </small>
  </div>
);

export default Footer;
