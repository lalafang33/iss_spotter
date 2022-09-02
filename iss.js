
const request = require("request");

const fetchMyIP = function (callback) {
  request(`https://api64.ipify.org?format=json`,
    (error, response, body) => {
      console.log(body);
      if (error) {

        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const data = JSON.parse(body);
      callback(null, data.ip)
    }
  );
};



// module.exports = { fetchMyIP };


const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    // console.log(body);
    if (error) {
      callback(error, null);
      return;
    }
    let data = JSON.parse(body);

    if (!data.succeess) {
      callback(Error(`Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`), null);
    }
    const longitude = data.longitude;
    const latitude = data.latitude;
    const cordinates = { longitude, latitude };
    callback(null, (cordinates));

  });
};


// module.exports = { fetchCoordsByIP };

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Error, response code is ${response.statusCode}, please try again`), null);
      return;
    }
    let data = JSON.parse(body);
    callback(null, data.response);
  });
};

// module.exports = { fetchISSFlyOverTimes };


const nextISSTimesForMyLocation = (callback) => {
 fetchMyIP((error,ip) => {
  if (error) {
  return callback(error, null);
  }
fetchCoordsByIP(ip, (error, coords) => {
  if (error) {
    return callback(error, null);
  }
fetchISSFlyOverTimes(coords, (error, data) => {
  if (error) {
    return callback(error, null);
  }
   data = 
    callback(null, data);
    });
  });
});
};

module.exports = {nextISSTimesForMyLocation};
