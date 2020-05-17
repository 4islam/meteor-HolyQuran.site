import React, { Component , state } from 'react';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';

// App component - represents the whole app
export default class Paging extends Component {
 render() {
   var pages_total = this.props.total/this.props.limit;
   // console.log(pages_total,this.props.total/this.props.limit);
   var pages=[]; var dots=false;
   for (var i = 0; i < pages_total && i < 100; i++) {  //  && i < 100 to be removed once ES limits are updated
     if (i < 7) {
      pages.push({page:i+1})
      dots=false
    } else if (i < 50 && (i%10) == 0) {
      pages.push({page:i+1})
      dots=false
    } else if (i < 300 && (i%100) == 0) {
      pages.push({page:i+1})
      dots=false
    } else {
      if (!dots) {
        pages.push({page:'..'})
        dots=true
      }
      if (i+1 == this.props.page) {
        pages.push({page:i+1})
        dots=false
      }
    }
   }
   //console.log(pages_total,pages)
   return (
       <ul className="Paging base pagination pagination-sm">
         <li><a onClick={this.prevPage.bind(this)}>&laquo;</a></li>
         {
           pages.map((p,i) => (
             <li className={p.page==(this.props.page)?'active':''} key={p.page+i}>
               {isNaN(p.page)?<span>{p.page}</span>:
                 <a onClick={p.page!=(this.props.page)?()=>this.updatePage(p.page,this.props.limit):''}>{p.page}</a>
               }
             </li>))
         }
         <li><a onClick={this.nextPage.bind(this)}>&raquo;</a></li>
       </ul>
     )
 }
 updatePage(page,limit) {
   // console.log(window.query,this.props.options,page,limit)
  this.props.search(window.query,this.props.options,page,limit)
  //window.scroll(0,0)  //scroll to top
 }
 nextPage() {
  if (this.props.page < this.props.total / this.props.limit) { //  && this.props.page < 100 to be removed once ES limits are updated
   this.updatePage(this.props.page+1,this.props.limit)
  }
 }
 prevPage() {
  if (this.props.page-1 > 1) {
   this.updatePage(this.props.page-1,this.props.limit)
  }
 }
}
