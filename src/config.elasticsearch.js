import customSnippet from './components/customSnippet';

module.exports = {      
    array_separator: null,
    infiniteScroll: false,
    showEmptyFacet: false,
    facetSearchLimit: 5,
    searchTimeOut: 0,
    autoSuggestTimeout: 100,
    enableHighlighting: true,
    mediaQuery: {
        mobile: 'screen and (max-width: 600px)',
        tablet: 'screen and (min-width: 768px)',
        desktop: 'screen and (min-width: 960px)'
    },
    ajaxOptions: {
        method: 'post',
        type: 'json',
        crossOrigin: true,
        // withCredentials: true,
        headers: {            
            // "Authorization": "Basic " + btoa( 'user' + ':' + 'pass' )
        }
    },
    searchPageUrl: '/search.html',    
    api: {
        search: 'http://52.76.115.91:9200/scb/_search',
        suggest: 'http://52.76.115.91:9200/scb/_search' 
    },
    snippetRules: [
        {
            rules: {
                content_type: "help-centre",
                channel_type: "Swift Code",
            },
            template: customSnippet
        }
    ],
    defaultSnippet: customSnippet,   
    mapping: [
        {
            name: 'q',
            key: 'q',
            value: ''
        },
        {
            name: 'page',
            key: 'from',
            value: 1
        },
        {
            name: 'per_page',
            key: 'size',
            value: 10,
            hidden: true
        },
        {
            name: 'facet_field',
            key: 'aggregatons',                 
            value: ['page_s', 'section_s', 'cc_category_s', 'cc_has_reward_b', 'cc_annual_fee_i', 'cc_fee_waiver_s', 'features_ss', 'type_s', 'features_ss', 'channel_type_s'],
            hidden: true,
        },      
        {
            name: 'facet_query',
            key: 'fq',
            value: []
        },
        {
            name: 'field_query',
            key: 'fields',
            value : ["_id", "section_title_s", "body", "title_t", "description_t", "keywords_t"],               
            hidden: true
        },
        {
            name: 'facet_limit',
            key: 'facet.limit',
            value: 100,
            hidden: true,
        },              
        {
            name: 'spellcheck_collate',
            key: 'spellcheck.collate',
            value: true,
            hidden: true
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
            name: 'stats',
            key: 'stats',
            value: 'true',
            hidden: true
        },
        {
            name: 'stats_facet',
            key: 'stats.field',
            value: 'published_tdt',
            hidden: true
        },
        {
            name: 'sort',
            key: 'sort',
            value: '',                  
        },
        {
            name: 'header',
            key: 'omitHeader',
            value: 'false',                 
            hidden: true
        },
        {
            name: 'highlight',
            key: 'highlight',
            value:  "true"
        },
        {
            name: 'highlight_fields',
            key: 'highlight_fields',
            value:  ["title_t", "description_t"],
            matched_fields: [["title_t", "title_t.word", "title_t.ngram"], []],
            pre_tags: ['<em class="ola-highlight">'],
            post_tags: ['</em>']
        }
    ],
    mappingAutoSuggest: [
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
            value: ['*']
        },
        {
            name: 'highlight',
            key: 'highlight',
            value:  "true"
        },
        {
            name: 'highlight_fields',
            key: 'highlight_fields',
            value:  ["title_t", "description_t"],
            matched_fields: [["title_t", "title_t.word", "title_t.ngram"], []],
            pre_tags: ['<em class="ola-highlight">'],
            post_tags: ['</em>']
        }
    ],
    fieldMappings: {
        id        : '_id',
        url: '_id',
        title     : 'title_t',      
        thumbnail: 'thumbnail_s',
        thumbnail_mobile: 'thumbnail_mobile_s',
        summary: 'description_t',
        cc_description: 'cc_description_t',
        cc_category: 'cc_category_s',
        section_title: 'section_title_s',
        section_subtitle: 'section_subtitle_s',
        body: 'body_t',
        cc_image: 'cc_image_s',
        annual_fee: 'cc_annual_fee_i',
        fee_waiver: 'cc_fee_waiver_s',
        features: 'cc_features_ss',
        content_type: 'section_s',
        promoted: 'promo_b',
        elevated: 'elevate_b',
        promo_image: 'promo_img_s',
        promo_description: 'promo_description_t',
        has_rewards: 'cc_has_reward_b',
        page_section: 'page_s',
        swift_code: 'swift_code_s',
        channel_type: 'channel_type_s',
        latlong: 'location_p',
        address: 'address_t',
        branch_code: 'branch_code_s',
        bank_code: 'bank_code_s',
        branch: 'branch_t',
        tel_international: 'tel_int_s',
        tel_local: 'tel_local_s'
    },
    facetsToDisplay: {
        '*' : [],
        'credit-card-detail-page': ['cc_category_s', 'cc_has_reward_b', 'cc_annual_fee_i', 'cc_fee_waiver_s', 'features_ss'],
        'save': ['type_s', 'features_ss'],
        'borrow': ['type_s', 'features_ss'],
        'help-centre': ['channel_type_s'],
        'insure': ['features_ss']
    },
    facetNames: {
        'ways-to-bank': 'Ways to Bank',
        'credit-card-detail-page': 'Credit cards',
        'credit-card': 'Credit cards benefits',
        'save': 'Save',
        'borrow': 'Borrow',
        'invest': 'Invest',
        'insure': 'Insure',             
        'help-centre': 'Support'
    },
    tabsToDisplay: ['credit-card-detail-page', 'save', 'borrow', 'invest', 'insure', 'help-centre'],
    nullFacetName: 'Uncategorised',
    facets: [
        {
            name        : 'page_s',
            displayName : 'Page',
            type        : 'checkbox',
            multiSelect: false
        },
        {
            name       : 'section_s',
            displayName: 'Section',
            type : 'checkbox',            
            defaultValue: 'credit-card-detail-page',
            multiSelect: true,
            tab: true
        },
        {
            name: 'cc_category_s',
            displayName: 'Category',                    
            type: 'checkbox',
            multiSelect: true
        },
        {
            name: 'cc_fee_waiver_s',
            displayName: 'Fee waiver',
            type: 'checkbox',
            multiSelect: true
        },
        {
            name: 'cc_annual_fee_i',
            displayName: 'Annual fee',
            type: 'range',
            multiSelect: true,
            template: '${from} to ${to}'
        },
        {
            name: 'cc_has_reward_b',
            displayName: 'Rewards',
            type: 'boolean',
            multiSelect: true
        },                              
        {
            name: 'features_ss',
            displayName: 'Features'
        },
        {
            name: 'type_s',
            displayName: 'Type of Account',
            type: 'string'
        },
        {
            name: 'channel_type_s',
            displayName: 'Type',
            type: 'checkbox',
            multiSelect: true
        }
    ],          
    sortBy: [
        {
            name: 'Title A-Z',
            value: 'title_t asc'
        },
        {
            name: 'Title Z-A',
            value: 'title_t desc'
        },
        {
            name: 'Latest first',
            value: 'published_tdt desc'
        },
        {
            name: 'Oldest first',
            value: 'published_tdt asc'
        }
    ],
    perPage: ['10', '20', '50', '100'],
    guides: {
        banner: [
            {
                name       : 'section_s',
                displayName: 'Section',
                type : 'checkbox',
                question: 'Help me',
                defaultValue: 'credit-card-detail-page',
                multiSelect: true,
                tab: true
            },
            {
                name: 'features_ss',
                displayName: 'Features',
                question: 'with',
            }
        ]
    }
}