'use client'

import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Table from 'react-bootstrap/Table'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSettings } from '@/contexts/settings'
import annotationPlugin from 'chartjs-plugin-annotation'
import 'chartjs-adapter-moment'
import styles from './asset.module.scss'

import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, TimeScale } from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  annotationPlugin,
)
const Asset = ({ item, assetLimits, openPositions, trades }) => {

  const { timeframe, timeframes, chartStopLoss } = useSettings()

  const limit = assetLimits?.find(limit => limit.symbol === item.symbol) || null
  const openPosition = openPositions?.find(position => position.symbol === item.symbol) || null
  const allTrades = trades?.filter(trade => trade.symbol === item.symbol) || []

  const tfParams = timeframes[timeframe]

  const { data: ticks, error: ticksError } = useSWR(`/api/alpaca/latest_ticks/${item.symbol}?timeframe=${tfParams?.interval}&limit=${tfParams?.limit}`, fetcher)

  const closePrices = ticks?.bars[item.symbol]?.map(tick => ({ t: tick.t, c: tick.c })) || []

  const stopLossPrice = limit?.stop_loss_price
  const takeProfitPrice = limit?.take_profit_price
  const avgEntryPrice = openPosition?.avg_entry_price

  const stopLossPoints = Array(closePrices.length).fill(stopLossPrice)
  const takeProfitPoints = Array(closePrices.length).fill(takeProfitPrice)

  const currentPrice = closePrices[0]?.c
  const currentNet = (currentPrice - avgEntryPrice) * item.quantity
  const currentNetPercent = ((currentPrice - avgEntryPrice) / avgEntryPrice) * 100

  const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  let datasets = [
    {
      label: item.symbol,
      data: closePrices.map(cp => cp.c).reverse(),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
      pointRadius: 0,
    }
  ]

  let chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      annotation: {
        annotations: {}
      }
    },
    scales: {
      x: {
        type: 'time',
      }
    }
  }

  if (chartStopLoss) {
    chartOptions.plugins.annotation.annotations.stopLoss = {
      type: 'line',
      yMin: stopLossPrice,
      yMax: stopLossPrice,
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      label: {
        content: 'Stop Loss',
        enabled: true,
        position: 'top'
      }
    }
    chartOptions.plugins.annotation.annotations.takeProfit = {
      type: 'line',
      yMin: takeProfitPrice,
      yMax: takeProfitPrice,
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 2,
      label: {
        content: 'Take Profit',
        enabled: true,
        position: 'top'
      }
    }
  }

  allTrades.forEach((trade, index) => {
    // HACK: trade.time is in ISO format with Z at the end incorrectly. This is an upstream problem with AmpyFin
    // We assume that the trade and the web client are on the same system or at least in the same TZ.
    const tradeDate = new Date(trade.time.replace('Z', ''))
    const tradeQuantity = trade.qty

    const color = trade.side === 'BUY' ? 'rgb(61, 200, 135)' : 'rgb(255, 99, 132)'

    chartOptions.plugins.annotation.annotations[`trade${index}`] = {
      type: 'line',
      scaleID: 'x',
      value: tradeDate,
      borderColor: color,
      borderWidth: 2,
    }
  })

  return (
    <ListGroup.Item>
      <Row>
        <Col>
          <h4>
            {currentNet > 0 ? '🤑' : '😢'}
            {' '}
            {item.symbol}
            <span className="ms-3 fs-5">
              {moneyFormatter.format(currentNet)} ({currentNetPercent.toFixed(2)}%)
            </span>
          </h4>
          <Table size="sm" className={styles.detailTable}>
            <tbody>
              <tr>
                <td>Quantity</td>
                <td>{item.quantity}</td>
              </tr>
              <tr>
                <td>Current Price</td>
                <td>{moneyFormatter.format(currentPrice)}</td>
              </tr>
              <tr>
                <td>Average Entry Price</td>
                <td>{moneyFormatter.format(avgEntryPrice)}</td>
              </tr>
              <tr>
                <td>Stop Loss</td>
                <td>{moneyFormatter.format(stopLossPrice)}</td>
              </tr>
              <tr>
                <td>Take Profit</td>
                <td>{moneyFormatter.format(takeProfitPrice)}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <Line data={{
            labels: closePrices.map(cp => new Date(cp.t)).reverse(),
            datasets: datasets,
          }}
            options={chartOptions} />
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

export default Asset