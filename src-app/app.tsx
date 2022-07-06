import React from "react";
import ReactDOM from "react-dom";
import { Container, Table } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { connected } from "process";
import { TableApp } from "./components/ClientsTable";

const App = () => {
  return (
    <div>
      <Container>
        <p></p>
        <h2>App</h2>
        <p>Hello from my first app</p>
      </Container>
    </div>
  );
};

const OuterApp = () => {
  return (
    <BrowserRouter>
      <App />
      <TableApp /> // ./components/ClientsTable
    </BrowserRouter>
  );
};

ReactDOM.render(<OuterApp />, document.getElementById("app-content"));
