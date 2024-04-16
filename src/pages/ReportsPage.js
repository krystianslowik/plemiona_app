import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import { VictoryBar, VictoryLine, VictoryPie } from "victory";
import TrustedBadge from "../components/TrustedBadge.tsx";

const ReportsPage = () => {
  const barChartData = [
    { month: "January", sales: 12 },
    { month: "February", sales: 19 },
    { month: "March", sales: 3 },
    { month: "April", sales: 5 },
    { month: "May", sales: 2 },
    { month: "June", sales: 3 },
  ];

  const lineChartData = [
    { month: "January", visitors: 65 },
    { month: "February", visitors: 59 },
    { month: "March", visitors: 80 },
    { month: "April", visitors: 81 },
    { month: "May", visitors: 56 },
    { month: "June", visitors: 55 },
  ];

  const pieChartData = [
    { category: "amsz", value: 13 },
    { category: "madam krasno", value: 12 },
    { category: "ja", value: 3 },
    { category: "konradoks", value: 5 },
  ];

  return (
    <Container>
      <h2>Reports</h2>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h5>Bar Chart</h5>
              <VictoryBar data={barChartData} x="month" y="sales" />
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <h5>Line Chart</h5>
              <VictoryLine data={lineChartData} x="month" y="visitors" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <h5>Kto zjadl darmy</h5>
              <div>
                <VictoryPie data={pieChartData} x="category" y="value" />
              </div>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Pie chart description</small>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5>Data</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <ListGroup>
                <ListGroup.Item>List Item 1</ListGroup.Item>
                <ListGroup.Item>List Item 2</ListGroup.Item>
                <ListGroup.Item>List Item 3</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="mt-2">
            <Card.Body>
              <h5>Form</h5>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>
                <Form.Group controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your message"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5>Table</h5>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>john@example.com</td>
                  </tr>
                  <tr>
                    <td>Jane Smith</td>
                    <td>jane@example.com</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <TrustedBadge />
          <script
            async
            data-desktop-y-offset="0"
            data-mobile-y-offset="0"
            data-desktop-disable-reviews="false"
            data-desktop-enable-custom="false"
            data-desktop-position="right"
            data-desktop-custom-width="156"
            data-desktop-enable-fadeout="false"
            data-disable-mobile="false"
            data-disable-trustbadge="false"
            data-mobile-custom-width="156"
            data-mobile-disable-reviews="false"
            data-mobile-enable-custom="false"
            data-mobile-position="left"
            data-mobile-enable-topbar="false"
            data-mobile-enable-fadeout="true"
            data-color-scheme="light"
            charset="UTF-8"
            src="//http://widgets.trustedshops.com/js/XDAF89B46C1FD0BEBBCEB4F9BB36979AA.js"
          ></script>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportsPage;
