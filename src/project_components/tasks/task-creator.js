import {LitElement, html, css} from 'lit-element';
import {Theme} from "@furo/framework/src/theme.js"
import {FBP} from "@furo/fbp";
import '../../generated_components/task/task-task-form.js'
import "@furo/data/src/furo-catalog.js"
import {  i18n  } from '@furo/framework/src/i18n.js';

/**
 * `task-creator`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo-task-creator
 * @appliesMixin FBP
 */
class TaskCreator extends FBP(LitElement) {


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
    // this._FBPTriggerWire("--focus", this)

  }

  focus(){
    this._FBPTriggerWire("--focus")
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return Theme.getThemeForComponent('TaskCreator') || css`
        :host {
          display: block;
          padding: 12px;
          box-sizing: border-box;


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
      <furo-card>

        <h1>Add a task</h1>
        <p>This has nothing to do with adatask industries</p>
        <task-task-form header-text="" ƒ-bind-data="--taskDO" ƒ-focus="--taskCreated" @-create-requested="--createRequested"></task-task-form>

        <furo-horizontal-flex space slot="action">

          <!-- It is a good practice to set a description -->
          <furo-button primary label="${i18n.t('create')}" rel="create" @-click="--createRequested"></furo-button>
        </furo-horizontal-flex>
      </furo-card>
      <furo-data-object type="task.Task" @-object-ready="--taskDO" ƒ-inject-raw="--taskCreated"></furo-data-object>
      <furo-entity-agent service="Tasks"  ƒ-bind-request-data="--taskDO" ƒ-hts-in="--TasksHTS" ƒ-create="--createRequested" @-create-success="--taskCreated"></furo-entity-agent>
      <furo-deep-link service="Tasks" ƒ-trigger="--FBPready" @-hts-out="--TasksHTS"></furo-deep-link>

    `;
  }
}

window.customElements.define('task-creator', TaskCreator);
