## 6.11:
  * Menu structure updated
  * New search query use case added: words and phrases with just + and - in front

## 6.10:
  * Auto search in all layer (except for Chinese) feature is added when no match is found
  * Default Keyboard size increased
  * Mongo performance optimizations using hash matching instead of the whole string
  * Cohorts updated to only show when not empty

## 6.9:
  * Added function to hide unmatching layers when searching across all layers
  * Feature added to click on the translation to disable all others from search

## 6.8:
  * Commentaries and other verse details loading from ES in the iFrame now

## 6.7:
  * Yusuf Ali's English Translation added

## 6.62:
  * Adds translation labels

## 6.61:
  * Commentaries integration to global search
  * Global search enhancements, now no need to select layers when performing global search

## 6.6:
  * English Five Volume Commentary added
  * Chinese Commentary added
  * (Requires ES Version 12)

## 6.5:
  * English Tranlsation from Five Volume Commentary added
  * Chinese translation added

## 6.46:
  * Help file reviewed and updated

## 6.45:
  * Similar verse syntax added. Requires New mapping and data in the ElasticSearch

## 6.44:
  * Quick Chapter matching filter added e.g. 114:* or just 114: will display all verses of last chapter

## 6.43:
  * Verse range filters added e.g. 4:6-8 or 5:>7 or 6:>=3 or 4:4 etc.

## 6.42:
  * Zero result response updated with option to perform a global search

## 6.41:
  * Enabling highlights for filter queries as well

## 6.4:
  * Aggregate section updated to allow layer and sublayer filtering in the query
  * Suggest support for query layer and sublayer filtering added
  * Help suggestions updated to showcase the power of layer and sublayer filtering
  * Multi-layer global filter search added

## 6.34:
  * Packages updated

## 6.33:
  * Italian language added
  * Requires ES version 10.5

## 6.32:
  * Meteor packages updated

## 6.31:
  * Query double submissions removed. No longer needed

## 6.3:
  * Significant Topics as Phrases added

## 6.21:
  * iFrame verse selector bug fixed

## 6.2:
  * Query DSL enhanced, now can perform perform negation logic in integer fields and their ranges

## 6.1:
  * Query DSL enhanced, now can perform field-specific phrase filters

## 6:
  * Performance enhancements by delaying summary results

## 5.9:
  * English Translation of Sir Muhammad Zafrullah Khan ra
  * Bugs fixed related to matching of recent translation layers

## 5.8:
  * English Translation of Muhammad Ali ra added     

## 5.7:
  * Translation phrases layers added for     
    - Arabic to English
    - Arabic Noor to English
    - English to Arabic Noor
    - English to Arabic
  * Meteor updated to 2.2

## 5.6:
  * English Mapping for English Translation by Hadhrat Moulavi Sher Ali ra sahib added, with following stages:
    - English to Arabic Noor
    - Arabic Noor to English

## 5.5:
  * English Mapping for English Translation by Hadhrat Moulavi Sher Ali ra sahib added, with following stages:
    - English to Arabic
    - Arabic to English

## 5.4:
  * The following translations added with all related layers:
    - English Pickthall
    - English Sahih
    - English Maududi
    - English Ahmed Ali
    - English Arberry
    - English Yusuf Ali
    - Urdu Maududi
    - Urdu AhmedAli

## 5.3:
  * Multi-word suggestion for Arabic added
  * Multi-word match priority added
  * Aggregation menu now replaces the query instead of appending to it
  * Minimum match score increased for performance reasons

## 5.2:
  * Performance enhanced by query caching

## 5.1:
  * Suggestion Menu response updated to include matched strings from search results

## 5:
  * English Topics Search added
  * UI updated

## 4:
  * Arabic Grammar added: Nouns, Proper Nouns, Verbs and Adjectives
  * Arabic Grammar also added for Noor Majidi script
  * Word for word translation added for English Corpus to Arabic
  * Word for word translation added for Arabic to English Corpus

## 3.2:
  * English Corpus Translation added
  * Translation Phrases added in the summary section

## 3.1:
  * Suggest menu updated with better fonts
  * Suggest menu categories added
  * Suggest menu now display phrases in translations
  * Suggest menu character highlighting added
  * Option menu bug fixes

## 3.0:
    * Mongo content auto-expiry added to improve performance and reduce cache sizes

## 2.99:
  * Page clipping issue in verse iFrame fixed

## 2.95:
  * New query filter range option added, this includes filtering by any field. E.g. query 'a:100-104'

## 2.9:
  * Query filter options added, this includes filtering by any field. UI will be updated later. E.g. query 's:>100 s:<=114' lists all surahs greater than Surah 100 and less than equal to Surah 114
  * When filter query is used exclusively, sorting by Sura and Ayah is enabled and not by match scores
  * Filters options added to each verse

## 2.8:
  * Option to switch script to Uthmani added
  * Fonts updated for other languages
  * UI changes to make increase font sizes
  * Suggest menu updated to retain direction based on existing search
  * Minor UI issues fixed

## 2.7:
  * Session retention feature restored
  * Suggestion menu stopped from when user searched by pressing Enter
  * Small Nun fixed
  * Minor UI enhancements including icons

## 2.6:
  * Loading/busy icon added
  * Suggestion menu autorun stopped on page load
  * Connection state check added
  * Css updated to change input text colour

## 2.5:
    * Pagination limit removed, all paging is now handled on the server-side

## 2.4:
  * Pagination limit increased from 10 pages to 100
  * Some related bugs fixed
  * All components updated

## 2.3:
  * Rate limiting for queries added both for Suggest and Search
  * Input timeout function adjusted to allow most recent query processing
  * Suggest related bug removed

## 2.2:
  * Suggestion allows you to remove Arabic suggestions.
  * If Arabic is not selected, 10 suggestions in total appear for all selected languages, otherwise, one per language is displayed

## 2.1:
  * Selecting a suggestion box now adds a space at the end removing the suggestion list
  * Auto switch to direction of the input box based on suggestion type added
  * Suggestion list box now switches direction as well

## 2.0:
  * Arabic Noor script added
  * Auto switch to direction of the input box based on keyboard input feature added
  * Root layer now displays roots with separated alphabets

## 1.19:
  * App cache support added

## 1.18:
  * CSS adjusted for Safari font stuttering

## 1.17:
  * LTR and RTL Keyboard added to resolve Android input issues
  * Fonts embedded to resolve iOS 11 issue

## 1.0:
  * Production launch on May 26th, 2017

## 2.2b:
  * https support deployed
  * Spanish Keyboard added
  * Chapter stem options removed

## 2.1b:
  * Spanish translation added

## 2.0b:
  *   Help contents added

## 1.9b:
  * Translation suggestions added
  * Stems with numberical counts hvae been fixed

## 1.7 b:
  * HTML5 Datalist for Suggestion was added.
  * List for word correction was improved and moved.
