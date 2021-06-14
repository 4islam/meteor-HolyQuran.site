globalLimit = 100

pre_tag = "<mark>"
post_tag = "</mark>"

re_pre = new RegExp(pre_tag, 'g');
re_post = new RegExp(post_tag, 'g');
re_match = new RegExp(pre_tag +"[^<]+"+ post_tag,'g')

re_clean = /[.,;\s]$/g;

analyzers = [                                      //order is important
              {id:'standard', name:"اصل"}
              // ,{id:'ar_normalized_noor', name:"Normalized اصل"}
              // ,{id:'ar_normalized', name:"وزن"}
              // ,{id:'ar_normalized_phonetic', name:"Phonetic اصل"}
              // ,{id:'ar_normalized_ngram_phonetic', name:"Ngram Phonetic اصل"}
              // ,{id:'ar_stems_noor', name:"وزن"}
              // ,{id:'ar_stems_normalized_phonetic_noor', name:"Phonetic وزن"}
              ,{id:'ar_stems', name:"وزن"}
              // ,{id:'ar_stems_normalized', name:"Normalized اصل"}
              // ,{id:'ar_stems_normalized_phonetic', name:"Phonetic وزن"}
              // ,{id:'ar_ngram_stems_normalized_phonetic_noor', name:"Ngram Phonetic وزن"}
              // ,{id:'ar_stems_normalized_noor_reverse', name:"Reverse وزن"}

              // ,{id:'ar_root_noor', name:"مادّہ"}
              ,{id:'ar_root', name:"مادّہ"}

              // ,{id:'ar_ngram_root_normalized_phonetic_noor', name:"Ngram Phonetic مادّہ"}



              // ,{id:'ar_root_normalized_phonetic_noor', name:"Phonetic مادّہ"}
              ,{id:'ar_root_normalized_phonetic', name:"Phonetic مادّہ"}
              // ,{id:'ar_to_en_corpus_noor', name:"Corpus Translation"}
              // ,{id:'ar_to_en_corpus', name:"Corpus Translation"}

              // {id:'ar_root', name:"مادّہ"},
              // {id:'ar_stems', name:"وزن"},
              // {id:'ar_root_normalized_phonetic', name:"Phonetic مادّہ"},
              ,{id:'ar_stems_normalized_phonetic', name:"Phonetic وزن"}

              // ,{id:'ar_propernouns', name:"اسم مرفوعة"}
              // ,{id:'ar_nouns', name:"اسماء"}
              // ,{id:'ar_adjectives', name:"صفة"}
              // ,{id:'ar_verbs', name:"افعال"}
            ];
update_analyzers = function(ArStr) {
  analyzers[1].id='ar_stems'
  analyzers[2].id='ar_root'
  analyzers[3].id='ar_root_normalized_phonetic'
  analyzers[4].id='ar_stems_normalized_phonetic'
  if (ArStr=="ArabicNoor") {
    analyzers[1].id='ar_stems_noor'
    analyzers[2].id='ar_root_noor'
    analyzers[3].id='ar_root_normalized_phonetic_noor'
    analyzers[4].id='ar_stems_normalized_phonetic_noor'
  }
}

// ArabicSrc = "Arabic"
ArabicSrc = "ArabicNoor"
update_analyzers(ArabicSrc)

ArabicCss = [
              "a.list-group-item.Verse .Arabic",
              ".Token",
              ".tokens_ar_root",
              ".tokens_ar_root_noor",
              ".Aggregates .Arabic",
              "ul.Queries li",
              ".Surah",
              ".Suggest div",
              ".Suggest li",
              "#QueryRTL",
              "#datalistUl"
            ]

names_array = [
      'Arabic',
      'ArabicNoor',
      'جزئي',
      'سوى',
      'مادّہ',
      'وزن',
      'صوتی',
      'ادھورا',
      'سادہ',
      'سورة',
      'Urdu',
      'UrduTS',
      'Tafseer-e-Sagheer UR',
      'ہموار',
      'English',
      'EnglishZafrullahKhan',
      'TopicsEn',
      'EnglishCorpus',
      'German',
      'Spanish',
      'French',
      'normalisierte',
      'normalized',
      'partial',
      'teilweise',
      'Surah',
      'UrduAhmedAli',
      'UrduMaududi',
      'EnglishPickthall',
      'EnglishSahih',
      'EnglishMaududi',
      'EnglishAhmedAli',
      'EnglishArberry',
      'EnglishYusufAli',
      'EnglishMuhammadAli'
    ]; //sanization routine...

aggregates = [                                      //order is important
      {id:'s_'+ArabicSrc+'_Trigram', name:"مہم عباراة", lang:"Arabic"},
      {id:'s_'+ArabicSrc+'_Words', name:"مہم الفاظ", lang:"Arabic"},
      {id:'s_'+ArabicSrc+'_Stems', name:"مہم اوزان", lang:"Arabic"},
      //{id:'s_Arabic_normalized', name:"مہم کلمات"},
      {id:'s_'+ArabicSrc+'_root', name:"مہم مادّہ", lang:"Arabic"},
      {id:'s_'+ArabicSrc+'_propernouns', name:"مہم اسماء مرفوعة", lang:"Arabic"},
      {id:'s_'+ArabicSrc+'_nouns', name:"مہم اسماء", lang:"Arabic"},
      {id:'s_'+ArabicSrc+'_adjectives', name:"مہم صفة", lang:"Arabic"},
      {id:'s_'+ArabicSrc+'_verbs', name:"مہم افعال", lang:"Arabic"},
      {id:'s_'+ArabicSrc+'_to_en', name:"Significant Words from English Translation", lang:"English"},
      {id:'s_'+ArabicSrc+'_to_en_corpus', name:"Significant Words from English Corpus Translation", lang:"English"},

      {id:'s_Surah', name:"مہم سورة", lang:"Arabic"},
      {id:'Surah', name:"سورة", lang:"Arabic"},
      {id:'s_Urdu_phrases', name:"اہم اردو عبارتیں", lang:"Urdu"},
      {id:'s_Urdu', name:"اہم اردو الفاظ", lang:"Urdu"},
      {id:'s_UrduTS_phrases', name:"تفسیر صغیر کی اہم اردو عبارتیں", lang:"UrduTS"},
      {id:'s_UrduTS', name:"تفسیر صغیر کے اہم اردو الفاظ", lang:"UrduTS"},
      {id:'s_Topics_English', name:"Significant English Topics", lang:"English"},
      {id:'s_English', name:"Significant English Words", lang:"English"},
      {id:'s_English_to_Arabic', name:"Significant Arabic words from English", lang:"Arabic"},
      {id:'s_English_to_ArabicNoor', name:"Significant Arabic words from English", lang:"Arabic"},
      {id:'s_English_phrases', name:"Significant English Phrases", lang:"English"},
      {id:'s_English_Zafrullah_Khan', name:"Significant English Words (Zafrullah Khan)", lang:"English"},
      {id:'s_English_Zafrullah_Khan_phrases', name:"Significant English (Zafrullah Khan) Phrases", lang:"English"},
      {id:'s_English_Muhammad_Ali', name:"Significant English Words (Muhammad Ali)", lang:"English"},
      {id:'s_English_Muhammad_Ali_phrases', name:"Significant English (Muhammad Ali) Phrases", lang:"English"},
      {id:'s_English_Talal_Itani_phrases', name:"Significant English Corpus Phrases", lang:"EnglishCorpus"},
      {id:'s_English_Talal_Itani', name:"Significant Words from English Corpus", lang:"Corpus (English)"},
      {id:'s_English_Talal_Itani_to_Arabic', name:"Significant Arabic words from English Corpus", lang:"Arabic"},
      {id:'s_English_Talal_Itani_to_ArabicNoor', name:"Significant Arabic words from English Corpus", lang:"Arabic"},
      {id:'s_German_phrases', name:"Significant German Phrases", lang:"German"},
      {id:'s_German', name:"Bedeutende Deutsche Wörte", lang:"German"},
      {id:'s_Spanish_phrases', name:"Significant Spanish Phrases", lang:"Spanish"},
      {id:'s_Spanish', name:"Significant Spanish Words", lang:"Spanish"},
      {id:'s_French_phrases', name:"Significant French Phrases", lang:"French"},
      {id:'s_French', name:"Significant French Words", lang:"French"},
    ];

update_aggregates = function(ArStr) {
  aggregates[0].id = 's_'+ArStr+'_Trigram'
  aggregates[1].id = 's_'+ArStr+'_Words'
  aggregates[2].id = 's_'+ArStr+'_Stems'
  aggregates[3].id = 's_'+ArStr+'_root'
}

verse_max = [
              7,287,201,177,121,166,207,76,129,110,124,112,44,53,100,129,112,111,
              99,136,113,79,119,65,78,228,94,89,70,61,35,31,74,55,46,84,183,89,76,
              86,55,54,90,60,38,36,39,30,19,46,61,50,63,56,79,97,30,23,25,14,15,12,
              12,19,13,13,31,53,53,45,29,29,21,57,41,32,51,41,47,43,30,20,37,26,23,
              18,20,27,31,21,16,22,12,9,9,20,6,9,9,12,12,9,4,10,6,5,8,4,7,4,6,5,6,7
            ]

limit = 100;

cacheResults = false; //mongo
request_cache = true; //elasticsearch

if (Meteor.isProduction) {
  cacheResults = false; //TODO: Needs to fix the query caching with filter in use.
}


genFilterDSL = function(query,fields){
  let ret = {}

  let filter = []    // And logic group
  let should = []    // Or logic group
  let must = []      // Like filter but contributes to score
  let must_not = []  // Anti filter

  query.map((q)=>{
    q=q.split(/:/)
    q[1]=q.slice(1).join(":").replace(/\"/g, '')
    // console.log(q,q[1]);

    if (q[1].search(/^[<>][>=]?[\d]+$/)!="-1") {      //Filter ranges by number
      let range={}
      qArr = q[1].split(/[<>][>=]?/)
      qv = qArr[1]
      ql = q[1].split(qv)[0]
      switch (ql) {
        case "<":
          qlv = "lt"; break
        case ">=":
          qlv = "gte"; break
        case "<=":
          qlv = "lte"; break
        case "<>":
          qlv = "eq"; break
        default:
          qlv = "gt"
      }
      range[q[0]]={[qlv]:qv}
      if (ql == "<>") {
        range[q[0]]={"gte":qv, "lte": qv}
        must_not.push({"range":range})
      } else {
        filter.push({"range":range})
      }
      // console.log(ql);

    } else if (q[1].search(/^[<>]{0,2}[\d]+-[\d]+$/)!="-1") {      //Filter ranges by number start and end
      let range={}
      qvArr = q[1].split(/-/)
      qvS = qvArr[0].match(/\d+/)[0]                    //Query Value Start
      qvE = parseInt(qvArr[1])                     //Query Value End
      switch (qvS <= qvE) {
        case true:                      //Normal as expected
          break;
        default:                     //End value will have to incremented
          lqvE = qvE.toString().length
          lqvS = qvS.toString().length
          qvE = parseInt(qvS.toString().substring(0,(lqvS-lqvE))+qvE)    //string
          if (qvE < lqvS) {
            qvE+=10
          }
          // qvE = (((lqvS-lqvE)+1)*10) + parseInt(qvE)
      }
      range[q[0]]={"gte":qvS, "lte": qvE}
      ql=qvArr[0].match(/^[<>]{0,2}/)[0]
      if (ql == "<>") {
        must_not.push({"range":range})
      } else {
        filter.push({"range":range})
      }

    } else if (q[1].search(/^[\d]+$/)!="-1") {    //Filter by numbers
      let term={}
      term[q[0]]=q[1]
      filter.push({"term":term})

    } else if (q[1].search(/[^\d<>=]+/)!="-1") {        //anything other than number
      if (q[0]=="ayah") {        // special case where ayahs are specified, not filtered
        let match_phrase = {}
        match_phrase[q[0]]=q[1].replace(/\"/g, '')
        should.push({"match_phrase":match_phrase})
      } else {
        let simple_query_string = {}
        simple_query_string={
          fields:[q[0]],default_operator: "and",
          query: q[1].replace(/\"/g, '""')
          }
        must.push({"simple_query_string":simple_query_string})
      }
    } else if (q[1]=="") {        //if empty
      fields.map((f)=>{
        let match_phrase = {}
        match_phrase[f]=q[0].replace(/\"/g, '')
        should.push({"match_phrase":match_phrase})
      })

    }
  })
  if (filter.length > 0) {
    ret["filter"] = filter
  }
  if (should.length > 0) {
    ret["should"] = should
  }
  if (must.length > 0) {
    ret["must"] = must
  }
  if (must_not.length > 0) {
    ret["must_not"] = must_not
  }
  console.log(JSON.stringify(ret));
  return ret
}
