/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

Refer to the q documentation for why and how q.invoke is used.

*/

var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Video = mongoose.model('Video');
var q = require('q');
var chalk = require('chalk');

var getCurrentUserData = function() {
    return q.ninvoke(User, 'find', {});
};

var seedUsers = function() {

    var users = [{
        email: 'testing@fsa.com',
        password: 'password',
        powerLevel: 'admin'
    }, {
        email: 'obama@gmail.com',
        password: 'potus'
    }];

    return q.invoke(User, 'create', users);

};

var seedVideos = function() {

    var videos = [{
        name: 'Intro To TDD',
        url: 'https://www.youtube.com/watch?v=79_dcC0nWrI',
        embedId: '79_dcC0nWrI',
        tags: [{
            text: 'test'
        }, {
            text: 'driven'
        }, {
            text: 'development'
        }]
    }, {
        name: '00 Hello Test Spec Overview',
        url: 'https://www.youtube.com/watch?v=62b3UHQMepg',
        embedId: '62b3UHQMepg',
        tags: [{
            text: 'helloworld'
        }, {
            text: 'testspec'
        }]
    }, {
        name: '01 Properties Lesson',
        url: 'https://www.youtube.com/watch?v=12-koAF6T18',
        embedId: '12-koAF6T18',
        tags: [{
            text: 'properties'
        }]
    }, {
        name: '01 Properties Test Spec',
        url: 'https://www.youtube.com/watch?v=t5jbGODPf1M',
        embedId: 't5jbGODPf1M',
        tags: [{
            text: 'properties'
        }, {
            text: 'testspec'
        }]
    }, {
        name: '02 What is “this”',
        url: 'https://www.youtube.com/watch?v=4Nxx_lJ6SF8',
        embedId: '4Nxx_lJ6SF8',
        tags: [{
            text: 'this'
        }]
    }, {
        name: '02 Calculator Test Spec',
        url: 'https://www.youtube.com/watch?v=GOU5dMcenvU',
        embedId: 'GOU5dMcenvU',
        tags: [{
            text: 'calculator'
        }, {
            text: 'testspec'
        }]
    }, {
        name: '03 RPN Calc New and Constructor',
        url: 'https://www.youtube.com/watch?v=SQMkQOLlWAw',
        embedId: 'SQMkQOLlWAw',
        tags: [{
            text: 'calculator'
        }, {
            text: 'testspec'
        }]
    }, {
        name: '03 What is an RPN Calc',
        url: 'https://www.youtube.com/watch?v=PoI1sX9F4tA',
        embedId: 'PoI1sX9F4tA',
        tags: [{
            text: 'rpncalc'
        }]
    }, {
        name: '03 Throw Error and Test Spec',
        url: 'https://www.youtube.com/watch?v=7_Auxy_mRfM',
        embedId: '7_Auxy_mRfM',
        tags: [{
            text: 'testspec'
        }, {
            text: 'rpncalc'
        }]
    }, {
        name: '04 Loops Lesson',
        url: 'https://www.youtube.com/watch?v=yJd7R-Ac4Uo',
        embedId: 'yJd7R-Ac4Uo',
        tags: [{
            text: 'loops'
        }]
    }, {
        name: '05 Higher Order Func ',
        url: 'https://www.youtube.com/watch?v=SNBn8Y5kTeY',
        embedId: 'SNBn8Y5kTeY',
        tags: [{
            text: 'higherorderfunction'
        }, {
            text: 'function'
        }]
    }, {
        name: '05 Scope Closure and Call Stack ',
        url: 'https://www.youtube.com/watch?v=gLCNZHB1v5g',
        embedId: 'gLCNZHB1v5g',
        tags: [{
            text: 'scope'
        }, {
            text: 'closure'
        }, {
            text: 'callstack'
        }, {
            text: 'function'
        }]
    }, {
        name: '06 Functional Programming: Examples ',
        url: 'https://www.youtube.com/watch?v=oLgptFpm2Ds',
        embedId: 'oLgptFpm2Ds',
        tags: [{
            text: 'functionalprogramming'
        }]
    }, {
        name: '07 Objects By Reference vs By Value',
        url: 'https://www.youtube.com/watch?v=M1IlcBHu0Dk',
        embedId: 'M1IlcBHu0Dk',
        tags: [{
            text: 'object'
        }, {
            text: 'byreference'
        }, {
            text: 'byvalue'
        }]
    }, {
        name: '07 Classical Model Review',
        url: 'https://www.youtube.com/watch?v=AN8sqt9nESY',
        embedId: 'AN8sqt9nESY',
        tags: [{
            text: 'object'
        }]
    }, {
        name: '07 Object.Create ',
        url: 'https://www.youtube.com/watch?v=N8JgAOfiD3c',
        embedId: 'N8JgAOfiD3c',
        tags: [{
            text: 'object'
        }, {
            text: 'create'
        }]
    }, {
        name: '07 Chaining Prototypes ',
        url: 'https://www.youtube.com/watch?v=B_imiuk23bI',
        embedId: 'B_imiuk23bI',
        tags: [{
            text: 'chaining'
        }, {
            text: 'prototype'
        }, {
            text: 'object'
        }]
    }, {
        name: '07 Creating Inheritance Chain',
        url: 'https://www.youtube.com/watch?v=NmWW_zQ5Xfs',
        embedId: 'NmWW_zQ5Xfs',
        tags: [{
            text: 'inheritance'
        }, {
            text: 'chain'
        }, {
            text: 'object'
        }]
    }, {
        name: '08 Recursion',
        url: 'https://www.youtube.com/watch?v=GS6nYPKE7Ho',
        embedId: 'GS6nYPKE7Ho',
        tags: [{
            text: 'recursion'
        }]
    }]

    return q.invoke(Video, 'create', videos);
}

connectToDb.then(function() {
    getCurrentUserData().then(function(users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function() {
        return seedVideos();
    }).then(function() {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function(err) {
        console.error(err);
        process.kill(1);
    });
});