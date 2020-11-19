import { LitElement, html, css } from 'lit-element';
import { i18n, Theme } from '@furo/framework/src/furo.js';
import { FBP } from '@furo/fbp';

import '@furo/layout/src/furo-vertical-flex.js';
import '@furo/form';
import '@furo/input';
import '@furo/app/src/furo-card.js';
import '@furo/form/src/furo-form.js';
import '@furo/input/src/furo-icon-button.js';
import '@furo/notification/src/furo-snackbar.js';
import '@furo/util/src/furo-pretty-json.js';
import '../project_components/tasks/task-creator.js'
import '../project_components/tasks/task-list-card.js'
/**
 * `view-dashboard`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo-view-dashboard
 * @appliesMixin FBP
 */
class ViewDashboard extends FBP(LitElement) {
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
      Theme.getThemeForComponent(this.name) ||
      css`
        :host {
          display: block;
          height: 100%;
          overflow: hidden;
        }

        :host([hidden]) {
          display: none;
        }


       furo-pretty-json{
         overflow: auto;
         height: 300px;
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
        <furo-app-bar-top drawer="main-drawer">
          <div>Dashboard</div>
          <furo-empty-spacer></furo-empty-spacer>
          <furo-icon-button icon="search" @-click="--float"></furo-icon-button>
          <furo-icon-button icon="settings" @-click="--op"></furo-icon-button>
          <furo-snackbar
            position-right
            action-button-text="ignore"
            timeout-in-ms="8000"
            label-text="Settings page is not implemented yet. This message destroys itself in 8 seconds"
            ƒ-show="--op"
          ></furo-snackbar>
        </furo-app-bar-top>
        <div flex scroll>
          <task-creator   ƒ-focus="--FBPready" @-create-success="--taskCreated"></task-creator>

          <furo-vertical-flex>
          <task-list-card flex ƒ-refresh-list="--taskCreated" @-tablerow-selected="--entity"></task-list-card>
          <furo-horizontal-flex flex>
            <furo-data-object type="task.Task" ƒ-inject-raw="--entity(*.data)" @-data-injected="--new"></furo-data-object>
            <furo-pretty-json flex ƒ-inject-data="--new(*._value)"></furo-pretty-json>
            <furo-pretty-json flex ƒ-inject-data="--entity"></furo-pretty-json>

          </furo-horizontal-flex>

          </furo-vertical-flex>
        </div>
      </furo-vertical-flex>
    `;
  }
}

window.customElements.define('view-dashboard', ViewDashboard);
