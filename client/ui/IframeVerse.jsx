import React, { Component, state } from 'react';
import Analyze from './Analyze.jsx';
import VerseHighlights from './VerseHighlights.jsx'
import VerseHighlightsSpecialCase from './VerseHighlightsSpecialCase.jsx'
import NotesHighlights from './NotesHighlights.jsx'


import { createContainer } from 'meteor/react-meteor-data';
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
             <VerseHighlights
                base={v['Arabic']}
                Type="Arabic"
                />
              <br/>
              <br/>

              <span className="label label-info ltrl"></span>
              <a className="list-group-item Notes English5VC English">
              <span className="label label-info ltrl">English Five Volume</span>
              <VerseHighlightsSpecialCase
                 base={v['English5VC']}
                 Type="English5VC"
                 />
             </a>
              {v.Notes_English5V?v.Notes_English5V[1]?
                <a className="list-group-item Notes English5VC English">
                  <span className="label label-info ltrl">English Five Volume Commentary</span>
                    <div className="Notes_CR English5VC" dangerouslySetInnerHTML={{__html: v.Notes_English5V[0].crs.replace(/(\u06E3|\u06E8)/,' $1')}}/>
                    <div className="Notes_Commentary English5VC" dangerouslySetInnerHTML={{__html: v.Notes_English5V[1].notes.replace(/(\u06E3|\u06E8)/,' $1')}}/>
                </a>:'':''
              }
              <br/>
              <a className="list-group-item Translation">
                <span className="label label-info ltrl">Chinese Translation</span>
                  <VerseHighlightsSpecialCase
                     base={v["Chinese"]}
                     Type="Chinese"/>
              </a>
              {v.Notes_Chinese?v.Notes_Chinese[1]?
                <a className="list-group-item Notes Chinese English">
                  <span className="label label-info ltrl">Chinese Commentary</span>
                    <div className="Notes_CR Chinese" dangerouslySetInnerHTML={{__html: v.Notes_Chinese[0].crs.replace(/(\u06E3|\u06E8)/,' $1').replace(/\\\\/g,'')}}/>
                    <div className="Notes_Commentary Chinese" dangerouslySetInnerHTML={{__html: v.Notes_Chinese[1].notes.replace(/(\u06E3|\u06E8)/,' $1').replace(/\\\\/g,'')}}/>
                </a>:'':''
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

export default createContainer(props => {
  if (!VerseCol.findOne({query:props.verse})) {
    Meteor.call('getVerse', props.verse, window.sessionId, window.ArabicSrc, function(e,r) {
      // console.log("calling for Verse ",props.verse);
    }.bind(this));
  }
  Meteor.subscribe('Verse/all','', window.sessionId);
  return {
    r: VerseCol.findOne({query:props.verse})
   }
}, IframeVerse);
