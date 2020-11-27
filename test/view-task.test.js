// eslint-disable-next-line import/no-extraneous-dependencies
import { fixture, html } from '@open-wc/testing';
import '../src/views/task/view-task.js';

describe('view-task', () => {
  window.APPROOT = '';
  let taskview;
  let navigation;
  let contentArea;
  beforeEach(async () => {
    taskview = await fixture(
      html`
        <view-task style="height: 100vh"></view-task>
      `,
    );
    await taskview.updateComplete;
    navigation = taskview.shadowRoot.querySelector(('task-navigation'))
  });


  it('should...', done => {


    done();
  });
});
