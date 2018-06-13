import { DefaultSnippet } from '@olasearch/core'

module.exports = {
  api: {
    intent: "https://api-staging.olasearch.com/intent",
    search: "https://api-staging.olasearch.com/search",
    suggest: "https://api-staging.olasearch.com/suggest"
  },
  ajaxOptions: {
    crossOrigin: true,
    headers: {
      'Accept': "application/json, text/javascript",
      'Content-Type': 'application/x-www-form-urlencoded',
      'method': 'POST',
      'type': 'json'
    }
  },
  logger: {
    enabled: false,
  },
  mapping: [
    {
      name: 'q',
      key: 'q',
      default_field: 'name_t',
      multi_match_fields: ['name_t', 'description_t', 'ingredients_malt_ts', 'ingredients_hops_ts', 'food_pairing_ts'],
      suggest_fields: 'ola_spell_field'
    }
  ],
  projectId: "5aa12c59470f902235260774",
  proxy: false,
  facets: [
  ],
  fieldMappings: {
    title: 'name_t',
    url: '',
    summary: '',
    content: '',
    ola_collection_name: 'ola_collection_name'
  },
  defaultSnippet: () => {}, /* Any react component */
  snippetRules: [
    {
      rules: {
        ola_collection_name: 'beers_news'
      },
      template: function ({ result }) {
        return <DefaultSnippet result={result} />
      }
    }
  ]
}