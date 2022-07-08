import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { apiClient } from './apiClient';
import { BrowserRouter } from 'react-router-dom';
import { VPNStatusTable } from './components/VPNStatusTable';
import { Container, Tabs, Tab } from 'react-bootstrap';

const App = () => {
  const [VPNNames, setVPNNames] = useState<Array<string>>([]);

  const pollVPNNames = async () => {
    const names = await apiClient.getVPNNames();
    console.log(names);
    setVPNNames(names);
  };

  useEffect(() => {
    pollVPNNames();
  }, []);

  return (
    <div>
      <Container>
        <p></p>
        <h2>App</h2>
        <p>Hello from my first app</p>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
          {VPNNames.map((name) => {
            return (
              <Tab key={name} eventKey={name} title={name}>
                <VPNStatusTable vpnName={name} />
              </Tab>
            );
          })}
        </Tabs>
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
