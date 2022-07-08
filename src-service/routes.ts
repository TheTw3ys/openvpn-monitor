import { states } from "./parse-log";

export function defineAllRoutes(app) {
  app.get("/api/info", (req, res) => {
    res.json({
      description:
        "This is an openvpn monitor, it sits on the logfiles and displays its content nicely.",
    });
  });
  app.get("/api/vpn_names", (req, res) => {
    res.json(Object.keys(states));
  });

  app.get("/api/openvpn_state/:openvpnName", (req, res) => {
    const openVPNName = req.params.openvpnName;
    if (openVPNName != null) {
      if (states[openVPNName] != null) {
        res.json(states[openVPNName]);
      }
    }
    res.status(404);
  });
}
