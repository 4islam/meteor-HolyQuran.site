import React, { Component , state, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Verse from './Verse.jsx';
import Help from './Help.jsx';
import Paging from './Paging.jsx';

//SubsManager = new SubsManager();

// App component - represents the whole app
class Results extends Component {
 render() {
   r=this.props.results
   //console.log(r);
   return <div className="Result base">
       {
        r?
           r.results.hits?
             (r.results.hits.hits && r.results.hits.total>0)?
             <div>
               <div className='resultCount' dir='ltr'><small>{r.results.hits.total} verses found.</small></div>
               {Object.keys(r.results.hits.hits).map((v) => (
                  <Verse key={r.results.hits.hits[v]._id}
                      highlights={r.results.hits.hits[v].highlight}
                      score={r.results.hits.hits[v]._score}
                           {...r.results.hits.hits[v]._source}
                      setVerse={this.setVerse.bind(this)}
                      options={this.props.options}/>
               ))}
               <Paging total={r.results.hits.total}
                  setPage={this.setPage.bind(this)}
                  page={this.props.page}
                  limit={this.props.limit} />
              </div>:<div className="NoResult"><h4>Sorry, no results found</h4><hr/><Help/></div>:"...":<Help/>
       }
       </div>
 }

 setVerse(verse) {
    this.props.setVerse(verse);
 }
 setPage(page,limit) {
    this.props.setPage(page,limit);
 }

}

Results.propTypes = {
 //results: PropTypes.object.isRequired
}

export default createContainer(props => {
   //console.log(window.sessionId, props.query, window.query);
   Meteor.subscribe('Results/all'
                     ,props.query
                     ,window.sessionId
                     ,props.page
                     ,props.limit
                     ,"Results");
   return {
     results: ESCol.findOne({query:{$exists:true}}, {sort:{'session.date':-1}})
    }
}, Results);
