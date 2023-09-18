var http = require('http');
const bodyParser = require('body-parser');
var cors = require('cors'); // Import the cors module
var dt = require('./myfirstmodule');
const express = require('express');
const DropboxSign = require('@dropbox/sign');
const Dropbox = require('dropbox').Dropbox;
const app = express();
const PORT =  8080;

const fs = require('fs');
const accountApi = new DropboxSign.AccountApi();

const DROPBOX_ACCESS_TOKEN = '1111111111';
const dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN });
const signatureRequestApi = new DropboxSign.SignatureRequestApi();

// Configure HTTP basic authorization: api_key
signatureRequestApi.username = "6c86a655cd22c41b645fc75b131c05e9ec842a2c31ae380fcabcde876b9806ba";

// or, configure Bearer (JWT) authorization: oauth2
// signatureRequestApi.accessToken = "YOUR_ACCESS_TOKEN";

app.use(bodyParser.json());

const signer1 = {
    emailAddress: "dev1emaily@gmail.com",
    name: "Jack",
    order: 0,
  };
  
  const signer2 = {
    emailAddress: "litvil77@gmail.com",
    name: "Jill",
    order: 1,
  };

  const signingOptions = {
    draw: true,
    type: true,
    upload: true,
    phone: false,
    defaultType: "draw",
  };
  
  const fieldOptions = {
    dateFormat: "DD - MM - YYYY",
  };
  
  // Upload a local file
  const file = fs.createReadStream("consent.pdf");

const data = {
    title: "Consent Agreement with Thames.",
    subject: "The Consent agreement we talk about",
    message: "This is to give your consent to Cognitive assessment ,please sign below . Let me know if you have any questions.",
    signers: [ signer1, signer2 ],
    ccEmailAddresses: [
      "lawyer1@dropboxsign.com",
      "lawyer2@gmail.com",
    ],
    files: [ file],
    metadata: {
      "custom_id": 1234,
      "custom_text": "CA #9",
    },
    signingOptions,
    testMode: true,
  };
  app.use(cors());

  app.post('/sign', (req, res) => {
     const email = req.body.email;
   
    console.log(req.body.email);
    
   
  });
//   const result = signatureRequestApi.signatureRequestSend(data);
// result.then(response => {
//   console.log(response.body);
// }).catch(error => {
//   console.log("Exception when calling Dropbox Sign API:");
//   console.log(error.body);
// });

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write("The date and time are currently: " + dt.myDateTime());
//   res.end();
// }).listen(8080);

app.listen(8080, () => {
    console.log(`Server is running on port ${PORT}`);
  });
