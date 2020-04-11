

pre_tag = "<mark>"
post_tag = "</mark>"

re_pre = new RegExp(pre_tag, 'g');
re_post = new RegExp(post_tag, 'g');

re_clean = /[.,;\s]$/g;

analyzers = [                                      //order is important
              {id:'standard', name:"اصل"},
              {id:'ar_stems_noor', name:"وزن"},
              {id:'ar_root_noor', name:"مادّہ"},
              // {id:'ar_root_noor_normalized_phonetic', name:"Phonetic مادّہ"},
              // {id:'ar_stems_noor_normalized_phonetic', name:"Phonetic وزن"}
              // {id:'ar_root', name:"مادّہ"},
              // {id:'ar_stems', name:"وزن"},
              // {id:'ar_root_normalized_phonetic', name:"Phonetic مادّہ"},
              // {id:'ar_stems_normalized_phonetic', name:"Phonetic وزن"}
            ];

// ArabicSrc = "Arabic"
ArabicSrc = "Arabic_noor"

names_array = [
      'Arabic',
      'Arabic_noor',
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
      'German',
      'Spanish',
      'French',
      'normalisierte',
      'normalized',
      'partial',
      'teilweise',
      'Surah'
    ]; //sanization routine...

aggregates = [                                      //order is important
      {id:'s_Arabic_Trigram', name:"مہم عباراة", lang:"Arabic"},
      {id:'s_Arabic_Words', name:"مہم الفاظ", lang:"Arabic"},
      {id:'s_Arabic_Stems', name:"مہم اوزان", lang:"Arabic"},
      //{id:'s_Arabic_normalized', name:"مہم کلمات"},
      {id:'s_Arabic_root', name:"مہم مادّہ", lang:"Arabic"},
      {id:'s_Surah', name:"مہم سورة", lang:"Arabic"},
      {id:'Surah', name:"سورة", lang:"Arabic"},
      {id:'s_Urdu', name:"اہم اردو الفاظ", lang:"Urdu"},
      {id:'s_UrduTS', name:"تفسیر صغیر کے اہم اردو الفاظ", lang:"UrduTS"},
      {id:'s_English', name:"Significant English Words", lang:"English"},
      {id:'s_German', name:"Bedeutende Deutsche Wörte", lang:"German"},
      {id:'s_Spanish', name:"Significant Spanish Words", lang:"Spanish"},
      {id:'s_French', name:"Significant French Words", lang:"French"}
    ];

verse_max = [
              7,287,201,177,121,166,207,76,129,110,124,112,44,53,100,129,112,111,
              99,136,113,79,119,65,78,228,94,89,70,61,35,31,74,55,46,84,183,89,76,
              86,55,54,90,60,38,36,39,30,19,46,61,50,63,56,79,97,30,23,25,14,15,12,
              12,19,13,13,31,53,53,45,29,29,21,57,41,32,51,41,47,43,30,20,37,26,23,
              18,20,27,31,21,16,22,12,9,9,20,6,9,9,12,12,9,4,10,6,5,8,4,7,4,6,5,6,7
            ]

limit = 100;
