import React from 'react'

import Layout from '../components/layout'
import Courses from '../components/courses'

export default class IndexPage extends React.Component {
  render(){
    return (
      <Layout>
        <Courses />
      </Layout>
    )
  }
}
