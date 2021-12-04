var Airtable = require('airtable');

module.exports = (req, res) => {
  const { uid } = req.query;
  if (uid == process.env.ADMIN_UID) {
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }

    const givers = ['Brayden', 'Rachel', 'Drew', 'Luke', 'Maggie', 'Sphinx'] // nobody likes Ben
    const receivers = JSON.parse(JSON.stringify(givers))

    shuffleArray(receivers)

    const final = {}

    givers.forEach((item, index) => {
      final[item] = receivers[index]
    })

    givers.forEach((item, index) => {
      if (final[item] == item) {
        let next = index + 1
        if (next == givers.length) {
          next = 0
        }

        final[item] = final[givers[next]]
        final[givers[next]] = item
      }
    })

    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: process.env.API_KEY
    });

    var base = Airtable.base('appZp0qTRTTjzoGRe');

    var recordsToDelete = []


    base('Table 1').select().eachPage(function page(records, fetchNextPage) {
      records.forEach(function (record) {
        recordsToDelete.push(record.id)
      });
      if (recordsToDelete.length > 0) {
        base('Table 1').destroy(recordsToDelete, function (err, deletedRecords) {
          if (err) {
            res.status(500).send(json.stringify({ err: err }))
            return;
          }

          base('Table 1').create(
            Object.keys(final).map((item) => {
              return {
                "fields": {
                  "Name": item,
                  "Person": final[item]
                }
              }
            })
            , function (err, records) {
              if (err) {
                res.status(500).send(json.stringify({ err: err }))
              } else {
                res.status(200).send('Success!')
              }
            });
        });
      } else {
        base('Table 1').create(
          Object.keys(final).map((item) => {
            return {
              "fields": {
                "Name": item,
                "Person": final[item]
              }
            }
          })
          , function (err, records) {
            if (err) {
              res.status(500).send(json.stringify({ err: err }))
            } else {
              res.status(200).send('Success!')
            }
          });
      }
    }, function done(err) {
      if (err) {
        res.status(500).send(json.stringify({ err: err }))
      }
    });
  } else {
    res.status(401).send('Incorrect passcode')
  }
};