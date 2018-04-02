import React, { Component , state} from 'react';
//import { Debounce } from 'react-throttle';

import Suggestions from './ui/Suggestions.jsx';
import Queries from './ui/Queries.jsx';
import Results from './ui/Results.jsx';
import Highlights from './ui/Highlights.jsx';
import HighlightsAnalyzed from './ui/HighlightsAnalyzed.jsx';
import Aggregates from './ui/Aggregates.jsx';
import Iframe from './ui/Iframe.jsx';
import Help from './ui/Help.jsx';
import Credits from './ui/Credits.jsx';

export default class Master extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      limit: 10,
      options: [
                {id:"root",state:true, name:'مادّہ'},
                {id:"stems",state:true,name:'وزن'},
                {id:"phonetic",state:true,name:'صوتی'},
                {id:"ngram",state:true,name:'جزئي'},
                {id:"normalized",state:true,name:'سوى'},
                {id:"surah",state:true,name:'سورة'}
              ],
      option_types:[
        // {id:"Arabic",state:true,name:'عَرَبي',options: [
        //           {id:"root",state:true, name:'مادّہ'},
        //           {id:"stems",state:true,name:'وزن'},
        //           {id:"phonetic",state:true,name:'صوتی'},
        //           {id:"ngram",state:true,name:'جزئي'},
        //           {id:"normalized",state:true,name:'سوى'}
        //         ]},
        // {id:"surah",state:true,name:'سورة',options: [
        //           {id:"stems",state:true,name:'وزن'},
        //           {id:"phonetic",state:true,name:'صوتی'},
        //           {id:"ngram",state:true,name:'جزئي'},
        //           {id:"normalized",state:true,name:'سوى'}
        //         ]},
        // {id:"Urdu",state:false,name:'اردو',options: [
        //           {id:"phonetic",state:false,name:'صوتی'},
        //           {id:"ngram",state:true,name:'جزوی'},
        //           {id:"normalized",state:true,name:'ہموار'}
        //         ]},
        // {id:"English",state:true,name:'English',options: [
        //           {id:"ngram",state:true,name:'partial'},
        //           {id:"normalized",state:true,name:'normalized'}
        //         ]},
        // {id:"German",state:false,name:'German',options: [
        //           {id:"ngram",state:true,name:'teilweise'},
        //           {id:"normalized",state:true,name:'normalisierte'}
        //         ]}
        {id:"Arabic",state:true,name:'Arabic',options: [
                  {id:"root",state:true, name:'Roots'},
                  {id:"stems",state:true,name:'Stems'},
                  {id:"phonetic",state:true,name:'Phonetic'},
                  {id:"ngram",state:false,name:'Partial'},
                  {id:"normalized",state:true,name:'Normalized'}
                ]},
        {id:"Surah",state:true,name:'Chapter Names',options: [
                  //{id:"stems",state:true,name:'Stems'},
                  {id:"phonetic",state:true,name:'Phonetic'},
                  {id:"ngram",state:false,name:'Partial'},
                  {id:"normalized",state:true,name:'Normalized'}
                ]},
        {id:"Urdu",state:false,name:'Urdu',options: [
                  {id:"phonetic",state:false,name:'Phonetic'},
                  {id:"ngram",state:true,name:'Partial'},
                  {id:"normalized",state:true,name:'Normalized'}
                ]},
        {id:"English",state:true,name:'English',options: [
                  {id:"ngram",state:true,name:'Partial'},
                  {id:"normalized",state:true,name:'Normalized'}
                ]},
        {id:"German",state:false,name:'German',options: [
                  {id:"ngram",state:true,name:'Teilweise'},
                  {id:"normalized",state:true,name:'Normalisierte'}
                ]},
        {id:"Spanish",state:false,name:'Spanish',options: [
                  {id:"ngram",state:true,name:'Partial'},
                  {id:"normalized",state:true,name:'Normalized'}
                ]},
        {id:"French",state:false,name:'French',options: [
                  {id:"ngram",state:true,name:'Partial'},
                  {id:"normalized",state:true,name:'Normalized'}
                ]},
        {id:"UrduTS",state:false,name:'Tafseer-e-Sagheer UR',options: [
                  {id:"phonetic",state:false,name:'Phonetic'},
                  {id:"ngram",state:true,name:'Partial'},
                  {id:"normalized",state:true,name:'Normalized'}
                ]}
      ],
      options_panel: 'none',
      queries_panel: '',
      aggregates_panel: 'none',
      suggestionlist:[
                        {key:'Bismilla Allah'},
                        {key:'Allah'}
                    ],
      verse:'1:1'
    };

    this.handleChange = this.handleChange.bind(this);
    this.options_panel = this.options_panel.bind(this);
    this.queries_panel = this.queries_panel.bind(this);
    this.aggregates_panel = this.aggregates_panel.bind(this);
    this.search = this.search.bind(this);
    this.showKeyboard = this.showKeyboard.bind(this);
    //this.openMenu = this.openMenu.bind(this);
  }

  componentDidMount() {
    window.inputId = '#QueryRTL';

    $(document).ready(function () {
      $('[data-toggle="offcanvas-right"]').click(function () {
        //$('.row-offcanvas').removeClass('row-offcanvas-left').addClass('row-offcanvas-right');
        $('.Details').removeClass('sidebar-offcanvas');
        $('.Details').addClass('hidden-xs');
        $('.Summary').removeClass('hidden-xs');
        $('.Summary').addClass('sidebar-offcanvas');
        $('.row-offcanvas').toggleClass('active');

        // $(window.inputId).focus();
      });
      // $('[data-toggle="offcanvas-left"]').click(function () {
      //   $('.row-offcanvas').removeClass('row-offcanvas-right').addClass('row-offcanvas-left');
      //   $('.Summary').removeClass('sidebar-offcanvas');
      //   $('.Summary').addClass('hidden-xs');
      //   $('.Details').removeClass('hidden-xs');
      //   $('.Details').addClass('sidebar-offcanvas');
      //   $('.row-offcanvas').toggleClass('active');
      // });
    });

    $(function(){
        $('div.Details').affix({offset: {top: 316} });
        $('button.Summary').affix({offset: {top: 326} });
    })

    this.search(this.props.query, this.state.option_types);

    Meteor.call('getPage', this.state.verse, function(error, result) {
      //console.log(1);
    });

    $(function () {
      $('[data-toggle="tab"]').tooltip()
    })
  }

  componentWillMount() {

  }



  input_e_focusLTR(e) {
    window.inputId = '#QueryLTR';
    $('#QueryRTL').css({width: '10%', opacity:.2})
    $(window.inputId).css({width: '90%', opacity:1})
  }

  input_e_focusRTL(e) {
    window.inputId = '#QueryRTL';
    //$('#QueryLTR').css({width: '10%', opacity:.2})
    //$(window.inputId).css({width: '100%', opacity:1})
    q=e.target.value.replace(/ +/, ' ').replace(/\t+/,' ')
    window.options=this.state.option_types;
    setTimeout(suggest_e, 150, q.trim());
  }


  input_e(e) {
    //console.log(window.query, e.target.value, e.type)
    q=e.target.value.replace(/ +/, ' ').replace(/\t+/,' ')

    if (window.query != e.target.value || e.which && [13,32].indexOf(e.which)!=-1 || e.type=="blur") { //after introducing onKeyUp

      //console.log(e.type, q, window.query)
      if (q.substr(-1) == ' ' || e.which && [13,32].indexOf(e.which)!=-1 || e.type=="blur") {  //to detect if user has press space , add enter detection

        if (window.query != q) {
          this.search_e(e);     //750ms
          //$(window.inputId)[0].value = query + ' ';
        }

      } else {
        //console.log(q.substr(-1) != ' ', e.which,[13,32].indexOf(e.which)==-1)
        // if (q.indexOf('-->') != -1) {
        //   q=q.split('-->')
        //   q=q[0].split(' ').slice(0,-1).join(' ').trim() + ' ' + q[q.length-1]
        // }

        $('#'+e.target.id)[0].value = q.replace(/^ +/,'')

        window.options=this.state.option_types;
        //console.log(e.type)
        if (e.which != 27 && e.type!="blur") {        //Esc character or moving away from form
          if (e.type=="change") {   //not on keyup, but on change to make it faster
            setTimeout(suggest_e, 150, q.trim());    //150ms
          }
        } else {
          $('#datalistUl').css({display:'none'});
        }
      }
    }
  }

  search_e(e) {
    this.search(e.target.value, this.state.option_types)
  }

  // search_q(query) {
  //   //$(window.inputId)[0].value=query
  //   q=$(window.inputId)[0].value
  //   q=q.split(' ').slice(0,-1).join(' ').trim() + ' ' + query
  //   $(window.inputId)[0].value=q.replace(/^ +/,'').trim()
  //   this.searchButton()
  // }

  searchButton () {
    this.search($(window.inputId)[0].value.replace(/^ +/,''), this.state.option_types);
  }

  suggestDiv_close() {
    setTimeout(suggestDiv_close_delayed, 500)
  }

  render() {
    Meteor.subscribe('Pages',this.state.verse, window.sessionId);

    return (
      <div dir="rtl">

        <div className="navbar navbar-inverse navbar-fixed-top">

          <div className="row content">
            <a href="//alislam.org">
              <div className="col-sm-12 logo"><h3>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h3></div>
            </a>
          </div>
        </div>
        <div className="jumbotron text-center">
            <br/><h1>&nbsp;<br/>&nbsp;</h1><h1 className="sr-only">Holy Qur'an <small>Advanced Search</small><br/><div>&nbsp;</div></h1>
            <div className="well">
              <div className="input-group" dir="ltr">
                <div className="input-group-btn">
                  <button className="btn btn-default Search" type="submit" onClick={this.searchButton.bind(this)}>
                    <img height="17px" className="Query" src="./images/search-icon-png-23-small.png"/>
                  </button>
                </div>
                <div className="input row">
                      {/*}<input dir="ltr" id="QueryLTR" defaultValue={this.props.query} type="text" className="form-control" placeholder="Type here to search..."
                          onKeyUp={this.input_e.bind(this)}
                          onChange={this.input_e.bind(this)}
                          onFocus={this.input_e_focusLTR.bind(this)}
                           list="datalist"
                          aria-haspopup="true" aria-expanded="false"/> */}

                        <input dir="rtl" id="QueryRTL" defaultValue={this.props.query} type="text" className="form-control" placeholder="Type here to search..."
                            onKeyUp={this.input_e.bind(this)}
                            onChange={this.input_e.bind(this)}
                            onFocus={this.input_e_focusRTL.bind(this)}
                            onBlur={this.suggestDiv_close.bind(this)}
                             list="datalist"
                            aria-haspopup="true" aria-expanded="false"/>

                    <datalist id="datalist">
                      <option value="اللہ"/>
                      <option value="بسم الله"/>
                      <option value="الله الرحمان الرحيم"/>
                    </datalist>
                  </div>
                  <ul id="datalistUl" className="datalistUl dropdown-menu dropdown-menu-right" aria-labelledby="Query">
                    {
                      // this.state.suggestionlist.map(i=>
                      //   <li className='btn-block btn btn-xs' key={i.key}><a href="#" onClick={() => this.search_q(i.key)}>{i.key}</a></li>
                      // )
                    }
                  </ul>
                  <div className="input-group-btn">
                    <button className="btn btn-default" type="submit" onClick={this.showKeyboard}>
                      <img height="17px" className="Query" src="./images/keyboard.png"/>
                    </button>
                  </div>
               </div>
              <Suggestions query={this.props.query} search={this.search} options={this.state.option_types}
                          page={this.state.page} limit={this.state.limit}/>
              <div>
                <div>
                  {
                    this.state.option_types.map(x=>
                        <div className="btn-group" role="group" key={x.name}>
                            <button className={"btn btn-default btn-xs dropdown-toggle" + x.id}
                              id="dLabel" type="button" onClick={this.openMenu}
                              name={x.name}
                              aria-haspopup="true" aria-expanded="false">
                                <input className="checkbox-inline"
                                  name={x.id}
                                  id={x.id}
                                  type="checkbox"
                                  value={x.state}
                                  checked={x.state}
                                  onChange={this.handleChange} />
                                <small>
                                  <span>{ ' ' + x.name + ' '}</span>
                                  <span className="caret"></span>
                                </small>
                              </button>
                            <ul className={(x.name=='Arabic')?'dropdown-menu dropdown-menu-right':'dropdown-menu'}
                                aria-labelledby="dLabel">
                              {
                                x.options.map(y=>
                                  <li key={'span_' + y.id}>
                                    <span className={"highlights " + y.id}>
                                      <mark>
                                        <small>
                                          {y.name + ' '}
                                        </small>
                                        <input className="checkbox-inline"
                                          name={y.id}
                                          type="checkbox"
                                          checked={y.state}
                                          disabled={!x.state}
                                          onChange={this.handleChangeOptions.bind(this,y.id,x.id)} />
                                      </mark>
                                    </span>
                                  </li>
                                )
                              }
                              </ul>
                        </div>)
                  }
                </div>
              </div>
            </div>
        </div>
        <div className="container-fluid">
          <div className="row content">
              <div className="row row-offcanvas row-offcanvas-right">
                <div className="col-md-6 col-lg-4 visible-md visible-lg">
                  <br className="pull-right hidden-lg"/>
                  <div className="well Details">
                    <Iframe query={this.props.query} verse={this.state.verse} setVerse={this.setVerse.bind(this)}/>
                  </div>
                </div>
                <div className="col-md-6 col-lg-5">
                  <p className="pull-right hidden-lg">
                    <button type="button" className="btn btn-primary btn-xs Summary" data-toggle="offcanvas-right">
                      <span className="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span>
                      Search Summaries
                    </button>
                  </p>
                  <br className="pull-right hidden-lg"/>
                  <div className="well ">
                      <Results
                       query={this.props.query}
                       setVerse={this.setVerse.bind(this)}
                       options={this.state.option_types}
                       page={this.state.page} limit={this.state.limit}
                       setPage={this.setPage.bind(this)}/>
                  </div>
                </div>
                <div className="col-lg-3 Summary sidebar-offcanvas">
                  <br className="pull-right hidden-lg"/>
                  <div className="well Summaries">
                    <ul className="nav nav-tabs" role="tablist">
                      <li role="presentation" className="active"><a href="#Summaries" title="Search Summaries" data-placement="left" aria-controls="Arabic" role="tab" data-toggle="tab"><span className="glyphicon glyphicon-filter small" aria-hidden="true"></span></a></li>
                      <li role="presentation"><a href="#Etymology" title="Arabic Etymology" aria-controls="Etymology" role="tab" data-toggle="tab"><span className="glyphicon glyphicon-grain small" aria-hidden="true"></span></a></li>
                      <li role="presentation"><a href="#Queries" title="Search History" aria-controls="Queries" role="tab" data-toggle="tab"><span className="glyphicon glyphicon-step-backward small" aria-hidden="true"></span></a></li>
                      <li role="presentation"><a href="#Help" title="Help" aria-controls="Help" role="tab" data-toggle="tab"><span className="glyphicon glyphicon-question-sign small" aria-hidden="true"></span></a></li>
                    </ul>
                    <div className="tab-content">
                      <br/>
                      <Aggregates query={this.props.query} search={this.search} options={this.state.option_types} page={this.state.page} limit={this.state.limit}/>
                      <HighlightsAnalyzed query={this.props.query} search={this.search} options={this.state.option_types} page={this.state.page} limit={this.state.limit}/>
                      <Queries query={this.props.query} search={this.search} options={this.state.option_types} page={this.state.page} limit={this.state.limit}/>
                      <Help/>
                    </div>
                  </div>
                </div>
              </div>
            <br/>
          </div>
        </div>

        <div className="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <Iframe query={this.props.query} verse={this.state.verse} setVerse={this.setVerse.bind(this)} showClose="true"/>
          </div>
        </div>

       <br/>

       <nav className="navbar navbar-brand navbar-bottom">
           <div className="content row">
                 <div className="Footer" id="nav-footer">
                   <ul dir="ltr">
                     <li id="first"><a href="//www.alislam.org/contactus/">Contact</a></li>
                     <li><a href="//www.alislam.org/sitemap/">Sitemap</a></li>
                     <li><a href="//www.alislam.org/affiliated-websites.php">Affiliated Websites</a></li>
                     <li><a href="//www.alislam.org/languages.html">Languages</a></li>
                     <li><a href="//www.alislam.org/twitter">Twitter</a></li>
                     <li><a href="//www.alislam.org/facebook">Facebook</a></li>
                     <li><a href="//www.alislam.org/google-plus">Google+</a></li>
                     <br/>
                     <li id="first"><a href="//www.alislam.org/library/legal/">Terms of Service</a></li>
                     <Credits/>
                     <li><a href="//www.alislam.org/library/legal/#privacy">Privacy Policy</a></li>
                     <li>&copy; 2017 Ahmadiyya Muslim Community. All rights reserved.</li>
                   </ul>
            </div>
        </div>
      </nav>
    </div>
    )
  }

  search(query, options) {
    //console.log(query, "progress");
    $('#datalistUl').css({display:'none'});

    $("body").css("cursor", "progress");
    Meteor.call('search', query.trim().replace(/ +/, ' '), window.sessionId, options, function(error, result) {
      window.history.pushState("object or string", "Title", "/"+ query.trim().replace(/ +/g, ' ').replace(/\t+/g,' '));
      //$(window.inputId)[0].value = window.query;    //  User experience issues when leading space
                                              //  that you just typed disappears, moved this before next line
      window.query = query.trim().replace(/ +/g, ' ').replace(/\t+/g,' ');
      this.setState({page: 1});
      $("body").css("cursor", "default");
    }.bind(this));
  }
  // handleChange(e) {
  //   var options = this.state.options;
  //   options.find(x=>x.id===e.target.name).state = !options.find(x=>x.id===e.target.name).state;
  //   //console.log(e.target.value, !e.target.value, options, !e.target.checked);
  //   this.setState(options);
  //   this.search(window.query, options);
  // }


  showKeyboard(event) {
    $(window.inputId).prop('readonly', true); $(window.inputId).blur()
    window.options=this.state.option_types;
    VKI_show(document.getElementById(window.inputId.substr(1)));
  }

  handleChange(event) {
    var option_types = this.state.option_types;
    option_types.find(x=>x.id===event.target.name).state = !option_types.find(x=>x.id===event.target.name).state;
    //console.log($('input#'+event.target.name).prop('checked'))
    this.setState(option_types);
    this.search(window.query, option_types);
  }

  handleChangeOptions(x,y) {
    var option_types = this.state.option_types;
    option_types.find(o=>o.id===y).options.find(p=>p.id===x).state = !option_types.find(o=>o.id===y).options.find(p=>p.id===x).state;
    this.setState(option_types);
    this.search(window.query, option_types);
  }

  options_panel(event) {
    var display = (this.state.options_panel=='none')?'':'none';
    this.setState({options_panel: display});
  }
  queries_panel(event) {
    var display = (this.state.queries_panel=='none')?'':'none';
    this.setState({queries_panel: display});
  }
  aggregates_panel(event) {
    var display = (this.state.aggregates_panel=='none')?'':'none';
    this.setState({aggregates_panel: display});
  }
  setVerse(verse) {
    this.setState({verse: verse});
  }
  setPage(page,limit) {
    this.setState({page: page, limit:limit});
  }

  openMenu(event) { //data-toggle="dropdown" This is removed as input boxes don't render properly with bootstap toggle. The custom function is written to accomodate instead - NI
    event.stopPropagation(); //Target changes based on click focus on DOM, this line and next are to accomodate for that as $(this) doesn't work in JSX
    var $btn = $(event.target).is('button')?$(event.target):$(event.target).parent().parent();
    $btn.parent().toggleClass('open');
  }
}

window.suggestDiv_close_delayed = function() {
  if ($('#keyboardInputMaster').length == 0) {
    $('#datalistUl').css({display:'none'});
  }
  //$(window.inputId).attr('readonly', false);
}
//window.suggest_query = ""
window.suggest_e = function(query) {
  var complete = []

  if (query != ''){ //&& query != window.suggest_query) {
    $(window.inputId).attr('readonly', true);
    Meteor.call('suggest', query, window.sessionId, window.options.filter(function(o){return o.state}).map(o=>o.id), function(error, result) {
      //console.log(result.took)
      //console.log(result)
      Object.keys(result.aggregations).map(function (z){
        result.aggregations[z].buckets.map(function(k){
          t=complete.map(r=>r.key).indexOf(k.key)

          if (t==-1) {
            complete.push({key:k.key,count:k.doc_count,score:k.score,type:[z]})
          } else {
            if (complete[t].score < k.score) {
              complete[t]={key:k.key,count:k.doc_count,score:k.score}
            }
            if (complete[t].type) {
              complete[t].type.push(z)
            } else {
              complete[t].type=[z]
            }
          }
        })
      })
      // if ('options' in document.createElement('datalist')) {                            //HTML5 Supported Browsers
      //   $('#datalist').empty();
      //   complete.sort(function (a,b){ return b.score - a.score}).map(function(i){
      //     $('#datalist').append("<option value='" + query + '-->' + i.key + "'>");
      //   })
      // } else
      {
        if (complete.length >0 || query.length < 1) {
          $('#datalistUl').empty();                 // Commented to keep older results.
          $('#datalistUl').css('background-color','#fff')
        } else {
          $('#datalistUl').css('background-color','#eee')
        }
        complete.sort(function (a,b){ return a.score - b.score}).map(function(i){
          $('#datalistUl').prepend("<li class='btn-block btn btn-xs'><a href=\"#\" onclick=\"search_q(\'"+i.key+"\')\">" + i.key
                  //+ " ("+ i.type +")"                 // TODO: To be implemented with good graphics/icons
                  //+ " "+ i.score
                  + "<span class=\"btn-xs pull-left\">" + (i.count) + "</span>"
                +"</a></li>");
        })
        if (complete.length >0) {
          $('#datalistUl').append("<button type=\"button\" class=\"close\" style=\"float:left\" \
          onClick=\"$('#datalistUl').css({display:'none'}); $(window.inputId).attr('readonly', false);$(window.inputId).focus();\"> \
          <span aria-hidden=\"true\">&times;</span> \
          </button>")
        }
        $('#datalistUl').css({display:'block'});
        if ($('#keyboardInputMaster').length == 0) {
          $(window.inputId).attr('readonly', false);
        }
      }

      //$('#datalistUl').css({display:'block'});
      //t.setState({suggestionlist:complete.sort(function (a,b){ return b.score - a.score})})
    })
  }
}


window.search_q = function (query) {
  //$(window.inputId)[0].value=query
  q=$(window.inputId)[0].value
  q=q.split(' ').slice(0,-1).join(' ').trim() + ' ' + query
  $(window.inputId)[0].value=q.replace(/^ +/,'').trim()

  //this.searchButton()
  $('button.Search').trigger("click")
}
