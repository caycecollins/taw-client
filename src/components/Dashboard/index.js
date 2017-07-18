import React from 'react'
import { Grid, Row, Col } from 'react-material-responsive-grid'

import ViewContainer from '../ViewContainer'

const Dashboard = props =>
  <ViewContainer>
    <Grid>
      <Row>
        <Col sm={12} md={8}>
          Dashboard
        </Col>
      </Row>
    </Grid>
  </ViewContainer>

Dashboard.propTypes = {
}

export default Dashboard
