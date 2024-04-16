import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Table } from "react-bootstrap";

const ReportParser = () => {
  const [world, setWorld] = useState("");
  const [reportId, setReportId] = useState("");
  const [reportData, setReportData] = useState(null);

  const handleWorldChange = (e) => {
    setWorld(e.target.value);
  };

  const handleReportIdChange = (e) => {
    setReportId(e.target.value);
  };

  const parseReport = async () => {
    try {
      const url = `http://localhost:3001/parse-report?world=${world}&reportId=${reportId}`;
      const response = await axios.get(url);
      setReportData(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const renderUnitRow = (title, units) => {
    return (
      <tr>
        <th>{title}</th>
        {Object.values(units).map((value, index) => (
          <td key={index}>{value || 0}</td>
        ))}
      </tr>
    );
  };

  const renderBuildingRow = (buildings) => {
    if (Object.keys(buildings).length === 0) return;
    console.log(Object.keys(buildings).length);
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th colSpan={Object.keys(buildings).length}>Budynki:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(buildings).map((value, index) => (
              <td key={index}>{value || 0}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    );
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>World:</Form.Label>
          <Form.Control
            type="text"
            value={world}
            onChange={handleWorldChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Report ID:</Form.Label>
          <Form.Control
            type="text"
            value={reportId}
            onChange={handleReportIdChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={parseReport}
          className="m-2 d-flex aligh-self-center"
        >
          Parse Report
        </Button>
      </Form>
      {reportData && (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan="10">
                  Atak z wioski {reportData.attackInfo.aggressor} na wioskę{" "}
                  {reportData.attackInfo.defender}
                </th>
              </tr>
            </thead>
            <tbody>
              {renderUnitRow("Wojska", reportData.attackInfo.attackingUnits)}
              {renderUnitRow("Padło", reportData.attackInfo.attackingUnitsDead)}
            </tbody>
          </Table>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan="10">Obrońca: {reportData.attackInfo.defender}</th>
              </tr>
            </thead>
            <tbody>
              {renderUnitRow("Wojska", reportData.attackInfo.defendingUnits)}
              {renderUnitRow("Padło", reportData.attackInfo.defendingUnitsDead)}
            </tbody>
          </Table>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan="10">Wojska poza wioską:</th>
              </tr>
            </thead>
            <tbody>
              {renderUnitRow("Wojska", reportData.attackInfo.unitsAway)}
            </tbody>
          </Table>
          {renderBuildingRow(reportData.attackInfo.buildings)}
          {reportData.supportLoss && (
            <div>
              <h4>Poparcie</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Poparcie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {reportData.supportLoss.map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportParser;
