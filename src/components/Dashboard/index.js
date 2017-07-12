import React from 'react'
import { Grid, Row, Col } from 'react-material-responsive-grid'

import ViewContainer from '../ViewContainer'

const Dashboard = (props) => {
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

Dashboard.propTypes = {
}

export default Dashboard
