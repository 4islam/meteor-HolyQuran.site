import React, { Component, state } from 'react';
import Analyze from './Analyze.jsx';
import VerseHighlights from './VerseHighlights.jsx'

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
              <VerseHighlights
                 base={this.props.Surah}
                 Type="Surah"
                 highlights={this.props.highlights}/>
              <VerseHighlights
                 base={this.props.ayah}
                 Type="ayah"
                 options={this.props.options}
                 highlights={this.props.highlights}/>
             <div className="filters">
              <span>Hisb <b onClick={this.addFilter.bind(this, this.props.Hisb, "Hisb")}>{this.props.Hisb}</b> </span>
              <span>Juz <b onClick={this.addFilter.bind(this, this.props.Juz, "Juz")}>{this.props.Juz}</b> </span>
              <span>Manzil <b onClick={this.addFilter.bind(this, this.props.Manzil, "Manzil")}>{this.props.Manzil}</b> </span>
              <span>Ruku <b onClick={this.addFilter.bind(this, this.props.Ruku, "Ruku")}>{this.props.Ruku}</b> </span>
              <span>Surah <b onClick={this.addFilter.bind(this, this.props.s, "s")}>{this.props.s}</b></span>
             </div>
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
          </a>
          <div className="showAnalyzer" style={{display:this.state.showAnalyzer}}>
            {(this.props.highlights)?Object.keys(this.props.highlights).map(function(k) {
                return (
                  <span key={k + "." + this.props._id} className={"highlights " + k.replace(/\.|_/g,' ')}>
                    {k}: <span dangerouslySetInnerHTML={{__html: this.props.highlights[k]}}></span> <br/>
                  </span>);
              }.bind(this))
            :''}
          </div>
          {(this.props.options.map(x=>(["Urdu","UrduTS","English","German","Spanish","French"].indexOf(x.id)!=-1)?x.state:false).indexOf(true) != -1)?
            <div className="Translation well">
              {(this.props.options.map(x=>x.id==="Urdu"?x.state:false).indexOf(true) != -1)?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.Urdu}
                       Type="Urdu"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="English"?x.state:false).indexOf(true) != -1)?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.English}
                       Type="English"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="German"?x.state:false).indexOf(true) != -1)?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.German}
                       Type="German"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="Spanish"?x.state:false).indexOf(true) != -1)?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.Spanish}
                       Type="Spanish"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="French"?x.state:false).indexOf(true) != -1)?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.French}
                       Type="French"
                       highlights={this.props.highlights}/>
                </a>:''
              }
              {(this.props.options.map(x=>x.id==="UrduTS"?x.state:false).indexOf(true) != -1)?
                <a className="list-group-item Translation">
                    <VerseHighlights
                       base={this.props.UrduTS}
                       Type="UrduTS"
                       highlights={this.props.highlights}/>
                </a>:''
              }
            </div>:''
          }
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
   addFilter(filterValue, filterType, e) {
     // console.log(filterValue, filterType, e);
     this.props.search(window.query+' '+filterType+":"+filterValue, this.props.options);
     $(window.inputId)[0].value = window.query+' '+filterType+":"+filterValue;
   }
}
