import {LitElement, html, css} from 'lit-element';
import {Theme} from "@furo/framework/src/theme.js"
import {FBP} from "@furo/fbp";
import {i18n} from '@furo/framework/src/i18n.js';

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
    // this._FBPTraceWires()
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return Theme.getThemeForComponent('TaskListWidget') || css`
        :host {
            display: block;
        }

        :host([hidden]) {
            display: none;
        }

        furo-card{
          height: 100%;
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
      <furo-card header-text="Current Tasks">


        <p>Hej, welcome</p>
        <furo-horizontal-flex space slot="action">
          <!-- The button triggers the wire @-click="--createBtnClicked". This only says, that the button was clicked. The button does not have to know something -->
          <furo-button  label="${i18n.t('refresh')}" rel="create" @-click="--refreshBtnClicked"></furo-button>
          <div flex></div>
          <furo-icon-button disabled icon="arrow-back" @-click="--backBtnClicked"></furo-icon-button>
          <furo-icon-button disabled icon="arrow-forward" @-click="--forwardBtnClicked"></furo-icon-button>
        </furo-horizontal-flex>
      </furo-card>
    `;
  }
}

window.customElements.define('task-list-widget', TaskListWidget);
