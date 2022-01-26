import React, { Component, state } from 'react';
import Analyze from './Analyze.jsx';
import VerseHighlights from './VerseHighlights.jsx'
import NotesHighlights from './NotesHighlights.jsx'

var tokens={tokens:[]};
export default class Verse extends Component {
  constructor() {
    super();
    this.state = {
      display: 'none',
      showAnalyzer: 'none'
    };
    this.handleChange = this.handleChange.bind(this);
    this.showAnalyzer = this.showAnalyzer.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.showDetailsButton = this.showDetailsButton.bind(this);
    this.hideDetailsButton = this.hideDetailsButton.bind(this);
  }

componentDidMount() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
      new ClipboardJS('#copyVerse');
    })
  }

  render() {
  //  console.log(this.props.options, this.props.options.map(x=>x.id==="English"?x.state:false));
  // if (Object.keys(this.props.highlights).length>0){
  //   console.log(Object.keys(this.props.highlights).find((k)=>(/^English_.*/.test(k))))
  // }
    return (
        <div className="Verse base">
          <a
          //onClick={this.handleChange}
           className="list-group-item Verse">
             <VerseHighlights
                base={this.props[this.props.options[0].id]}
                Type={this.props.options[0].id}
                highlights={this.props.highlights}/>
          </a>
              <div className="" style={{display:this.state.display}}>
              { this.state.display!='none'?
                  <Analyze key={this.props.ayah} verse={this.props.ayah} Type={this.props.options[0].id}/>
                :'Processing...'
              }
              </div>

          <a className="list-group-item reference">
            <b style={{"cursor":"pointer"}}
              onClick={this.addFilter.bind(this, this.props.s, "s")}>
              <VerseHighlights
                 base={this.props.Surah}
                 Type="Surah"
                 highlights={this.props.highlights}/>
            </b>
            <span style={{"cursor":"pointer"}}
              onClick={this.addFilter.bind(this, this.props.ayah, "ayah", false)}>
              <VerseHighlights
                 base={this.props.ayah}
                 Type="ayah"
                 options={this.props.options}
                 highlights={this.props.highlights}/>
            </span>
              <div className={this.props.ayah.replace(/:/, '_') + " DetailsButtons reference"}>
                <button type="button"
                  onClick={this.showDetails}
                  className="btn btn-default btn-xs visible-lg visible-md"
                  data-toggle="tooltip"
                  data-placement="left"
                  title="Pin Verse">
                &gt;&gt;
                </button>
                <button type="button"
                  onClick={this.showDetails}
                  className="btn btn-default btn-xs DetailsModalButton hidden-lg hidden-md"
                   data-toggle="modal" data-target="#myModal">
                  Open Details
                </button>
                <button id="copyVerse" type="button"
                  //onClick={(e) => this.CopyArabicText(this.props.ArabicNoor, event, this.props.ayah)}
                  data-clipboard-text={this.props.ArabicNoor.replace(/(\u06E3|\u06E8)/,' $1') + ' [' + this.props.ayah + ']'}
                  className="btn btn-default btn-xs"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Copy Arabic Text">
                  <span className="glyphicon glyphicon-duplicate small"></span>
                </button>
                <button type="button"
                  onClick={this.handleChange}
                  className="btn btn-default btn-xs"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Verse breakdown"><span className="glyphicon glyphicon-option-horizontal small"></span>
                </button>
              </div>
              <div className="filters">
               <span>Manzil <b onClick={this.addFilter.bind(this, this.props.Manzil, "Manzil")}>{this.props.Manzil}</b> </span>
               <span>Juz <b onClick={this.addFilter.bind(this, this.props.Juz, "Juz")}>{this.props.Juz}</b> </span>
               <span>Hisb <b onClick={this.addFilter.bind(this, this.props.Hisb, "Hisb")}>{this.props.Hisb}</b> </span>
               <span>Ruku <b onClick={this.addFilter.bind(this, this.props.Ruku, "Ruku")}>{this.props.Ruku}</b> </span>
               {
                 this.props.CR_English5V.length?<span>CR <b onClick={this.replaceFilter.bind(this, this.props.ayah, "CR_*")}>{this.props.CR_English5V.map(x=>(Object.keys(x)+" "))}</b> </span>:""
               }

              </div>
          </a>

            <div className="Translation well">
              {(this.props.options.map(x=>x.id==="Urdu"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^Urdu_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.Urdu}
                       Type="Urdu"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="English"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^English_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.English}
                       Type="English"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishZafrullahKhan"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^EnglishZafrullahKhan_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.EnglishZafrullahKhan}
                       Type="EnglishZafrullahKhan"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="English5VC"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^English5VC_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.English5VC}
                       Type="English5VC"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {this.props.highlights && Object.keys(this.props.highlights).find((k)=>(k==="Notes_English5V_notes"))?
                    <a className="list-group-item Notes English5VC English">
                        <NotesHighlights
                           Type="Notes_English5V_notes"
                           ayah={this.props.ayah}
                           highlights={this.props.highlights}/>
                    </a>:''
              }
              {(this.props.options.map(x=>x.id==="German"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^German_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.German}
                       Type="German"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="Spanish"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^Spanish_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.Spanish}
                       Type="Spanish"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="French"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^French_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.French}
                       Type="French"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="Italian"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^Italian_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.Italian}
                       Type="Italian"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="UrduTS"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^UrduTS_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.UrduTS}
                       Type="UrduTS"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="Chinese"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^Chinese_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.Chinese}
                       Type="Chinese"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {this.props.highlights && Object.keys(this.props.highlights).find((k)=>(k==="Notes_Chinese_notes"))?
                    <a className="list-group-item Notes Chinese">
                        <NotesHighlights
                           Type="Notes_Chinese_notes"
                           ayah={this.props.ayah}
                           highlights={this.props.highlights}/>
                    </a>:''
              }
              {(this.props.options.map(x=>x.id==="UrduAhmedAli"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^UrduAhmedAli_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.UrduAhmedAli}
                       Type="UrduAhmedAli"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="UrduMaududi"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^UrduMaududi_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.UrduMaududi}
                       Type="UrduMaududi"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishMuhammadAli"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^EnglishMuhammadAli_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.EnglishMuhammadAli}
                       Type="EnglishMuhammadAli"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishAhmedAli"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^EnglishAhmedAli_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.EnglishAhmedAli}
                       Type="EnglishAhmedAli"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishArberry"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^EnglishArberry_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.EnglishArberry}
                       Type="EnglishArberry"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishMaududi"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^EnglishMaududi_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.EnglishMaududi}
                       Type="EnglishMaududi"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishPickthall"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^EnglishPickthall_.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.EnglishPickthall}
                       Type="EnglishPickthall"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishSahih"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/EnglishSahih.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.EnglishSahih}
                       Type="EnglishSahih"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishCorpus"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/EnglishCorpus.*/.test(k))))?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.EnglishCorpus}
                       Type="EnglishCorpus"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="TopicsEn"?x.state:false).indexOf(true) != -1 || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/TopicsEn.*/.test(k))))?
                <a className="list-group-item Topics English">
                    <VerseHighlights
                       base={this.props.TopicsEn}
                       Type="TopicsEn"
                       highlights={this.props.highlights}/>
                </a>:''
              }
            </div>
        </div>
    );
  }

  handleChange(e) {
    if (this.state.display == 'none') {
        // console.log("Calling for: " , this.props.ayah,this.props.analyzers);
        this.setState({display: ''});
        Meteor.call('analyze',this.props.ayah,window.sessionId,this.props.options[0].id,this.props.analyzers,function(error, result) {
          //this.setState({display: ''});
        }.bind(this));
    } else {
      this.setState({display: 'none'});        //this is to avoid loading Tokens mulitple times
    }
  }

  showDetails(e) {
      Meteor.call('getPage', this.props.ayah, function(error, result) {
        this.props.setVerse(this.props.ayah);
      }.bind(this));
  }

  showAnalyzer(e) {
    var display = (this.state.showAnalyzer=='none')?'':'none';
    this.setState({showAnalyzer: display});
  }

  showDetailsButton(e){
    //$('.'+this.props.ayah.replace(/:/, '_')+'.DetailsButton').toggleClass('hidden');
    $('.'+this.props.ayah.replace(/:/, '_')+'.DetailsButtons').removeClass('hidden');
  }

  hideDetailsButton(e){
    $('.'+this.props.ayah.replace(/:/, '_')+'.DetailsButtons').addClass('hidden');
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
   addFilter(filterValue, filterType, search=true , e) {
     // console.log(filterValue, filterType, e);
     let filter = filterType+":"+filterValue
     let query = window.query+' '+filter
     if (search) {
       $(window.inputId)[0].value = query
       this.props.search(query, this.props.options)
     } else {
       $(window.inputId)[0].value += ' '+filter
     }
   }
   replaceFilter(filterValue, filterType, search=true , e) {
     // console.log(filterValue, filterType, e);
     let filter = filterType+":"+filterValue
     let query = filter
     if (search) {
       $(window.inputId)[0].value = query
       this.props.search(query, this.props.options)
     } else {
       $(window.inputId)[0].value += filter
     }
   }
}
