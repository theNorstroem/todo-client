import { LitElement, html, css } from 'lit-element';
import { Theme } from '@furo/framework/src/theme.js';
import { FBP } from '@furo/fbp';

import '../../project_components/tasks/edit/task-update-panel.js';
/**
 * `task-detail`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo-task-detail
 * @appliesMixin FBP
 */
class TaskDetail extends FBP(LitElement) {
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
   * Exposes --queryParams
   * @param {Object} det
   */
  setQp(det) {
    // setze auf edit wenn wir sco und arb haben
    this._FBPTriggerWire('--queryParams', det);
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
      Theme.getThemeForComponent('TaskDetail') ||
      css`
        :host {
          display: block;
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
      <furo-banner-display></furo-banner-display>
      <task-update-panel ƒ-hts-in="--hts"></task-update-panel>

      <furo-deep-link service="Tasks" ƒ-qp-in="--queryParams" @-hts-out="--hts"></furo-deep-link>
    `;
  }
}

window.customElements.define('task-detail', TaskDetail);
