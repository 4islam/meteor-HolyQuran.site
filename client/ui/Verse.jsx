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
                base={this.props.Arabic_noor}
                Type="Arabic"
                highlights={this.props.highlights}/>
          </a>
              <div className="" style={{display:this.state.display}}>
              { this.state.display!='none'?
                  <Analyze key={this.props.ayah} verse={this.props.ayah}/>
                :'Processing...'
              }
              </div>

          <a className="list-group-item reference">
            <table className="reference">
              <tbody>
                <tr>
                    <td>
                      <VerseHighlights
                         base={this.props.Surah}
                         Type="Surah"
                         highlights={this.props.highlights}/>
                   </td>
                    <td>
                      <VerseHighlights
                         base={this.props.ayah}
                         Type="ayah"
                         highlights={this.props.highlights}/>
                    </td>
                    <td>
                      <div className="highlights base hidden-xs">[{this.props.score}]</div>
                      <div className="highlights invisible hidden-xs">[{this.props.score}]</div>
                      <div className={this.props.ayah.replace(/:/, '_') + " DetailsButtons"}>
                        <button type="button"
                          onClick={this.handleChange}
                          className="btn btn-default btn-xs"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Verse breakdown"><span className="glyphicon glyphicon-option-horizontal small"></span>
                        </button>
                        <button type="button"
                          onClick={(e) => this.CopyArabicText(this.props.Arabic_noor, event, this.props.ayah)}
                          className="btn btn-default btn-xs"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Copy Arabic Text">
                          <span className="glyphicon glyphicon-copy small"></span>
                        </button>
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
                      </div>

                    </td>
                </tr>
              </tbody>
            </table>
          </a>
          <div className="showAnalyzer" style={{display:this.state.showAnalyzer}}>
            {Object.keys(this.props.highlights).map(function(k) {
                return (
                  <span key={k + "." + this.props._id} className={"highlights " + k.replace(/\.|_/g,' ')}>
                    {k}: <span dangerouslySetInnerHTML={{__html: this.props.highlights[k]}}></span> <br/>
                  </span>);
              }.bind(this))
            }
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
        //console.log("Calling for: " , this.props.ayah);
        this.setState({display: ''});
        Meteor.call('analyze',this.props.ayah,window.sessionId, function(error, result) {
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
}
