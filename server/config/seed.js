/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Role = require('../api/role/role.model');
Role.find({}).remove(function() {
    Role.create(
        {
            "achievments": [],
            "company": "Sage Technologies",
            "coordinates": "53.292432, -6.425408",
            "description": "Full stack software developer for a globally recognised Sage CRM product. During this time I have been working on many projects including building E-marketing integrations, RESTful JSON APIs and ERP Integrations on a java and delphi backend.",
            "from": new Date("2013-09-30"),
            "location": "Dublin, Ireland",
            "skills": [],
            "title": "Software Engineer",
            "to": new Date("2015-08-31")
        }
        ,{
            "achievments": [],
            "company": "Sage Technologies",
            "coordinates": "53.292432, -6.425408",
            "description": "This was a dual purpose position that can be categorised into two main areas: Design and development of Add-ons and APIs that compliment the core product. This has included building our JavaScript API, designing and developing our app store and creating JavaScript libraries that simplify the use of SData (REST) API. This role has included using libraries such as jQuery and handlebars and oher modern web technologies . Design and development of integrations between Sage CRM and numerous other Sage ERP systems using SOAP and our propriety GCRM (analogous to OData) protocol. This role has involved liaising with teams from Product Management to development, with the overall goal of creating a product that compliments both systems.",
            "from": new Date("2011-09-30"),
            "location": "Dublin, Ireland",
            "skills": [],
            "title": "Integrations and Extensibility Consultant",
            "to": Date("2013-09-30")
        }, {
            "achievments": [],
            "company": "Sage Technologies",
            "coordinates": "53.292432, -6.425408",
            "description": "This role included resolving issues faced by implementation teams, building support applications to improve turnaround times and also building metrics tools to allow us to keep track of overall team performance.",
            "from": new Date("2010-09-30"),
            "location": "Dublin, Ireland",
            "skills": [],
            "title": "Level 3 Senior Support Engineer",
            "to": new Date("2011-09-30")
        }, {
            "achievments": [],
            "company": "Sage Technologies",
            "coordinates": "53.292432, -6.425408",
            "description": "The main purpose of this role was to aid implementation teams resolve issues they had with environments and software. This included advise on how to best use our APIs, providing code samples and workarounds and resolving set-up issues with IIS and Apache Tomcat.",
            "from": new Date("2008-03-31"),
            "location": "Dublin, Ireland",
            "skills": [],
            "title": "Level 3 Support Engineer",
            "to": new Date("2010-09-30")
        }, {
            "achievments": [],
            "company": "Bord Na Mona",
            "coordinates": "53.180566, -6.796610",
            "description": "The project involved implementing an electronic solution to manage all data produced by an Environmental Laboratory. My role was to analyse existing processes within the laboratory and design, maintain and document any new electronic solutions using a variety of tools working towards the goal of improving efficiency.",
            "from": new Date("2004-05-31"),
            "location": "Newbridge, Co Kildare, Ireland",
            "skills": [],
            "title": "LIMS Developer",
            "to":new Date("2007-04-30")
        }, {
            "achievments": [],
            "company": "Accenture",
            "coordinates": "49.282014, -123.1147",
            "description": "The goal of this project was to upgrade an existing content management system. The system is used by IT helpdesk agents as an information resource tool. My role was to improve the current site and facilitate the addition of new user groups.",
            "from": new Date("2007-08-31T23:00:00.000Z"),
            "location": "Accenture, Vancouver, BC, Canada",
            "skills": [],
            "title": "CMS Analyst",
            "to": new Date("2008-03-01T00:00:00.000Z")
        }
        , function(err) {
          console.log(err);
        });
});


User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});