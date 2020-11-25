import { LitElement, html, css } from 'lit-element';
import { Theme } from '@furo/framework/src/theme.js';
import { FBP } from '@furo/fbp';
import { i18n } from '@furo/framework/src/i18n.js';

import './task-list.js';

/**
 * `task-list-widget`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo-task-list-widget
 * @appliesMixin FBP
 */
class TaskListWidget extends FBP(LitElement) {
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
          items="8"
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