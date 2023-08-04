import React, { Component, state } from 'react';
import Analyze from './Analyze.jsx';
import VerseHighlights from './VerseHighlights.jsx'
import VerseHighlightsSpecialCase from './VerseHighlightsSpecialCase.jsx'
import NotesHighlights from './NotesHighlights.jsx'

var tokens={tokens:[]};
export default class Verse extends Component {
  constructor() {
    super();
    this.state = {
      display: 'none',
      showAnalyzer: 'none',
      hidden : "hidden"
    };
    this.handleChange = this.handleChange.bind(this);
    this.showAnalyzer = this.showAnalyzer.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.showDetailsButton = this.showDetailsButton.bind(this);
    this.hideDetailsButton = this.hideDetailsButton.bind(this);
  }

  componentWillMount () {
      var that = this;
      var i=this.props.delay
      setTimeout(function() {
          that.show();
      // }, 100*this.props.delay+5);
    }, i*(Math.pow(i,-i)*1000+500)+5)
    // console.log("Delay: ",i, i*(Math.pow(i,-i)*1000+500)+5);
  }
  show () {
      this.setState({hidden : ""});
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
  //   console.log(Object.keys(this.props.highlights).find((k)=>(/^English(\b|_).*/.test(k))))
  // }
    return (
        <div className={this.state.hidden + " Verse base"}>
          <a
          //onClick={this.handleChange}
           className="list-group-item Verse">
             <VerseHighlights
                base={this.props[this.props.options[0].id]}
                Type={this.props.options[0].id}
                highlights={this.props.highlights}
                delay={this.props.delay}/>
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
              {// TODO: Need to get this loop working to consolidate this component into a few lines
              //   this.props.options.map(function(z) { if (z.type==="Translation") {
              //     (z.state === true ||
              //       this.props.highlights &&
              //       Object.keys(this.props.highlights).find((k)=>(new RegExp('^'+z.id+'\b?.*').test(k))))?
              //         <a className="list-group-item Translation">
              //          <span className="label label-info" dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="z.id"?x.name:"").toString().replaceAll(",","")}}/>
              //             <VerseHighlights key={z.id}
              //                base={this.props[z.id]}
              //                Type={z.id}
              //                highlights={this.props.highlights}/>
              //         </a>:''
              //   }}.bind(this))
              }
              {
                // this.props.options.map((x)=>(x.type==="Commentary"?


                // :''))
              }

              {(this.props.options.map(x=>x.id==="Urdu"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^Urdu(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info rtll" onClick={this.selectLayer.bind(this, "Urdu")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="Urdu"?x.name:"").toString().replaceAll(",","")}}/>
                  <VerseHighlights
                     base={this.props.Urdu}
                     Type="Urdu"
                     highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="English"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^English(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "English")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="English"?x.name:"").toString().replaceAll(",","")}}/>
                  <VerseHighlights
                     base={this.props.English}
                     Type="English"
                     highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishZafrullahKhan"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^EnglishZafrullahKhan(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "EnglishZafrullahKhan")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="EnglishZafrullahKhan"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlights
                       base={this.props.EnglishZafrullahKhan}
                       Type="EnglishZafrullahKhan"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishSC"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^EnglishSC(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "EnglishSC")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="EnglishSC"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlightsSpecialCase
                       base={this.props.EnglishSC}
                       Type="EnglishSC"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="English5VC"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^English5VC(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "English5VC")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="English5VC"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlightsSpecialCase
                       base={this.props.English5VC}
                       Type="English5VC"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="German"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^German(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "German")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="German"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlights
                       base={this.props.German}
                       Type="German"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="Spanish"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^Spanish(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "Spanish")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="Spanish"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlights
                       base={this.props.Spanish}
                       Type="Spanish"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="French"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^French(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "French")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="French"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlights
                       base={this.props.French}
                       Type="French"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="Italian"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^Italian(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "Italian")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="Italian"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlights
                       base={this.props.Italian}
                       Type="Italian"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="UrduTSN"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^UrduTSN(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info rtll" onClick={this.selectLayer.bind(this, "UrduTSN")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="UrduTSN"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlightsSpecialCase
                       base={this.props.UrduTSN}
                       Type="UrduTSN"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="Chinese"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^Chinese(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "Chinese")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="Chinese"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlightsSpecialCase
                       base={this.props.Chinese}
                       Type="Chinese"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="UrduAhmedAli"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^UrduAhmedAli(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info rtll" onClick={this.selectLayer.bind(this, "UrduAhmedAli")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="UrduAhmedAli"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlightsSpecialCase
                       base={this.props.UrduAhmedAli}
                       Type="UrduAhmedAli"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="UrduMaududi"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^UrduMaududi(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info rtll" onClick={this.selectLayer.bind(this, "UrduMaududi")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="UrduMaududi"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlights
                       base={this.props.UrduMaududi}
                       Type="UrduMaududi"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishMuhammadAli"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^EnglishMuhammadAli(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "EnglishMuhammadAli")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="EnglishMuhammadAli"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlights
                       base={this.props.EnglishMuhammadAli}
                       Type="EnglishMuhammadAli"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishAhmedAli"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^EnglishAhmedAli(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "EnglishAhmedAli")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="EnglishAhmedAli"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlights
                       base={this.props.EnglishAhmedAli}
                       Type="EnglishAhmedAli"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishArberry"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^EnglishArberry(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "EnglishArberry")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="EnglishArberry"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlights
                       base={this.props.EnglishArberry}
                       Type="EnglishArberry"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishMaududi"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^EnglishMaududi(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "EnglishMaududi")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="EnglishMaududi"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlights
                       base={this.props.EnglishMaududi}
                       Type="EnglishMaududi"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishPickthall"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/^EnglishPickthall(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "EnglishPickthall")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="EnglishPickthall"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlights
                       base={this.props.EnglishPickthall}
                       Type="EnglishPickthall"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishSahih"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/EnglishSahih(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "EnglishSahih")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="EnglishSahih"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlights
                       base={this.props.EnglishSahih}
                       Type="EnglishSahih"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishCorpus"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/EnglishCorpus(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "EnglishCorpus")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="EnglishCorpus"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlights
                       base={this.props.EnglishCorpus}
                       Type="EnglishCorpus"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="EnglishYusufAli"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/EnglishYusufAli(\b|_).*/.test(k))))?
                <a className="list-group-item Translation">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "EnglishYusufAli")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="EnglishYusufAli"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlights
                       base={this.props.EnglishYusufAli}
                       Type="EnglishYusufAli"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="TopicsEn"?x.state:false).indexOf(true) != -1 && !this.props.hideUnmatched || this.props.highlights && Object.keys(this.props.highlights).find((k)=>(/TopicsEn(\b|_).*/.test(k))))?
                <a className="list-group-item Topics English">
                  <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "TopicsEn")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="TopicsEn"?x.name:"").toString().replaceAll(",","")}}/>
                    <VerseHighlights
                       base={this.props.TopicsEn}
                       Type="TopicsEn"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {this.props.highlights && Object.keys(this.props.highlights).find((k)=>(k==="Notes_UrduTSN_notes"))?
                    <a className="list-group-item Notes UrduTSN English">
                      <span className="label label-info rtll" onClick={this.selectLayer.bind(this, "Notes_UrduTSN")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="Notes_UrduTSN"?x.name:"").toString().replaceAll(",","")}}/>
                        <NotesHighlights
                           Type="Notes_UrduTSN"
                           ayah={this.props.ayah}
                           highlights={this.props.highlights}/>
                    </a>:''
              }
              {this.props.highlights && Object.keys(this.props.highlights).find((k)=>(k==="Notes_EnglishSC_notes"))?
                    <a className="list-group-item Notes EnglishSC English">
                      <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "Notes_EnglishSC")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="Notes_EnglishSC"?x.name:"").toString().replaceAll(",","")}}/>
                        <NotesHighlights
                           Type="Notes_EnglishSC"
                           ayah={this.props.ayah}
                           highlights={this.props.highlights}/>
                    </a>:''
              }
              {this.props.highlights && Object.keys(this.props.highlights).find((k)=>(k==="Notes_English5V_notes"))?
                    <a className="list-group-item Notes English5VC English">
                      <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "Notes_English5V")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="Notes_English5V"?x.name:"").toString().replaceAll(",","")}}/>
                        <NotesHighlights
                           Type="Notes_English5V_notes"
                           ayah={this.props.ayah}
                           highlights={this.props.highlights}/>
                    </a>:''
              }
              {this.props.highlights && Object.keys(this.props.highlights).find((k)=>(k==="Notes_Chinese_notes"))?
                    <a className="list-group-item Notes Chinese">
                      <span className="label label-info ltrl" onClick={this.selectLayer.bind(this, "Notes_Chinese")} dangerouslySetInnerHTML={{__html: this.props.options.map(x=>x.id==="Notes_Chinese"?x.name:"").toString().replaceAll(",","")}}/>
                        <NotesHighlights
                           Type="Notes_Chinese_notes"
                           ayah={this.props.ayah}
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
   selectLayer(layer) {
     this.props.options.map((y,z)=>{y.id===layer||z===0||z===1?y.state=true:y.state=false}) //Exceptions: 0 is Arabic and 1 is Chapters
     this.props.switchLayers(false)
     this.props.search(query, this.props.options)
   }
}
