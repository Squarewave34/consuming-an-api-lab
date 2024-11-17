const express = require('express')
const app = express()
const axios = require('axios')
require('dotenv').config()

const APIKey=process.env.APIKey
const port=4000

app.use(express.urlencoded({ extended: false }));

app.listen(port, ()=>{
  console.log(`app listening on port ${port}`);
})

app.get('/', async(req, res)=>{
  res.render('index.ejs')
})

app.post('/weather', (req, res)=>{
  axios({
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/weather?zip=${req.body.zipCode}&appid=${APIKey}&units=metric`
  })
  .then(response =>{
    const results = response.data
    console.log(results);
    res.render('weather/show.ejs', {result: results})
  })
  .catch(error =>{
    console.log(error);
  })
})