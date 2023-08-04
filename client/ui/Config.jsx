import React, { Component , state } from 'react';
import PropTypes from 'prop-types';
import Switch from "react-switch";

// App component - represents the whole app
export default class Config extends Component {
  constructor() {
    super();
    this.state={
      showDisabled:true
    }
  }
 render() {
   return (
     <div id="collapsible" className="searchButtons">
      <div className="searchButtonsFilters">
        <button type="button" onClick={e => this.filterLayersForward("Urdu")} className="btn btn-secondary">All Urdu</button>
        <button type="button" onClick={e => this.filterLayersForward("English")} className="btn btn-secondary">All English</button>
        <button type="button" onClick={e => this.filterLayersReverese("(English|Urdu)")} className="btn btn-secondary">All but English or Urdu</button>
        <button type="button" onClick={e => this.filterLayersForward("Notes")} className="btn btn-secondary">Commentaries only</button>
        <button type="button" onClick={e => this.filterLayersForward("nothing")} className="btn btn-secondary">Disable all</button>
        <button type="button" onClick={e => this.filterLayersForward("")} className="btn btn-secondary">Enable all</button>
        <button type="button" onClick={e => this.filterLayersDefault()} className="btn btn-secondary">
          Default</button> <br/> <button type="button" onClick={e => this.showEnabledToggle()} className={"btn btn-secondary "+(this.state.showDisabled?"":"active")}>Show Enabled Only</button>
        <div className="input-group" dir="ltr">
          <div className="input row">
            <input id="searchfilter" type="text" autoComplete="off"
               onChange={e => this.filterLayers(e.target.value)}
               className="form-control" placeholder="Search by layer name"/>
          </div>
          <div className="input-group-btn">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
      <hr/>
       <div className="searchButtonsDiv list-group">
         {
           this.props.options.map(x=>
               <div className={x.id+" btn-group list-group-item flex-item "+((x.state||this.state.showDisabled)?"":"hidden")}
                role="group" key={x.name}>
                   <span className="switchLayers">
                    <Switch id={x.id} onChange={this.handleChange.bind(this, x.id)} checked={x.state} />
                   </span>
                   <button className={"btn btn-default dropdown-toggle " + x.id}
                     id="config" type="button" onClick={this.openMenu}
                     name={x.name}
                     style={this.props.hideUnmatched?{'color':'#bcbcbc'}:{}}
                     aria-haspopup="true" aria-expanded="false">
                         <span dangerouslySetInnerHTML={{__html: x.name}}/><span className="caret"></span>
                     </button>
                   <ul className={(x.name=='Arabic')?'dropdown-menu dropdown-menu-right list-group':'dropdown-menu list-group'}
                       aria-labelledby="config">
                     {
                       x.options.map(y=>
                         <li className="list-group-item flex-table align-items-start " key={'span_' + y.id}>
                         <span className="switchLayersSub">
                           <Switch
                             name={y.id}
                             type="checkbox"
                             checked={y.state}
                             disabled={!x.state}
                             onChange={this.handleChangeOptions.bind(this,y.id,x.id)} />
                          </span>
                          <span className="switchLayersSubText">{y.name + ' '}</span>
                         </li>
                       )
                     }
                     </ul>
               </div>)
         }
       </div>
     </div>
     )
 }
 openMenu(event) { //data-toggle="dropdown" This is removed as input boxes don't render properly with bootstrap toggle. The custom function is written to accomodate instead - NI
   event.stopPropagation(); //Target changes based on click focus on DOM, this line and next are to accomodate for that as $(this) doesn't work in JSX
   // console.log(event.target, $(event.target).parent().parent(), $(event.target).parent(), $(event.target));
   var $btn = $(event.target).is('button')?$(event.target):$(event.target).parent();
   let classExists = ($btn.parent().hasClass('open'))?true:false
   $btn.parent().parent().children().removeClass('open')
   if (!classExists) {
     $btn.parent().addClass('open')
   }
 }
 handleChangeOptions(x,y) {
   let option_types = this.props.options;
   option_types.find(o=>o.id===y).options.find(p=>p.id===x).state = !option_types.find(o=>o.id===y).options.find(p=>p.id===x).state;
   this.setState(option_types);
   this.props.search(window.query, option_types,1,limit);
 }
 handleChange(name) {
   var option_types = this.props.options;
   option_types.find(x=>x.id===name).state = !option_types.find(x=>x.id===name).state;
   //console.log($('input#'+event.target.name).prop('checked'))
   this.setState(option_types);
   this.props.search(window.query, option_types,1,limit);
 }
 filterLayers(layer) {
   window.query="";$(window.inputId)[0].value=window.query
   this.setState({showDisabled:false})
   layer=layer.replace(/ +/g,".*").trim()
   // console.log(layer);
   this.setState(this.props.options.map((y,z)=>{
     (new RegExp('.*'+layer+'.*','i').test(y.name)||new RegExp('.*'+layer+'.*', 'i').test(y.id))?
        y.state=true:y.state=false}
    ))
    // .sort(function(a, b) {return a.state < b.state?1:-1})

   // this.setState(options) //Exceptions: 0 is Arabic and 1 is Chapters
   // this.props.search(query, this.props.options)

   //Disabled below, does't work well on phones when it searches on its own.
   // var currentTO_search = setTimeout(this.props.search, 750, query, this.props.options);
   // clearTimeout(previousTO_search); previousTO_search = currentTO_search
 }
 filterLayersReverese(layer) {
   this.setState({showDisabled:false})
   this.setState(this.props.options.map((y,z)=>{
     (new RegExp('.*'+layer+'.*','i').test(y.name)||new RegExp('.*'+layer+'.*', 'i').test(y.id))?
        y.state=false:y.state=true}
    ))
   this.props.search(query, this.props.options,1,limit)
 }
 filterLayersForward(layer) {
   this.setState(this.props.options.map((y,z)=>{
     (new RegExp('.*'+layer+'.*','i').test(y.name)||new RegExp('.*'+layer+'.*', 'i').test(y.id))?
        y.state=true:y.state=false}
    ))
   this.props.search(query, this.props.options,1,limit)
 }
 filterLayersDefault() {
   this.setState({showDisabled:false})
   $("#searchfilter")[0].value=""

   this.setState(this.props.options.map((y,z)=>{y.id==="English"||y.id==="Urdu"||z===0||z===1?y.state=true:y.state=false})) //Exceptions: 0 is Arabic and 1 is Chapters)
   this.props.search(query, this.props.options,1,limit)
 }
 showEnabledToggle() {
   this.setState({showDisabled:!this.state.showDisabled})
 }
}
