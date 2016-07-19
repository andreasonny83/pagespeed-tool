'use strict';

class PST {
  constructor(target, button, input) {
    this.targetEl = document.querySelector(target);
    this.buttonEl = document.querySelector(button);
    this.inputEl = document.querySelector(input);

    this.xhttp = new XMLHttpRequest();

    this.xhttp.addEventListener('load', this.reqListener.bind(this));
    this.buttonEl.addEventListener('click', this.sendURL.bind(this));
  }

  updatePageStat(res) {
    let data = document.createTextNode(JSON.stringify(res));

    this.targetEl.innerHTML = '';
    this.targetEl.appendChild(data);
  }

  reqListener(e) {
    let res;

    if(e.currentTarget.readyState === 4 && e.currentTarget.status === 200) {
      res = JSON.parse(e.currentTarget.response);
    } else {
      console.error('Error.');
    }

    this.updatePageStat(res);
  }

  sendURL() {
    var url = this.inputEl.value;
    var strategy = 'mobile';
    var key = '';
    var google = [
      'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=',
      url,
      '&strategy=',
      strategy,
      key ? '&key=' + key : null
    ].join('');

    this.targetEl.innerHTML = 'Fetching data...';

    this.xhttp.open('GET', google, true);
    this.xhttp.send();
  }
}
