'use client'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Badge from 'react-bootstrap/Badge';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

function OffcanvasExample() {

  const expand = 'lg';

  const { data, error } = useSWR('/api/market_data/market_status', fetcher)

  const status = data?.[0]?.market_status || 'closed';

  const statusBadges = {
    'open': <Badge bg="success">Market Open</Badge>,
    'closed': <Badge bg="danger">Market Closed</Badge>,
    'early_hours': <Badge bg="warning">Early Hours</Badge>,
  }

  const StatusBadge = () => {
    return statusBadges[status];
  }

  return (
    <Navbar key={expand} expand={expand} className="bg-light mb-3">
      <Container fluid>
        <Navbar.Brand href="#">AmpyFin Web</Navbar.Brand>
        <StatusBadge />
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              AmpyFin Web
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end align-items-lg-center flex-grow-1 pe-3">
              <Nav.Link href="/#assets">Assets</Nav.Link>
              <Nav.Link href="/#indicators">Indicators</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;