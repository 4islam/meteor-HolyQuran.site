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
        <button type="button" onClick={e => this.filterLayersForward("Urdu")} className="btn btn-secondary active">All Urdu</button>
        <button type="button" onClick={e => this.filterLayersForward("English")} className="btn btn-secondary active">All English</button>
        <button type="button" onClick={e => this.filterLayersReverese("(English|Urdu)")} className="btn btn-secondary active">Everything but English or Urdu</button>
        <button type="button" onClick={e => this.filterLayersForward("Comment")} className="btn btn-secondary active">Commentaries only</button>
        <button type="button" onClick={e => this.filterLayersForward("nothing")} className="btn btn-secondary active">Disable all</button>
        <button type="button" onClick={e => this.filterLayersForward("")} className="btn btn-secondary active">Enable all</button>
        <button type="button" onClick={e => this.filterLayersDefault()} className="btn btn-secondary active">Default</button> | <button type="button" onClick={e => this.showEnabledToggle()} className={"btn btn-secondary "+(this.state.showDisabled?"active":"")}>Show Enabled Only</button>
        <div className="input-group" dir="ltr">
          <div className="input row">
            <input type="text" autoComplete="off"
               onChange={e => this.filterLayers(e.target.value)}
               className="form-control" placeholder="Search by layer name"/>
          </div>
          <div className="input-group-btn">
            <button type="button" onClick={e => this.props.search(query, this.props.options)} className="btn btn-secondary">Set</button>
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
   this.props.search(window.query, option_types);
 }
 handleChange(name) {
   var option_types = this.props.options;
   option_types.find(x=>x.id===name).state = !option_types.find(x=>x.id===name).state;
   //console.log($('input#'+event.target.name).prop('checked'))
   this.setState(option_types);
   this.props.search(window.query, option_types);
 }
 filterLayers(layer) {
   this.setState({showDisabled:false})
   layer=layer.replace(/[^a-zA-Z]+/, '').trim()
   this.setState(this.props.options.map((y,z)=>{
     (new RegExp('.*'+layer+'.*','i').test(y.name)||new RegExp('.*'+layer+'.*', 'i').test(y.id))?
        y.state=true:y.state=false}
    ))
    // .sort(function(a, b) {return a.state < b.state?1:-1})

   // this.setState(options) //Exceptions: 0 is Arabic and 1 is Chapters
   // this.props.search(query, this.props.options)
   var currentTO_search = setTimeout(this.props.search, 500, query, this.props.options);
   clearTimeout(previousTO_search); previousTO_search = currentTO_search
 }
 filterLayersReverese(layer) {
   this.setState(this.props.options.map((y,z)=>{
     (new RegExp('.*'+layer+'.*','i').test(y.name)||new RegExp('.*'+layer+'.*', 'i').test(y.id))?
        y.state=false:y.state=true}
    ))
   this.props.search(query, this.props.options)
 }
 filterLayersForward(layer) {
   this.setState(this.props.options.map((y,z)=>{
     (new RegExp('.*'+layer+'.*','i').test(y.name)||new RegExp('.*'+layer+'.*', 'i').test(y.id))?
        y.state=true:y.state=false}
    ))
   this.props.search(query, this.props.options)
 }
 filterLayersDefault() {
   this.setState(this.props.options.map((y,z)=>{y.id==="English"||z===0||z===1?y.state=true:y.state=false})) //Exceptions: 0 is Arabic and 1 is Chapters)
   this.props.search(query, this.props.options)
 }
 showEnabledToggle() {
   this.setState({showDisabled:!this.state.showDisabled})
 }
}
