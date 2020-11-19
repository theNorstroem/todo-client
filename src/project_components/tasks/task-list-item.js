import {LitElement, html, css} from 'lit-element';
import {Theme} from "@furo/framework/src/theme.js"
import {FBP} from "@furo/fbp";

/**
 * `task-list-item`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo-task-list-item
 * @appliesMixin FBP
 */
class TaskListItem extends FBP(LitElement) {

  constructor() {
    super();
    this.field = {}
  }

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

  bindData(entity){
    this.field = entity.data
    this.field.addEventListener("branch-value-changed",()=>{
      this.requestUpdate();
    })
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return Theme.getThemeForComponent('TaskListItem') || css`
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
      ${this.field.display_name}
    `;
  }
}

window.customElements.define('task-list-item', TaskListItem);
