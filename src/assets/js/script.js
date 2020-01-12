
$(document).ready(function () {

  $(document).on('click', 'li.parent', function () {
    $(this).toggleClass('show');
    $(this).toggleClass('collapsed collapse');
  });

  $(document).on('click', '.collapse-icon .title', function () {
    $('.wf-elements').slideToggle(200);
  });
});
