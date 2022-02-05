import React, { Component , state } from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';
//SubsManager = new SubsManager();

// App component - represents the whole app
class Highlights extends Component {
 render() {
   //console.log(this.props.tags);
   return <div className="Highlights">
       {
         this.props.tags?
          this.props.tags.tags?
            <ul className="nav nav-pills">
             {
               this.props.tags.tags.map((t) => (
                <li key={t.token.id}><a onClick={this.handleChange.bind(this, t.token.id)}>{t.token.id} ({t.token.count})</a></li>
               ))
             }
            </ul>:'..':'...'
       }
       </div>
 }

 handleChange(query, e) {
   //console.log(query, options, e.target);
   var options = this.props.options;
   //options.  //TODO
   this.props.search(query, options);
   $(window.inputId)[0].value = query;
 }


}

Highlights.propTypes = {
 //results: PropTypes.object.isRequired
}

export default Highlights = withTracker(props => {
   //console.log(window.sessionId, props.query, window.query);
   Meteor.subscribe('Results/all',props.query, window.sessionId,props.page
   ,props.limit,"Highlights");
   return {
     tags: ESCol.findOne({query:{$exists:true}}, {sort:{'session.date':-1}})
    }
})(Highlights);
