import React from 'react';
import ReactDOM from 'react-dom';
import { TableApp } from './components/ClientsTable';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';

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
      <TableApp />
    </BrowserRouter>
  );
};

ReactDOM.render(<OuterApp />, document.getElementById('app-content'));
