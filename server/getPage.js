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

                                                                 //TODO: Caching and checking before insterting

    var options = {
      host: 'www.alislam.org',
      port: 443,
      path: '/quran/search2/showVerseEmbeded.php?ch='+c+'&vn='+v,
      method: 'POST'
    };

    var req = http.request(options, Meteor.bindEnvironment(function(res) {
      //console.log('STATUS: ' + res.statusCode);
      //console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', Meteor.bindEnvironment(function (chunk) {
        //console.log('BODY: ' + chunk);//console.log('inserting...' + chunk);

        /////****************************************
        //Pages.insert({verse:c+':'+v, page:chunk});        //uncomment for production
        /////****************************************

      }));
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

    step = (dir=="next")?1:-1

    var id="";

    verse = verse.split(':')[0]*1+':'+verse.split(':')[1]*1;

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
            //var obj = JSON.parse(JSON.stringify(res).split(',"').map(x=>x.split('":',1)[0].replace(/\./g,'_')+'":'+x.split('":').slice(1,x.split('":').length).join('":')).join(',"'));
            var obj = JSON.parse(JSON.stringify(res).replace(/\.([\w]+":)/g,'_$1'));
            //matches = res.suggest;
            matches=obj;

            //console.log(matches.hits.hits[0]._id);

            id = matches.hits.hits[0]._id;

            if (id > 1 && id < 6348 ) {
              esClient.search({
                index: "hq",
                body: {
                    "query": {
                      "match": {
                        "_id": {
                          "query": parseInt(matches.hits.hits[0]._id)+step,
                          "type": "phrase"
                        }
                      }
                    }
                  }
                }, Meteor.bindEnvironment(function (err, res) {
                      //var obj = JSON.parse(JSON.stringify(res).split(',"').map(x=>x.split('":',1)[0].replace(/\./g,'_')+'":'+x.split('":').slice(1,x.split('":').length).join('":')).join(',"'));
                      var obj = JSON.parse(JSON.stringify(res).replace(/\.([\w]+":)/g,'_$1'));
                      //matches = res.suggest;
                      matches=obj;

                      Meteor.call("getPage", matches.hits.hits[0]._source.ayah)

                }))
            }

      }))
  }
})
