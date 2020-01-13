$(document).ready(function () {

  $(document).on('click', 'li.parent', function () {
    $(this).toggleClass('show');
    $(this).toggleClass('collapsed collapse');
  });

  $(document).on('click', '.collapse-icon .title', function () {
    $('.wf-elements').slideToggle(200);
  });

  $(document).on('dblclick', '.note .text', function () {
    $(this).removeAttr('readonly');
    $('.note .text').not($(this)).attr('readonly', 'readonly');
  })


  $('.form-group').each(function () {
    // var message = '<div class="message">field required</div>';
    // $(this).append(message);
  })
});
