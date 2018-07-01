import React, { Component , state } from 'react';
import PropTypes from 'prop-types';


export default class Tokens extends Component {
  componentDidMount() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

 render() {
   //console.log(this.props.verse)
   return (<table className="Token base table-bordered">
            <tbody>
              {this.props.data.results?
                    this.props.data.results.slice(0,3).map((x,i)=>      //Limiting to first 3 entries
                          <tr key={i+'.'+x.analyzer}>
                              <th><button type="button"
                                className="btn btn-default btn-xs"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                onClick={(e) => this.CopyTokens(x,this.props.verse, event, i)}
                                title="Copy this text"> {x.name} <span className="glyphicon glyphicon-copy small"> </span>
                              </button></th>
                              {
                                this.props.data.results[0].tokens.tokens.map((j,k)=>
                                  <td key={i+'.'+x.analyzer+'.'+j.position}>
                                    {x.tokens.tokens.map(y=>
                                      (j.position==y.position)?' '+y.token:null
                                    )}
                                </td>
                                )
                              }
                          </tr>
                    ):'...'
              }
        </tbody>
       </table>)
 }
 CopyTokens(x,v,event, i) {
   txt=""
   this.props.data.results[0].tokens.tokens.map(j=>
       {x.tokens.tokens.map(y=>
         {
           if (j.position==y.position) {
             txt+=' '+y.token;
           }
         }
       )}
   )
  txt += (i==0)?' ['+v+']':' '    //only for original
  this.copyToClipboard(txt);
  var $btn = $(event.target).is('button')?$(event.target):$(event.target).parent();
  $btn.attr('title', 'Copied')
          .tooltip('fixTitle')
          .tooltip('show')
          .attr('title', 'Copy this text')
          .tooltip('fixTitle');
 }
  copyToClipboard(txt) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(txt).select();
    document.execCommand("copy");
    $temp.remove();
  }
}
