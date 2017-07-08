import React from 'react'
import styled from 'styled-components'
import { Grid, Row, Col } from 'react-material-responsive-grid'

import ViewContainer from '../ViewContainer'

function Home (props) {
  return (
    <ViewContainer>
      <Grid>
        <Row>
          <Col sm={12} md={8}>
            Dashboard
          </Col>
          <Col hiddenDown="sm" md={4}>
            Test: This will hide on small devices
          </Col>
        </Row>
      </Grid>
    </ViewContainer>
  )
}

Home.propTypes = {
}

export default Home
