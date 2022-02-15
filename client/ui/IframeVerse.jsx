import React, { Component, state } from 'react';
import Analyze from './Analyze.jsx';
import VerseHighlights from './VerseHighlights.jsx'
import VerseHighlightsSpecialCase from './VerseHighlightsSpecialCase.jsx'
import NotesHighlights from './NotesHighlights.jsx'


import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

 class IframeVerse extends Component {
  constructor() {
    super();
    this.state = {
      display: 'none',
      showAnalyzer: 'none'
    };
  }

componentDidMount() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
      new ClipboardJS('#copyVerse');
    })
  }

  render() {
    var r=this.props.r
    var v = r?r.results.hits?(r.results.hits.hits && r.results.hits.total.value>0)?r.results.hits.hits[0]._source:null:null:null
    return <div>
        { v?<div className="Verse base">
          <VerseHighlights
               base={v.Surah}
               Type="Surah"/>
               <br/>
               {/*<VerseHighlights
                base={v['Arabic']}
                Type="Arabic"
                />*/}
              <br/>
              <br/>


              <a className="list-group-item Translation UrduTSN Urdu">
                <span className="label label-info rtll">اردو تفصیر، صغیر</span>
                <VerseHighlightsSpecialCase
                   base={v['UrduTSN']}
                   Type="UrduTSN"
                   />
              </a>
              {
                v.Notes_UrduTSN&&v.Notes_UrduTSN[0]?
                  <a className="list-group-item Notes UrduTSN Urdu">
                      <div className="Notes_Commentary UrduTSN" dangerouslySetInnerHTML={{__html: v.Notes_UrduTSN[0].notes.replace(/(\u06E3|\u06E8)/,' $1')}}/>
                  </a>:''
              }
              <br/>
              <a className="list-group-item Translation EnglishSC English">
                <span className="label label-info ltrl">English - Short Commentary</span>
                <VerseHighlightsSpecialCase
                   base={v['EnglishSC']}
                   Type="EnglishSC"
                   />
              </a>
              {
                v.Notes_EnglishSC&&(v.Notes_EnglishSC[0]||v.Notes_EnglishSC[1])?
                  <a className="list-group-item Notes EnglishSC English">
                    {v.Notes_EnglishSC[0]?
                      <div className="Notes_CR EnglishSC" dangerouslySetInnerHTML={{__html: v.Notes_EnglishSC[0].crs.replace(/(\u06E3|\u06E8)/,' $1')}}/>
                    :''}
                    {v.Notes_EnglishSC[1]?
                      <div className="Notes_Commentary EnglishSC" dangerouslySetInnerHTML={{__html: v.Notes_EnglishSC[1].notes.replace(/(\u06E3|\u06E8)/,' $1')}}/>
                    :''}
                  </a>:''
              }
              <br/>
              <a className="list-group-item Translation English5VC English">
                <span className="label label-info ltrl">English Five Volume</span>
                <VerseHighlightsSpecialCase
                   base={v['English5VC']}
                   Type="English5VC"
                   />
              </a>
              {
                v.Notes_English5V&&(v.Notes_English5V[0]||v.Notes_English5V[1])?
                  <a className="list-group-item Notes English5VC English">
                    {v.Notes_English5V[0]?
                      <div className="Notes_CR English5VC" dangerouslySetInnerHTML={{__html: v.Notes_English5V[0].crs.replace(/(\u06E3|\u06E8)/,' $1')}}/>
                    :''}
                    {v.Notes_English5V[1]?
                      <div className="Notes_Commentary English5VC" dangerouslySetInnerHTML={{__html: v.Notes_English5V[1].notes.replace(/(\u06E3|\u06E8)/,' $1')}}/>
                    :''}
                  </a>:''
              }
              <br/>
              <a className="list-group-item Translation">
                <span className="label label-info ltrl">Chinese Translation</span>
                  <VerseHighlightsSpecialCase
                     base={v["Chinese"]}
                     Type="Chinese"/>
              </a>
              {v.Notes_Chinese&&(v.Notes_Chinese[0]||v.Notes_Chinese[1])?
                <a className="list-group-item Notes Chinese English">
                  {v.Notes_Chinese[0]?
                    <div className="Notes_CR Chinese" dangerouslySetInnerHTML={{__html: v.Notes_Chinese[0].crs.replace(/(\u06E3|\u06E8)/,' $1').replace(/\\\\/g,'')}}/>
                  :''}
                  {v.Notes_Chinese[1]?
                    <div className="Notes_Commentary Chinese" dangerouslySetInnerHTML={{__html: v.Notes_Chinese[1].notes.replace(/(\u06E3|\u06E8)/,' $1').replace(/\\\\/g,'')}}/>
                  :''}
                </a>:''
              }


          </div>:""
        }
        </div>
      }

  CopyArabicText(txt,event,v) {
   txt += ' ['+v+']';
   this.copyToClipboard(txt);
   var $btn = $(event.target).is('button')?$(event.target):$(event.target).parent();
   $btn.attr('title', 'Copied')
  }
   copyToClipboard(txt) {
     var $temp = $("<input>");
     $("body").append($temp);
     $temp.val(txt).select();
     document.execCommand("copy");
     $temp.remove();
   }
}

export default IframeVerse = withTracker(props => {
  if (!VerseCol.findOne({query:props.verse})) {
    Meteor.call('getVerse', props.verse, window.sessionId, window.ArabicSrc, function(e,r) {
      // console.log("calling for Verse ",props.verse);
    }.bind(this));
  }
  Meteor.subscribe('Verse/all','', window.sessionId);
  return {
    r: VerseCol.findOne({query:props.verse})
   }
})(IframeVerse);
