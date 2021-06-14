import express from 'express'
import path from 'path'
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
// app.use(express.static('src/public'))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/videos', (req, res) => {
  res.render('videos.ejs')
})
app.get('/report', (req, res) => {
  res.render('report.ejs')
})
app.get('/screenshots', (req, res) => {
  res.render('screenshots.ejs')
})

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`)
})
