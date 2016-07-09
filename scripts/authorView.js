var authorView = {};

authorView.handleAuthorFilter = function (){
  $('#author-filter').on('change', function(){
    if($(this).val()) {
      $('article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
  });
};

authorView.handleMainNav = function() {
  $('.page-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.page-nav .tab:first').click();
};

authorView.setTeasers = function() {
  $('h2').prev('p').remove();
  $('h2').next('p').remove();
  $('.novel-body *:nth-of-type(n+2)').hide();

  $('novels').on('click', 'a.read-on', function(e){
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};
