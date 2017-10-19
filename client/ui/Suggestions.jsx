import React, { Component , state, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
// import { ESCol } from '/lib/collections.js';


//SubsManager = new SubsManager();

// App component - represents the whole app
class Suggestions extends Component {
 render() {
   return <div className="Suggest base">
       {
         this.props.suggestions? Object.keys(this.props.suggestions.results.suggest).map(x=>
            <div key={"div " + x} className={"Suggest " + x}>
              <ul key={x} className="nav nav-pills">
              {
                this.props.suggestions.results.suggest[x][0]?this.props.suggestions.results.suggest[x][0].options.map(y=>
                  (y.score > 0.01)?<li key={x+y.text}><a onClick={this.handleChange.bind(this, y.text)}><span dangerouslySetInnerHTML={{__html: y.highlighted?y.highlighted:y.text}}></span></a></li>:''
                ):''
              }
              </ul>
            </div>
         ):''
       }
       </div>
 }
 handleChange(query, e) {
   //console.log(query, options, e.target);
   this.props.search(query, this.props.options);
   $(window.inputId)[0].value = query;
 }

}

Suggestions.propTypes = {
 //suggestions: PropTypes.object.isRequired
}

export default createContainer(props => {
   //console.log(window.sessionId, props.query, window.query);
   Meteor.subscribe('Results/all',props.query, window.sessionId,props.page
   ,props.limit,"Suggest");
   return {
     suggestions: ESCol.findOne({query:{$exists:true}}, {sort:{'session.date':-1}})
    }
}, Suggestions);
