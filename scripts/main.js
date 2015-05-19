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

(function ($) {
  var FOCUSED_CLASS = 'is-focused';

  /**
   * Auto-completion with Typeahead.js.
   *
   * @{link  https://twitter.github.io/typeahead.js/examples/}
   */
  var breweries = ['4th Street Brewing Co.', 'Alameda Brewhouse', 'Ambacht Brewing Co.', 'Amnesia Brewing Company', 'Boring Brewing', 'Breakside Brewery', 'BridgePort Brewpub', 'Burnside Brewing Co.', 'Cascade Brewing Barrel House', 'Coalition Brewing', 'Columbia River Brewing Co.', 'Deschutes', 'Fire on the Mountain Brewing', 'Green Dragon', 'Hair of the Dog Brewing Company', 'Hopworks', 'Humble Brewing', 'Laurelwood Brewing Co.', 'Lompoc Brewing', 'Lucky Labrador', 'MacTarnahan’s Brewing Taproom', 'McCormick & Schmicks’s', 'McMenamins', 'Migration Brewing', 'Mt. Hood Brewing', 'Natian Brewery', 'Occidental Brewing Company', 'Old Market Pub & Brewery', 'Old Town Brewing Company', 'Philadelphia’s Steaks & Hoagies', 'PINTS Brewing', 'Portland U-Brew & Pub', 'Raccoon Lodge and Brewpub', 'Rock Bottom Brewery', 'Rogue Ales', 'Sasquatch Brewery', 'The Commons Brewery', 'The Mash Tun', 'The Ram Restaurant & Brewery', 'Two Kilts Brewing', 'Upright Brewing', 'Vertigo Brewing', 'Widmer Brothers Brewing Company'];

  var $field = $('.autocomplete-field__input');
  var $button = $('.autocomplete-field__clear');

  var substringMatcher = function (strings) {
    return function findMatches (query, callback) {
      var matches = [];
      var pattern = new RegExp(query, 'i');

      $.each(strings, function (i, str) {
        if (pattern.test(str)) {
          matches.push(str);
        }
      });

      callback(matches);
    };
  };

  $field.typeahead({
    hint: true,
    highlight: true,
    minLenght: 1
  }, {
    name: 'breweries',
    source: substringMatcher(breweries)
  });
  $button.click(function (e) {
    e.preventDefault();

    $field.typeahead('val', '');
  });

  $field.on('typeahead:active', function () {
    $(this).parent().addClass(FOCUSED_CLASS);
  });
  $field.on('typeahead:idle', function () {
    $(this).parent().removeClass(FOCUSED_CLASS);
  });
})(jQuery);
