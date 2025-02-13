import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'
import { useSettings } from '@/contexts/settings'
import styles from './settings.module.scss'

const Settings = () => {

  const { timeframe, setTimeframe, chartStopLoss, setChartStopLoss, timeframes } = useSettings()

  const [show, setShow] = useState(false)

  return (
    <>
      <Button className={styles.toggleButton} onClick={() => setShow(true)}>Settings</Button>
      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Chart Timeframe</Form.Label>
              <Form.Select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
                {Object.entries(timeframes).map(([key, value]) => (
                  <option key={key} value={key}>{key} ({value.interval} bars)</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                label="Show Stop/Take Profit Chart"
                type="switch"
                checked={chartStopLoss}
                onChange={(e) => setChartStopLoss(e.target.checked)}
              />
            </Form.Group>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )

}

export default Settings