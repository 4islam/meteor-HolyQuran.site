import React, { Component , state } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
// import { ESCol } from '/lib/collections.js';


//SubsManager = new SubsManager();

// App component - represents the whole app
class Aggregates extends Component {

  constructor() {
    super();
    this.state = {
         hidden : "hidden"
    }
  }

  componentWillMount () {
      var that = this;
      setTimeout(function() {
          that.show();
      }, 850);
  }
  show () {
      this.setState({hidden : ""});
  }

 render() {
   //this.props.aggregates? console.log(this.props.aggregates.results.aggregations):'';

 var aggs=this.props.aggregates

 return <div className={this.state.hidden + " Aggregates base tab-pane active"} role="tabpanel" id="Summaries">
         <div className="English" dir="rtl"><span>Search cohorts:</span></div>
         <br/>
       {
         aggs?
           aggs.results.aggregations?
             aggregates.map(x=>(
               //this.props.options.map(z=>z.state?z.id:'').indexOf(x.lang) != -1?
               aggs.results.aggregations[x.id]&&aggs.results.aggregations[x.id].buckets.length>0?
                 <div key={"div " + x.id} className={"Aggregate " + x.id.replace(/_/g,' ') + ' ' + x.id}>
                   {x.name}
                   <div key={x.id} className="nav nav-pills nav-stacked">
                    {
                      aggs.results.aggregations[x.id].buckets[0]?
                        aggs.results.aggregations[x.id].buckets.map(y=>
                        (y.key!="سورة")?
                          <span className="cohorts" key={x.id+y.key}>
                            <a onClick={this.handleChange.bind(this, y.key, x.esField)} dangerouslySetInnerHTML={{ __html: y.key }}/> <span className="cohortsCount">{y.doc_count}</span>
                          </span>:''
                        ):<br/>
                    }
                    </div>
                    <hr/>
                  </div>:""
                //  :<span>{x.lang}</span>
             ))
           :'':''
       }
       </div>
 }
 handleChange(query, filterField) {
   // console.log(query, options, "target: " + field);
   // this.props.search(window.query+' '+query, this.props.options);
   this.props.search(window.query + ' '+filterField+':"'+query+'"', this.props.options);
   // $(window.inputId)[0].value = window.query+' '+query;
   $(window.inputId)[0].value = window.query + ' '+filterField+':"'+query+'"';
 }
}

Aggregates.propTypes = {
 //aggregates: PropTypes.object.isRequired
}

export default Aggregates = withTracker(props => {
   // aggSessionId=localStorage.getItem('clientId')?localStorage.getItem('clientId'):window.sessionId
   // console.log('Aggregates',aggSessionId);
   Meteor.subscribe('Aggregates/all');
   return {
     aggregates: ESColAggregates.findOne({},{sort:{'session.date':-1}})
    }
})(Aggregates);
