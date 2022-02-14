const eshost = (process.env.ESHOST || 'localhost:9200');
var es = require('elasticsearch');
var esClient = new es.Client({
  host: eshost,
  log: 'warning'
});

import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
var requestLimit = 1;
var requestTimeout = 2000;

Meteor.startup(() => {
  //ESAnalyzerCol.remove({});// Removes collection per session
});

Meteor.methods({
  suggest:function (query, options) {
  //var sessionId = this.connection.id;
  query = query.trim().replace(/ +/g, ' ').replace(/\t+/g,' ').substring(0,250);      //max 500 character limit

  query = query.split(' ')                      //keeps on suggesting previous
  query = query[query.length-1]                 //terms otherwise

  //var sessionId = (sID)?sID.replace(/\W/g, ''):0; //Only takes alphanumerics

  tquery = query.trim().replace(/ +/g, ' ').replace(/\t+/g,' ').substring(0,500);      //max 500 character limit
  queryArray = tquery.match(/(?:[^\s"]+|"[^"]*")+/g);       //(?:x) is a non-capturing group, not sure why it is needed
  if(queryArray){
    ql = queryArray.length-1;
    var q1=[];var q2=[];
    queryTypes = queryArray.map((q,i)=>{
        if (q.search(/^[a-zA-Z_\.\*\d]*:[><=]?.+$/i)!= '-1' ||          // any key with with any value seperated by colon
            q.search(/^"[^\"]+"$/i)!= '-1' ||                             // any character within quotes
            q.search(/^\d+:[><=~]?[=]?[\d]*-?\d+$/i)!= '-1' ||        // any numercial key with numerical range as value
            q.search(/^\d+:\*?$/i) != '-1')                           // any numerical key with value as asterik or empty value
            {q1.push(q)}
        else {q2.push(q)}
        if (i==ql) {return [q1,q2]}
      })[ql]
    queryFilters = queryTypes[0]
    // console.log(queryFilters);
    query = queryTypes[1].join(' ')
  }
  if (query == '') {query='*'}

  var date = new Date();
  //console.log(sessionId, this.connection.id);

  //console.log(JSON.stringify(options))

  if (query != "") {
      console.log(this.connection.id,"Suggest Query for:",query);


    var matches;

    var fields = [
      ]

    if (Object.prototype.toString.call(options) === '[object Array]') {
      options.filter(function(o){
        return names_array.indexOf(o) !== -1                 //String matching sanitization
      }).map(function(o) {
        if (o=="Urdu") {
          fields.push("Urdu.ur_normalized_ngram")
          fields.push("Urdu.trigram")
        } else if (o=="UrduTS") {
          fields.push("UrduTS.ur_normalized_ngram")
          fields.push("UrduTS.trigram")
        } else if (o=="UrduTSN") {
          fields.push("UrduTSN.ur_normalized_ngram")
          fields.push("UrduTSN.trigram")
        } else if (o=="UrduAhmedAli") {
          fields.push("UrduAhmedAli.ur_normalized_ngram")
          fields.push("UrduAhmedAli.trigram")
        } else if (o=="UrduMaududi") {
          fields.push("UrduMaududi.ur_normalized_ngram")
          fields.push("UrduMaududi.trigram")
        } else if (o=="English") {
          fields.push("English.en_normalized_ngram")
          fields.push("English.trigram")
          fields.push("English.en_to_ar")
          fields.push("English.en_to_ar_noor")
          fields.push("English.en_to_ar_trigram")
          fields.push("English.en_to_ar_noor_trigram")
        } else if (o=="English5VC") {
          fields.push("English5VC.en_normalized_ngram")
          fields.push("English5VC.trigram")
        } else if (o=="EnglishSC") {
          fields.push("EnglishSC.en_normalized_ngram")
          fields.push("EnglishSC.trigram")
        } else if (o=="EnglishZafrullahKhan") {
          fields.push("EnglishZafrullahKhan.en_normalized_ngram")
          fields.push("EnglishZafrullahKhan.trigram")
        } else if (o=="Chinese") {
          fields.push("Chinese.cn_normalized_ngram")
          fields.push("Chinese.trigram")
        } else if (o=="EnglishMuhammadAli") {
          fields.push("EnglishMuhammadAli.en_normalized_ngram")
          fields.push("EnglishMuhammadAli.trigram")
        } else if (o=="EnglishPickthall") {
          fields.push("EnglishPickthall.en_normalized_ngram")
          fields.push("EnglishPickthall.trigram")
        } else if (o=="EnglishSahih") {
          fields.push("EnglishSahih.en_normalized_ngram")
          fields.push("EnglishSahih.trigram")
        } else if (o=="EnglishMaududi") {
          fields.push("EnglishMaududi.en_normalized_ngram")
          fields.push("EnglishMaududi.trigram")
        } else if (o=="EnglishAhmedAli") {
          fields.push("EnglishAhmedAli.en_normalized_ngram")
          fields.push("EnglishAhmedAli.trigram")
        } else if (o=="EnglishArberry") {
          fields.push("EnglishArberry.en_normalized_ngram")
          fields.push("EnglishArberry.trigram")
        } else if (o=="EnglishYusufAli") {
          fields.push("EnglishYusufAli.en_normalized_ngram")
          fields.push("EnglishYusufAli.trigram")
        } else if (o=="TopicsEn") {
          fields.push("TopicsEn.en_original")
          fields.push("TopicsEn.en_normalized_ngram")
          fields.push("TopicsEn.trigram")
        } else if (o=="German") {
          fields.push("German.de_normalized_ngram")
          fields.push("German.trigram")
        } else if (o=="Spanish") {
          fields.push("Spanish.es_normalized_ngram")
          fields.push("Spanish.trigram")
        } else if (o=="French") {
          fields.push("French.fr_normalized_ngram")
          fields.push("French.trigram")
        } else if (o=="Italian") {
          fields.push("Italian.it_normalized_ngram")
          fields.push("Italian.trigram")
        } else if (o=="EnglishCorpus") {
          fields.push("EnglishCorpus.en_normalized_ngram")
          fields.push("EnglishCorpus.trigram")
          fields.push("EnglishCorpus.en_corpus_to_ar")
          fields.push("EnglishCorpus.en_corpus_to_ar_noor")
        } else if (o=="Surah") {
          fields.push("Surah.ar_ngram_normalized")
          fields.push("Surah.ar_ngram_stems")
          fields.push("Surah.ar_ngram_stems_normalized")
          fields.push("Surah.trigram")

          // TODO: These need to be included but only as part of Sura sublayer, not new layers:
          // fields.push("Surah_EN_transliteration_Ahmadiyya.trigram")
          // fields.push("Surah_EN_transliteration_Ahmadiyya.en_normalized_ngram")
          // fields.push("Surah_EN_transliteration_Ahmadiyya.en_ngram_original") 

          fields.push("ayah")                         // This add Surah name
          fields.push("ayah.ayah_normalized_ar")      // suggestion from
          fields.push("ayah.ayah_normalized_ur")      // numeric entries
        }
      })
    }
    ArStr=""
    names_array.slice(0,2).map((i)=>{           // Arabic or ArabicNoor
      ArStr=(options.includes(i))?i:ArStr
    })
    console.log(ArStr);
    if (options.includes(ArStr) || fields.length == 0) {
     fields.push(ArStr+".ar_ngram_normalized")
     fields.push(ArStr+".ar_ngram_original")
     fields.push(ArStr+".ar_ngram_stems_normalized")
     fields.push(ArStr+".ar_ngram_root")
     fields.push(ArStr+".ar_ngram_root_normalized")

     fields.push(ArStr+".ar_query_suggest_ngram_normalized_phonetic")
     fields.push(ArStr+".ar_query_suggest_ngram_stems_normalized_phonetic")
     fields.push(ArStr+".ar_query_suggest_ngram_root_normalized_phonetic")

     fields.push(ArStr+".ar_nouns")
     fields.push(ArStr+".ar_adjectives")
     fields.push(ArStr+".ar_propernouns")
     fields.push(ArStr+".ar_verbs")

     fields.push(ArStr+".ar_to_en")
     fields.push(ArStr+".ar_to_en_trigram")
     fields.push(ArStr+".ar_to_en_corpus")

     fields.push(ArStr+".trigram")
     fields.push(ArStr+".trigram_normalized")

   }

    // console.log(fields)

    var aggs = {
      }

      // console.log((Object.prototype.toString.call(aggs)))
      let size = 5
      if (options.includes(ArStr)) {
        size = 1
      }

      reduce = Math.round(size / options.length);
      if (reduce > 0) {
        size = reduce
      } else {
        size = 1
      }

      if (Object.prototype.toString.call(options) === '[object Array]') {
        options.filter(function(o){
          return names_array.indexOf(o) !== -1                 //String matching sanitization
        }).map(function(o) {
          if (o=="Urdu") {
            aggs["s_Urdu_Translation_Words"] = {
                        significant_terms: {
                            "field": "Urdu",
                           "size": size
                        }
                  }
            aggs["s_Urdu_Translation_Phrases"] = {
                        significant_terms: {
                            "field": "Urdu.trigram",
                           "size": size
                        }
                  }
          } else if (o=="English") {
            aggs["s_English_Translation_Words"] = {
                 significant_terms: {
                   "field": "English",
                   "size": size
                  }
            }
            aggs["s_English_Translation_Phrases"] = {
                 significant_terms: {
                     "field": "English.trigram",
                   "size": size
                  }
            }
            if (ArStr == "Arabic") {
              aggs["s_English_to_Arabic"] = {
                   significant_terms: {
                     "field": "English.en_to_ar",
                     "size": size
                    }
              }
            } else {
              // aggs["s_English_to_Arabic"] = {
              //      significant_terms: {
              //        "field": "English.en_to_ar_noor",
              //        "size": size
              //       }
              // }
            }
        } else if (o=="EnglishZafrullahKhan") {
          aggs["s_English_Zafrullah_Khan"] = {
               significant_terms: {
                "field": "EnglishZafrullahKhan",
                 "size": size
                }
          }
          aggs["s_English_Zafrullah_Khan_phrases"] = {
               significant_terms: {
                 "field": "EnglishZafrullahKhan.trigram",
                 "size": size
                }
          }
        } else if (o=="EnglishMuhammadAli") {
          aggs["s_English_Muhammad_Ali"] = {
               significant_terms: {
                 "field": "EnglishMuhammadAli",
                 "size": size
                }
          }
          aggs["s_English_Muhammad_Ali_phrases"] = {
               significant_terms: {
                 "field": "EnglishMuhammadAli.trigram",
                 "size": size
                }
          }
        } else if (o=="EnglishYusufAli") {
          aggs["s_English_Yusuf_Ali"] = {
               significant_terms: {
                 "field": "EnglishYusufAli",
                 "size": size
                }
          }
          aggs["s_English_Yusuf_Ali_phrases"] = {
               significant_terms: {
                 "field": "EnglishYusufAli.trigram",
                 "size": size
                }
          }
        } else if (o=="EnglishAhmedAli") {
          aggs["s_English_Ahmed_Ali"] = {
               significant_terms: {
                 "field": "EnglishAhmedAli",
                 "size": size
                }
          }
          aggs["s_English_Ahmed_Ali_phrases"] = {
               significant_terms: {
                 "field": "EnglishAhmedAli.trigram",
                 "size": size
                }
          }
        } else if (o=="EnglishPickthall") {
          aggs["s_English_Pickthall"] = {
               significant_terms: {
                 "field": "EnglishPickthall",
                 "size": size
                }
          }
          aggs["s_English_Pickthall_phrases"] = {
               significant_terms: {
                 "field": "EnglishPickthall.trigram",
                 "size": size
                }
          }
        } else if (o=="EnglishMaududi") {
          aggs["s_English_Maududi"] = {
               significant_terms: {
                 "field": "EnglishMaududi",
                 "size": size
                }
          }
          aggs["s_English_Maududi_phrases"] = {
               significant_terms: {
                 "field": "EnglishMaududi.trigram",
                 "size": size
                }
          }
        } else if (o=="EnglishArberry") {
          aggs["s_English_Arberry"] = {
               significant_terms: {
                 "field": "EnglishArberry",
                 "size": size
                }
          }
          aggs["s_English_Arberry_phrases"] = {
               significant_terms: {
                 "field": "EnglishArberry.trigram",
                 "size": size
                }
          }
        } else if (o=="EnglishSahih") {
          aggs["s_English_Sahih"] = {
               significant_terms: {
                 "field": "EnglishSahih",
                 "size": size
                }
          }
          aggs["s_English_Sahih_phrases"] = {
               significant_terms: {
                 "field": "EnglishSahih.trigram",
                 "size": size
                }
          }

        } else if (o=="TopicsEn") {
          aggs["s_Topics_English"] = {
               significant_terms: {
                "field": "TopicsEn",
                 "size": size
                }
          }
          aggs["s_Topics_English_Phrases"] = {
               significant_terms: {
                 "field": "TopicsEn.trigram",
                 "size": size
                }
          }

        } else if (o=="UrduTS") {
            aggs["s_Urdu_Tafseer_Words"] = {
                 significant_terms: {
                     "field": "UrduTS",
                   "size": size
                  }
            }
            aggs["s_Urdu_Tafseer_Phrases"] = {
                 significant_terms: {
                     "field": "UrduTS.trigram",
                   "size": size
                  }
            }
          } else if (o=="German") {
            aggs["s_German_Translation_Words"] = {
                  significant_terms: {
                      "field": "German",
                       "size": size
                  }
            }
            aggs["s_German_Translation_Phrases"] = {
                  significant_terms: {
                      "field": "German.trigram",
                       "size": size
                  }
            }

          } else if (o=="Spanish") {
            aggs["s_Spanish_Translation_Words"] = {
                  significant_terms: {
                      "field": "Spanish",
                       "size": size
                  }
            }
            aggs["s_Spanish_Translation_Phrases"] = {
                  significant_terms: {
                      "field": "Spanish.trigram",
                       "size": size
                  }
            }

          } else if (o=="French") {
            aggs["s_French_Translation_Words"] = {
                  significant_terms: {
                      "field": "French",
                       "size": size
                  }
            }
            aggs["s_French_Translation_Phrases"] = {
                  significant_terms: {
                      "field": "French.trigram",
                       "size": size
                  }
            }
          } else if (o=="Italian") {
            aggs["s_Italian_Translation_Words"] = {
                  significant_terms: {
                      "field": "Italian",
                       "size": size
                  }
            }
            aggs["s_Italian_Translation_Phrases"] = {
                  significant_terms: {
                      "field": "Italian.trigram",
                       "size": size
                  }
            }
          } else if (o=="EnglishCorpus") {
            aggs["s_English_Talal_Itani_translation_words"] = {
                 significant_terms: {
                   "field": "EnglishCorpus",
                   "size": size
                  }
            }
            aggs["s_English_Talal_Itani_translation_phrases"] = {
                 significant_terms: {
                   "field": "EnglishCorpus.trigram",
                   "size": size
                  }
            }
            if (ArStr == "Arabic") {
              aggs["s_English_Talal_Itani_to_Arabic"] = {
                   significant_terms: {
                     "field": "EnglishCorpus.en_corpus_to_ar",
                     "size": size
                    }
              }
            } else {
              aggs["s_English_Talal_Itani_to_ArabicNoor"] = {
                   significant_terms: {
                     "field": "EnglishCorpus.en_corpus_to_ar_noor",
                     "size": size
                    }
              }
            }


          } else if (o=="Surah") {
            // aggs["s_Surah"] = {
            //       significant_terms: {
            //           "field": "Surah",
            //           "size": size
            //       }
            //  }
             aggs["s_Surah_Names"] = {
                   significant_terms: {
                       "field": "Surah.trigram",
                       "size": size
                   }
              }

          }
        })
      }
      if (options.includes(ArStr) || Object.keys(aggs).length == 0) {
       aggs["s_"+ArStr+"_phrases"] = {
            significant_terms: {
                "field": ArStr+".trigram",
                "size": 3
            }
       }
       aggs["s_"+ArStr+"_words"] = {
            significant_terms: {
                "field": ArStr,
               "size": 1
            }
        }
        aggs["s_"+ArStr+"_stems"] = {
             significant_terms: {
                 "field": ArStr+".ar_stems",
               "size": 1
             }
        }
        aggs["s_"+ArStr+"_roots"] = {
              significant_terms: {
                  "field": ArStr+".ar_root_normalized",
               "size": 1
              }
         }
         aggs["s_normalized_"+ArStr+"_words"] = {
               significant_terms: {
                   "field": ArStr+".ar_normalized",
               "size": 1
               }
         }
         aggs["s_"+ArStr+"_nouns"] = {
               significant_terms: {
                   "field": ArStr+".ar_nouns",
                "size": 1
               }
          }
        aggs["s_"+ArStr+"_adjectives"] = {
              significant_terms: {
                  "field": ArStr+".ar_adjectives",
               "size": 1
              }
         }
         aggs["s_"+ArStr+"_propernouns"] = {
               significant_terms: {
                   "field": ArStr+".ar_propernouns",
                "size": 1
               }
          }
          aggs["s_"+ArStr+"_verbs"] = {
                significant_terms: {
                    "field": ArStr+".ar_verbs",
                 "size": 1
                }
           }
           aggs["s_"+ArStr+"_to_English"] = {
                 significant_terms: {
                     "field": ArStr+".ar_to_en",
                  "size": 1
                 }
            }
           aggs["s_"+ArStr+"_to_English_Corpus"] = {
                 significant_terms: {
                     "field": ArStr+".ar_to_en_corpus",
                  "size": 1
                 }
            }

       }
       // e.log((Object.prototype.toString.call(aggs)))

    var requestSync = Meteor.wrapAsync(function(query,callback) {
      let suggest_query =
      {
        index: "hq",
        request_cache: request_cache,
        body: {
            size: 5,
            "sort": [
                {
                  "_score": {
                    "order": "desc"
                  }
                }
              ],
            query: {
              multi_match : {
                      fields : fields,
                      query : query,
                      //type : "best_fields"
                      type : "phrase_prefix"
                }
            },
            aggs: aggs,
            highlight : {
                pre_tags: [
                  pre_tag
                ],
                post_tags: [
                  post_tag
                ],
               fields: {
                 "*": {
                        "number_of_fragments" : 5,
                        "fragment_size": 100
                       }
                }
              }
        }
      }

      // let shouldDSL = suggest_query.body.query.bool.should
      // if (queryFilters.length > 0) {
      //   suggest_query.body.query.bool=genFilterDSL(queryFilters,options.filter(o=>o.state!="").map(o=>o.id))
      //   // console.log(JSON.stringify(search_query.body.query.bool.should));
      //   if (query == "*") {
      //     if (!suggest_query.body.query.bool.should) {  //genFilterDSL assignes this empty array
      //       suggest_query.body.query.bool.should={"match_all": {}}
      //     }
      //     suggest_query.body["sort"]=[{"s":"asc"},{"a":"asc"}]
      //     // search_query.body.highlight={}
      //     // search_query.body.suggest={}
      //     suggest_query.body.min_score=1
      //   } else {
      //     // suggest_query.body.query.bool["should"] = shouldDSL
      //     suggest_query.body.query.bool["minimum_should_match"] = 1
      //     // search_query.body.highlight={}
      //   }
      // }
      // console.log(JSON.stringify(suggest_query));
      esClient.search(suggest_query, Meteor.bindEnvironment(function (err, res) {
            //var obj = JSON.parse(JSON.stringify(res).split(',"').map(x=>x.split('":',1)[0].replace(/\./g,'_')+'":'+x.split('":').slice(1,x.split('":').length).join('":')).join(',"'));
            var obj = JSON.parse(JSON.stringify(res).replace(/\.([\w]+":)/g,'_$1'));
            //matches = res.suggest;
            result=obj;

            try {
              var hits = result.hits.hits
              console.log("suggest:{query: \"" +query + "\",count:"+result.hits.total.value+",time:"+result.took+",fields:\""+"hidden"+"\"}");
            } catch (e) {
              console.log(err);
              console.log("suggest:{query: \"" +query + "\", count:0, time:\"n/a\",error:\""+e+"\",fields:\""+options+"\"}");
            }

            var complete = []
            Object.keys(hits).map(function (v) {        //controlled by Hit Size
              // if (l == 0) {
                Object.keys(hits[v].highlight).map(function (k) {
                    // console.log(hits[v].highlight);
                    // console.log(Object.keys(hits[v].highlight[k]).length);
                    var text = hits[v].highlight[k][0];
                    // console.log(typeof(text));
                    if (text.search(re_match) != -1) {
                        token = text.match(re_match)[0]
                                  .replace(re_pre,'').replace(re_post,'')
                                  .replace(re_clean,'') //To clean commas, semicolons etc.
                                  .trim() //to remove spaces
                        t=complete.map(r=>r.key).indexOf(token)
                        if (t==-1) {
                          complete.push({key:token,count:1,score:hits[v]._score,type:["String matches"]});
                        }
                    }
                  // }
                })
              // }
            })

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

            // var hits = result.hits.hits
            Object.keys(hits).map(function (v,l) {        //controlled by Hit Size
              if (l == 0) {
                Object.keys(hits[0].highlight).map(function (k,m) {
                  if (m == 0) {                          // to get only first count
                    var text = hits[v].highlight[k][0].split(' ');
                    text.map(function (t) {
                      if (t.search(re_pre) != -1) {
                        token = t.replace(re_pre,'').replace(re_post,'')
                                  .replace(re_clean,'') //To clean commas, semicolons etc.
                                  .trim() //to remove spaces
                                  .toLowerCase() //to match without case
                        t=complete.map(r=>r.key).indexOf(token)
                        if (t==-1) {
                          complete.push({key:token,count:"",score:"",type:["rare_words"]})
                        }
                      }
                    })
                  }
                })
              }
            })
            //console.log(complete)
            callback(err, {response: complete})
      }))


    })
    var result = requestSync(query);
    return result.response;
  }
}})

DDPRateLimiter.addRule({
    type: "method",
    name: "suggest",
}, requestLimit, requestTimeout);
