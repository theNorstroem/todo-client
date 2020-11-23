import { LitElement, html, css } from 'lit-element';
import { Theme } from '@furo/framework/src/theme.js';
import { FBP } from '@furo/fbp';
import '../../project_components/tasks/task-list.js';

/**
 * `task-navigation`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo-task-navigation
 * @appliesMixin FBP
 */
class TaskNavigation extends FBP(LitElement) {
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

  refresh(d) {
    this._FBPTriggerWire('--refreshRequested', d);
  }

  /**
   * select item from list by setting the task id (tsk)
   * @param tsk
   */
  selectTaskId(tsk) {
    this._FBPTriggerWire('--selectedTSK', tsk);
  }

  /**
   * select prev item from list
   * @param tsk
   */
  selectPrev(tsk) {
    this._FBPTriggerWire('--selectPrevRequested', tsk);
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return (
      Theme.getThemeForComponent('TaskNavigation') ||
      css`
        :host {
          display: block;
          background: var(--surface);
          height: 100%;
          padding: 0 var(--spacing-s, 16px);
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
        <task-list
          items="30"
          ƒ-select-task-id="--selectedTSK"
          ƒ-select-prev="--selectPrevRequested"
          flex
          ƒ-refresh="--refreshRequested"
          @-task-list-item="--rawTaskEntity(*.detail.links)"
        ></task-list>
      </furo-vertical-flex>

      <furo-reverse-deep-link
        service="Tasks"
        rel="self"
        @-converted="--taskQP"
        ƒ-convert="--rawTaskEntity"
      ></furo-reverse-deep-link>

      <furo-app-flow ƒ-emit="--taskQP" event="show-task-requested"></furo-app-flow>
    `;
  }
}

window.customElements.define('task-navigation', TaskNavigation);
