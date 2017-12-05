module.exports = {
  array_separator: null,
  bookmarking: true,
  searchHistory: false,
  infiniteScroll: false,
  showEmptyFacet: false,
  facetSearchLimit: 5,
  searchTimeOut: 100,
  autoSuggestTimeout: 100,
  mediaQuery: {
      mobile: 'screen and (max-width: 600px)',
      tablet: 'screen and (min-width: 768px)',
      desktop: 'screen and (min-width: 960px)'
  },
  ajaxOptions: {
      method: 'POST',
      type: 'json',
      crossOrigin: true,
      headers: {
      }
  },
  proxy: true,
  intentEngineEnabled: true,
  projectId: '58413bd6edb3604318fbc727', // staging
  // projectId: '5910080696b7644e74cefeac',
  searchPageUrl: '/',
  history: 'pushState',
  method: 'GET',
  jsonp: true,
  enableDetailPage: true,
  env: 'staging',
  // env: 'production',
  api: {
      search: 'https://api-staging.olasearch.com/v1/search',
      intent: 'https://api-staging.olasearch.com/v1/intent',
      suggest: 'https://api-staging.olasearch.com/v1/suggest'
      // search: 'https://api.olasearch.com/v1/search',
      // intent: 'https://api.olasearch.com/v1/intent',
      // suggest: 'https://api.olasearch.com/v1/suggest'
  },
  logger: {
      enabled: true,
      url: 'http://54.251.133.136/adb/log',
      engine: ['logstash', 'google']
  },
  namespace: 'adb',
  // defaultSnippet: customSnippet,
  mapping: [
      {
          name: 'facet_mincount',
          key: 'facet.mincount',
          value: 1
      },
      {
          name: 'q',
          key: 'q',
          value: '',
          multi_match_fields: ["ts_bodydollarsummary", "ts_bodydollarvalue", "content^1","ts_field_keywords^3","ts_title^8","ola_bb_queries^9000"],
          best_bet: 'OR _query_:"{!lucene df=ola_bb_queries^900}\'{q}\'"'
      },
      {
          name: 'page',
          key: 'start',
          value: 1
      },
      {
          name: 'per_page',
          key: 'rows',
          value: 10,
          hidden: true
      },
      {
          name: 'facet_field',
          key: 'facet.field',
          value: [],
          hidden: true,
      },
      {
          name: 'facet_range',
          key: 'facet.range',
          value: [],
          hidden: true,
      },
      {
          name: 'facet_date',
          key: 'facet.date',
          value: [],
          hidden: true,
      },
      {
          name: 'facet_query',
          key: 'fq',
          value: []
      },
      {
          name: 'field_query',
          key: 'fl',
          value : '',
          hidden: true
      },
      {
          name: 'facet_limit',
          key: 'facet.limit',
          value: 500,
          hidden: true,
      },
      {
          name: 'spellcheck',
          key: 'spellcheck',
          value: true,
          hidden: true
      },
      {
          name: 'spellcheck_collate',
          key: 'spellcheck.collate',
          value: true,
          hidden: true
      },
      {
          name: "spellchecker_max_results",
          key: 'spellcheck.maxResultsForSuggest',
          value: 1,
      },
      {
          name: 'output',
          key: 'wt',
          value: 'json',
          hidden: true
      },
      {
          name: 'facet',
          key: 'facet',
          value: true,
          hidden: true
      },
      {
          name: 'sort',
          key: 'sort',
          value: '',
      },
      {
          name: 'mm',
          key: 'mm',
          value: '1<-50% 3<-1',
      },
      {
      name: 'custom_query',
      key: 'bfquery',
      value: 'query({!v="ola_bb_queries:\\"{q}\\""},0)'
    },
    {
      name: 'best_bets_boost', /* Only used for solr */
      key: 'bf',
      value: 'product(def($bfquery,0),90)'
    },
      {
          name: 'highlight_fields',
          key: 'highlight_fields',
          value:  ["tm_title"],
          pre_tags: ['<em class="ola-highlight">'],
          post_tags: ['</em>'],
          size: 200
      }
  ],
  mappingAutoSuggest: [
      {
          name: 'path',
          key: 'path',
          value: 'select'
      },
      {
          name: 'q',
          key: 'q',
          value: ''
      },
      {
          name: 'page',
          key: 'start',
          value: 1
      },
      {
          name: 'per_page',
          key: 'rows',
          value: 10,
          hidden: true
      },
      {
          name: 'field_query',
          key: 'fl',
          value: []
      },
      {
          name: 'highlight_fields',
          key: 'highlight_fields',
          value:  ["tm_title"],
          pre_tags: ['<em class="ola-highlight">'],
          post_tags: ['</em>'],
          size: 200
      },
      {
          name: 'output',
          key: 'wt',
          value: 'json',
          hidden: true
      },
  ],
  fieldMappings: {
      id        : 'id',
      title     : 'ts_title',
      summary: 'ts_bodydollarsummary',
      url: 'ss_url',
      language: 'ss_language'
  },
  facetsToDisplay: {
      '*' : ['ola_collection_name', 'sm_field_status_names', 'sm_field_subjectsdollarname', 'sm_field_countriesdollarname', 'ds_created', 'ds_field_date_content'],
      'project': ['ola_collection_name', 'sm_field_countriesdollarname'],
      'India': ['ds_created']
  },
  nullFacetName: 'Uncategorised',
  facets: [
      {
          name: 'ola_collection_name',
          type: 'checkbox',
          multiSelect: true,
          displayName: 'Content type',
          showSelectedTag: false,
          isCollapsed: true
      },
      {
          name: 'sm_field_status_names',
          type: 'checkbox',
          defaultValue: ['-Archived'],
          fixedValues: ['All'],
          facetNames: {
              'All': 'Yes'
          },
          limit: 20,
          displayName: 'Include archives',
      },
      {
          name: 'sm_field_subjectsdollarname',
          type: 'string',
          displayName: 'Subjects',
          facetNames: {},
          showSelectedTag: false,
          multiSelect: true
      },
      {
          name: 'sm_field_countriesdollarname',
          type: 'checkbox',
          displayName: 'Country',
          showSelectedTag: false,
          multiSelect: true
      },
      {
        "displayName": "Approval Years",
        "name": "ds_field_date_content",
        "type": "daterange",
        "facetNames": {},
        "isRoot": false,
        "multiSelect": true,
        "_id": "589c16e448afaf5eb8a80a10",
        "isGlobal": false,
        "order": 8,
        "showSelectedTag": true,
        "singleHandle": false,
        "isCollapsed": false,
        "end": "2017-01-01T00:00:00Z",
        "start": "1960-01-01T00:00:00Z",
        "step": 1,
        "interval": "+1YEAR",
        "showHistogram": true,
        "dateFormat": "DD MMMM YYYY",
        "datePicker": true,
        "template": "{from} to {to}"
      },
      {
          name: 'ds_created',
          type: 'daterange',
          rangeType: 'daterangepicker',
          displayName: 'Date',
          start: '1950-04-15T09:34:33Z',
          end: '2020-04-15T09:34:33Z',
          interval: '+1YEAR',
          dateFormat: 'DD MMMM YYYY',
          template: '{from} to {to}'
      }
  ],
  sortBy: [
      {
          name: 'Title A-Z',
          value: 'title_s asc'
      },
      {
          name: 'Title Z-A',
          value: 'title_s desc'
      },
      {
          name: 'Latest first',
          value: 'year_i desc'
      },
      {
          name: 'Oldest first',
          value: 'year_i asc'
      },
      {
          name: 'Rating high-low',
          value: 'audience_score_i desc'
      }
  ],
  perPage: ['10', '20', '50', '100'],
  filters: []
}