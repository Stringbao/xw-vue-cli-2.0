

module.exports = (app)=>{
    app.use('/comp',require('./api/create/index.js'));
    // app.use('/ejs',require('./api/ejs/index.js'));
}