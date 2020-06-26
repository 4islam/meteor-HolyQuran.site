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
       <div className="Credits" role="tabpanel" id="Credits">
           <a data-toggle="modal" data-target="#creditsModal">Credits / Changelog
            </a>

            <div className="modal fade" id="creditsModal" role="dialog" aria-labelledby="Credits">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Credits / Changelog</h4>
                  </div>
                  <div className="modal-body">
                      <p>Arabic search made possible with data provided by: <a target="_blank" href="http://corpus.quran.com">http://corpus.quran.com</a>.</p>
                      <p>Arabic Noori Majidi text script is a work in progress.</p>
                      <p>For API support and feedback, please write to <a href="mailto:info@alislam.org">info@alislam.org</a>.</p>

                      <h5><b>Release information</b></h5>
                      <ul>
                        <b>2.95 </b>
                        <li>New query filter range option added, this includes filtering by any field. E.g. query 'a:100-104' </li>
                      </ul>

                      <ul>
                        <b>2.9 </b>
                        <li>Query filter options added, this includes filtering by any field. UI will be updated later. E.g. query 's:&gt;100 s:&lt;=114' lists all surahs greater than Surah 100 and less than equal to Surah 114 </li>
                        <li>When filter query is used exclusively, sorting by Sura and Ayah is enabled instead of search matching scores</li>
                        <li>Filters options added to each verse</li>
                      </ul>

                      <ul>
                        <b>2.8 </b>
                        <li>Option to switch script to Uthmani added</li>
                        <li>Fonts updated for other languages</li>
                        <li>UI changes to make increase font sizes</li>
                        <li>Suggest menu updated to retain direction based on existing search</li>
                        <li>Minor UI issues fixed</li>
                      </ul>

                      <ul>
                        <b>2.7 </b>
                        <li>Session retention feature restored</li>
                        <li>Suggestion menu stopped from when user searched by pressing Enter</li>
                        <li>Small Nun fixed</li>
                        <li>Minor UI enhancements including icons</li>
                      </ul>


                      <ul>
                        <b>2.6 </b>
                        <li>Loading/busy icon added</li>
                        <li>Suggestion menu autorun stopped on page load</li>
                        <li>Connection state check added</li>
                      </ul>

                      <ul>
                        <b>2.5 </b>
                        <li>Pagination limit removed, all paging is now handled on the server-side</li>
                      </ul>

                      <ul>
                        <b>2.4 </b>
                        <li>Pagination limit increased from 10 pages to 100</li>
                        <li>Some related bugs fixed</li>
                      </ul>

                      <ul>
                        <b>2.3 </b>
                        <li>Rate limiting for queries added both for Suggest and Search </li>
                        <li>Input timeout function adjusted to allow most recent query processing </li>
                      </ul>

                      <ul>
                        <b>2.2 </b>
                        <li>Suggestion list box updated to allow for removal of Arabic suggestions when not selected</li>
                        <li>Majidi font disclaimer</li>
                      </ul>

                      <ul>
                        <b>2.1 </b>
                        <li>Selecting a suggestion box now adds a space at the end removing the suggestion list</li>
                        <li>Auto switch to direction of the input box based on suggestion type added</li>
                        <li>Suggestion list box now switches direction as well</li>
                      </ul>


                      <ul><b>2.0 </b>
                        <li>Arabic Noor script added</li>
                        <li>Auto switch to direction of the input box based on keyboard input feature added</li>
                        <li>Root layer now displays roots with seperated alphabets</li>
                      </ul>

                      <ul><b>1.19 </b>
                        <li>App cache support added</li>
                      </ul>


                      <ul><b>1.18 </b>
                        <li>CSS adjusted for Safari font stuttering</li>
                      </ul>



                      <ul><b>1.17 </b>
                        <li>LTR and RTL Keyboard added to resolve Android input issues</li>
                        <li>Fonts embedded to resolve iOS 11 issue</li>
                      </ul>


                      <ul><b>1.0 </b>
                        <li>Production launch on May 26th, 2017 by the approval <a href="https://www.alislam.org/profile/hazrat-mirza-masroor-ahmad/" target="_blank">Hazrat Khalifatul Masih V</a></li>
                      </ul>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
       </div>
     )
 }
}
