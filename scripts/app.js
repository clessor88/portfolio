var novels = [];

function Article (books) {
  this.title = books.title;
  this.author = books.author;
  this.authorUrl = books.authorUrl;
  this.datePublished = books.datePublished;
  this.summary = books.summary;
}

Article.prototype.toHtml = function(){
  var $newBook = $('article.displayed-text').clone();
  $newBook.find('a').html(this.author);
  $newBook.find('h1').html(this.title);
  $newBook.find('a').attr('href', this.authorUrl);
  $newBook.find('time').attr('pubdate', this.datePublished);
  $newBook.find('.text-body').html(this.summary);
  $newBook.find('time[pubdate]').attr('title', this.datePublished);
  $newBook.find('time').html('About ' + parseInt((new Date() - new Date(this.datePublished))/60/60/24/1000) + ' days ago');

  $newBook.removeAttr('class');
  return $newBook;
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
