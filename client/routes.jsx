import React from 'react';
import {mount} from 'react-mounter';
// load Layout and Welcome React components
import Master from './master.jsx';

//FlowRouter.wait();


  //window.sessionId = id; //TODO: This needs to be loaded for all routes to work. Subscribtion can be declaired and bound. NI

  // if (localStorage.getItem('clientId')) {
  //   window.sessionId = localStorage.getItem('clientId');
  // } else {
  //   Meteor.call("getSessionId", function(err, id) {
  //     localStorage.setItem('clientId',id);
  //   });
  // }

  // FlowRouter.initialize(
  //  //{hashbang: true}
  // ) //Flowrouter.go after wait above


FlowRouter.route("/", {
  // subscriptions: function(params) {
  //   this.register('getSessionId', Meteor.subscribe('getSessionId'));
  // },
  action() {
    mount(Master, {
        query: "",
        hash: window.location.hash
    });
  }
});

FlowRouter.route("/:query", {
  action(params) {
    mount(Master, {
        query: params.query,
        hash: window.location.hash
    });
  }
});
