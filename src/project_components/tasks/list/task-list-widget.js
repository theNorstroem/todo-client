import { LitElement, html, css } from 'lit-element';
import { Theme } from '@furo/framework/src/theme.js';
import { FBP } from '@furo/fbp';
import { i18n } from '@furo/framework/src/i18n.js';

import './task-list.js';

/**
 * `task-list-widget`
 *  A widget with pagination and search to show the n created tasks.
 *
 * @summary show latest tasks
 * @customElement
 * @appliesMixin FBP
 */
class TaskListWidget extends FBP(LitElement) {

  constructor() {
    super();

    this.items = 5; // number of items to show per page
  }

  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();
    // this._FBPTraceWires();
  }

  refresh(e) {
    this._FBPTriggerWire('--refreshRequested', e);
  }


  /**
   * @private
   * @return {Object}
   */
  static get properties() {
    return {
      /**
       * Number of items to show per page
       */
      items: {type: Number}
    };
  }


  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return (
      Theme.getThemeForComponent('TaskListWidget') ||
      css`
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }

        furo-card {
          height: 100%;
        }

        task-list {
          height: 480px;
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
      <furo-card header-text="Current Tasks">
        <task-list
          items="${this.items}"
          ƒ-refresh="--refreshRequested, --refreshBtnClicked"
          @-task-list-item="--rawTaskEntity"
        ></task-list>

        <furo-horizontal-flex space slot="action">
          <!-- The button triggers the wire @-click="--refreshBtnClicked". This only says, that the button was clicked. The button does not have to know something -->
          <furo-button
            label="${i18n.t('refresh')}"
            rel="create"
            @-click="--refreshBtnClicked"
          ></furo-button>
          <div flex></div>
          <furo-icon-button
            disabled
            rel="prev"
            icon="arrow-back"
            @-click="--backBtnClicked"
          ></furo-icon-button>
          <furo-icon-button
            disabled
            rel="next"
            icon="arrow-forward"
            @-click="--forwardBtnClicked"
          ></furo-icon-button>
        </furo-horizontal-flex>
      </furo-card>

      <furo-reverse-deep-link
        service="Tasks"
        rel="self"
        @-converted="--taskQP"
        ƒ-convert="--rawTaskEntity(*.links)"
      ></furo-reverse-deep-link>

      <furo-app-flow ƒ-emit="--taskQP" event="show-task-requested"></furo-app-flow>
    `;
  }
}

window.customElements.define('task-list-widget', TaskListWidget);
