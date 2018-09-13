var client = algoliasearch("Z4XANBDB47", "6f287f2adec130b7ad015e1e09a92a6d")

var datasets = [
                {
                    index: client.initIndex("user_content_production"),
                    website:'https://docs.okera.com',
                    linkatt: 'url',
                },
                    {
                    index: client.initIndex("zendesk_okera_articles"),
                    website:'https://okera.zendesk.com/hc/en-us/articles/',
                    linkatt: 'id',
                }
                ]

autocomplete('#aa-search-input', {
    debug: true,
    templates: {
      //add search by algolia logo
        footer: '<div class="branding">Search by <img src="https://www.algolia.com/static_assets/images/press/downloads/algolia-logo-light.svg" /></div>',
    }
},[
    {
    source: autocomplete.sources.hits(datasets[0].index, { hitsPerPage: 3 }),
    displayKey: 'Title',
    templates: {
        header: '<div class="aa-suggestions-category">Okera Documentation</div>',
        suggestion: function(suggestion) {
            if( typeof suggestion.headings[1] !== 'undefined' ) {
                // if secondary heading exists show it
                return '<span class="aa-suggestions-okera-heading">' + suggestion._highlightResult.title.value + '</span><br><span class="aa-suggestions-subheading">' + suggestion._highlightResult.headings[1].value +
                '</span><br><p class="aa-suggestions-preview">' + suggestion._snippetResult.content.value + '</p>';
            } else {
                // otherwise don't show it
                return '<span class="aa-suggestions-okera-heading">' + suggestion._highlightResult.title.value + '</span><br>' +
                '<p class="aa-suggestions-preview">' + suggestion._snippetResult.content.value + '</p>';
            }
        }
    }
    },
    {
    source: autocomplete.sources.hits(datasets[1].index, { hitsPerPage: 3 }),
    displayKey: 'title',
    templates: {
        header: '<div class="aa-suggestions-category">Zendesk Knowledgebase</div>',
        suggestion: function(suggestion) {
        return '<span class="aa-suggestions-okera-heading">' +
            suggestion._highlightResult.title.value + '</span><br><p class="aa-suggestions-preview">' + suggestion._snippetResult.body_safe.value + '</p>';
        }
    }
    }
]).on("autocomplete:selected", function(event, suggestion, dataset) {
    // 1-indexed dataset
    var website = datasets[dataset-1].website
    var linktype = datasets[dataset-1].linkatt
    //adds the correct url to the search result 
    if (dataset == 1) {
        console.log(suggestion.url)
        location.href = website+suggestion.url+'#'+suggestion.anchor
    } else {
        console.log(website+suggestion.id)
        location.href = website+suggestion.id
    }
});