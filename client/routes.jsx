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
        hash: window.location.hash,
        configStr:FlowRouter.getQueryParam("o")
    });
  }
});

FlowRouter.route("/*", {
  action(params) {
    mount(Master, {
        query: decodeURIComponent(window.location.pathname.substr(1)),
        hash: window.location.hash,
        configStr:FlowRouter.getQueryParam("o")
    });
  }
});

FlowRouter.notFound = {
    // Subscriptions registered here don't have Fast Render support.
    // subscriptions: function() {
    //
    // },
    action() {
      mount(Master, {
          query: "",
          hash: window.location.hash,
          configStr:FlowRouter.getQueryParam("o")
      });
    }
};
