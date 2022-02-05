import React, { Component , state } from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';
import Tokens from './Tokens.jsx';

class Analyze extends Component {
 render() {
   //console.log(this.props.analyze)
   return <div className="Analyze base well table-responsive">
            {this.props.analyze?
              this.props.analyze.analysis?
                 <Tokens data={this.props.analyze.analysis} verse={this.props.verse} Type={this.props.Type}/>
                 :null:<span className="glyphicon glyphicon-option-horizontal gly-spin"></span>
            }
       </div>
   }
}

Analyze.propTypes = {
 //analysis: PropTypes.object.isRequired
}

export default Analyze = withTracker(props => {
   Meteor.subscribe('Analysis','', window.sessionId);
   return {
     analyze: ESAnalyzerCol.findOne({id:props.verse})
    }
})(Analyze);
