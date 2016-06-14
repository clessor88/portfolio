var novels = [];

function Article (books) {
  this.title = books.title;
  this.author = books.author;
  this.authorUrl = books.authorUrl;
  this.datePublished = books.datePublished;
  this.summary = books.summary;
}

Article.all = [];
Article.prototype.toHtml = function(){
var source = $('#novel-template').html();
var template = Handlebars.compile(source);
this.daysAgo = parseInt((new Date() - new Date(this.datePublished))/60/60/24/1000);
this.publishDays = this.datePublished ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  return template(this);
};

novelData.sort(function(a,b) {
  return (new Date(b.datePublished)) - (new Date(a.datePublished));
});

novelData.forEach(function(ele) {
  novels.push(new Article(ele));
});

novels.forEach(function(article) {
  $('#novels').append(article.toHtml());
});

Article.fetchAll = function() {
  if (localStorage.novelSummaries) {
    Article.loadAll(JSON.parse(localStorage.novelSummaries));
  }
  else {
    $.getJSON('data/novelSummaries.json', function(summaryData){
      Article.loadAll(summaryData);
      localStorage.setItem('novelSummaries', JSON.stringify(summaryData));
    });
  }
};
Article.fetchAll();
