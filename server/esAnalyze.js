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
  }
});

Meteor.methods({
  analyze:function (verse, sID) {
  // var analyzers = [
  //                   {id:'standard', name:"اصل"},
  //                   {id:'ar_stems', name:"وزن"},
  //                   {id:'ar_root', name:"مادّہ"}
  //                 ];
  // var future = new Future();
  //var sessionId = this.connection.id;

  var text="";

  verse = verse.split(':')[0]*1+':'+verse.split(':')[1]*1;

  ESCol.findOne({'results.hits.hits':{$elemMatch:{'_source.ayah':verse}}}).results.hits.hits.map(function(x) {
    if (x._source.ayah==verse) {
      text = x._source.Arabic;
    }
  });

  //console.log(verse + text);

  var sessionId = sID.replace(/\W/g, ''); //Only takes alphanumerics

  var date = new Date();
  //console.log(sessionId, this.connection.id);

  if (verse != "") {
    if (ESAnalyzerCol.findOne({$and:[{id:verse}, {'session.id':{$nin:[sessionId]}}]})) {  // If verse is present already
      ESAnalyzerCol.update({id:verse},{$push:{session:{id:sessionId,date:date}}},{ upsert: true }); // Updating existing Mongo DB

    } else if (ESAnalyzerCol.findOne({$and:[{verse:verse}, {'session.id':{$in:[sessionId]}}]})) { //If verse exists for the current user, it must be shiffled to bring to top

      ESAnalyzerCol.update({$and:[{id:verse}, {'session.id':{$in:[sessionId]}}]},{$set:{'session.$.date':date}});
      console.log("Order Shuffled (Text)");

    } else {
      //console.log("ES Text for: " +verse);
      getAnalysis(analyzers,text.split(' '),verse,sessionId,date,0,ESAnalyzerCol);
    }
 }
}})

getAnalysis = function (analyzers,text,id,sessionId,date,i,Collection,matchesprev,textOriginal) {      //i for Analyzers loop
  var analyzer = analyzers[0];

  var batchsize = 30
  //console.log('Length: ', text.length)
  //console.log(analyzer);
  esClient.indices.analyze(
    {
      analyzer : analyzer.id,
      index : 'hq',
      text : text.slice(0,batchsize)
    }, Meteor.bindEnvironment(function (err, res) {
      if (!err) {
        var obj = JSON.parse(JSON.stringify(res).replace(/\.([\w]+":)/g,'_$1'));
        matches = obj

        //console.log(analyzer.id, ": ", JSON.stringify(matches));

        //console.log("Matches: ", JSON.stringify(matches))
        //console.log("matchesprev: ", JSON.stringify(matchesprev))
        if (matchesprev) {
          matches.tokens.map(x=>(
            x.position=x.position+matchesprev.length*100
          ))
          matches.tokens = matchesprev.concat(matches.tokens)
        }

        //console.log(text.length)

        if (text.length > batchsize ) {
            getAnalysis(analyzers,text.slice(batchsize),id,sessionId,date,i,Collection,matches.tokens,textOriginal?textOriginal:text)  //matches.tokens.concat(matchesprev)
        } else {
          if (textOriginal) {
            text = textOriginal
          }

          if (i==0) {    //first entry
            Collection.insert({id:id, session: [{id:sessionId,date:date}],analysis:{text:text, results:[{analyzer:analyzer.id,name:analyzer.name,tokens:matches}]}});
          } else {
            Collection.update({$and:[{id:id},{'session.id':{$in:[sessionId]}}]},{$push:{'analysis.results':{analyzer:analyzer.id,name:analyzer.name,tokens:matches}}},{upsert:true});
          }
          if (analyzers.length > 1) {
            getAnalysis(analyzers.slice(1),text,id,sessionId,date,i+1,Collection)
          }
        }

    } else {
      console.log(err)
    }
  }))
}
