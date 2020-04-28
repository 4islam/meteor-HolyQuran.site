import React, { Component, state } from 'react';

export default class VerseHighlights extends Component {
  render() {
    return (
        <div className={this.props.Type+" reference"}>
            {Object.keys(this.props.highlights).map(function(k) {
                var re = new RegExp(this.props.Type + '(_.*)?$', 'g')              //Must end with either '_' or end of line
                return (k.search(re)!=-1?
                  <div key={k + "." + this.props._id} className={"highlights noselect " + k.replace(/\.|_/g,' ')}
                    dangerouslySetInnerHTML={{__html: this.props.highlights[k][0].replace(/(\u06E3|\u06E8)/,' $1')}}/>
                  :'');
              }.bind(this))
            }
            <div className={'highlights noselect ' + this.props.Type + ' base container-fluid Verse'}
              dangerouslySetInnerHTML={{__html: this.props.base.replace(/(\u06E3|\u06E8)/,' $1')}}/>
            <div className={'highlights ' + this.props.Type + ' visible container-fluid Verse'}
              dangerouslySetInnerHTML={{__html: this.props.base.replace(/(\u06E3|\u06E8)/,' $1')}}/>
        </div>
    );
  }
}
