import React, { Component , state } from 'react';
import PropTypes from 'prop-types';
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
                        <b>6.15.2: </b>
                        <li>Search scope configuration now retains in URL making results shareable</li>
                      </ul>

                      <ul>
                        <b>6.15.1: </b>
                        <li>Global phrase search capability added</li>
                      </ul>

                      <ul>
                        <b>6.15: </b>
                        <li>Auto search in all layers from 6:10 has been reverted to string search accross all layers for faster performance</li>
                      </ul>

                      <ul>
                        <b>6.14: </b>
                        <li>Fonts update</li>
                        <li>Help file corrections</li>
                        <li>Quotes added around phases in suggestions</li>
                      </ul>

                      <ul>
                        <b>6.13: </b>
                        <li>New search layer selection system added</li>
                      </ul>

                      <ul>
                        <b>6.12: </b>
                        <li>English Short Commentary with cross-references and notes added</li>
                        <li>Urdu Tafseer e Saghir with notes added</li>
                      </ul>

                      <ul>
                        <b>6.11: </b>
                        <li>Search query use case with + and - in from of a word or phrase added</li>
                        <li>Menu structure updated</li>
                        <li>Performance enhancements</li>
                      </ul>


                      <ul>
                        <b>6.10: </b>
                        <li>Auto search in all layers (except for Chinese) feature is added when no match is found</li>
                      </ul>


                      <ul>
                        <b>6.9: </b>
                        <li>Added function to hide unmatching layers when searching across all layers</li>
                        <li>Feature added to click on the translation to disable all others from search</li>
                      </ul>

                      <ul>
                        <b>6.8 </b>
                        <li>Commentaries and other verse details loading from ES in the iFrame</li>
                      </ul>

                      <ul>
                        <b>6.7 </b>
                        <li>Yusuf Ali's English Translation added</li>
                      </ul>

                      <ul>
                        <b>6.62 </b>
                        <li>Translation labels are added</li>
                      </ul>

                      <ul>
                        <b>6.61 </b>
                        <li>Commentaries are now integrated with global search function</li>
                        <li>Global search enhancements, now no need to select layers when performing global search</li>
                      </ul>

                      <ul>
                        <b>6.6 </b>
                        <li>English Five Volume Commentary search added</li>
                        <li>Chinese Commentary search added</li>
                      </ul>

                      <ul>
                        <b>6.5 </b>
                        <li>English Tranlsation from Five Volume Commentary added</li>
                        <li>Chinese translation added</li>
                      </ul>
                      <ul>
                        <b>6.4 </b>
                        <li>Multi-layer global filter search added</li>
                        <li>Aggregate section updated to allow layer and sublayer filtering in the query</li>
                        <li>Suggest support for query layer and sublayer filtering added</li>
                        <li>Help suggestions updated to showcase the power of layer and sublayer filtering</li>
                        <li>Zero result response updated with option to perform a global search</li>
                        <li>Verse range filters added e.g. 4:6-8 or 5:&gt;7 or 6:&gt;=3 or 4:4 etc.</li>
                        <li>Quick Chapter matching filter added e.g. 114:* or just 114: will display all verses of last chapter</li>
                        <li>Verse cross-references added, now also available with specify query syntax</li>
                      </ul>

                      <ul>
                        <b>6.3 </b>
                        <li>Italian Language added</li>
                        <li>Query double submission removed as performance opitimized</li>
                        <li>Significant Topics as Phrases added</li>
                      </ul>

                      <ul>
                        <b>6.2 </b>
                        <li>Query DSL enhanced, now can perform perform "not" logic in integer fields</li>
                      </ul>

                      <ul>
                        <b>6.1 </b>
                        <li>Query DSL enhanced, now can perform field-specific phrase filters</li>
                      </ul>

                      <ul>
                        <b>6.0 </b>
                        <li>Performance enhancements by delaying summary results</li>
                      </ul>

                      <ul>
                        <b>5.9 </b>
                        <li>English Translation of Sir Muhammad Zafrullah Khan ra added</li>
                      </ul>

                      <ul>
                        <b>5.8 </b>
                        <li>English Translation of Muhammad Ali ra added</li>
                        <li>Name changed from English Corpus to Talal Itani</li>
                      </ul>

                      <ul>
                        <b>5.7 </b>
                        <li>Translation phrases layers added for:</li>
                        <ul>
                          <li>Arabic to English</li>
                          <li>Arabic Noor to English</li>
                          <li>English to Arabic Noor</li>
                          <li>English to Arabic</li>
                        </ul>
                      </ul>

                      <ul>
                        <b>5.6 </b>
                        <li>English Mapping for English Translation by Hadhrat Moulavi Sher Ali ra sahib added, with following stages:</li>
                        <ul>
                          <li>English to Arabic Noor</li>
                          <li>Arabic Noor to English</li>
                        </ul>
                      </ul>

                      <ul>
                        <b>5.5 </b>
                        <li>English Mapping for English Translation by Hadhrat Moulavi Sher Ali ra sahib added, with following stages:</li>
                        <ul>
                          <li>English to Arabic</li>
                          <li>Arabic to English</li>
                        </ul>
                      </ul>

                      <ul>
                        <b>5.4 </b>
                        <li>Following translations added</li>
                        <ul>
                        <li>English Pickthall</li>
                        <li>English Sahih</li>
                        <li>English Maududi</li>
                        <li>English Ahmed Ali</li>
                        <li>English Arberry</li>
                        <li>English Yusuf Ali</li>
                        <li>Urdu Maududi</li>
                        <li>Urdu Ahmed li</li>
                        </ul>
                      </ul>

                      <ul>
                        <b>5.3 </b>
                        <li>Multi-word search enhanced</li>
                        <li>Minor bug fixes</li>
                      </ul>

                      <ul>
                        <b>5.2 </b>
                        <li>Performance optimizations</li>
                      </ul>

                      <ul>
                        <b>5.1 </b>
                        <li>Suggestion Menu response updated to include matched strings from search results</li>
                      </ul>

                      <ul>
                        <b>5 </b>
                        <li>English Topics Search added</li>
                        <li>UI updated</li>
                      </ul>

                      <ul>
                        <b>4 </b>
                        <li>Arabic Grammar added: Nouns, Proper Nouns, Verbs and Adjectives</li>
                        <li>Arabic Grammar also added for Noor Majidi script</li>
                        <li>Word for word translation added for English Corpus to Arabic</li>
                        <li>Word for word translation added for Arabic to English Corpus</li>
                      </ul>

                      <ul>
                        <b>3.2 </b>
                        <li>English Corpus Translation added</li>
                        <li>Translation Phrases added in the summary section</li>
                      </ul>

                      <ul>
                        <b>3.1 </b>
                        <li>Suggest menu now display phrases in translations</li>
                        <li>Suggest menu categories added</li>
                        <li>Suggest menu updated with better fonts</li>
                        <li>Suggest menu character highlighting added</li>
                        <li>Options menu minor bugs fixed</li>
                      </ul>

                      <ul>
                        <b>3.0 </b>
                        <li>Content cache related performance optimizations added </li>
                      </ul>

                      <ul>
                        <b>2.99 </b>
                        <li>Page clipping issue in verse iFrame fixed </li>
                      </ul>

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
