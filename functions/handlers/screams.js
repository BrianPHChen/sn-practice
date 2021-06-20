const { db } = require('../util/admin');


exports.getAllscreams = (req, res) => {
  db.collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push({
          id: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt
        });
      });
      return res.json(screams);
    })
    .catch(err => {
      console.log(err);
      return res.json(err);
    })
};

exports.postOneScream = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({body: 'Must not be empty'});
  }
  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString()
  };

  db.collection('screams')
    .add(newScream)
    .then(doc => {
      res.json({message: `document ${doc.id} created successfully`});
    })
    .catch(err => {
      res.status(500).json(err);
      console.log(err);
    })
};