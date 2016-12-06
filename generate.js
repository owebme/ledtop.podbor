var libs = process.cwd() + '/libs/';
var config = require(libs + 'config');
var utils = require(libs + 'utils');
var validator = require('validator');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

MongoClient.connect(config.get('mongodb:uri'), function(err, db) {

	db.collection('accounts').drop();
	db.collection('accounts').insert(accounts);
});

var ACCOUNT_ID = ObjectId();

var accounts = [
	{
		_id: ACCOUNT_ID,
		post: "admin",
        name: "Роман",
        surname: "Хохлов",
        gender: "male",
        email: "roman@mail.com",
        phone: "9286094753",
        skype: null,
        social: null,
        login: "roman",
        password: utils.cryptoPass("123456"),
        create: validator.toDate("2016-11-30 19:57"),
        visite: validator.toDate("2016-11-30 19:57")
	}
];
