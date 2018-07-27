var client = algoliasearch("Z4XANBDB47", "6f287f2adec130b7ad015e1e09a92a6d")
//var docs = client.initIndex('okera-docs');
//var zendesk = client.initIndex('zendesk_okera_articles');

var datasets = [
                {
                    //displayKey: "actors",
                    index: client.initIndex("user_content_production"),
                    website:'https://docs.okera.com',
                    linkatt: 'url',
                },
                    {
                    //displayKey: "bestbuy",
                    index: client.initIndex("zendesk_okera_articles"),
                    website:'https://okera.zendesk.com/hc/en-us/articles/',
                    linkatt: 'id',
                }
                ]

var length = 10

autocomplete('#aa-search-input', {}, [
    {
    source: autocomplete.sources.hits(datasets[0].index, { hitsPerPage: 3 }),
    displayKey: 'Title',
    templates: {
        header: '<div class="aa-suggestions-category">Docs</div>',
        suggestion: function(suggestion) {
        return '<span>' +
            suggestion._highlightResult.title.value + '</span><br><span>' + suggestion.headings[1] +
            '</span><br><p class="aa-suggestions-preview">' + suggestion._highlightResult.content.value.substring(0,200) + '</p>';
        }
    }
    },
    {
    source: autocomplete.sources.hits(datasets[1].index, { hitsPerPage: 3 }),
    displayKey: 'title',
    templates: {
        header: '<div class="aa-suggestions-category">Zendesk</div>',
        suggestion: function(suggestion) {
        return '<span>' +
            suggestion._highlightResult.title.value + '</span><br><p class="aa-suggestions-preview">' + suggestion._highlightResult.body_safe.value.substring(0,150) + '</p>';
        }
    }
    }
]).on("autocomplete:selected", function(event, suggestion, dataset) {
// 1-indexed dataset
var website = datasets[dataset-1].website
var linktype = datasets[dataset-1].linkatt
//var link2 = suggestion.linktype
// do something with:
//console.log('website'+linktype)
// for example
//location.href = website + suggestion.linktype
if (dataset == 1) {
console.log(suggestion.url)
location.href = website+suggestion.url+'#'+suggestion.anchor
} else {
console.log(website+suggestion.id)
location.href = website+suggestion.id
}
});