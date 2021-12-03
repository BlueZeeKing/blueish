var Airtable = require('airtable');

module.exports = (req, res) => {
  const { name } = req.query;
  Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.API_KEY
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  var base = Airtable.base('appZp0qTRTTjzoGRe');

  let nameFix = capitalizeFirstLetter(name.toLowerCase()).trim()

  base('Table 1').select({
    filterByFormula: `IF({Name} != "${nameFix}", 0, 1)`
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function (record) {
      res.status(200).send({person: record.get('Person')})
    });
  }, function done(err) {
    if (err) { res.status(500).send({err: err}); return; }
  });
};