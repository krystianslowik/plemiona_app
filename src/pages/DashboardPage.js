import React, { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navigation from "../components/Navigation";
import ReportsPage from "./ReportsPage";
import StatisticsPage from "./StatisticsPage";
import AnalyticsPage from "./AnalyticsPage";
import MainPage from "./MainPage";
import AuthService from "../services/AuthService";
import Footer from "../components/Footer";

const DashboardPage = () => {
  const [selectedNavItem, setSelectedNavItem] = useState("");

  const handleNavigationItemClick = (item) => {
    setSelectedNavItem(item);
  };

  let selectedComponent;
  switch (selectedNavItem) {
    case "reports":
      selectedComponent = <ReportsPage />;
      break;
    case "statistics":
      selectedComponent = <StatisticsPage />;
      break;
    case "analytics":
      selectedComponent = <AnalyticsPage />;
      break;
    default:
      selectedComponent = <MainPage />;
  }

  return (
    <>
      <Navigation
        onNavigationItemClick={handleNavigationItemClick}
        userName={AuthService.getUsername()}
        notificationCount={3}
      />
      <Container className="p-4">
        <Outlet />
        <div>{selectedComponent}</div>
      </Container>
      <Footer />
    </>
  );
};

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
    </Routes>
  );
};

export { DashboardPage, DashboardRoutes };
