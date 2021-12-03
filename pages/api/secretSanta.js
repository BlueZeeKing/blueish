module.exports = (req, res) => {
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  const givers = ['Brayden', 'Rachel', 'Drew']
  const receivers = ['Brayden', 'Rachel', 'Drew']

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

  res.status(200).send(final);
};