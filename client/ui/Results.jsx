import React, { Component , state } from 'react';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';
import Verse from './Verse.jsx';
import Help from './Help.jsx';
import Paging from './Paging.jsx';

//SubsManager = new SubsManager();

// App component - represents the whole app
class Results extends Component {

componentDidMount() {
  window.autosearch=false
  window.searchedQuery=""
  window.layersMessage=""
}

componentWillMount() {

}

componentDidUpdate () {
  var r=this.props.results
  window.autosearch=window.query==window.searchedQuery?false:true
  // $(window.inputId)[0].value = window.query
  if (window.autosearch && r && r.results.hits && r.results.hits.hits && r.results.hits.total.value==0) {
      window.searchedQuery=window.query
      // window.layersMessage=" all layers (except Chinese)"
      this.globalSearch(1, this.props.limit)
      // console.log("should have called")
  } else {
    window.autosearch=true;
  }
}

 render() {
   var r=this.props.results
   return <div className="Result base">
       {
        r?
           r.results.hits?
             (r.results.hits.hits && r.results.hits.total.value>0)?
             <div>
              {window.layersMessage=""}
               <div className='resultCount' dir='ltr'><small>{r.results.hits.total.value} verses found ({r.results.took}ms).</small></div>
               {Object.keys(r.results.hits.hits).map((v) => (
                  <Verse key={r.results.hits.hits[v]._id}
                      highlights={r.results.hits.hits[v].highlight}
                      score={r.results.hits.hits[v]._score}
                           {...r.results.hits.hits[v]._source}
                      setVerse={this.setVerse.bind(this)}
                      options={this.props.options}
                      search={this.props.search.bind(this)}
                      hideUnmatched={this.props.hideUnmatched}
                      analyzers={this.props.analyzers}
                      switchLayers={this.props.switchLayers}/>

               ))}
               <Paging total={r.results.hits.total.value}
                  setPage={this.setPage.bind(this)}
                  options={this.props.options}
                  search={this.props.search.bind(this)}
                  page={this.props.page}
                  limit={this.props.limit} />
              </div>:<div className="NoResult"><h4>Sorry, no results found {window.layersMessage}</h4><hr/><h5><br/>See advance filter examples below for more details</h5><hr/><Help/></div>:"...":<Help/>
       }
       </div>
 }

 setVerse(verse) {
    this.props.setVerse(verse);
 }
 setPage(page,limit) {
    this.props.setPage(page,limit);
 }
//{this.globalSearch(this, 1, this.props.limit)}
 globalSearch(page,limit) {
   // console.log(page,limit);
   // window.query = ":\""+window.query.replace(/"|\:/g,'') + "\""

   window.layersMessage+=" Searching in all layers "
   this.props.switchLayers(true)
   this.props.options.map(y=>{if (!y.id.match(/Chinese/i)){y.state=true}})

   const myTimeout = setTimeout(function(){
     window.layersMessage+=" (done)"
      $('button.Search').trigger("click")
   },1000)


   try {
     // setTimeout(this.props.search, 1000, window.query, this.props.options,page,limit);
     // this.props.search(window.query,this.props.options,page,limit)

   } catch (e) {

   }

   // alert(1)
 }

}

Results.propTypes = {
 // results: PropTypes.object.isRequired
}

export default createContainer(props => {
   // console.log(window.sessionId, props, window.query);
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
