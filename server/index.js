const express = require('express');
const fetch = require('node-fetch');
const mysql = require('mysql');
const jwt = require("jsonwebtoken");

/* const crypto = require('crypto');
crypto.randomBytes(64, (err, buf) => {
  if (err) throw err;
  console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
}); */

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

    //console.log(movies)

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

/* movielookup = async(movies) => {

    async function query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            dbConnection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows[0] );
            });
        });
    }

    function fakePromise(result, time) {
        return new Promise(res => {
          setTimeout(() => res(result), time);
        });
    }
      
    async function syncMap(movies) {
        return await Promise.all(movies.map(async(value) => {
            const result = await fakePromise(value, 1000);
            console.log(result.tmdb_id);
            const dbquery = await query(`SELECT * FROM movies WHERE id = ${result.tmdb_id}`)
            console.log(dbquery)
            return dbquery;
        }));
    }
    
    (async() => {
        console.log('Running...');
        //console.log(await syncMap(movies));
    })();

    return syncMap(movies)

}
 */
    
async function mapAsync(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; ++i) {
        result.push(await fn(arr[i], i, arr));
    }
    return result;
    }

async function asyncMap(movies) {
    return mapAsync(movies, async(value) => {
        const result = await fakePromise(value, 1000);
        console.log(result);
        return result;
    });
    }

app.post('/api/gettoken', (request, response) => {
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

app.post('/api/movie/search', (request, response) => {

    console.log('Request made on the search API')

    let token = apiauthenticate(request.header('Authorization'))

    let searchterm = request.body.searchterm

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

            response.json(res.results)

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

            response.json(res.results)

        }

        gettrending()

    }

})

app.post('/api/watchlist/get', (request, response) => {

    console.log('Request made on the watch list API')

    let token = apiauthenticate(request.header('Authorization'))

    let user_id = token.decoded.id

    if (token.status === 'success') {

        getwatchlist = async() => {
    
            dbConnection.query(`SELECT * FROM watch WHERE user_id = ${user_id}`, function (err, results) {
                if (err) throw err

                if (results.length === 0) {

                    response.json({status: 'empty'})

                }
                else {

                    //console.log(results)

                    lookup = async(results) => {

                        //const lookup = await movielookup(results)

                        const lookup = await movielookup(results)

                        console.log(lookup)

                        response.json({status: 'success', lookup, results})


                    }

                    lookup(results)
                    

                }


            })

        }

        getwatchlist()

    }

})

app.post('/api/watchlist/add', (request, response) => {

    let token = apiauthenticate(request.header('Authorization'))

    let user_id = token.decoded.id
    let tmdbid = request.body.tmdbid
    let title = request.body.title
    let release_date = request.body.release_date
    let poster = request.body.poster
    let backdrop = request.body.backdrop

    if (token.status === 'success') {

        dbConnection.query(`SELECT * FROM watch WHERE user_id = ${user_id} AND tmdb_id = ${tmdbid}`, function(err, results) {
            if (err) throw err

            if (results.length == 0) {

                dbConnection.query(`INSERT INTO watch (user_id, tmdb_id) VALUES (${user_id}, ${tmdbid})`, function(err, results) {
                    if (err) throw err

                    dbConnection.query(`SELECT * FROM movies WHERE id = ${tmdbid}`, function(err, results) {

                        if (err) throw err 

                        if (results.length == 0) {

                            dbConnection.query(`INSERT INTO movies VALUES (${tmdbid}, "${title}", "${release_date}", "${poster}", "${backdrop}")`)

                            response.json({status: 'success', added: 'true'})

                        }
                        else {

                            response.json({status: 'success', added: 'false'})

                        }

                    })
        
                })

            }

            else {

                response.json({status: 'movie already on watch list'})

            }

        })


    }

})