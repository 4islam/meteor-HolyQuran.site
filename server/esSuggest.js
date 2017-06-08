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

    var requestSync = Meteor.wrapAsync(function(query,callback) {

      esClient.search({
        index: "hq",
        body: {
            size: 0,
            query: {
              multi_match : {
                      fields : [
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
                          "Arabic.ar_query_suggest_ngram_root_normalized_phonetic",

                          "Surah.ar_ngram_normalized",
                          "Surah.ar_ngram_stems",
                          "Surah.ar_ngram_stems_normalized",

                          //"Surah.ar_ngram_stems_normalized_phonetic",
                          //"Surah.ar_normalized_ngram_phonetic"

                           "English.en_normalized_ngram",
                          // "Urdu.ur_normalized_ngram",
                          // "German.de_normalized_ngram"
                        ],
                      query : query,
                      //type : "best_fields"
                      type : "phrase_prefix"
                }
            },
            aggs: {
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

                  // s_Urdu: {
                  //       significant_terms: {
                  //           "field": "Urdu",
                  //          "size": 1
                  //       }
                  // },
                  s_English: {
                       significant_terms: {
                           "field": "English",
                         "size": 1
                        }
                  },
                  // s_German: {
                  //       significant_terms: {
                  //           "field": "German",
                  //            "size": 1
                  //       }
                  // }
              }
        }
      }, Meteor.bindEnvironment(function (err, res) {
            //var obj = JSON.parse(JSON.stringify(res).split(',"').map(x=>x.split('":',1)[0].replace(/\./g,'_')+'":'+x.split('":').slice(1,x.split('":').length).join('":')).join(',"'));
            var obj = JSON.parse(JSON.stringify(res).replace(/\.([\w]+":)/g,'_$1'));
            //matches = res.suggest;
            matches=obj;
            matches;
            // console.log(matches)
            // console.log("callback..")
            callback(err, {response: matches})

      }))


    })
    var result = requestSync(query);
    return result.response;
  }
}})
