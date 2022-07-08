import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { apiClient } from './apiClient';
import { BrowserRouter } from 'react-router-dom';
import { VPNStatusTable } from './components/VPNStatusTable';
import { Container, Tabs, Tab } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/de';

moment.locale('de');
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
      <p></p>
      <Container>
        <h1>OpenVPNStatusTable</h1>
        <h5>These tables show fetched data from the OpenVPNLogFiles</h5>
        <p></p>
      </Container>
      <Container>
        <Tabs defaultActiveKey= {VPNNames[0]} id="VPNLog" className="mb-3">
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
