var express = require("express");
var router = express.Router();
var axios = require("axios");
var xmlParser = require("xml2json");

const getForecast = async () => {
  result = await axios.get(
    "https://www.metoffice.gov.uk/public/data/CoreProductCache/InshoreWatersForecast/Latest?concise"
  );
  return xmlParser.toJson(result.data);
};

router.get("/", async function(req, res, next) {
  try {
    const data = await getForecast();
    res
      .status(200)
      .type("json")
      .send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
