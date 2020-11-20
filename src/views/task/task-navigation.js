import {LitElement, html, css} from 'lit-element';
import {Theme} from "@furo/framework/src/theme.js"
import {FBP} from "@furo/fbp";
import "../../project_components/tasks/task-list.js"

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

  refresh(d){
    this._FBPTriggerWire("--refreshRequested",d);
  }
  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return Theme.getThemeForComponent('TaskNavigation') || css`
      :host {
        display: block;
        background: var(--surface);
        height: 100%;
        padding: 0 var(--spacing);
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
      <furo-vertical-flex>
        <task-list flex ƒ-refresh="--refreshRequested"></task-list>
      </furo-vertical-flex>

    `;
  }
}

window.customElements.define('task-navigation', TaskNavigation);
