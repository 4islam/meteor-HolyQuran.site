
analyzers = [                                      //order is important
              {id:'standard', name:"اصل"},
              {id:'ar_stems', name:"وزن"},
              {id:'ar_root', name:"مادّہ"}
            ];

names_array = [
      'Arabic',
      'جزئي',
      'سوى',
      'مادّہ',
      'وزن',
      'صوتی',
      'ادھورا',
      'سادہ',
      'سورة',
      'Urdu',
      'ہموار',
      'English',
      'German',
      'Spanish',
      'French',
      'normalisierte',
      'normalized',
      'partial',
      'teilweise'
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
      {id:'s_English', name:"Significant English Words", lang:"English"},
      {id:'s_German', name:"Bedeutende Deutsche Wörte", lang:"German"},
      {id:'s_Spanish', name:"Significant Spanish Words", lang:"Spanish"},
      {id:'s_French', name:"Significant French Words", lang:"French"}
    ];
