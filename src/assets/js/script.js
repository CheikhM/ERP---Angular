$(document).on('click', 'li.parent', function () {
  $(this).toggleClass('show');
  $(this).toggleClass('collapsed collapse');
});
