import React, { Component , state } from 'react';
import PropTypes from 'prop-types';

import Credits from './Credits.jsx';
import { createContainer } from 'meteor/react-meteor-data';
// import { ESCol } from '/lib/collections.js';


//SubsManager = new SubsManager();

// App component - represents the whole app
export default class Help extends Component {

 render() {
   //this.props? console.log(this.props):'';
   return (
       <div className="Help base tab-pane" role="tabpanel" id="Help">
           <p>The Qur'an search uses Arabic roots, stems, phonetics,
            transliterations and translations to find relevant verses. <a className="link"
               data-toggle="modal" data-target="#helpModal">
              <b><i>Click here for additional help.</i></b>
            </a>
          </p>

           <div className="list-group">
             <p>Some example searches by types are:</p>
             <ul className="nav-stacked">
                 <li><em>Translation</em><br/><a target="_self" href="/Muhammad">Muhammad</a></li>
                 <li><em>Phonetic (transliteration) - Works without vowels</em><br/><a target="_self"  href="/msjd">msjd</a></li>
                 <li><em>Search relevance based on Arabic roots</em><br/><a target="_self" href="/جَنَّٰتٍ">جَنَّٰتٍ</a></li>
                 <li><em>Search relevance based on Arabic stems</em><br/><a target="_self"  href="/دَاوُد">دَاوُد</a></li>
                 <li><em>Roots - Works without spaces</em><br/><a target="_self" href="/جنن">جنن</a></li>
                 <li><em>Stems</em><br/><a target="_self" href="جَنَّۃ">جَنَّۃ</a></li>
                 <li><em>Multi-word</em><br/><a target="_self"  href="/وَاتَّقُوا%20اللّٰہَ">وَاتَّقُوا اللّٰہَ</a></li>
                 <li><em>Specific verse</em><br/><a target="_self" href="/24:36">24:36</a> or <a target="_self" href="/۲۴:۳۶">۲۴:۳۶</a></li>
                 <li><em>Filter query examples:</em><br/>
                 <ul>
                   <li><a target="_self" href="/Allah s:50">Search for Allah in Sura 50</a></li>
                   <li><a target="_self" href="/TopicsEn:%22Jonah%22">Search for Jonah in English Topics</a></li>
                   <li><a target="_self" href="/s:>100 s:<=114">Sura 101 to 114</a></li>
                   <li><a target="_self" href="/Juz:30">Part 30</a></li>
                   <li><a target="_self" href="/a:4">Ayah 4 across all chapters</a></li>
                   <li><a target="_self" href="/Ruku:99">Show Ruku 99</a></li>
                   <li><a target="_self" href="/Sajda_id:>0">Show all verses with Sajdah</a></li>
                   <li><a target="_self" href="/s:59%20a:22-24">Show verses 22 to 24 in Sura 59</a></li>
                   <li><a target="_self" href="/ayah:2:2%20ayah:3:2%20ayah:7:2%20ayah:10:2%20ayah:11:2%20ayah:12:2%20ayah:13:2%20ayah:14:2%20ayah:15:2%20ayah:19:2%20ayah:20:2%20ayah:26:2%20ayah:27:2%20ayah:28:2%20ayah:29:2%20ayah:30:2%20ayah:31:2%20ayah:32:2%20ayah:36:2%20ayah:38:2%20ayah:40:2%20ayah:41:2%20ayah:42:2%20ayah:43:2%20ayah:44:2%20ayah:45:2%20ayah:46:2%20ayah:50:2%20ayah:68:2">Collection of verses with Huroof-Muqataat (حروف مقطعات)</a></li>
                   <li><a target="_self" href="/a%3A<>1">Show all verses (ayah) except first one</a></li>
                   <li><a target="_self" href="/Juz%3A<>2-29#1:1">Do not show parts (Juz) 2 to 29</a></li>
                 </ul>
                 </li>
             </ul>
             <br/>
             <i><Credits/></i>
            </div>

            <div className="modal fade" id="helpModal" role="dialog" aria-labelledby="Help">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Help Version 1.0</h4>
                  </div>
                  <div className="modal-body">
                    <iframe src="help_1.0.html"></iframe>
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
