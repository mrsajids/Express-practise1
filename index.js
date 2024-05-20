const express = require('express')
const app = express()
const session = require('express-session')
const cookieParser = require('cookie-parser')


//(1) middleware-custum
// app.use((req, res, next) => {
//     res.send('yes i am middleware and running..');
//     next();
// })

//middleware for sessions
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'blablabla'
}))

//middleware for cookies
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('<h1>Welcome to express js</h1>')
})

// dynamic routing
app.get('/profile/:username', (req, res) => {
    console.log(req.params);
    res.send(`Welcome to Express js, ${req.params.username}`)
})

//(1) middleware-custum
app.get('/middleware', (req, res, next) => {
    res.send('middle ware finished')
    next()
})

//(2) builtin middlewares-
// express.static(root, [options]) -->
// express.json() --> to use json data
// express.urlencoded({extended:true}) --> to read www data

//sessions
app.get('/session', (req, res, next) => {
    // make session
    req.session.name = 'session1';

    //accessing session 
    console.log(req.session);

    //remove session
    req.session.destroy();
    res.send('check console');
})

//cookies
app.get('/cookies', (req, res, next) => {
    // make cookie
    // res.cookie('cook','1234')

    //accessing cookie
    console.log(req.cookies);
    
    // //remove cookie
    res.clearCookie('cook','1234')
    // req.session.destroy();
    res.send('done')
})


app.get('*', (req, res) => {
    res.send(`Page not found`)
})

app.listen(1000, () => console.log('app is running'))