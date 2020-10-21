var es = require('elasticsearch');
var esClient = new es.Client({
  host: 'localhost:9200',
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
        } else if (o=="English") {
          fields.push("English.en_normalized_ngram")
          fields.push("English.trigram")
        } else if (o=="German") {
          fields.push("German.de_normalized_ngram")
          fields.push("German.trigram")
        } else if (o=="Spanish") {
          fields.push("Spanish.es_normalized_ngram")
          fields.push("Spanish.trigram")
        } else if (o=="French") {
          fields.push("French.fr_normalized_ngram")
          fields.push("French.trigram")
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
     fields.push(ArStr+".ar_to_en_corpus")

   }

    //console.log(fields)

    var aggs = {
      }

      //console.log((Object.prototype.toString.call(aggs)))
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
          return names_array.indexOf(o) !== -1                 //String matchi sanitization
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
          } else if (o=="EnglishCorpus") {
            aggs["s_English_Corpus_translation_words"] = {
                 significant_terms: {
                   "field": "EnglishCorpus",
                   "size": size
                  }
            }
            aggs["s_English_Corpus_translation_phrases"] = {
                 significant_terms: {
                   "field": "EnglishCorpus.trigram",
                   "size": size
                  }
            }
            if (ArStr == "Arabic") {
              aggs["s_English_Corpus_to_Arabic"] = {
                   significant_terms: {
                     "field": "EnglishCorpus.en_corpus_to_ar",
                     "size": size
                    }
              }
            } else {
              aggs["s_English_Corpus_to_ArabicNoor"] = {
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
           aggs["s_"+ArStr+"_to_English_Corpus"] = {
                 significant_terms: {
                     "field": ArStr+".ar_to_en_corpus",
                  "size": 1
                 }
            }

       }
       //console.log((Object.prototype.toString.call(aggs)))

    var requestSync = Meteor.wrapAsync(function(query,callback) {
      let suggest_query =
      {
        index: "hq",
        body: {
            size: 3,
            "sort": [
                {
                  "_score": {
                    "order": "asc"
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
                        "number_of_fragments" : 0
                       }
                }
              }
        }
      }
      // console.log(JSON.stringify(suggest_query));
      esClient.search(suggest_query, Meteor.bindEnvironment(function (err, res) {
            //var obj = JSON.parse(JSON.stringify(res).split(',"').map(x=>x.split('":',1)[0].replace(/\./g,'_')+'":'+x.split('":').slice(1,x.split('":').length).join('":')).join(',"'));
            var obj = JSON.parse(JSON.stringify(res).replace(/\.([\w]+":)/g,'_$1'));
            //matches = res.suggest;
            result=obj;

            var complete = []
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

            var hits = result.hits.hits
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
