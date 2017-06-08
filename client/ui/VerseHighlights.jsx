import React, { Component, state } from 'react';

export default class VerseHighlights extends Component {
  render() {
    return (
        <div className="reference">
            <div className={'highlights noselect ' + this.props.Type + ' base container-fluid Verse'}>
                <span dangerouslySetInnerHTML={{__html: this.props.base}}></span>
            </div>
            <div className={'highlights noselect ' + this.props.Type + ' visible container-fluid Verse'}>
                <span dangerouslySetInnerHTML={{__html: this.props.base}}></span>
            </div>
            {Object.keys(this.props.highlights).map(function(k) {
                var re = new RegExp(this.props.Type, 'g');
                return (k.search(re)!=-1?
                  <div key={k + "." + this.props._id} className={"highlights noselect " + k.replace(/\.|_/g,' ')}>
                    <span dangerouslySetInnerHTML={{__html: this.props.highlights[k]}}></span>
                  </div>:'');
              }.bind(this))
            }
        </div>
    );
  }
}
