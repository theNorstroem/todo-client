import {LitElement, html, css} from 'lit-element';
import {Theme} from "@furo/framework/src/theme.js"
import {FBP} from "@furo/fbp";
import './edit/task-task-form.js'
import "@furo/data/src/furo-catalog.js"
import {i18n} from '@furo/framework/src/i18n.js';

/**
 * `task-creator-widget`
 *
 *  A card that you can put on your dashboard or somewhere else, to create a task
 *
 * @summary quick task creator widget
 * @customElement
 * @appliesMixin FBP
 */
class TaskCreatorWidget extends FBP(LitElement) {


  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();
    // this._FBPTraceWires()
    // this._FBPTriggerWire("--focus", this)

    // we set this value to use it as a init for the create object.
    this.emptyObject = {}
  }

  focus() {
    this._FBPTriggerWire("--focus")
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return Theme.getThemeForComponent('TaskCreatorWidget') || css`
      :host {
        display: block;
        box-sizing: border-box;
        height: 100%;
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
      <furo-card header-text="Add a task" secondary-text="You can edit the task in detail later." ƒ-start-activity="--createBtnClicked" ƒ-stop-activity="--taskCreated">
      <furo-form  >

        <!-- We use the form layouter, because it does all the aligning and visualizing stuff for us -->
        <furo-form-layouter one>
          <!-- field: display_name, we focus this field when --taskCreated fires -->
          <furo-data-text-input  condensed  ƒ-bind-data="--taskDO(*.display_name)" ƒ-focus="--taskCreated"></furo-data-text-input>
          <!-- field: note, we set the flag *full* so the layouter knows, that this field has to take a full row -->
          <furo-data-textarea-input condensed  ƒ-bind-data="--taskDO(*.note)"></furo-data-textarea-input>
        </furo-form-layouter>
        </furo-form>

        <furo-horizontal-flex space slot="action">
          <!-- The button triggers the wire @-click="--createBtnClicked". This only says, that the button was clicked. The button does not have to know something -->
          <furo-button primary label="${i18n.t('create')}" rel="create" @-click="--createBtnClicked"></furo-button>
        </furo-horizontal-flex>
      </furo-card>
      <!-- The following components are not visible.  -->

      <!-- The data-object will fire object-ready as soon it is ready, we put the response on the --taskDO wire. -->
      <furo-data-object type="task.Task" @-object-ready="--taskDO" ƒ-inject-raw="--taskCreated"></furo-data-object>
      <!-- We trigger the create method on the entity agent by the wire --createBtnClicked. We use create, because we always want to create new tasks when possible -->
      <furo-entity-agent
      service="Tasks"
      ƒ-bind-request-data="--taskDO" ƒ-hts-in="--TasksHTS" ƒ-create="--createBtnClicked" @-create-success="--taskCreated(emptyObject)"></furo-entity-agent>
      <furo-deep-link service="Tasks" ƒ-trigger="--FBPready" @-hts-out="--TasksHTS"></furo-deep-link>

    `;
  }
}

window.customElements.define('task-creator-widget', TaskCreatorWidget);
