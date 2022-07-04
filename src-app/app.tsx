import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Container>
        <h2>App</h2>
        <p>Hello from my first app.</p>
      </Container>
    </div>
  );
};

const OuterApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

ReactDOM.render(<OuterApp />, document.getElementById('app-content'));