import React, { Component , state } from 'react';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';

// App component - represents the whole app
export default class Paging extends Component {
 render() {
   pages_total = this.props.total/this.props.limit;
   pages=[];
   for (var i = 0; i < pages_total && i < 10; i++) {  //  && i < 100 to be removed once ES limits are updated
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
    }
   }
   //console.log(pages_total,pages)
   return (
       <ul className="Paging base pagination pagination-sm">
         <li><a onClick={this.prevPage.bind(this)}>&laquo;</a></li>
         {
           pages.map((p,i) => (
             <li className={p.page==(this.props.page)?'active':''} key={p.page+i}>
               {isNaN(p.page)?p.page:
                 <a onClick={()=>this.setPage(p.page,this.props.limit)}>{p.page}</a>
               }
             </li>))
         }
         <li><a onClick={this.nextPage.bind(this)}>&raquo;</a></li>
       </ul>
     )
 }
 setPage(page,limit) {
  this.props.setPage(page,limit)
  window.scroll(0,0)  //scroll to top
 }
 nextPage() {
  if (this.props.page < this.props.total / this.props.limit && this.props.page < 10) { //  && this.props.page < 100 to be removed once ES limits are updated
   this.setPage(this.props.page+1,this.props.limit)
  }
 }
 prevPage() {
  if (this.props.page-1 > 1) {
   this.setPage(this.props.page-1,this.props.limit)
  }
 }
}
