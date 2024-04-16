import React from "react";
import AddUser from "../components/AddUser";
import ReportParser from "../components/ReportParser";
import { Container, Row, Col, Card } from "react-bootstrap";

const MainPage = () => {
  return (
    <Container>
      <Row className="card-row pb-2">
        <Col className="m-1">
          <Card className="custom-card">
            <Card.Body>
              <AddUser />
            </Card.Body>
          </Card>
        </Col>
        <Col className="m-1">
          <Card className="custom-card">
            <Card.Body>
              <h3>Read Report</h3>
              <ReportParser />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="card-row">
        <Col className="m-1">
          <Card className="custom-card">
            <Card.Body>
              <h3>Another Card</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                mollis, ipsum vel viverra lacinia, ligula velit luctus nisl, id
                lacinia nisl turpis ac lorem. Duis sit amet feugiat lacus, et
                vulputate urna. Sed auctor odio vel congue tristique. Sed
                consequat pharetra mauris at faucibus.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Integer mollis, ipsum vel
                viverra lacinia, ligula velit luctus nisl, id lacinia nisl
                turpis ac lorem. Duis sit amet feugiat lacus, et vulputate urna.
                Sed auctor odio vel congue tristique. Sed consequat pharetra
                mauris at faucibus.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col className="m-1">
          <Card className="custom-card">
            <Card.Body>
              <h3>Yet Another Card</h3>
              <p>
                In dapibus ipsum id sem sagittis, a accumsan mi dictum. Donec
                scelerisque bibendum orci, nec volutpat elit finibus et. Integer
                suscipit ex sed orci eleifend, eget lobortis tellus rhoncus.
                Nulla facilisi. Integer viverra dui at sapien suscipit, nec
                fringilla risus vestibulum. Suspendisse consectetur volutpat
                felis in luctus. Proin sit amet augue lorem.
              </p>
            </Card.Body>
          </Card>
        </Col>
        {/* Add more columns as needed */}
      </Row>
    </Container>
  );
};

export default MainPage;
