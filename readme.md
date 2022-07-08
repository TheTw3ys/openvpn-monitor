# openvpn-monitor

This tool provides a visual way to show the status of your OpenVPN server. Providing the folder the OpenVPN configuration status files are stored, it will show the status of the server and the number of clients connected. Each vpn will have its own tab. The service updates itself using a polling approach.



## requirements 

* [nodejs](https://nodejs.org) 16.0.0 or higher
* [yarn](https://classic.yarnpkg.com/lang/en/) 1.22.17 or higher
* [openvpn](https://openvpn.net/) 2.3.10 or higher



## installation

```bash
  # clone the repository
  git clone git@github.com:TheTw3ys/openvpn-monitor.git

  # install dependencies
  yarn install

  # start the service
  yarn start

  # start the service in development mode
  yarn dev

```

## configuration

The service can be configured using the following environment variables:

| Variable | Meaning | Default Value |
| --- | --- | --- |
| `OPENVPN_LOG_PATH` | The folder where the OpenVPN status files are stored | `/etc/openvpn` |
| `LISTEN_HOST` | The host(ipaddress) the service is bound to | `0.0.0.0` |
| `LISTEN_PORT` | The port the service is listening to | `3000` |


