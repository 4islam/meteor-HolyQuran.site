// var Future = Npm.require('fibers/future');
const eshost = (process.env.ESHOST || 'localhost:9200');
var es = require('elasticsearch');
var esClient = new es.Client({
  host: eshost,
  log: 'warning'
});


Meteor.startup(() => {
  //ESAnalyzerCol.remove({});// Removes collection per session
  if (Meteor.isServer) {
      VerseCol._ensureIndex( {
         "session.id" : 1,
         "session.date" : 1,
         "id" : 1
      });
      VerseCol._ensureIndex(
        {"session.date" : 1},
        { expireAfterSeconds: 14*(24*3600) }  //14 days
      );
      VerseCol._ensureIndex(
        {"session.date" : 1},
        { expireAfterSeconds: 14*(24*3600) }  //14 days
      );
  }
});

Meteor.methods({
  getVerse:function (verse, sID, ArStr) {

    // console.log(verse, sID, ArStr);

  var text="";
  if (names_array.indexOf(ArStr) == -1) {
    ArStr = "Arabic" // Default value
  }

  if (verse != "") {
    verse = verse.split(':')[0]*1+':'+verse.split(':')[1]*1;
  } else {
    verse="1:1"
  }

  //console.log(verse + text);

  //var sessionId = sID.replace(/\W/g, ''); //Only takes alphanumerics
  var sessionId = this.connection.id
  if (sID) {
    // sessionId = sID
  }
  // console.log(sessionId,"is:",this.connection.id);

  var date = new Date();
  // cacheResults = true
  // console.log(sessionId, this.connection.id);

  console.log(sessionId,"Verse Query request for:",verse);
  if (cacheResults && VerseCol.findOne({$and:[{query:verse}, {'session.id':{$nin:[sessionId]}}]})) {  // If query is present already

    VerseCol.update({$and:[{query:verse}]},{$push:{session:{id:sessionId,date:date}}},{ upsert: true }); // Updating existing Mongo DB
    console.log(sessionId,"Verse Query updated for:",verse);

  } else if (cacheResults && VerseCol.findOne({$and:[{query:verse},{'session.id':{$in:[sessionId]}}]})) { //If query exists for the current user, it must be shiffled to bring to top

    VerseCol.update({$and:[{query:verse},{'session.id':{$in:[sessionId]}}]},{$set:{'session.$.date':date}});
    console.log(sessionId,"Verse Query shuffled for:",verse);

  } else {
    console.log("Quering details for verse: " +verse);

    search_query={
        index:"hq",
        body:{
          query:{
            bool:{
            filter:[
                {term:{s:verse.split(':')[0]*1}},
                {term:{a:verse.split(':')[1]*1}}
              ]
            }}
          }
        }

    esClient.search(search_query, Meteor.bindEnvironment(function (err, res) {
          //var obj = JSON.parse(JSON.stringify(res).split(',"').map(x=>x.split('":',1)[0].replace(/\./g,'_')+'":'+x.split('":').slice(1,x.split('":').length).join('":')).join(',"'));
          // console.log(JSON.stringify(res));
          if (res && JSON.parse(JSON.stringify(res).replace(/\.([\w]+":)/g,'_$1')).hits) {
            var obj = JSON.parse(JSON.stringify(res).replace(/\.([\w]+":)/g,'_$1'));
            //matches = res.suggest;
            matches = obj;


            VerseCol.insert({query:verse, session: [{id:sessionId,date:date}], results:matches});

            // console.log(matches.hits.hits.length, verse)
            // console.log(date);
            // console.log(Verse.findOne({query:verse}));

          } else {
            console.log("Error: ", res.error.root_cause);
            // TODO: Add Error collection to provide user feedback
          }
        }
      )
    )
    }
  }})
