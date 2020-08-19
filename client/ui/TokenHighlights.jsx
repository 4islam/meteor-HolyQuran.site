import React, { Component , state } from 'react';
import PropTypes from 'prop-types';

export default class TokenHighlights extends Component {
 render() {

   var tags=this.props.tags;
   var data=this.props.data.results;

   var objCounts=[]
   data.map(function(x,i) {
     analyzers.slice(0,3).reverse().map(function (z){
       if(x.analyzer===z.id){
         var ro={token:'',positions:[], count:0, analyzer:z.id};
         //if(!x.tokens.tokens){console.log(x.tokens, x[i], i, x)}
         x.tokens.tokens.sort(function (a,b) {
              if (a.token < b.token) return -1;
              if (a.token > b.token) return 1;
              return 0;
            })
         x.tokens.tokens.map(function(y) {
           //console.log(tags[i].token.count)
           if (tags[i] &&tags[i].token && tags[i].token.count) {
             if (y.token==ro.token) {
               ro.positions.push(y.position)
               ro.count=ro.count+tags[i].token.count
             } else {
               objCounts.push(ro);ro = new Object()
               ro.token=y.token
              //  console.log(i, tags[i])
              //  console.log('y.token', y.token, tags[i].token)
               ro.count=1
               ro.count=tags[i].token.count
               ro.positions=[y.position]
               ro.analyzer=z.id
             }
           }
         })
       }
     })});
   //console.log(objCounts);

  //  roots=[]
  //  objCounts.map(function(m){
  //   analyzers.slice(2).reverse().map(function (z){
  //     if(m.analyzer===z.id){
  //       //console.log(m, "----");
  //           data[1].tokens.tokens.map(j=>   //1 for ar_stems
  //           (m.positions.indexOf(j.position)!=-1)?
  //                   console.log(j.token)
  //                   :''
  //             )
  //     }
  //   })
  //  })

   var dataTable = []
   data.map((x,i)=>
     data[0].tokens.tokens.map(function(j){
       if (analyzers.map(z=>z.id).indexOf(x.analyzer) != -1) {
         x.tokens.tokens.map(function(y){
             if(j.position==y.position){
                 var k=y.position; var c,t
                 if(!dataTable[k]){dataTable[k]=[]}
                 c=(i==0)?
                   tags.map(z=>z.token.id===y.token?z.token.count:'').join('')
                     :objCounts.map(w=>w.token===y.token?w.count:'').join('')
                 c=(c!='')?c:0
                 t=(y.token!='')?y.token:'--'
                 dataTable[k][i]={
                   token:t,
                   position:y.position,
                   type:x.analyzer,
                   count:c
                 }
               }
           })
         }
     })
   )

  //console.log(dataTable);
  analyzers.slice(0).reverse().map(function (z,i){
    // dataTable.sort(function (a,b) {
    //        if (a[i].count*1 < b[i].count*1) return 1;
    //        if (a[i].count*1 > b[i].count*1) return -1;
    //        return 0;
    //      })
    dataTable.sort(function (a,b) {
          // if (!a[i]) {console.log("a", i)}
          // if (!b[i]) {console.log("b", i)}
          //-----
          if (!a[i] || !b[i]) return 1;
          if (a[i].token < b[i].token) return 1;
          if (a[i].token > b[i].token) return -1;
           return 0;
         })
  })
  //console.log(dataTable)

  //  console.log(data);
  //  console.log(tags);

   return <div className="Token Highlights base table table-bordered">
            {
              dataTable?
                <table className={this.props.options[0].id}><tbody>
                {
                dataTable.map((x,i)=>(
                  <tr key={i}>
                  {
                    //analyzers.map((z,k)=>(
                      x.reverse().map((y,j)=>(
                      //  (j==k)?
                        //  (analyzers.map(z=>z.id).indexOf(y.type)!='-1')?
                            (i>0 && dataTable[i-1][j] && dataTable[i-1][j].token != dataTable[i][j].token || i==0)?
                               <td className="notblank" key={i+'-'+j}><span className="cohorts" key={i+'-'+j+':'+y.token}><a onClick={this.handleChange.bind(this, y.token)}>{y.token}</a> {y.count?<span className="cohortsCount">{y.count}</span>:''} {(j != 2) ?'':''}</span></td>
                              :<td className="blank" key={i+'-'+j}></td>

                        //  :'-'
                      ))
                    //))
                  }
                  </tr>
                ))
              }
              </tbody></table>:'..'
            }
        </div>

 }
 handleChange(query, e) {
   //console.log(query, options, e.target);
   this.props.search(query, this.props.options);
   $(window.inputId)[0].value = query;
 }
}
