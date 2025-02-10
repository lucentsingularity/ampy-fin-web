import Image from "next/image";
import styles from "./page.module.css";
import IndicatorRank from "@/components/IndicatorRank";
import AssetQuantities from "@/components/AssetQuantities";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Home() {
  return (
    <div className={styles.page}>
      <section id="assets" className="mb-5">
        <Container>
          <Row>
            <Col xl={{ span: 8, offset: 2 }}>
              <h2 className="border-bottom mb-3">Assets</h2>
              <AssetQuantities />
            </Col>
          </Row>
        </Container>
      </section>
      <section id="indicators" className="mb-5">
        <Container>
          <Row>
            <Col xl={{ span: 8, offset: 2 }}>
              <h2 className="border-bottom mb-3">Indicator Ranks</h2>
              <IndicatorRank />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
