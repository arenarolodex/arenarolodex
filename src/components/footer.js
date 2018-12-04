import React from 'react'
import { Link } from 'gatsby'

const Footer = () => (
    <div
        style = {{
            background: '#da6060',
            marginBottom: '1.45rem',
        }}
    >
        <div
            style = {{
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
                    
                    Created by <a href="https://github.com/areyoualex">Alex Ruiz</a>
                    and <a href="https://github.com/WhizardXD">Chris Yuan</a>
                    <br/>
                    View source code: <a href="https://github.com/WhizardXD/arenarolodex">https://github.com/WhizardXD/arenarolodex</a>

                </Link>
            </h1>
        </div>
    </div>
)

export default Footer