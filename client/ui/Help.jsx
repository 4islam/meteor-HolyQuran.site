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
                 <li><em>Specific verse ranges</em><br/><a target="_self" href="/24:>36">24&gt;36</a>, <a target="_self" href="/6:>=3">6:&gt;=3</a>, <a target="_self" href="/5:>7">5:&gt;7</a>, <a target="_self" href="/4:6-8">4:6-8</a> or <a target="_self" href="/4:4">4:4</a></li>                
                 <li><b><em>Filter query examples:</em></b><br/>
                 <ul>
                   <li><a target="_self" href="/Allah s:50">Search for Allah in Sura 50</a></li>
                   <li><a target="_self" href="/TopicsEn:%22Jonah%22">Search for Jonah in English Topics</a></li>
                   <li><a target="_self" href="/s:>100 s:<=114">Sura 101 to 114</a></li>
                   <li><a target="_self" href="/Juz:30">Part 30</a></li>
                   <li><a target="_self" href="/a:4">Ayah 4 across all chapters</a></li>
                   <li><a target="_self" href="/Ruku:99">Show Ruku 99</a></li>
                   <li><a target="_self" href="/Sajda_id:>0">Show all verses with Sajdah</a></li>
                   <li><a target="_self" href="/s:59%20a:22-24">Show verses 22 to 24 in Sura 59</a></li>
                   <li>Collection of verses with Huroof-Muqataat (حروف مقطعات) <a target="_self" href="/ayah:2:2%20ayah:3:2%20ayah:7:2%20ayah:10:2%20ayah:11:2%20ayah:12:2%20ayah:13:2%20ayah:14:2%20ayah:15:2%20ayah:19:2%20ayah:20:2%20ayah:26:2%20ayah:27:2%20ayah:28:2%20ayah:29:2%20ayah:30:2%20ayah:31:2%20ayah:32:2%20ayah:36:2%20ayah:38:2%20ayah:40:2%20ayah:41:2%20ayah:42:2%20ayah:43:2%20ayah:44:2%20ayah:45:2%20ayah:46:2%20ayah:50:2%20ayah:68:2">with specific ayah selection</a>, <a target="_self" href="/%222:2%22%20%223:2%22%20%227:2%22%20%2210:2%22%20%2211:2%22%20%2212:2%22%20%2213:2%22%20%2214:2%22%20%2215:2%22%20%2219:2%22%20%2220:2%22%20%2226:2%22%20%2227:2%22%20%2228:2%22%20%2229:2%22%20%2230:2%22%20%2231:2%22%20%2232:2%22%20%2236:2%22%20%2238:2%22%20%2240:2%22%20%2241:2%22%20%2242:2%22%20%2243:2%22%20%2244:2%22%20%2245:2%22%20%2246:2%22%20%2250:2%22%20%2268:2%22%20">advance query filter</a>, and <a target="_self" href="/s:%222|3|5|7|10|11|12|13|14|15|19|20|26|27|28|29|30|31|32|36|38|40|41|42|43|44|45|46|50|68%22%20a:2">chapter and verse filters</a></li>
                   <li><a target="_self" href="/a%3A<>1">Show all verses (ayah) except first one</a></li>
                   <li><a target="_self" href="/Juz%3A<>2-29#1:1">Do not show parts (Juz) 2 to 29</a></li>
                   <li><a target="_self" href="/TopicsEn:%22animal*%22">All verses tagged with topic "animal" or "animals"</a></li>
                 </ul></li>
                 <li><b><em>Advance filter examples</em></b><br/>
                  <ul>
                   <li><em>Look for text or phrase matches in all enabled layers, without looking into sub-layers</em><br/>
                     <a target="_self" href="/%22Muhammad is not%22">"Muhammad is not"</a> or <a target="_self" href="/%22seal of%22">"seal of"</a></li>
                    <li><em>Look for "Yunus" in all layers including, Arabic, Surah names, English topics and all translations</em><br/>
                      <a target="_self" href="/%3AYunus">:Yonus</a> or <a target="_self" href="/*%3AYunus">*:Yonus</a></li>
                    <li><em>Look for "Yunus" in all English translations</em><br/>
                        <a target="_self" href="/English*%3AYunus">English*:"Yunus"</a></li>
                    <li><em>Look for "Bakr" for Hadhrat Abu Bakr<sup>ra</sup> everywhere, including topics</em><br/>
                            <a target="_self" href="/%3Abakr">:bakr</a></li>
                    <li><em>Look for all verses with topic "Jonah" but not those verses where the name "Jonah" is mentioned in any English translation</em><br/>
                            <a target="_self" href="/TopicsEn%3A%22Jonah%22%20English*%3A%22-Jonah%22">TopicsEn:"Jonah" English*:"-Jonah" </a></li>
                    <li><em>Look for all verses where English translators have mentioned "Jonah" but not by Molana Sher Ali <sup>ra</sup></em><br/>
                            <a target="_self" href="/English*%3A%22Jonah%22%20English%3A%22-Jonah%22">English*:"Jonah" English:"-Jonah"</a></li>
                    <li><em>Look for "stars" but filter results where "رَءَا" is mentioned in Arabic verbs only</em><br/>
                            <a target="_self" href="/stars%20Arabic*.ar_verbs%3A%22رَءَا%22">stars Arabic*.ar_verbs:"رَءَا"</a></li>
                    <li><em>Show all verses with topic tags with "animals", and also with either "beasts" or "birds", but not with "cattle"</em><br/>
                            <a target="_self" href="/TopicsEn%3A%22animal*%22%20TopicsEn%3A%22birds%20%7C%20beasts%22%20TopicsEn%3A%22-cattle%22">TopicsEn:"animal*" TopicsEn:"birds | beasts" TopicsEn:"-cattle"</a>
                            <br/><em>This can also be written as </em><a target="_self" href="/TopicsEn%3A%22animal*%20(birds%20%7C%20beasts)%20-cattle%22">TopicsEn:"animal* (birds | beasts) -cattle"</a></li>
                    <li><em>Show all verses where moon is mentioned but not the sun, using Arabic to English mapping</em><br/>
                            <a target="_self" href="/Arabic*%3A%22moon%20-sun%22">Arabic*:"moon -sun"</a>
                            <br/><em>Only using the translations returs one less verse because of translators additions, see below </em><a target="_self" href="/English%3A%22moon%20-sun%22">English:"moon -sun"</a></li>
                    <li><em>Look for verses where Arabic roots of both قمر and شمس are present</em><br/>
                            <a target="_self" href="/*.ar_root:%22قمر شمس%22">*.ar_root:"قمر شمس"</a></li>
                  </ul>
                 </li>
             </ul>
             <br/>
             <Credits/>
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
