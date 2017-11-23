import React, { Component , state } from 'react';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';
// import { ESCol } from '/lib/collections.js';


//SubsManager = new SubsManager();

// App component - represents the whole app
export default class Credits extends Component {

 render() {
   //this.props? console.log(this.props):'';
   return (
       <li className="Credits" role="tabpanel" id="Credits">
           <a data-toggle="modal" data-target="#creditsModal">Credits
            </a>

            <div className="modal fade" id="creditsModal" role="dialog" aria-labelledby="Credits">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Holy Qur'an Advanced Search v1.18</h4>
                  </div>
                  <div className="modal-body">
                    <iframe src="credits.html"></iframe>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
       </li>
     )
 }
}
