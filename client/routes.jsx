import React from 'react';
import {mount} from 'react-mounter';
// load Layout and Welcome React components
import Master from './master.jsx';

FlowRouter.wait();

Meteor.call("getSessionId", function(err, id) {
  window.sessionId = id; //TODO: This needs to be loaded for all routes to work. Subscribtion can be declaired and bound. NI
  if (localStorage.getItem('clientId')) {
    window.sessionId = localStorage.getItem('clientId');
  } else {
    localStorage.setItem('clientId',id);
  }
  FlowRouter.initialize(
   {hashbang: true}
  ) //Flowrouter.go after wait above
});

FlowRouter.route("/", {
  // subscriptions: function(params) {
  //   this.register('getSessionId', Meteor.subscribe('getSessionId'));
  // },
  action() {
    mount(Master, {
        uri: "",
        query: "",
        hash: ""
    });
  }
});

// FlowRouter.route("/:query?#:hash?", {
//   action(params) {
//     mount(Master, {
//         query: params.query,
//         hash: params.hash
//     });
//   }
// });

// FlowRouter.route("/#:hash", {
//   action(params) {
//     mount(Master, {
//         hash: params.hash
//     });
//   }
// });

var re = new RegExp("#.*")

FlowRouter.route("/:query", {
  action(params) {
    mount(Master, {
        uri: params.query,
        query:
        (params.query.search(re)!=-1)?params.query.replace(/^(.*)\#(.*)$/g,'$1'):
        params.query,
        hash: (params.query.search(re)!=-1)?params.query.replace(/^(.*)\#(.*)$/g,'$2'):''
    });
  }
});

// FlowRouter.route("/:query#:hash?", {
//   action(params) {
//     mount(Master, {
//         query: params.query,
//         hash: "params.hash"
//     });
//   }
// });
