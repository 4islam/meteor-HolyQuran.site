Meteor.methods({
  getSessionId: function() {
    return this.connection.id;
  }
});


Meteor.publish('Results/all', function(notRequired, sessionId, page, limit, by) {
   //console.log(sessionId, this.connection.id);

  //console.log(page,limit, by)
  return ESCol.find(
    {
      'session.id': {
        $in: [
              this.connection.id
              // ,(sessionId)?sessionId.replace(/\W/g, ''):''
             ]
        }
    },
    {
      sort:{
        'session.date':-1
      },
      fields:{
        //'results.hits.hits':{ $slice: [(page-1)*limit,limit] }
      },
     limit: 20        //Past 10 queries
    })
});


Meteor.publish('Analysis', function(notRequired, sessionId) {
//  console.log(sessionId, this.connection.id);
  return ESAnalyzerCol.find(
    {
      'session.id': {
        $in: [
              this.connection.id
              // ,(sessionId)?sessionId.replace(/\W/g, ''):''
             ]
        }
    },
    {
      sort:{
        'session.date':-1
      }
    })
});

Meteor.publish('AnalysisHighlights', function(notRequired, sessionId) {
//  console.log(sessionId, this.connection.id);
  return ESAnalyzerHighlightsCol.find(
    {
      'session.id': {
        $in: [
          this.connection.id
          // ,(sessionId)?sessionId.replace(/\W/g, ''):''
             ]
        }
    },
    {
      sort:{
        'session.date':-1
      }
    })
});

Meteor.publish('Pages', function(verse, sessionId) {
  //console.log(sessionId, verse);
  return Pages.find({verse:verse},{
    limit: 1
  })
});
