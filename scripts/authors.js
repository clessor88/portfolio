function Article (books) {
  for (keys in books) {
    this[keys] = opts[keys];
  }
}

Article.all = [];

Article.prototype.toHtml = function(authorTemplateId){
var template = Handlebars.compile($(authorTemplateId).text());
this.daysAgo = parseInt((new Date() - new Date(this.datePublished))/60/60/24/1000);
if(this.daysAgo < 1){
  this.publishDays = '(published today)';
} else {
  this.publishDays = this.datePublished ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
}
  this.body = marked(this.body);
  return template(this);
};

// novelData.sort(function(a,b) {
//   return (new Date(b.datePublished)) - (new Date(a.datePublished));
// });
//
// novelData.forEach(function(ele) {
//   novels.push(new Article(ele));
// });
//
// novels.forEach(function(article) {
//   $('#novels').append(article.toHtml());
// });

Article.fetchAll = function() {
  if (localStorage.novelSummaries) {
    Article.loadAll(JSON.parse(localStorage.novelSummaries));
    Article.initNewAuthorPage();
  }
  else {
    $.getJSON('data/novelSummaries.json', function(summaryData){
      Article.loadAll(summaryData);
      localStorage.setItem('novelSummaries', JSON.stringify(summaryData));
    });
  }
};
