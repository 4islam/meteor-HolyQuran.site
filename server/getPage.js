var http = require("https");

var es = require('elasticsearch');
var esClient = new es.Client({
  host: 'localhost:9200',
  log: 'warning'
});

Meteor.startup(() => {
  //ESAnalyzerCol.remove({});// Removes collection per session
  //Pages.insert({verse:2});
  //console.log(Pages.find().fetch().length)
});




Meteor.methods({
  getPage:function (verse) {

    //Pages.insert({verse:1});
    //console.log(verse)

    c=verse.split(':')[0]*1;
    v=verse.split(':')[1]*1;

                                                                 //TODO: Checking before insterting

    var options = {
      host: 'www.alislam.org',
      port: 443,
      path: '/quran/read/showVerseEmbeded.php?ch='+c+'&vn='+v,
      method: 'POST'
    };

    var req = http.request(options, Meteor.bindEnvironment(function(res) {
      //console.log('STATUS: ' + res.statusCode);
      //console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');

      var oString = ""
      res.on('data', Meteor.bindEnvironment(function (chunk) {
        //console.log('BODY: ' + chunk);//console.log('inserting...' + chunk);
        oString += chunk
      }));

      res.on('end', function () {
        if (Meteor.isProduction) {          //For production
        /////****************************************
          if (Pages.findOne({verse:c+':'+v})) {
          } else {
            Pages.insert({verse:c+':'+v, page:chunk});
          }
        /////****************************************
        }
        
      });
    }));

    req.on('error', function(e) {
      //console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write('data\n');
    req.write('data\n');
    req.end();


  },
  getPageAdjVerse: function (verse, dir) {                          //TODO: Caching

    var step = (dir=="next")?1:-1

    var requestSync = Meteor.wrapAsync(function(verse,callback) {
    esClient.search({
      index: "hq",
      body: {
          "query": {
            "match": {
              "ayah": {
                "query": verse,
                "type": "phrase"
              }
            }
          }

        }
      }, Meteor.bindEnvironment(function (err, res) {
            var obj = JSON.parse(JSON.stringify(res).replace(/\.([\w]+":)/g,'_$1'));
            matches=obj
            var id = matches.hits.hits[0]._id
            //console.log(id)
            nid = parseInt(id)+step;
            if (nid >= 1 && nid <= 6348 ) {
              esClient.search({
                index: "hq",
                body: {
                    "query": {
                      "match": {
                        "_id": {
                          "query": nid,
                          "type": "phrase"
                        }
                      }
                    }
                  }
                }, Meteor.bindEnvironment(function (err, res) {
                      var obj = JSON.parse(JSON.stringify(res).replace(/\.([\w]+":)/g,'_$1'));
                      matches=obj
                      //console.log(matches.hits.hits[0]._source.ayah)
                      callback(err, {response: matches.hits.hits[0]._source.ayah})
                }))
            } else {
              callback(err, {response: verse})
            }
      }))
    })
    verse = verse.split(':')[0]*1+':'+verse.split(':')[1]*1;
    var result = requestSync(verse)
    return result.response
  }
})
