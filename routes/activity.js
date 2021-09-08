'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var util = require('util');
var http = require('https');
var axios = require('axios');
exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    console.log(process.env.McEndpoint);
    logData(req);
    res.send(200, 'Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {

    // example on how to decode JWT
    JWT(req.body, process.env.coustom_activity, (err, decoded) => {

        // verification error -> unauthorized request
        if (err) {
            console.error(err);
            return res.status(401).end();
        }

        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            
            // decoded in arguments
            var decodedArgs = decoded.inArguments[0];
            
            logData(req);
            res.send(200, 'Execute');
        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });
};


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Validate');
};


  // DEexternalKeyDomainConfiguration =string;
  
  let jsonData = [
    {
        keys: {
            id: 1
        },
        values: {
            name: 'hari - ' ,
            email: 'hari-' + '@sanjay.com',
        }
    },
                 
];;

exports.insertRowForDCHelper = function (req, res) {
 let  deExternalKey = "DF34_Demo";
 let sfmcDataExtensionApiUrl = "https://www.exacttargetapis.com/hub/v1/dataevents/key:DF34_Demo/rowset";
  
 let headers = {
  'Content-Type': 'application/json;charset=UTF-8',
};

  axios.post(sfmcDataExtensionApiUrl, jsonData, {"headers" : headers})
  .then((response) => {
      // success
      console.log("Successfully loaded sample data into Data Extension!");

      resolve(
      {
          status: response.status,
          statusText: response.statusText + "\n" + Utils.prettyPrintJson(JSON.stringify(response.data))
      });
  })
  .catch((error) => {
      // error
      let errorMsg = "Error loading sample data. POST response from Marketing Cloud:";
    
    console.log(error);
     
  });
// exports.subjectData = async (req, res) => {
  
//   console.log("mkmk");
//     let account_id = await this.getMemberID(req.query.token, req.query.endpoint);
  
//     let curr_user = await this.getUsername(
//       req.query.token,
//       req.query.endpoint,
//       account_id
//     );
//     console.log("subject Data curr_user.userName >>>> " + curr_user.userName);
//     res.status(200).send(curr_user);
// }
    

//   exports.getUsername = (accessToken, tssd, userObj) =>
//   new Promise((resolve, reject) => {
//     let endpoint = `${tssd}platform/v1/accounts/${userObj.organization.id}/users`;
//     console.log("get UserName endpoint >>>> " + endpoint);
//     var configs = {
//       method: "GET",
//       url: endpoint,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     };

//     axios(configs)
//       .then(function (response) {
//         if (response.data) {
//           for (let x in response.data.items) {
//             if (userObj.user.id == response.data.items[x].id) {
//               resolve(response.data.items[x]);
//             }
//           }
//           resolve(response.data);
//           console.log("mmmmmm",response.data)
//         }
//       })
//       .catch(function (error) {
//         console.log("get UserName " + error);
//         return reject(error);
//       });
//   });
//   exports.getMemberID = (accessToken, tssd) =>
//   new Promise((resolve, reject) => {
//     let endpoint = `${tssd}platform/v1/tokenContext`;
//     console.log("endpoint >>>> " + endpoint);
//     var configs = {
//       method: "GET",
//       url: endpoint,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     };

//     axios(configs)
//       .then(function (response) {
//         if (response.data) {
//           resolve(response.data);
//         }
//       })
//       .catch(function (error) {
//         console.log("tokenContext " + error);
//         return reject(error);
//       });
//   });
}