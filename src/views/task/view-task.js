import { LitElement, html, css } from 'lit-element';
import { Theme } from '@furo/framework/src/theme.js';
import { FBP } from '@furo/fbp';
import '@furo/layout/src/furo-resizer.js';
import './task-navigation.js';
import './task-detail.js';

/**
 * `view-task`
 * This view is here to edit an existing task.
 *
 * It gets the task to open and edit from the url (tsk)
 *
 * @summary edit a task
 * @customElement
 * @demo demo-view-task
 * @appliesMixin FBP
 */
class ViewTask extends FBP(LitElement) {
  /**
   * @private
   * @return {Object}
   */
  static get properties() {
    return {
      /**
       * Description
       */
      myBool: { type: Boolean },
    };
  }

  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();
    // this._FBPTraceWires()
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return (
      Theme.getThemeForComponent('ViewTask') ||
      css`
        :host {
          display: block;
          height: 100vh;
        }

        :host([hidden]) {
          display: none;
        }
      `
    );
  }

  /**
   * @private
   * @returns {TemplateResult}
   * @private
   */
  render() {
    // language=HTML
    return html`
      <furo-vertical-flex>
        <furo-app-bar-top
          navigation-icon="arrow-back"
          @-navigation-clicked="--navBackClicked"
          drawer="main-drawer"
        >
          <div>Tasks</div>
          <furo-empty-spacer></furo-empty-spacer>
        </furo-app-bar-top>

        <furo-horizontal-flex flex>
          <furo-resizer righthandle="" maxwidth="480">
            <task-navigation ƒ-refresh="--pageEntered"></task-navigation>
          </furo-resizer>
          <task-detail flex ƒ-set-qp="--locationChanged(*.query)"></task-detail>
        </furo-horizontal-flex>
      </furo-vertical-flex>

      <furo-app-flow ƒ-trigger="--navBackClicked" event="exit-tasks"></furo-app-flow>

      <furo-location
        url-space-regex="${window.APPROOT}/task"
        @-location-changed="--locationChanged"
      ></furo-location>
    `;
  }
}

window.customElements.define('view-task', ViewTask);
