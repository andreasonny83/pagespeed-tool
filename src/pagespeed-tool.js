'use strict';

class PST {
  constructor(target, button, input) {
    this.targetEl = document.querySelector(target);
    this.buttonEl = document.querySelector(button);
    this.inputEl = document.querySelector(input);
    this.stat = [];

    this.xhttp = new XMLHttpRequest();

    this.xhttp.addEventListener('load', this.reqListener.bind(this));
    this.buttonEl.addEventListener('click', this.sendURL.bind(this));
  }

  renderPage() {
    // https://github.com/addyosmani/psi
    this.targetEl.innerHTML = '';
    let title;
    let strategy;
    let score;
    let usability;
    let cssSize;
    let htmlSize;
    let jsSize;
    let cssResources;
    let jsResources;
    let totSize;
    let leverageBrowserCaching;
    let minifyJs;
    let minifyRenderBlockingRes;
    let sizeTapTargets;

    if (this.stat[0].responseCode === 200 &&
        !!this.stat[0].title) {
      title = document.createElement('h2');
      let text = document.createTextNode(this.stat[0].title +
                                         ' pagespeed result:');
      title.appendChild(text);
    }

    if (this.stat[0].ruleGroups &&
        this.stat[0].ruleGroups.SPEED &&
        this.stat[0].ruleGroups.SPEED.score) {
      score = document.createElement('h3');
      let text = document.createTextNode('Score: ' +
                                         this.stat[0].ruleGroups.SPEED.score);
      score.appendChild(text);
    }

    this.targetEl.appendChild(title);
    this.targetEl.appendChild(score);
  }

  updatePageStat(res) {
    this.stat.push(res);
    console.log(this.stat);

    this.renderPage();
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
