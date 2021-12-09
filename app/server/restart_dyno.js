let token = process.env.HEROKU_TOKEN;
let appName = 'inforum-server';

let Heroku = require('heroku-client');

let heroku = new Heroku({ token: token });
heroku.delete('/apps/' + appName + '/dynos/').then( x => console.log(x) );