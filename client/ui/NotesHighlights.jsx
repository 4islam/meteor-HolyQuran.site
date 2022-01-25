import React, { Component, state } from 'react';

export default class NotesHighlights extends Component {
  render() {
    return (
        <div className={this.props.Type+" reference"}>
            {(this.props.highlights)?Object.keys(this.props.highlights).map(function(k,i) {
                var re = new RegExp(this.props.Type + '(_.*)?$', 'g')              //Must end with either '_' or end of line
                if (k.search(re)!=-1) {
                   return (
                      <ul key={k+"."+i} className={"fragments " + k.replace(/\.|_/g,' ')}>
                        {
                          this.props.highlights[k].map((l,j)=>(
                            <span key={k+"."+i+"."+l} dangerouslySetInnerHTML={{__html: " ... " + this.props.highlights[k][j].replace(/(\u06E3|\u06E8)/,' $1') + " "}}/>
                          ))
                        }
                      ...</ul>
                    )
                  }

              }.bind(this))
            :''}
        </div>
    );
  }
}
