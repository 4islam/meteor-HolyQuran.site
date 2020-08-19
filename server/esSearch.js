// var Future = Npm.require('fibers/future');

var es = require('elasticsearch');
var esClient = new es.Client({
  host: 'localhost:9200',
  log: 'warning'
});

import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
var requestLimit = 1;
var requestTimeout = 475;

Meteor.startup(() => {
  if (Meteor.isServer) {
       ESCol._ensureIndex( {
         "session.id" : 1,
         "session.date" : 1,
         "query" : 1
      });
      ESCol._ensureIndex(
        {"session.date" : 1},
        { expireAfterSeconds: 14*(24*3600) }  //14 days
      );
  }
});

Meteor.methods({
  search:function (query, sID, options, page, limit) {
  limit=parseInt(limit)
  page=parseInt(page)
  if (isNaN(limit)){
    limit=globallimit
  }
  if (isNaN(page)) {
    page=1
  }
  // console.log("Received: ", page,limit);
  // var future = new Future();
  var sessionId = this.connection.id
  if (sID != '') {
    sessionId = sID
    console.log(sessionId,"is:",this.connection.id);
  }
  tquery = query.trim().replace(/ +/g, ' ').replace(/\t+/g,' ').substring(0,500);      //max 500 character limit
  queryArray = tquery.split(' ');
  ql = queryArray.length-1;
  var q1=[];var q2=[];
  queryTypes = queryArray.map((q,i)=>{
      if (q.search(/^[a-zA-Z_]+:[><=]?.+$/i)!= '-1') {q1.push(q)}
      else {q2.push(q)}
      if (i==ql) {return [q1,q2]}
    })[ql]
  queryFilters = queryTypes[0]
  query = queryTypes[1].join(' ')
  if (query == '') {query='*'}
  //var sessionId = (sID)?sID.replace(/\W/g, ''):''; //Only takes alphanumerics
  //var sessionId = sID.replace(/\W/g, ''); //Only takes alphanumerics

  var date = new Date();
  // console.log(sessionId, page, limit);

  //console.log(JSON.stringify(options))
  options_str=JSON.stringify(options);

  // tquery = tquery.replace(':','\\:')
  // tquery = '"'+tquery.replace('"','\'')+'"';
  if (tquery != "") {

    console.log(sessionId,"Search Query request for:",tquery);
    if (cacheResults && ESCol.findOne({$and:[{query:tquery},{options:options_str},{page:page},{limit:limit}, {'session.id':{$nin:[sessionId]}}]})) {  // If query is present already

      ESCol.update({$and:[{query:tquery},{options:options_str},{page:page},{limit:limit}]},{$push:{session:{id:sessionId,date:date}}},{ upsert: true }); // Updating existing Mongo DB
      console.log(sessionId,"Search Query updated for:",tquery);

    } else if (cacheResults && ESCol.findOne({$and:[{query:query},{options:options_str},{page:page},{limit:limit}, {'session.id':{$in:[sessionId]}}]})) { //If query exists for the current user, it must be shiffled to bring to top

      ESCol.update({$and:[{query:tquery},{options:options_str},{page:page},{limit:limit}, {'session.id':{$in:[sessionId]}}]},{$set:{'session.$.date':date}});
      console.log(sessionId,"Search Query shuffled for:",tquery);

    } else {

      console.log(sessionId,"Search Query ES Start for:",tquery);

      matchArray = [
        {match: {[options[0].id]: {query: query,"boost": 10}}},
        // {match: {"Arabic": {query: query,"boost": 10}}},

        {match: {[options[0].id+".ar_stems"]: {query: query,"boost": 6}}},
        {match: {[options[0].id+".ar_root"]: {query: query,"boost": 4}}}, //p

        {match: {[options[0].id+".ar_normalized"]: {query: query,"boost": 9}}},
        {match: {[options[0].id+".ar_normalized_phonetic"]: {query: query,"boost": 5}}},

        {match: {[options[0].id+".ar_stems_normalized"]: {query: query,"boost": 8}}},
        {match: {[options[0].id+".ar_stems_normalized_phonetic"]: {query: query,"boost": 4}}},
        {match: {[options[0].id+".ar_root_normalized"]: {query: query,"boost": 7}}},
        {match: {[options[0].id+".ar_root_normalized_phonetic"]: {query: query,"boost": 3}}},

        {match: {[options[0].id+".ar_ngram_original"]: {query: query,"boost": 5}}},

        {match: {[options[0].id+".ar_ngram_normalized"]: {query: query,"boost": 4}}},
        {match: {[options[0].id+".ar_normalized_ngram_phonetic"]: {query: query,"boost": 2}}},

        {match: {[options[0].id+".ar_ngram_stems"]: {query: query,"boost": 4}}},
        {match: {[options[0].id+".ar_ngram_root"]: {query: query,"boost": 3}}},
        {match: {[options[0].id+".ar_ngram_root_normalized"]: {query: query,"boost": 2}}},
        {match: {[options[0].id+".ar_ngram_root_normalized_phonetic"]: {query: query,"boost": 1}}},

        {match: {[options[0].id+".ar_ngram_stems_normalized"]: {query: query,"boost": 4}}},
        {match: {[options[0].id+".ar_ngram_stems_normalized_phonetic"]: {query: query,"boost": 2}}},

        {match: {"Surah": {query: query,"boost": 3}}},

        {match: {"Surah.ar_normalized": {query: query,"boost": 1.7}}},
        {match: {"Surah.ar_ngram_original": {query: query,"boost": 1}}},
        {match: {"Surah.ar_normalized_phonetic": {query: query,"boost": 1.7}}},

        {match: {"Surah.ar_ngram_normalized": {query: query,"boost": 2.5}}},
        {match: {"Surah.ar_normalized_ngram_phonetic": {query: query,"boost": 2.5}}},

        // {match: {"Surah.ar_stems_normalized": {query: query,"boost": 8}}},
        // {match: {"Surah.ar_stems_normalized_phonetic": {query: query,"boost": 4}}},
        //
        // {match: {"Surah.ar_ngram_stems": {query: query,"boost": 4}}},
        // {match: {"Surah.ar_ngram_stems_normalized": {query: query,"boost": 4}}},
        // {match: {"Surah.ar_ngram_stems_normalized_phonetic": {query: query,"boost": 2}}},

        {match: {"ayah": {query: query,"boost": 8}}},
        {match: {"ayah.ayah_normalized_ar": {query: query,"boost": 7}}},
        {match: {"ayah.ayah_normalized_ur": {query: query,"boost": 6}}},

        {match: {"Urdu": {query: query,"boost": 5}}},
        // {match: {"Urdu.ur_phonetic": {query: query,"boost": 2}}},       // Not sure if needed
        {match: {"Urdu.ur_normalized": {query: query,"boost": 3}}},
        {match: {"Urdu.ur_ngram_original": {query: query,"boost": 2.5}}},
        {match: {"Urdu.ur_normalized_ngram": {query: query,"boost": 2}}},

        {match: {"UrduTS": {query: query,"boost": 5}}},
        // {match: {"Urdu.ur_phonetic": {query: query,"boost": 2}}},       // Not sure if needed
        {match: {"UrduTS.ur_normalized": {query: query,"boost": 3}}},
        {match: {"UrduTS.ur_ngram_original": {query: query,"boost": 2.5}}},
        {match: {"UrduTS.ur_normalized_ngram": {query: query,"boost": 2}}},

        {match: {"English": {query: query,"boost": 5}}},
        {match: {"English.en_normalized": {query: query,"boost": 3}}},
        {match: {"English.en_ngram_original": {query: query,"boost": 2.5}}},
        {match: {"English.en_normalized_ngram": {query: query,"boost": 2}}},

        {match: {"German": {query: query,"boost": 5}}},
        {match: {"German.de_normalized": {query: query,"boost": 3}}},
        {match: {"German.de_ngram_original": {query: query,"boost": 2.5}}},
        {match: {"German.de_normalized_ngram": {query: query,"boost": 2}}},

        {match: {"Spanish": {query: query,"boost": 5}}},
        {match: {"Spanish.es_normalized": {query: query,"boost": 3}}},
        {match: {"Spanish.es_ngram_original": {query: query,"boost": 2.5}}},
        {match: {"Spanish.es_normalized_ngram": {query: query,"boost": 2}}},

        {match: {"French": {query: query,"boost": 5}}},
        {match: {"French.fr_normalized": {query: query,"boost": 3}}},
        {match: {"French.fr_ngram_original": {query: query,"boost": 2.5}}},
        {match: {"French.fr_normalized_ngram": {query: query,"boost": 2}}},

        //{match: {[options[0].id+".trigram"]: {query: query,"boost": 8}}}

        {match: {"EnglishCorpus": {query: query,"boost": 5}}},
        {match: {"EnglishCorpus.en_normalized": {query: query,"boost": 3}}},
        {match: {"EnglishCorpus.en_ngram_original": {query: query,"boost": 2.5}}},
        {match: {"EnglishCorpus.en_normalized_ngram": {query: query,"boost": 2}}},

      ];

      removeCandidates=[];
      options.map(function(y,i){
        //console.log(y);
        y.options.map(function(x,i){
          if (!x.state || !y.state) {
            if (x.id == 'root') {
              matchArray.find(function (x,i){
                var re = (y.state)? new RegExp(y.id+"\\..*root"): new RegExp(y.id+"(\\..*)?$");
                if (Object.keys(x.match)[0].search(re)!=-1) {
                  if (removeCandidates.indexOf(i)==-1) {
                    removeCandidates.push(i);
                  }
                }
              })
            }
            if (x.id == 'normalized') {
              matchArray.find(function (x,i){
                var re = (y.state)? new RegExp(y.id+"\\..*normal"): new RegExp(y.id+"(\\..*)?$");
                if (Object.keys(x.match)[0].search(re)!=-1) {
                  if (removeCandidates.indexOf(i)==-1) {
                    removeCandidates.push(i);
                  }
                }
              })
            }
            if (x.id == 'stems') {
              matchArray.find(function (x,i){
                var re = (y.state)? new RegExp(y.id+"\\..*stem"): new RegExp(y.id+"(\\..*)?$");
                if (Object.keys(x.match)[0].search(re)!=-1) {
                  if (removeCandidates.indexOf(i)==-1) {
                    removeCandidates.push(i);
                  }
                }
              })
            }
            if (x.id == 'phonetic') {
              matchArray.find(function (x,i){
                var re = (y.state)? new RegExp(y.id+"\\..*phonetic"): new RegExp(y.id+"(\\..*)?$");
                if (Object.keys(x.match)[0].search(re)!=-1) {
                  if (removeCandidates.indexOf(i)==-1) {
                    removeCandidates.push(i);
                  }
                }
              })
            }
            if (x.id == 'ngram') {
              matchArray.find(function (x,i){
                var re = (y.state)? new RegExp(y.id+"\\..*ngram"): new RegExp(y.id+"(\\..*)?$");
                if (Object.keys(x.match)[0].search(re)!=-1) {
                  if (removeCandidates.indexOf(i)==-1) {
                    removeCandidates.push(i);
                  }
                }
              })
            }
          }

          //sanization routine:
          if (names_array.indexOf(x.name) == -1) {
              x.name = names_array[i];
          }
        })
      })

      removeCandidates.sort(function (a, b) { return a*1 - b*1; });

      //console.log('\n'+removeCandidates.length);
      for (var i = removeCandidates.length -1; i >= 0; i--) {
         matchArray.splice(removeCandidates[i],1);
      }
    //  console.log('\n'+matchArray.length);

      //console.log(removeCandidates);
      matchArray.find(function (x,i){
        // console.log(Object.keys(x.match)[0])
      })

      let search_query = {
        index: "hq",
        body: {
          size: limit,
          from: (page-1)*limit,
          min_score: 1,
          query: {
            bool:{
              should:matchArray
            }
            /*multi_match : {
                  query : query+" ",
                  fields: [
                    [options[0].id+".ar_original"],
                    [options[0].id+".ar_normalized"],
                    [options[0].id+".ar_stems"],
                    [options[0].id+".ar_stems_normalized"],
                    //[options[0].id+".ar_ngram_original"],
                    //[options[0].id+".ar_ngram_normalized"],
                    // [options[0].id+".ar_ngram_stems"],
                    // [options[0].id+".ar_ngram_stems_normalized"],
                     [options[0].id+".ar_ngram_roots"],
                    //"ayah",
                    //"surah"
                    [options[0].id+".ar_roots"]
                  ]
              } */
          },
          //analyzer : "normalize_ar_custom_search",
          highlight : {
             //require_field_match: false,
             //"tags_schema" : "styled",
              pre_tags: [
                pre_tag
              ],
              post_tags: [
                post_tag
              ],
             fields: {
               "*": {
                      //"matched_fields": [],
                      //"type" : "fvh"
                      "number_of_fragments" : 0
                     }
                //"require_field_match": false,
                 //"*":{}//,

                 //"content" : {"term_vector" : "with_positions_offsets","force_source" : true},
                 /*"_all" : {},
                 [options[0].id]: {},
                 [options[0].id+".ar_stems"]: {},
                 [options[0].id+".ar_root"]: {},
                 "Surah.ar_original_normalized": {},
                 "Surah.ar_normalized_phonetic": {},
                 [options[0].id+".ar_original_normalized"]: {},
                 [options[0].id+".ar_normalized_phonetic"]: {},
                 [options[0].id+".ar_stems_normalized"]: {},
                 [options[0].id+".ar_root_normalized"]: {},
                 "ayah": {},
                 "Surah": {}*/
             }
          },
          "suggest" : {
              // "ar_normalized": {
              //   "text" : query,
              //   "term": {
              //     "field": [options[0].id+".ar_normalized"],
              //     "suggest_mode": "always",
              //     // "min_word_length": 1,
              //     "prefix_length": 0,
              //     "size": 10 //,
              //   }
              // },
              "Surah": {
                "text" : query,
                "term": {
                  "field": "Surah.trigram",
                  "suggest_mode": "always",
                  "min_word_length": 6,
                  "prefix_length": 0
                }
              },
              "Phrase": {
                "text" : query,
                "phrase": {
                    "field": options[0].id+".trigram",
                    "size": 3,
                    // "gram_size": 3,
                    "confidence":1,
                    "direct_generator": [ {
                      "field": options[0].id+".trigram",
                      "prefix_length": 0,
                      "suggest_mode": "always"
                    } ],
                    "highlight": {
                      "pre_tag": "<em>",
                      "post_tag": "</em>"
                      // "pre_tag": pre_tag,
                      // "post_tag": post_tag
                    }
                  }
                }
          },
          aggs: {
            // [options[0].id+".ar_normalized"]: {
            //       terms: {
            //           field: [options[0].id+".ar_normalized"]
            //       }
            //  },
            //  [options[0].id+".ar_ngram_original"]: {
            //        terms: {
            //            field: [options[0].id+".ar_ngram_original"]
            //        }
            //   },
            // [options[0].id+".ar_ngram_normalized"]: {
            //      terms: {
            //          field: [options[0].id+".ar_ngram_normalized"]
            //      }
            // },

            ["s_"+options[0].id+"_Trigram"]: {
                 significant_terms: {
                     field: options[0].id+".trigram"
                 }//,
                  // aggs:{
                  //   "top_Arabic": {
                  //     top_hits:{
                  //         "highlight": {
                  //             "fields": {
                  //               "*" : {},
                  //             }
                  //         },
                  //         // "_source": {
                  //         //     "includes": [
                  //         //         [options[0].id]
                  //         //     ]
                  //         // },
                  //         "size" : 1
                  //     }
                  //   }
                  //
                  // }
            },
            // [options[0].id+".ar_ngram_stems"]: {
            //      terms: {
            //          field: [options[0].id+".ar_ngram_stems"]
            //      }
            // },
            // [options[0].id+".ar_ngram_stems_normalized"]: {
            //       terms: {
            //           field: [options[0].id+".ar_ngram_stems_normalized"]
            //       }
            // },

            // "ayah": {
            //       terms: {
            //           field: "ayah"
            //       }
            //  },
             ["s_"+options[0].id+"_Words"]: {
                  significant_terms: {
                      field: options[0].id
                  }
              },
              ["s_"+options[0].id+"_Stems"]: {
                   significant_terms: {
                       field: options[0].id+".ar_stems"
                   }
              },
                  //  aggs:{
                  //    "top_Arabic": {
                  //      top_hits:{
                  //         //  "highlight": {
                  //         //      "fields": {
                  //         //        [options[0].id] : {},
                  //         //      }
                  //         //  },
                  //          "_source": {
                  //              "includes": [
                  //                  [options[0].id]
                  //              ]
                  //          },
                  //          "size" : 1
                  //      }
                  //    }
                   //
                  //  }
               //},
              ["s_"+options[0].id+"_root"]: {
                    significant_terms: {
                        field: options[0].id+".ar_root_normalized"
                    }//,
                    // aggs:{
                    //   "top_Arabic": {
                    //     top_hits:{
                    //         "_source": {
                    //             "includes": [
                    //                 [options[0].id]
                    //             ]
                    //         },
                    //         "size" : 1
                    //     }
                    //   }
                    //
                    // }
               },
               ["s_"+options[0].id+"_normalized"]: {
                     significant_terms: {
                         field: options[0].id+".ar_normalized"
                     }//,
                    //  aggs:{
                    //    "top_Arabic": {
                    //      top_hits:{
                    //          "_source": {
                    //              "includes": [
                    //                  [options[0].id]
                    //              ]
                    //          },
                    //          "size" : 1
                    //      }
                    //    }
                     //
                    //  }
                },
              // "s_ayah": {                          //Fielddata is disabled on text fields by default. Set fielddata=true on [ayah] in order to load fielddata in memory by uninverting the inverted index. Note that this can however use significant memory.
              //       significant_terms: {
              //           field: "ayah"
              //       }
              //  },
              // "s_Surah": {
              //       significant_terms: {
              //           field: "Surah"
              //       }
              //  },
              //  "Arabic_Stems": {
              //       terms: {
              //           field: [options[0].id+".ar_stems"]
              //       }
              //  },
              ["s_"+options[0].id+"_propernouns"]: {
                   significant_terms: {
                       field: options[0].id+".ar_propernouns"
                   }
               },
             ["s_"+options[0].id+"_nouns"]: {
                  significant_terms: {
                      field: options[0].id+".ar_nouns"
                  }
              },
              ["s_"+options[0].id+"_adjectives"]: {
                   significant_terms: {
                       field: options[0].id+".ar_adjectives"
                   }
               },
               ["s_"+options[0].id+"_verbs"]: {
                    significant_terms: {
                        field: options[0].id+".ar_verbs"
                    }
                },

              "s_Surah": {
                    significant_terms: {
                        field: "Surah.trigram"
                    }
              },
              "Surah": {
                     terms: {
                         field: "Surah.trigram"
                     }
              },
              "s_Urdu": {
                    significant_terms: {
                        field: "Urdu"
                    }
              },
              "s_Urdu_phrases": {
                    significant_terms: {
                        field: "Urdu.trigram"
                    }
              },
              "s_UrduTS": {
                    significant_terms: {
                        field: "UrduTS"
                    }
              },
              "s_UrduTS_phrases": {
                    significant_terms: {
                        field: "UrduTS.trigram"
                    }
              },
                "s_English": {
                       significant_terms: {
                           field: "English"
                       }
                },
                "s_English_phrases": {
                       significant_terms: {
                           field: "English.trigram"
                       }
                },
                "s_German": {
                        significant_terms: {
                            field: "German"
                      }
                },
                "s_German_phrases": {
                        significant_terms: {
                            field: "German.trigram"
                      }
                },
                "s_Spanish": {
                        significant_terms: {
                            field: "Spanish"
                      }
                },
                "s_Spanish_phrases": {
                        significant_terms: {
                            field: "Spanish.trigram"
                      }
                },
                "s_French": {
                        significant_terms: {
                            field: "French"
                      }
                },
                "s_French_phrases": {
                        significant_terms: {
                            field: "French.trigram"
                      }
                },
                "s_EnglishCorpus": {
                       significant_terms: {
                           field: "EnglishCorpus"
                       }
                },
                "s_EnglishCorpus_phrases": {
                       significant_terms: {
                           field: "EnglishCorpus.trigram"
                       }
                }
          }
        }//,
        //analyzer:"my_arabic"
      }

      let shouldDSL = search_query.body.query.bool.should
      if (queryFilters.length > 0) {
        search_query.body.query.bool=genFilterDSL(queryFilters)
        // console.log(JSON.stringify(search_query.body.query.bool.should));
        if (query == "*") {
          if (!search_query.body.query.bool.should) {  //genFilterDSL assignes this empty array
            search_query.body.query.bool.should={"match_all": {}}
          }
          search_query.body["sort"]=[{"s":"asc"},{"a":"asc"}]
          search_query.body.highlight={}
          search_query.body.suggest={}
        } else {
          search_query.body.query.bool["should"] = shouldDSL
        }
      }
      // console.log(JSON.stringify(search_query.body.from));
      // console.log(JSON.stringify(search_query.body.size));
      // console.log(JSON.stringify(search_query.body));
      esClient.search(search_query, Meteor.bindEnvironment(function (err, res) {
            //var obj = JSON.parse(JSON.stringify(res).split(',"').map(x=>x.split('":',1)[0].replace(/\./g,'_')+'":'+x.split('":').slice(1,x.split('":').length).join('":')).join(',"'));
            var obj = JSON.parse(JSON.stringify(res).replace(/\.([\w]+":)/g,'_$1'));
            //matches = res.suggest;
            matches = obj;

            highlights = []
            if (Object.keys(search_query.body.highlight).length !== 0) {
              highlights = getMarkedTokens(matches);
            }
            ESCol.insert({query:tquery, options:options_str,page:page,limit:limit, session: [{id:sessionId,date:date}], results:matches, tags:highlights});
            // console.log(matches.hits.hits.length)
            console.log(sessionId,"Search Query ES retrieved for:",tquery);

            if (highlights.length>0) {
              text_array = highlights.map(x=>x.token.id)
              if (text_array.length > 0) {
                update_analyzers(options[0].id)
                getAnalysis(analyzers,text_array,tquery,sessionId,date,0,ESAnalyzerHighlightsCol,options[0].id)
              }
            }

      }))
     }
 }
}})


// var re_pre = new RegExp(pre_tag, 'g');       //Moved to constants
// var re_post = new RegExp(post_tag, 'g');     //

getMarkedTokens = function (r) {
  // console.log(r);
  var hits = r.hits.hits; var terms = [];var ret = [];
  Object.keys(hits).map(function (v,l) {
    //console.log(hits[v].highlight, hits[v]._score)
    var term_loop = [];
    Object.keys(hits[v].highlight).map(function (k,m) {
      var text = hits[v].highlight[k][0].split(' ');
      if (k.search(/^Arabic/) !== -1 || k.search(/_/) == -1) {    //Either Arabic layers or only main layers (without _)
        // console.log(k);
        text.map(function (t) {
          if (t.search(re_pre) != -1) {
            token = t.replace(re_pre,'').replace(re_post,'');
            if (terms.indexOf(token) == -1) {
              terms.push(token);
              ret.push({token:{id:token, analyzers: [k], count:0, verses:[hits[v]._source.ayah]}})
            } else {
              ret.map(function (t) {if (t.token.id===token) {
                if (t.token.analyzers.indexOf(k) == -1) {
                  t.token.analyzers.push(k);
                }
              }})
            }
            if (term_loop.indexOf(token) == -1) {
              term_loop.push(token);
            }
          }
        })
      }
    })
    //console.log(term_loop);
  ret.map(function (t) {if (term_loop.indexOf(t.token.id) != -1) {
      if (t.token.verses.indexOf(hits[v]._source.ayah) == -1) {
        t.token.verses.push(hits[v]._source.ayah);
      }
      t.token.count = t.token.count + 1;
    }})
  })
  return ret.sort(function(a, b){return b.token.count - a.token.count});
}

DDPRateLimiter.addRule({
    type: "method",
    name: "search",
}, requestLimit, requestTimeout);
