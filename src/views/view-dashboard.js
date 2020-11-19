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
import '../project_components/tasks/task-creator-widget.js'
import '../project_components/tasks/task-list-widget.js'
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


        .autogrid > * {
          grid-column-end: span 2;
          grid-row-end: span 2;

          background-color: #f5f5f5;
        }

        .autogrid > *[double] {
          grid-column-end: span 4;
          grid-row-end: span 3;

        }

        .autogrid > *[high] {
          grid-row-end: span 4;

        }

        .autogrid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(236px, 1fr));
          grid-auto-rows: minmax(148px, 1fr);
          gap: 12px;
          grid-auto-flow: dense;
          list-style: none;
          padding: 12px;
          margin-bottom: 12px;
          width: 100%;
          box-sizing: border-box;
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
          <furo-icon-button icon="settings" @-click="--op"></furo-icon-button>
          <furo-snackbar
            position-right
            timeout-in-ms="4000"
            label-text="New task sucessfully created"
            ƒ-show="--taskCreated"
          ></furo-snackbar>
        </furo-app-bar-top>
        <div flex scroll class="autogrid">

          <task-creator-widget ƒ-focus="--FBPready" @-create-success="--taskCreated"></task-creator-widget>
          <task-list-widget high ƒ-refresh="--taskCreated"></task-list-widget>

          <div>Person List</div>
          <div>Message</div>
          <div></div>



        </div>
      </furo-vertical-flex>
    `;
  }
}

window.customElements.define('view-dashboard', ViewDashboard);
