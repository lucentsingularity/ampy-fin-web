'use client'

import { useState } from 'react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Table from 'react-bootstrap/Table'
import ListGroup from 'react-bootstrap/ListGroup'

const AssetItem = ({ item, assetLimits }) => {

  const limit = assetLimits?.find(limit => limit.symbol === item.symbol) || null

  return (
    <ListGroup.Item>
      <h4>{item.symbol}</h4>
      <p>Quantity: {item.quantity}</p>
      <p>Stop Loss Price: {limit?.stop_loss_price}</p>
      <p>Take Profit Price: {limit?.take_profit_price}</p>
    </ListGroup.Item>
  )
}

const AssetQuantities = () => {
  const { data: assetQuantities, error: assetQuantitiesError } = useSWR('/api/trades/asset_quantities', fetcher)
  const { data: assetLimit, error: assetLimitError } = useSWR('/api/trades/assets_limit', fetcher)

  if (assetQuantitiesError) return <div>Failed to load asset quantities</div>
  if (assetLimitError) return <div>Failed to load asset limit</div>

  if (!assetQuantities) return <div>Loading...</div>

  return (
    <>
      <ListGroup>
        {assetQuantities.map((item, index) => (
          <AssetItem key={index} item={item} assetLimits={assetLimit} />
        ))}
      </ListGroup>
    </>
  )
}

export default AssetQuantities