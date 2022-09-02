// const { fetchMyIP } = require('./iss');

const { nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });


// ip = 108.180.63.211

// fetchCoordsByIP('108.180.63.211', (error, data) => {
//   if (error) {
//     console.log("It didnt work! ");
//return;
//}
//     console.log('It worked! Returned coordinates:' , data);

// });


// thing fly over: 
// const coordinates = { latitude: "49.2827291", longitude: "-123.1207375" };

// fetchISSFlyOverTimes(coordinates, (error, data) => {
//   if (error) {
//     console.log("error:", error);
//     return;
//   }
//   console.log("success:", data);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});