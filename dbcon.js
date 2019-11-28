var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_graebelk',
  password        : '9859',
  database        : 'cs361_graebelk'
});

module.exports.pool = pool;
