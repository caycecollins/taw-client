import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'
import Highcharts from 'highcharts'
// import Chart from 'chart.js'
import {
  LineChart,
  BarChart,
  PieChart,
} from 'react-chartkick'

import ViewContainer from '../ViewContainer'

import globalHighchartsStyles from './highchartStyles'

// window.Chart = Chart
window.Highcharts = Highcharts

const data = {
  'Inactive': 100,
  'On Leave': 105,
  'Active': 2226,
}

function Reports (props) {
  return (
    <ViewContainer>
      {!props.initialDrawerAnimation &&
        <div>
          Report Tests:
          <br />
          <br />
          <PieChart colors={globalHighchartsStyles.colors} height="300px" library={globalHighchartsStyles} data={data} legend={true} donut={true} download={true} />
          <br />
          <br />
          <br />
          <br />
          <BarChart colors={globalHighchartsStyles.colors} height="400px" library={globalHighchartsStyles} data={data} legend={true} download={true} />
          <br />
          <br />
          <br />
          <br />
          <LineChart colors={globalHighchartsStyles.colors} height="400px" library={globalHighchartsStyles} data={data} legend={true} curve={false} download={true} />
          <br />
        </div>
      }
    </ViewContainer>
  )
}

Reports.propTypes = {
  initialDrawerAnimation: PropTypes.bool,
}

export default connect(
  {
    initialDrawerAnimation: state`app.initialDrawerAnimation`,
  },
  Reports
)
