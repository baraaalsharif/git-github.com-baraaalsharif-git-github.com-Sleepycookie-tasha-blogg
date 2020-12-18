
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const bodyParser= require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb+srv://Baraa:253873@cluster0.rwveh.mongodb.net/Cluster0?retryWrites=true&w=majority',
 {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(3000)