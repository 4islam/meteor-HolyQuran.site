import React, { Component , state, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Tokens from './Tokens.jsx';

class Analyze extends Component {
 render() {
   //console.log(this.props.analyze)
   return <div className="Analyze base well table-responsive">
            {this.props.analyze?
              this.props.analyze.analysis?
                 <Tokens data={this.props.analyze.analysis} verse={this.props.verse}/>
                 :'':'...'
            }
       </div>
   }
}

Analyze.propTypes = {
 //analysis: PropTypes.object.isRequired
}

export default createContainer(props => {
   Meteor.subscribe('Analysis','', window.sessionId);
   return {
     analyze: ESAnalyzerCol.findOne({id:props.verse})
    }
}, Analyze);
