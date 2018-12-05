import React from 'react'
import { Link } from 'gatsby'

const Footer = () => (
    <div style={{
      background: '#454141',
      position: "absolute",
      width: "100%",
      bottom: "0",
      padding: "1rem 2rem"
    }}>
      <small style={{ margin: 0 }}>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
        }}>
          Created by <a href="https://github.com/areyoualex">Alex Ruiz</a>
          &nbsp;and <a href="https://github.com/WhizardXD">Chris Yuan</a>
          <br/>
          View source code: <a href="https://github.com/WhizardXD/arenarolodex">https://github.com/WhizardXD/arenarolodex</a>
        </Link>
      </small>
    </div>
)

export default Footer
