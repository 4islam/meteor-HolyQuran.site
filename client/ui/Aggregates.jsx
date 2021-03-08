import React, { Component , state } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
// import { ESCol } from '/lib/collections.js';


//SubsManager = new SubsManager();

// App component - represents the whole app
class Aggregates extends Component {

 render() {
   //this.props.aggregates? console.log(this.props.aggregates.results.aggregations):'';

 var aggs=this.props.aggregates

 return <div className="Aggregates base tab-pane active" role="tabpanel" id="Summaries">
         <div className="English" dir="rtl"><span>Search cohorts:</span></div>
         <br/>
       {
         aggs?
           aggs.results.aggregations?
             aggregates.map(x=>(
               //this.props.options.map(z=>z.state?z.id:'').indexOf(x.lang) != -1?
                 <div key={"div " + x.id} className={"Aggregate " + x.id.replace(/_/g,' ') + ' ' + x.id}>
                   {x.name}
                   <div key={x.id} className="nav nav-pills nav-stacked">
                    {
                      aggs.results.aggregations[x.id]?
                      aggs.results.aggregations[x.id].buckets[0]?
                        aggs.results.aggregations[x.id].buckets.map(y=>
                        (y.key!="سورة")?
                          <span className="cohorts" key={x.id+y.key}>
                            <a onClick={this.handleChange.bind(this, y.key)}>{y.key}</a> <span className="cohortsCount">{y.doc_count}</span>
                          </span>:''
                        ):<br/>:''
                    }
                    </div>
                    <hr/>
                  </div>
                //  :<span>{x.lang}</span>
             ))
           :'':''
       }
       </div>
 }
 handleChange(query, e) {
   //console.log(query, options, e.target);
   // this.props.search(window.query+' '+query, this.props.options);
   this.props.search(query, this.props.options);
   // $(window.inputId)[0].value = window.query+' '+query;
   $(window.inputId)[0].value = query;
 }
}

Aggregates.propTypes = {
 //aggregates: PropTypes.object.isRequired
}

export default createContainer(props => {
   //console.log(window.sessionId, props.query, window.query);
   Meteor.subscribe('Results/all',props.query, window.sessionId,props.page
   ,props.limit,"Aggregates");
   return {
     aggregates: ESCol.findOne({query:{$exists:true}}, {sort:{'session.date':-1}})
    }
}, Aggregates);
