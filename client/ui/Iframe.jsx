import React, { Component , state, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
// import { ESCol } from '/lib/collections.js';


//SubsManager = new SubsManager();

// App component - represents the whole app
class Iframe extends Component {

 render() {
   //this.props? console.log(this.props):'';
   return <div className="Iframe base">
       {
         this.props.pages?
            <span dangerouslySetInnerHTML={{__html: this.props.pages.page}}></span>
         :''
       }
       </div>
 }
 handleChange(query, e) {
   //console.log(query, options, e.target);
   this.props.search(window.query+' '+query, this.props.options);
 }
}

Iframe.propTypes = {
 //aggregates: PropTypes.object.isRequired
}

export default createContainer(props => {
   //console.log(window.sessionId, props.query, window.query);
   Meteor.subscribe('getPage',props.verse, window.sessionId);
   return {
     pages: Pages.findOne({verse:props.verse})
    }
}, Iframe);
