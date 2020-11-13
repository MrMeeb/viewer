const express = require('express');
const fetch = require('node-fetch');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const moment = require('moment')

require('dotenv').config();

const dbConnection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE
});

dbConnection.connect();

const app = express ();

const port = process.env.PORT

const TMDB_API_KEY = process.env.TMDB_API_KEY

const TMDB_API_URL = process.env.TMDB_API_URL

app.listen(port, () => console.log('Starting server on ' + port));
app.use(express.json({limit: '1mb' }));

function apiauthenticate(token) {

    const tokenSplit = token.split(' ')[1]

    const verify = jwt.verify(tokenSplit, process.env.JWT_SECRET, function(err, decoded) {

        if (err) {

            console.log(err.message)
            
            let response = {status: 'error', message: err.message}

            return response

        }
        else {

            let response = {status: 'success', decoded}

            return response

        }

    })

    return verify

}

movielookup = async(movies) => {

    async function query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            dbConnection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows[0] );
            });
        });
    }

    const array = movies.map(async(value) => {
        const dblookup = await query(`SELECT * FROM movies WHERE id = ${value.tmdb_id}`)
        return dblookup
    });

    const promise = Promise.all(array).then((values) => {
        return values
    })

    return promise

}

moviewatchlookup = async(id, movies) => {

    async function query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            dbConnection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows[0] );
            });
        });
    }

    const array = movies.map(async(value) => {
        const dblookup = await query(`SELECT * FROM watch WHERE user_id = ${id} AND tmdb_id = ${value.id}`)
        
        if (dblookup === undefined){
            return {watch: false}
        }
        else {
            return {watch: true, date_added_watch: dblookup.date_added_watch}
        }
    });

    const promise = Promise.all(array).then((values) => {
        return values
    }) 

    return promise

}

moviewatchedlookup = async(id, movies) => {

    async function query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            dbConnection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows[0] );
            });
        });
    }

    const array = movies.map(async(value) => {
        const dblookup = await query(`SELECT * FROM watched WHERE user_id = ${id} AND tmdb_id = ${value.id}`)
        
        if (dblookup === undefined){
            return {watched: false}
        }
        else {
            return {watched: true, date_added_watched: dblookup.date_added_watched}
        }
    });

    const promise = Promise.all(array).then((values) => {
        return values
    }) 

    return promise

}
    
app.post('/api/token/get', (request, response) => {
    console.log('I got a request for a token')

    let username = request.body.username
    let password = request.body.password
    let id = request.body.id

    gettoken = async () => {

        dbConnection.query(`SELECT * FROM user_data WHERE username = "${username}";`, function (error, results, fields) {
            if (error) throw error;

            if (results.length === 0){

                console.log('User logging in does not exist')

                response.json({
                    status: 'error'
                })

            }

            else {

                let db_password = results[0].password

                if (password === db_password) {

                    console.log('User authenticated')

                    function generateAccessToken(body) {
                        return jwt.sign(body, process.env.JWT_SECRET, { expiresIn: '86400s' /* 24 hours */ })
                    }

                    let token = generateAccessToken({ username: username, password: password, id: id })

                    response.json(token)

                }
                else {

                    console.log('Something went wrong')

                }

            }


        })

    }

    gettoken()

})

app.post('/api/token/check', (request, response) => {

    console.log('Got a request to check the token')

    let token = apiauthenticate(request.header('Authorization'))

    response.json(token)

})

app.post('/api/movie/search', (request, response) => {

    console.log('Request made on the search API')

    let token = apiauthenticate(request.header('Authorization'))

    let searchterm = request.body.searchterm
    let focus = request.body.focus

    if (token.status === 'success') {

        search = async() => {

            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Authorization': `Bearer ${TMDB_API_KEY}`
                },
            }
    
            const req = await fetch(`${TMDB_API_URL}/search/movie?query=${searchterm}&page=1&include_adult=false`, options)
            const res = await req.json();

            lookup = async(id, results) => {

                const watchlookup = await moviewatchlookup(id, results)
                const watchedlookup = await moviewatchedlookup(id, results)
                
                const array = []

                for (let i = 0; i < results.length; i++) {

                    const target = results[i]
                    const source = watchlookup[i]
                    const source2 = watchedlookup[i]

                    target.tmdb_id = target.id

                    target.focus = focus

                    delete target.id

                    const returnedTarget = Object.assign(target, source, source2)

                    array.push(returnedTarget)
                    
                }

                response.json({status: 'success', array})

            }

            lookup(token.decoded.id, res.results)

        }

        search()

    }

})

app.post('/api/trending', (request, response) => {

    console.log('Request made on the trending API')

    let token = apiauthenticate(request.header('Authorization'))

    if (token.status === 'success') {

        gettrending = async() => {

            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Authorization': `Bearer ${TMDB_API_KEY}`
                },
            }
    
            const req = await fetch(`${TMDB_API_URL}/trending/movie/week`, options)
            const res = await req.json();

            lookup = async(id, results) => {

                const lookup = await moviewatchlookup(id, results)
                
                const array = []

                for (let i = 0; i < results.length; i++) {

                    const target = results[i]
                    const source = lookup[i]

                    target.tmdb_id = target.id

                    target.focus = 'watch'

                    delete target.id

                    const returnedTarget = Object.assign(target, source)

                    array.push(returnedTarget)
                    
                }

                response.json(array)

            }

            lookup(token.decoded.id, res.results)

        }

        gettrending()

    }

})

app.post('/api/watchlist/get', (request, response) => {

    console.log('Request made on the watch list API')

    let token = apiauthenticate(request.header('Authorization'))

    let user_id = token.decoded.id

    let searchterm = request.body.searchterm

    if (token.status === 'success') {

        if (searchterm === undefined){

            getwatchlist = async() => {
    
                dbConnection.query(`SELECT * FROM watch WHERE user_id = ${user_id}`, function (err, results) {
                    if (err) throw err
    
                    if (results.length === 0) {
    
                        response.json({status: 'empty'})
    
                    }
                    else {
    
                        lookup = async(results) => {
    
                            const lookup = await movielookup(results)

                            const array = []

                            for (let i = 0; i < results.length; i++) {

                                const target = results[i]
                                const source = lookup[i]

                                delete source.id

                                target.focus = 'watch'

                                let release_dateRaw = source.release_date

                                let release_date = moment(release_dateRaw).format('YYYY-MM-DD')

                                source.release_date = release_date

                                source.watch = 'added' 

                                const returnedTarget = Object.assign(target, source)

                                array.push(returnedTarget)
                                
                            }
       
                            response.json({status: 'success', array})

                        }
    
                        lookup(results)
                        
    
                    }
    
    
                })
    
            }

            getwatchlist()

        } else {

            getwatchlist = async() => {

                console.log(searchterm)
    
                dbConnection.query(`SELECT * FROM watch WHERE user_id = ${user_id} AND title LIKE CONCAT ("${searchterm}", "%")`, function (err, results) {
                    if (err) throw err
    
                    if (results.length === 0) {
    
                        response.json({status: 'empty'})
    
                    }
                    else {
    
                        lookup = async(results) => {
    
                            const lookup = await movielookup(results)

                            const array = []

                            for (let i = 0; i < results.length; i++) {

                                const target = results[i]
                                const source = lookup[i]

                                delete source.id

                                target.focus = 'watch'

                                let release_dateRaw = source.release_date

                                let release_date = moment(release_dateRaw).format('YYYY-MM-DD')

                                source.release_date = release_date

                                source.watch = 'added' 

                                const returnedTarget = Object.assign(target, source)

                                array.push(returnedTarget)
                                
                            }
       
                            response.json({status: 'success', array})

                        }
    
                        lookup(results)
                        
    
                    }
    
    
                })
    
            }

            getwatchlist()


        }

    }

})

app.post('/api/watchlist/add', (request, response) => {

    let token = apiauthenticate(request.header('Authorization'))

    let user_id = token.decoded.id
    let tmdb_id = request.body.tmdb_id
    let title = request.body.title
    let release_date = request.body.release_date
    let poster = request.body.poster
    let backdrop = request.body.backdrop
    let rating = request.body.rating

    console.log(release_date)

    if (token.status === 'success') {

        dbConnection.query(`SELECT * FROM watch WHERE user_id = ${user_id} AND tmdb_id = ${tmdb_id}`, function(err, results) {
            if (err) throw err

            if (results.length == 0) {

                dbConnection.query(`INSERT INTO watch (user_id, tmdb_id, title) VALUES (${user_id}, ${tmdb_id}, "${title}")`, function(err, results) {
                    if (err) throw err

                    dbConnection.query(`SELECT * FROM movies WHERE id = ${tmdb_id}`, function(err, results) {
                        if (err) throw err 

                        dbConnection.query(`REPLACE INTO movies VALUES (${tmdb_id}, "${title}", "${release_date}", "${poster}", "${backdrop}", ${rating})`, function(err, results){
                            if (err) throw err

                            response.json({status: 'success'})

                        })

                    })
        
                })

            }

            else {

                response.json({status: 'movie already on watch list'})

            }

        })


    }

})

app.post('/api/watchlist/remove', (request, response) => {

    console.log('Got a request to remove from a watchlist')

    let token = apiauthenticate(request.header('Authorization'))

    let user_id = token.decoded.id
    let tmdb_id = request.body.tmdb_id

    if (token.status === 'success') {

        console.log(user_id)
        console.log(tmdb_id)


        dbConnection.query(`DELETE FROM watch WHERE user_id = ${user_id} AND tmdb_id = ${tmdb_id}`, function(err, results){
            if (err) throw err

            response.json({status: 'success'})
            
        })

    }

})

//Watched list

app.post('/api/watchedlist/get', (request, response) => {

    console.log('Request made on the watched list API')

    let token = apiauthenticate(request.header('Authorization'))

    let user_id = token.decoded.id

    let searchterm = request.body.searchterm

    if (token.status === 'success') {

        if (searchterm === undefined){

            getwatchedlist = async() => {
    
                dbConnection.query(`SELECT * FROM watched WHERE user_id = ${user_id}`, function (err, results) {
                    if (err) throw err
    
                    if (results.length === 0) {
    
                        response.json({status: 'empty'})
    
                    }
                    else {
    
                        lookup = async(results) => {
    
                            const lookup = await movielookup(results)

                            const array = []

                            for (let i = 0; i < results.length; i++) {

                                const target = results[i]
                                const source = lookup[i]

                                delete source.id

                                target.focus = 'watched'

                                source.watched = 'added' 

                                const returnedTarget = Object.assign(target, source)

                                //console.log(returnedTarget)

                                array.push(returnedTarget)
                                
                            }
   
                            //response.json({status: 'success', lookup, results})
    
                            response.json({status: 'success', array})

                        }
    
                        lookup(results)
                        
    
                    }
    
    
                })
    
            }

            getwatchedlist()

        } else {

            getwatchedlist = async() => {

                console.log(searchterm)
    
                dbConnection.query(`SELECT * FROM watched WHERE user_id = ${user_id} AND title LIKE CONCAT ("${searchterm}", "%")`, function (err, results) {
                    if (err) throw err
    
                    if (results.length === 0) {
    
                        response.json({status: 'empty'})
    
                    }
                    else {
    
                        lookup = async(results) => {
    
                            const lookup = await movielookup(results)

                            const array = []

                            for (let i = 0; i < results.length; i++) {

                                const target = results[i]
                                const source = lookup[i]

                                delete source.id

                                target.focus = 'watch'

                                let release_dateRaw = source.release_date

                                let release_date = moment(release_dateRaw).format('YYYY-MM-DD')

                                source.release_date = release_date

                                source.watch = 'added' 

                                const returnedTarget = Object.assign(target, source)

                                //console.log(returnedTarget)

                                array.push(returnedTarget)
                                
                            }
   
                            //response.json({status: 'success', lookup, results})
    
                            response.json({status: 'success', array})

                        }
    
                        lookup(results)
                        
    
                    }
    
    
                })
    
            }

            getwatchedlist()


        }

    }

})

app.post('/api/watchedlist/add', (request, response) => {

    let token = apiauthenticate(request.header('Authorization'))

    let user_id = token.decoded.id
    let tmdb_id = request.body.tmdb_id
    let title = request.body.title
    let release_date = request.body.release_date
    let poster = request.body.poster
    let backdrop = request.body.backdrop
    let rating = request.body.rating

    if (token.status === 'success') {

        dbConnection.query(`SELECT * FROM watched WHERE user_id = ${user_id} AND tmdb_id = ${tmdb_id}`, function(err, results) {
            if (err) throw err

            if (results.length == 0) {

                dbConnection.query(`INSERT INTO watched (user_id, tmdb_id, title) VALUES (${user_id}, ${tmdb_id}, "${title}")`, function(err, results) {
                    if (err) throw err

                    dbConnection.query(`SELECT * FROM movies WHERE id = ${tmdb_id}`, function(err, results) {
                        if (err) throw err 

                        dbConnection.query(`REPLACE INTO movies VALUES (${tmdb_id}, "${title}", "${release_date}", "${poster}", "${backdrop}", ${rating})`, function(err, results){
                            if (err) throw err

                            response.json({status: 'success'})

                        })

                    })
        
                })

            }

            else {

                response.json({status: 'movie already on watched list'})

            }

        })


    }

})

app.post('/api/watchedlist/remove', (request, response) => {

    console.log('Got a request to remove from a watchedlist')

    let token = apiauthenticate(request.header('Authorization'))

    let user_id = token.decoded.id
    let tmdb_id = request.body.tmdb_id

    if (token.status === 'success') {

        console.log(user_id)
        console.log(tmdb_id)


        dbConnection.query(`DELETE FROM watched WHERE user_id = ${user_id} AND tmdb_id = ${tmdb_id}`, function(err, results){
            if (err) throw err

            response.json({status: 'success'})
            
        })

    }

})