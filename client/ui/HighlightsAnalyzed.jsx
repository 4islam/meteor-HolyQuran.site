import React, { Component , state } from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';

import TokenHighlights from './TokenHighlights.jsx';

class HighlightsAnalyzed extends Component {
  
 render() {
   //console.log(this.props.highlights);
   return <div className="HighlightsAnalyzed base tab-pane" role="tabpanel" id="Etymology">
           <table><tbody>
             <tr>
               <td><span className="Arabic">:أصل الكلمة</span></td>
               <td><span className="English">Etymology Details:</span></td>
             </tr></tbody>
           </table>
            {this.props.highlights && this.props.tags?
              this.props.highlights.analysis && this.props.tags.tags?
                 <TokenHighlights
                   data={this.props.highlights.analysis}
                   tags={this.props.tags.tags}
                   query={this.props.query}
                   search={this.props.search}
                   options={this.props.options}/>
                 :'..':'...'
            }
       </div>
   }
   handleChange(query, e) {
     //console.log(query, options, e.target);
     this.props.search(query, this.props.options);
     $(window.inputId)[0].value = query;
   }
}

HighlightsAnalyzed.propTypes = {
 //highlights: PropTypes.object.isRequired
}

export default HighlightsAnalyzed = withTracker(props => {
   Meteor.subscribe('AnalysisHighlights','', window.sessionId);
   Meteor.subscribe('Results/all',props.query, window.sessionId,props.page
   ,props.limit,"HighlightsAnalyzed");
   return {
     highlights: ESAnalyzerHighlightsCol.findOne({}, {sort:{'session.date':-1}}),
     tags: ESCol.findOne({query:{$exists:true}}, {sort:{'session.date':-1}})
    }
})(HighlightsAnalyzed);
