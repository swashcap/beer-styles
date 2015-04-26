/* jshint devel:true */
(function (document, $) {
  'use strict';

  /**
   * Account menu toggler.
   */
  var ACCOUNT_OPEN_CLASS = 'is-open';
  var $accountTriggers = $('.account__trigger');

  var closeAccountMenus = function () {
    $accountTriggers.attr('aria-expanded', 'false');
    $accountTriggers.parent().removeClass(ACCOUNT_OPEN_CLASS);
  };
  var toggleAccountMenu = function (e) {
    e.preventDefault();
    e.stopPropagation();

    var $el = $(this);
    var isActive = $el.attr('aria-expanded') === 'true';

    if (! isActive) {
      $el.parent().addClass(ACCOUNT_OPEN_CLASS);
      $el.attr('aria-expanded', 'true');
    } else {
      closeAccountMenus();
    }
  };

  $(document).on('click', closeAccountMenus);
  $(document).on('click', '.account__trigger', toggleAccountMenu);
})(document, jQuery);
