// eslint-disable-next-line import/no-extraneous-dependencies
import { fixture, html } from '@open-wc/testing';
import '../src/configs/init.js';
import '../src/views/view-dashboard.js';

describe('view-dashboard', () => {
  window.APPROOT = '';
  let dashboard;
  beforeEach(async () => {
    dashboard = await fixture(html` <view-dashboard style="height: 100vh"></view-dashboard> `);
    await dashboard.updateComplete;
  });

  it('should have the task-creator-widget', done => {
    const w = dashboard.shadowRoot.querySelectorAll('task-creator-widget');
    assert.equal(w.length, 1);
    done();
  });

  it('should have a task-list-widget', done => {
    const w = dashboard.shadowRoot.querySelectorAll('task-list-widget');
    assert.equal(w.length, 1);
    done();
  });
});
