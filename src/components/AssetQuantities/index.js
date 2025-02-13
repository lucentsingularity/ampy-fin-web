'use client'

import { useState } from 'react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Table from 'react-bootstrap/Table'
import ListGroup from 'react-bootstrap/ListGroup'
import dynamic from 'next/dynamic'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSettings } from '@/contexts/settings'
import 'chart.js/auto'
import { elements } from 'chart.js/auto'
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
})
// Import ChartJS line chart


const AssetItem = ({ item, assetLimits, openPositions }) => {

  const { timeframe, timeframes, chartStopLoss } = useSettings()

  const limit = assetLimits?.find(limit => limit.symbol === item.symbol) || null
  const openPosition = openPositions?.find(position => position.symbol === item.symbol) || null

  const tfParams = timeframes[timeframe]

  const { data: ticks, error: ticksError } = useSWR(`/api/alpaca/latest_ticks/${item.symbol}?timeframe=${tfParams?.interval}&limit=${tfParams?.limit}`, fetcher)

  const closePrices = ticks?.bars[item.symbol]?.map(tick => tick.c) || []

  const stopLossPrice = limit?.stop_loss_price
  const takeProfitPrice = limit?.take_profit_price
  const avgEntryPrice = openPosition?.avg_entry_price

  const stopLossPoints = Array(closePrices.length).fill(stopLossPrice)
  const takeProfitPoints = Array(closePrices.length).fill(takeProfitPrice)

  const currentPrice = closePrices[0]
  const currentNet = (currentPrice - avgEntryPrice) * item.quantity
  const currentNetPercent = ((currentPrice - avgEntryPrice) / avgEntryPrice) * 100

  const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  let datasets = [
    {
      label: item.symbol,
      data: closePrices.reverse(),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
      pointRadius: 0,
    }
  ]

  if (chartStopLoss) {
    datasets.push({
      label: 'Stop Loss',
      data: stopLossPoints,
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
      pointRadius: 0,
    })
    datasets.push({
      label: 'Take Profit',
      data: takeProfitPoints,
      fill: false,
      borderColor: 'rgb(54, 162, 235)',
      tension: 0.1,
      pointRadius: 0,
    })
  }

  return (
    <ListGroup.Item>
      <Row>
        <Col>
          <h4>
            {currentNet > 0 ? '🤑' : '😢'}
            {item.symbol}
            <span className="ms-3 fs-5">
              {moneyFormatter.format(currentNet)} ({currentNetPercent.toFixed(2)}%)
            </span>
          </h4>
          <p>Quantity: {item.quantity}</p>
          <p>Current Price: {moneyFormatter.format(currentPrice)}</p>
          <p>Average Entry Price: {moneyFormatter.format(avgEntryPrice)}</p>
          <p>Stop Loss: {stopLossPrice}</p>
          <p>Take Profit: {takeProfitPrice}</p>
        </Col>
        <Col>
          <Line data={{
            labels: closePrices.map((_, index) => index),
            datasets: datasets,
          }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                },
              },
              scales: {
                x: {
                  display: false,
                  ticks: {
                    display: false //this will remove only the label
                  }
                }
              }
            }} />
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

const AssetQuantities = () => {
  const { data: assetQuantities, error: assetQuantitiesError } = useSWR('/api/trades/asset_quantities', fetcher)
  const { data: assetLimit, error: assetLimitError } = useSWR('/api/trades/assets_limit', fetcher)
  const { data: openPositions, error: openPositionsError } = useSWR('/api/alpaca/open_positions', fetcher)

  if (assetQuantitiesError) return <div>Failed to load asset quantities</div>
  if (assetLimitError) return <div>Failed to load asset limit</div>
  if (openPositionsError) return <div>Failed to load open positions</div>

  if (!assetQuantities) return <div>Loading...</div>

  return (
    <Row>
      <ListGroup>
        {assetQuantities.map((item, index) => (
          <AssetItem key={index} item={item} assetLimits={assetLimit} openPositions={openPositions} />
        ))}
      </ListGroup>
    </Row>
  )
}

export default AssetQuantities