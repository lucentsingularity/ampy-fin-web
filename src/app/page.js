'use client'

import Image from "next/image";
import styles from "./page.module.css";
import IndicatorRank from "@/components/IndicatorRank";
import Assets from "@/components/Assets";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Settings from "@/components/Settings";
import { SettingsProvider } from "@/contexts/settings";

export default function Home() {
  return (
    <SettingsProvider>
      <div className={styles.page}>
        <section id="assets" className="mb-5">
          <Container>
            <Assets />
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
      <Settings />
    </SettingsProvider>
  );
}
