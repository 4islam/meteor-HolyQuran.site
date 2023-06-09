import React, { Component , state } from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';
// import { ESCol } from '/lib/collections.js';



//SubsManager = new SubsManager();

// App component - represents the whole app
class Queries extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }


 render() {
  //  this.props.queries.map(function (x){
  //     console.log(x.results)
  //  })
   return (
     <div className="Queries tab-pane" role="tabpanel" id="Queries" dir="ltr">
       <span className="English">Previous Searches:</span>
       <ul className="nav nav-pills Queries" dir="rtl">
       {
         this.props.queries? this.props.queries.map(x =>
             <li className="btn-block btn btn-xs" key={x._id} dir="ltr">
               <a onClick={()=>this.handleChange(x.query, x.options)}>{x.query.replace(/\\:/g,':') } {JSON.parse(x.options).map(y=>
                y.state? <span className={"query highlights " + y.id} key={'span_' + y.id}>
                    <mark>{y.name.substring(0,2)}</mark>
                  </span>:''
               )} ({(x.results.hits)?(x.results.hits.total.value)?x.results.hits.total.value:'0':'0'})</a>
             </li>
         ) : '...'
       }</ul>
      </div>
     )
 }
 handleChange(query, options) {
   //console.log(query, options);
   query=query.replace(/\\:/g,':')
   this.props.search(query, JSON.parse(options));
   $(window.inputId)[0].value = query;
 }
}

Queries.propTypes = {
 queries: PropTypes.array.isRequired
}

export default Queries = withTracker(props => {
   Meteor.subscribe('Results/all',props.query, window.sessionId,props.page
   ,props.limit,"Queries");
   return {
     queries: ESCol.find({}, {sort:{'session.date':-1}}).fetch()
    }
})(Queries);
