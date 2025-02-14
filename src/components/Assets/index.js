'use client'


import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'chartjs-adapter-moment'
import Asset from '@/components/Asset'

const Assets = () => {

  const { data: assetQuantities, error: assetQuantitiesError } = useSWR('/api/trades/asset_quantities', fetcher)
  const { data: assetLimit, error: assetLimitError } = useSWR('/api/trades/assets_limit', fetcher)
  const { data: openPositions, error: openPositionsError } = useSWR('/api/alpaca/open_positions', fetcher)
  const { data: trades, error: tradesError } = useSWR('/api/trades/paper', fetcher)

  if (assetQuantitiesError) return <div>Failed to load asset quantities</div>
  if (assetLimitError) return <div>Failed to load asset limit</div>
  if (openPositionsError) return <div>Failed to load open positions</div>
  if (tradesError) return <div>Failed to load trades</div>

  if (!assetQuantities) return <div>Loading...</div>

  return (
    <Row>
      <Col>
        <div className="border-bottom mb-3 d-flex align-items-center justify-content-between">
          <h2 id="assets">Assets</h2>
        </div>
      </Col>
      <ListGroup>
        {assetQuantities.map((item, index) => (
          <Asset key={index} item={item} assetLimits={assetLimit} openPositions={openPositions} trades={trades} />
        ))}
      </ListGroup>
    </Row>
  )
}

export default Assets