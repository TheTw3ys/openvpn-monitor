const Url = "http://127.0.0.1:3000/api/openvpn_state";

fetch(Url)
.then(data=>{return data.json()})
.then(res=>{console.log(res)})
