import {LitElement, html, css} from 'lit-element';
import {Theme} from "@furo/framework/src/theme.js"
import {FBP} from "@furo/fbp";

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
      myBool: {type: Boolean}
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
    return Theme.getThemeForComponent('ViewTask') || css`
        :host {
            display: block;
        }

        :host([hidden]) {
            display: none;
        }
    `
  }


  /**
   * @private
   * @returns {TemplateResult}
   * @private
   */
  render() {
    // language=HTML
    return html`
      <p>Hej, welcome</p>
    `;
  }
}

window.customElements.define('view-task', ViewTask);
