'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PST = function () {
  function PST(target, button, input) {
    _classCallCheck(this, PST);

    this.targetEl = document.querySelector(target);
    this.buttonEl = document.querySelector(button);
    this.inputEl = document.querySelector(input);

    this.xhttp = new XMLHttpRequest();

    this.xhttp.addEventListener('load', this.reqListener.bind(this));
    this.buttonEl.addEventListener('click', this.sendURL.bind(this));
  }

  _createClass(PST, [{
    key: 'updatePageStat',
    value: function updatePageStat(res) {
      var data = document.createTextNode(JSON.stringify(res));

      this.targetEl.innerHTML = '';
      this.targetEl.appendChild(data);
    }
  }, {
    key: 'reqListener',
    value: function reqListener(e) {
      var res = void 0;

      if (e.currentTarget.readyState === 4 && e.currentTarget.status === 200) {
        res = JSON.parse(e.currentTarget.response);
      } else {
        console.error('Error.');
      }

      this.updatePageStat(res);
    }
  }, {
    key: 'sendURL',
    value: function sendURL() {
      var url = this.inputEl.value;
      var strategy = 'mobile';
      var key = '';
      var google = ['https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=', url, '&strategy=', strategy, key ? '&key=' + key : null].join('');

      this.targetEl.innerHTML = 'Fetching data...';

      this.xhttp.open('GET', google, true);
      this.xhttp.send();
    }
  }]);

  return PST;
}();