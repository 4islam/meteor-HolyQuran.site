import React, { Component , state, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
// import { ESCol } from '/lib/collections.js';


//SubsManager = new SubsManager();

// App component - represents the whole app
class Iframe extends Component {

 constructor () {
   super();
   //this.getNextVerse = this.getNextVerse.bind(this);
 }

 render() {
   return <div className="Iframe base">
       <div className="head" dir="ltr">
         <h4>
           Verse:
           <a className="previous" onClick={(e)=>this.getNextVerse(this.props.verse, "previous")}>
            <span className="glyphicon glyphicon-menu-right"></span>
           </a>
             {" " + this.props.verse}
             <a className="next" onClick={(e)=>this.getNextVerse(this.props.verse, "next")}>
              <span className="glyphicon glyphicon-menu-left"></span>
             </a>
         </h4>
       </div>
       <hr/>
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

 getNextVerse(verse, dir){
   Meteor.call('getPageAdjVerse', verse, dir, function(error, result) {
     this.props.setVerse(result);
   }.bind(this))
 }
}

Iframe.propTypes = {
 //aggregates: PropTypes.object.isRequired
}

export default createContainer(props => {
   Meteor.subscribe('getPage',props.verse, window.sessionId);
   return {
     pages: Pages.findOne({verse:props.verse})
    }
}, Iframe);
