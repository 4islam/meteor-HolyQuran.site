var es = require('elasticsearch');
var esClient = new es.Client({
  host: 'localhost:9200',
  log: 'warning'
});

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
      console.log("Suggest Query for: " +query);


    var matches;

    var fields = [
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
    if (options.includes("Arabic_noor") || fields.length == 0) {
     fields.push("Arabic_noor.ar_ngram_normalized")
     fields.push("Arabic_noor.ar_ngram_original")
     fields.push("Arabic_noor.ar_ngram_stems_normalized")
     fields.push("Arabic_noor.ar_ngram_root")
     fields.push("Arabic_noor.ar_ngram_root_normalized")

     fields.push("Arabic_noor.ar_query_suggest_ngram_normalized_phonetic")
     fields.push("Arabic_noor.ar_query_suggest_ngram_stems_normalized_phonetic")
     fields.push("Arabic_noor.ar_query_suggest_ngram_root_normalized_phonetic")

   }

    //console.log(fields)

    var aggs = {
      }

      //console.log((Object.prototype.toString.call(aggs)))
      let size = 10
      if (options.includes("Arabic_noor")) {
        size = 3
      }
      size = Math.round(size / options.length);
      if (Object.prototype.toString.call(options) === '[object Array]') {
        options.filter(function(o){
          return names_array.indexOf(o) !== -1                 //String matchi sanitization
        }).map(function(o) {
          if (o=="Urdu") {
            aggs["s_Urdu"] = {
                        significant_terms: {
                            "field": "Urdu",
                           "size": size
                        }
                  }
          } else if (o=="English") {
            aggs["s_English"] = {
                 significant_terms: {
                     "field": "English",
                   "size": size
                  }
            }
          } else if (o=="UrduTS") {
            aggs["s_UrduTS"] = {
                 significant_terms: {
                     "field": "UrduTS",
                   "size": size
                  }
            }
          } else if (o=="German") {
            aggs["s_German"] = {
                  significant_terms: {
                      "field": "German",
                       "size": size
                  }
            }
          } else if (o=="Spanish") {
            aggs["s_Spanish"] = {
                  significant_terms: {
                      "field": "Spanish",
                       "size": size
                  }
            }
          } else if (o=="French") {
            aggs["s_French"] = {
                  significant_terms: {
                      "field": "French",
                       "size": size
                  }
            }
          } else if (o=="Surah") {
            aggs["s_Surah"] = {
                  significant_terms: {
                      "field": "Surah",
                      "size": size
                  }
             }
          }
        })
      }
      if (options.includes("Arabic_noor") || Object.keys(aggs).length == 0) {
       aggs["s_Arabic_Trigram"] = {
            significant_terms: {
                "field": "Arabic_noor.trigram",
                "size": 3
            }
       }
       aggs["s_Arabic_Words"] = {
            significant_terms: {
                "field": "Arabic_noor",
               "size": 1
            }
        }
        aggs["s_Arabic_Stems"] = {
             significant_terms: {
                 "field": "Arabic_noor.ar_stems",
               "size": 1
             }
        }
        aggs["s_Arabic_root"] = {
              significant_terms: {
                  "field": "Arabic_noor.ar_root_normalized",
               "size": 1
              }
         }
         aggs["s_Arabic_normalized"] = {
               significant_terms: {
                   "field": "Arabic_noor.ar_normalized",
               "size": 1
               }
         }
       }

    var requestSync = Meteor.wrapAsync(function(query,callback) {

      esClient.search({
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
      }, Meteor.bindEnvironment(function (err, res) {
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
                          complete.push({key:token,count:"",score:"",type:["rare"]})
                        }
                      }
                    })
                  }
                })
              }
            })
            console.log(complete)
            callback(err, {response: complete})
      }))


    })
    var result = requestSync(query);
    return result.response;
  }
}})
