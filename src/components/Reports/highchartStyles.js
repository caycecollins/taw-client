import theme from '../.././theme'

const globalHighchartsStyles = {
  colors: [
    theme.colors.armyGreen,
    theme.colors.grayGreen,
    theme.colors.lightTan,
    theme.colors.lightBlue,
    theme.colors.lightRed,
  ],
  chart: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  xAxis: {
    labels: {
      style: {
        color: theme.colors.armyWhite,
      },
    },
  },
  legend: {
    itemStyle: {
      color: theme.colors.armyGreen,
    },
    itemHoverStyle: {
      color: theme.colors.armyWhite,
    },
  },
  plotOptions: {
    pie: {
      dataLabels: {
        color: theme.colors.armyWhite,
      },
    },
  },
  tooltip: {
    backgroundColor: 'rgba(0,0,0,.8)',
    style: {
      color: theme.colors.armyWhite,
    },
  },
  drilldown: {
    activeAxisLabelStyle: {
      color: theme.colors.armyWhite,
    },
    activeDataLabelStyle: {
      color: theme.colors.armyWhite,
    },
  },
}

export default globalHighchartsStyles
