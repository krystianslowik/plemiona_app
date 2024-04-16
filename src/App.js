import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import PrivateRoute from "./components/PrivateRoute";
import "react-grid-layout/css/styles.css";

const client = new ApolloClient({
  uri: "http://127.0.0.1:3001/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard/*"
            element={<PrivateRoute element={<DashboardPage />} />}
          />
          <Route
            path="/"
            element={
              <PrivateRoute element={<Navigate to="/dashboard" replace />} />
            }
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
