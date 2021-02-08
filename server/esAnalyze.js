// var Future = Npm.require('fibers/future');

var es = require('elasticsearch');
var esClient = new es.Client({
  host: 'localhost:9200',
  log: 'warning'
});

Meteor.startup(() => {
  //ESAnalyzerCol.remove({});// Removes collection per session
  if (Meteor.isServer) {
      ESAnalyzerCol._ensureIndex( {
         "session.id" : 1,
         "session.date" : 1,
         "id" : 1
      });
      ESAnalyzerCol._ensureIndex(
        {"session.date" : 1},
        { expireAfterSeconds: 14*(24*3600) }  //14 days
      );
      ESAnalyzerHighlightsCol._ensureIndex(
        {"session.date" : 1},
        { expireAfterSeconds: 14*(24*3600) }  //14 days
      );
  }
});

Meteor.methods({
  analyze:function (verse, sID, ArStr, analyzersStr) {

  var text="";
  if (names_array.indexOf(ArStr) == -1) {
    ArStr = "Arabic" // Default value
  }

  verse = verse.split(':')[0]*1+':'+verse.split(':')[1]*1;

  ESCol.findOne({'results.hits.hits':{$elemMatch:{'_source.ayah':verse}}}).results.hits.hits.map(function(x) {
    if (x._source.ayah==verse) {
      // text = x._source.Arabic;
      text = x._source[ArStr];
    }
  });

  //console.log(verse + text);

  //var sessionId = sID.replace(/\W/g, ''); //Only takes alphanumerics
  var sessionId = this.connection.id
  if (sID != '') {
    sessionId = sID
    console.log(sessionId,"is:",this.connection.id);
  }

  var date = new Date();
  //console.log(sessionId, this.connection.id);

  if (verse != "") {
    if (cacheResults && ESAnalyzerCol.findOne({$and:[{id:verse},{options:ArStr},{'session.id':{$nin:[sessionId]}}]})) {  // If verse is present already
      ESAnalyzerCol.update({id:verse},{options:ArStr},{$push:{session:{id:sessionId,date:date}}},{ upsert: true }); // Updating existing Mongo DB
      console.log(sessionId,"Analysis updated for:",verse)

    } else if (cacheResults && ESAnalyzerCol.findOne({$and:[{id:verse},{options:ArStr},{'session.id':{$in:[sessionId]}}]})) { //If verse exists for the current user, it must be shiffled to bring to top

      ESAnalyzerCol.update({$and:[{id:verse},{options:ArStr},{'session.id':{$in:[sessionId]}}]},{$set:{'session.$.date':date}});
      console.log(sessionId,"Analysis shuffled for:",verse)

    } else
    {
      //console.log("ES Text for: " +verse);
      getAnalysis(analyzersStr,text.split(' '),verse,sessionId,date,0,ESAnalyzerCol,ArStr);
    }
 }
}})

getAnalysis = function (analyzersStr,text,id,sessionId,date,i,Collection,ArStr,matchesprev,textOriginal,batchId) {      //i for analyzersStr loop
  // console.log(sessionId,"Running analysis for:",id,"batch:",i,ArStr)

  var analyzer = analyzersStr[0];

  var batchsize = 10
  //console.log('Length: ', text.length)
  //console.log(analyzer);
  esClient.indices.analyze(
    {
      index : 'hq',
      body : {
        analyzer : analyzer.id,
        text : text.slice(0,batchsize)
      }
    }, Meteor.bindEnvironment(function (err, res) {
      if (!err) {
        var obj = JSON.parse(JSON.stringify(res).replace(/\.([\w]+":)/g,'_$1'));
        matches = obj

        //console.log(analyzer.id, ": ", JSON.stringify(matches));

        //console.log(analyzer.id);
        //console.log("Matches: ", JSON.stringify(matches))

        // if (matches) {
        //   console.log(analyzer.id, i, "Matches last position: ", matches.tokens[matches.tokens.length-1].position, matches.tokens[matches.tokens.length-1].token)
        // }

        if (matchesprev) {
          //console.log(analyzer.id, i, "matchesprev last position: ", matchesprev[matchesprev.length-1].position, matchesprev[matchesprev.length-1].token)
          matches.tokens.map((x)=>(
            //x.position=x.position+matchesprev.length*100
            //x.position=x.position+i*10000//+matchesprev[matchesprev.length-1].position+101
            //x.position=x.position+matchesprev[matchesprev.length-1].position+1101
            x.position=x.position+batchId*100*batchsize
          ))
          //console.log("batchId:", batchId)
          matches.tokens = matchesprev.concat(matches.tokens)
          //console.log(analyzer.id, "Matches last position updated: ", matches.tokens[matches.tokens.length-1].position, matches.tokens[matches.tokens.length-1].token)
        }

        //console.log(analyzer.id, "text.length: " + text.length)

        if (text.length > batchsize ) {
            //console.log(analyzer.id, i, "sliced");
            getAnalysis(analyzersStr,text.slice(batchsize),id,sessionId,date,i,Collection,ArStr,matches.tokens,textOriginal?textOriginal:text,batchId?batchId+1:1)  //matches.tokens.concat(matchesprev)
        } else {
          if (textOriginal) {
            text = textOriginal
          }

          if (i==0) {    //first entry
            Collection.insert({id:id,options:ArStr, session: [{id:sessionId,date:date}],analysis:{text:text, results:[{analyzer:analyzer.id,name:analyzer.name,tokens:matches}]}});
          } else {
            Collection.update({$and:[{id:id},{options:ArStr},{'session.id':{$in:[sessionId]}}]},{$push:{'analysis.results':{analyzer:analyzer.id,name:analyzer.name,tokens:matches}}},{upsert:true});
          }
          if (analyzersStr.length > 1) {
            getAnalysis(analyzersStr.slice(1),text,id,sessionId,date,i+1,Collection,ArStr)
          }
        }

    } else {
      console.log(err)
    }
  }))
}
