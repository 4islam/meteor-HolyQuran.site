var http = require("https");

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


  }
})
