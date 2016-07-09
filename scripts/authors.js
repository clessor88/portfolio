function Article (opts) {
  for (keys in opts) {
    this[keys] = opts[keys];
  }
}

Article.all = [];

Article.prototype.toHtml = function(scriptTemplateId){
  var template = Handlebars.compile($(scriptTemplateId).text());
  this.daysAgo = parseInt((new Date() - new Date(this.datePublished))/60/60/24/1000);
  if(this.daysAgo < 1){
    this.publishDays = '(published today)';
  } else {
    this.publishDays = this.datePublished ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  }
  this.body = marked(this.body);
  return template(this);
};
Article.all = [];



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
Article.loadAll = function(dataWePassIn) {
  dataWePassIn.sort(function(a,b){
    return (new Date(b.datePublished)) - (new Date(a.datePublished));
  }).forEach(function(ele) {
    Article.all.push(new Article(ele));
  });
};

Article.fetchAll = function(e) {
  if (localStorage.novelSummaries) {
    Article.loadAll(JSON.parse(localStorage.novelSummaries));
    authorView.renderIndexPage();
  }
  else {
    $.getJSON('data/novelSummaries.json', function(summaryData){
      Article.loadAll(summaryData);
      localStorage.setItem('novelSummaries', JSON.stringify(summaryData));
      authorView.renderIndexPage();
    });
  }
};
