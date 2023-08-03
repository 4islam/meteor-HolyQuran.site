import React, { Component , state } from 'react';
import PropTypes from 'prop-types';
import IframeVerse from './IframeVerse.jsx'

import { withTracker } from 'meteor/react-meteor-data';
// import { ESCol } from '/lib/collections.js';


//SubsManager = new SubsManager();

// App component - represents the whole app
class Iframe extends Component {

 constructor () {
   super();
   //this.getNextVerse = this.getNextVerse.bind(this);
 }

 render() {
   return <div className="Iframe base modal-content">
     <div className="modal-header">
       <div className="head" dir="ltr">
        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups pull-left">
           <button type="button" className="btn btn-secondary input-group" onClick={(e)=>this.getNextVerse(this.props.verse, "previous")}>
             <span className="glyphicon glyphicon-menu-down"></span>
           </button>
           <span className="btn btn-secondary input-group" style={{width: '-webkit-calc(100% - 150px)'}}>
            <b>Verse {" " + this.props.verse}</b>
           </span>
           <button type="button" className="btn btn-secondary input-group pull-right" onClick={(e)=>this.getNextVerse(this.props.verse, "next")}>
             <span className="glyphicon glyphicon-menu-up"></span>
           </button>
           { (this.props.showClose)?
             <button type="button" className="btn btn-secondary input-group pull-right" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>:''
           }
        </div>
       </div>
     </div>
     <div className="modal-body">
       {
         this.props.pages?
            <span dangerouslySetInnerHTML={{__html: this.props.pages.page}}></span>
         :''
       }
       <IframeVerse verse={this.props.verse} options={this.props.options}/>
       </div>
       { (this.props.showClose)?
         <div className="modal-footer">
             <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>

         </div>:''
       }
     </div>

 }
 handleChange(query, e) {
   //console.log(query, options, e.target);
   this.props.search(window.query+' '+query, this.props.options);
 }

 getNextVerse(verse, dir){
   Meteor.call('getPageAdjVerse', verse, dir, function(error, result) {
     Meteor.call('getPage',result, function(e, r) {
       this.props.setVerse(result);
     }.bind(this));
   }.bind(this))
 }
}

Iframe.propTypes = {
 //aggregates: PropTypes.object.isRequired
}

export default Iframe = withTracker(props => {
   Meteor.subscribe('getPage',props.verse, window.sessionId);
   return {
     pages: Pages.findOne({verse:props.verse})
    }
})(Iframe);
