const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '../../quotes_app/build/'));

//get route to fetch quotes data from MockAPI
app.get('/quotes/fetchquotes', (req, res) => {
  // axios call to MockAPI to fetch data
  axios.get('http://5c983a812e1ca60014d60d43.mockapi.io/quotes')
    .then((response) => {
      if (response.status === 200) {
        res.json(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    })
});

//post route to add New Author data to MockAPI
app.post('/quotes/postnewauthor/:author', (req, res) => {
  //axios call to MockAPI to post new author data
  var postData = {
    author: req.params.author
  };
  axios.post(`http://5c983a812e1ca60014d60d43.mockapi.io/quotes/`, postData)
    .then((response) => {
      if (response.status === 201) {
        res.json({
          status: "success",
          message: "Author successfully added to MockAPI",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    })
});

//put route to add a new Quote to an Author (we are editing an existing record)
//put route to vote as well
// as i am deleting a quote - inside quotes - I have to use the same route for delete
// put route to edit author name
app.put('/quotes/addnewquote/:id', (req, res) => {
  //axios call to edit author quotes data
  axios
    .put(`http://5c983a812e1ca60014d60d43.mockapi.io/quotes/${req.params.id}`, req.body)
    .then((response) => {
      if (response.status === 200) {
        res.json({
          status: "success",
          message: "Quote/vote successfully added to Author",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});





app.listen(1337);
