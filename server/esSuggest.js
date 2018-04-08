// var Future = Npm.require('fibers/future');

var es = require('elasticsearch');
var esClient = new es.Client({
  host: 'localhost:9200',
  log: 'warning'
});

Meteor.startup(() => {
  //ESAnalyzerCol.remove({});// Removes collection per session
});

Meteor.methods({
  suggest:function (query, sID, options) {
  // var future = new Future();
  //var sessionId = this.connection.id;
  query = query.trim().replace(/ +/g, ' ').replace(/\t+/g,' ');

  query = query.split(' ');
  query = query[query.length-1];

  var sessionId = sID.replace(/\W/g, ''); //Only takes alphanumerics

  var date = new Date();
  //console.log(sessionId, this.connection.id);

  //console.log(JSON.stringify(options))
  //options_str=JSON.stringify(options);

  if (query != "") {
      console.log("Suggest Query for: " +query);

      //this.unblock();
        // This will throw an exception and return it as the error object
        // in your Meteor.call if an error occurs, otherwise it will
        // return an empty error object and the result object will be
        // the return value from Meteor.http.call

    var matches;

    var fields = [
        "Arabic.ar_ngram_normalized",
        "Arabic.ar_ngram_original",
        "Arabic.ar_ngram_stems_normalized",
        "Arabic.ar_ngram_root",
        "Arabic.ar_ngram_root_normalized",


        // "Arabic.ar_normalized_ngram_phonetic",
        // "Arabic.ar_ngram_stems_normalized_phonetic",
        // "Arabic.ar_ngram_root_normalized_phonetic"

        "Arabic.ar_query_suggest_ngram_normalized_phonetic",
        "Arabic.ar_query_suggest_ngram_stems_normalized_phonetic",
        "Arabic.ar_query_suggest_ngram_root_normalized_phonetic"

        //"Surah.ar_ngram_stems_normalized_phonetic",
        //"Surah.ar_normalized_ngram_phonetic"

      ]

    if (Object.prototype.toString.call(options) === '[object Array]') {
      options.filter(function(o){
        return names_array.indexOf(o) !== -1                 //String matching sanitization
      }).map(function(o) {
        if (o=="Urdu") {
          fields.push("Urdu.ur_normalized_ngram")
        } else if (o=="UrduTS") {
          fields.push("UrduTS.ur_normalized_ngram")
        } else if (o=="English") {
          fields.push("English.en_normalized_ngram")
        } else if (o=="German") {
          fields.push("German.de_normalized_ngram")
        } else if (o=="Spanish") {
          fields.push("Spanish.es_normalized_ngram")
        } else if (o=="French") {
          fields.push("French.fr_normalized_ngram")
        } else if (o=="Surah") {
          fields.push("Surah.ar_ngram_normalized")
          fields.push("Surah.ar_ngram_stems")
          fields.push("Surah.ar_ngram_stems_normalized")

          fields.push("ayah")                         // This add Surah name
          fields.push("ayah.ayah_normalized_ar")      // suggestion from
          fields.push("ayah.ayah_normalized_ur")      // numeric entries
        }
      })
    }

    //console.log(fields)

    var aggs = {
        s_Arabic_Trigram: {
             significant_terms: {
                 "field": "Arabic.trigram",
                 "size": 3
             }
              //, aggs:{
              //   "top_Arabic": {
              //     top_hits:{
              //         "highlight": {
              //             "require_field_match": false,
              //             "fields": {
              //               "_all" : {//"force_source" : true
              //                 "matched_fields": ["Arabic.ar_ngram_normalized",
              //                 "Arabic.ar_ngram_original",
              //                 "Arabic.ar_ngram_stems_normalized",
              //                 "Arabic.ar_ngram_root",
              //                 "Arabic.ar_ngram_root_normalized"],
              //                 "type" : "fvh"
              //               }
              //             }
              //         },
              //         "_source": {
              //             "includes": [
              //                 "Arabic"
              //             ]
              //         },
              //         "size" : 1
              //     }
              //   }
              // }
        },

       s_Arabic_Words: {
            significant_terms: {
                "field": "Arabic",
               "size": 3
            }
        },
        s_Arabic_Stems: {
             significant_terms: {
                 "field": "Arabic.ar_stems",
               "size": 2
             }
        },

        s_Arabic_root: {
              significant_terms: {
                  "field": "Arabic.ar_root_normalized",
               "size": 1
              }
         },
         s_Arabic_normalized: {
               significant_terms: {
                   "field": "Arabic.ar_normalized",
               "size": 1
               }
          },
          s_Surah: {
                significant_terms: {
                    "field": "Surah",
                "size": 1
                }
           }

      }

      //console.log((Object.prototype.toString.call(aggs)))
      if (Object.prototype.toString.call(options) === '[object Array]') {
        options.filter(function(o){
          return names_array.indexOf(o) !== -1                 //String matchi sanitization
        }).map(function(o) {
          if (o=="Urdu") {
            aggs["s_Urdu"] = {
                        significant_terms: {
                            "field": "Urdu",
                           "size": 1
                        }
                  }
          } else if (o=="English") {
            aggs["s_English"] = {
                 significant_terms: {
                     "field": "English",
                   "size": 1
                  }
            }
          } else if (o=="UrduTS") {
            aggs["s_UrduTS"] = {
                 significant_terms: {
                     "field": "UrduTS",
                   "size": 1
                  }
            }
          } else if (o=="German") {
            aggs["s_German"] = {
                  significant_terms: {
                      "field": "German",
                       "size": 1
                  }
            }
          } else if (o=="Spanish") {
            aggs["s_Spanish"] = {
                  significant_terms: {
                      "field": "Spanish",
                       "size": 1
                  }
            }
          } else if (o=="French") {
            aggs["s_French"] = {
                  significant_terms: {
                      "field": "French",
                       "size": 1
                  }
            }
          }
        })
      }



    var requestSync = Meteor.wrapAsync(function(query,callback) {

      esClient.search({
        index: "hq",
        body: {
            size: 3 ,
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
      }, Meteor.bindEnvironment(function (err, res) {
            //var obj = JSON.parse(JSON.stringify(res).split(',"').map(x=>x.split('":',1)[0].replace(/\./g,'_')+'":'+x.split('":').slice(1,x.split('":').length).join('":')).join(',"'));
            var obj = JSON.parse(JSON.stringify(res).replace(/\.([\w]+":)/g,'_$1'));
            //matches = res.suggest;
            matches=obj;
            // console.log(matches)
            callback(err, {response: matches})

      }))


    })
    var result = requestSync(query);
    return result.response;
  }
}})
