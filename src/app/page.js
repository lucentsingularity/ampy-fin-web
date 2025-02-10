import Image from "next/image";
import styles from "./page.module.css";
import IndicatorRank from "@/components/IndicatorRank";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Home() {
  return (
    <div className={styles.page}>
      <section>
        <Container>
          <Row>
            <Col xl={{ span: 8, offset: 2 }}>
              <h2>Indicator Ranks</h2>
              <IndicatorRank />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
