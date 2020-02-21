var express = require("express");
var router = express.Router();
var axios = require("axios");
const { tidesApiSecret } = require("../config");

getStation = async stationName => {
  const stationsUrl = `https://admiraltyapi.azure-api.net/uktidalapi/api/V1/Stations?name=${stationName}`;
  const config = {
    headers: {
      "Ocp-Apim-Subscription-Key": tidesApiSecret
    }
  };
  return await axios.get(stationsUrl, config);
};

getTides = async station => {
  const config = {
    headers: {
      "Ocp-Apim-Subscription-Key": tidesApiSecret
    }
  };
  const tidesUrl = `https://admiraltyapi.azure-api.net/uktidalapi/api/V1/Stations/${station.properties.Id}/TidalEvents`;
  return await axios.get(tidesUrl, config);
};

getStations = async () => {
  const config = {
    headers: {
      "Ocp-Apim-Subscription-Key": tidesApiSecret
    }
  };
  const stationsUrl = `https://admiraltyapi.azure-api.net/uktidalapi/api/V1/Stations`;
  return await axios.get(stationsUrl, config);
};

router.get("/", async function(req, res, next) {
  const stationName = req.query.station;
  try {
    const station = await getStation(stationName);
    const tides = await getTides(station.data.features[0]);
    res
      .status(200)
      .type("json")
      .send(tides.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/stations", async function(req, res, next) {
  try {
    const stations = await getStations();
    const filtered = stations.data.features;
    filtered.sort((a, b) => a.properties.Name.localeCompare(b.properties.Name));
    res
      .status(200)
      .type("json")
      .send(filtered);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
