'use client'

import { useState } from 'react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Table from 'react-bootstrap/Table'
import ListGroup from 'react-bootstrap/ListGroup'

const IndicatorRank = () => {
  const { data, error } = useSWR('/api/trading_simulator/rank', fetcher)

  if (error) return <div>Failed to load</div>

  if (!data) return <div>Loading...</div>

  return (
    <>
      <ListGroup>
        {data.map((item, index) => (
          <ListGroup.Item key={index}>
            <h4>{item.rank}. {item.strategy}</h4>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

export default IndicatorRank