import React from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
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
    </ViewContainer>
  )
}

Reports.propTypes = {
}

export default Reports
