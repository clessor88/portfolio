var authorView = {};

authorView.handleAuthorFilter = function (){
  $('#author-filter').on('change', function(){
    if($(this).val()) {
      $('article').hide();
    } else {
      $('article').fadeIn();
      $('article.template').hide()
    }
  });
};
