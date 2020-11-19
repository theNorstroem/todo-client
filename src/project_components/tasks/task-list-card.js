import {LitElement, html, css} from 'lit-element';
import {Theme} from "@furo/framework/src/theme.js"
import {FBP} from "@furo/fbp";
import "@furo/navigation/src/furo-catalog.js"
import "@furo/data-ui/src/furo-catalog.js"

/**
 * `task-list-card`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo-task-list-card
 * @appliesMixin FBP
 */
class TaskListCard extends FBP(LitElement) {


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


  refreshList(){
    this._FBPTriggerWire("--refreshRequested")
  }


  // Fokus
  focus(d) {
    setTimeout(()=>{
      this._FBPTriggerWire('--focused', d)
    },10)

  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return Theme.getThemeForComponent('TaskListCard') || css`
        :host {
            display: block;
          padding: 12px;
        }

        :host([hidden]) {
            display: none;
        }
        furo-data-table{
          height: inherit;
          overflow: auto;
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
      <furo-card header-text="The list" secondary-text="Some of our delicious   tasks">
        <furo-navigation-pad @-navigated="--navpad"></furo-navigation-pad>
          <furo-data-table
            tabindex="1"
            single-selection
            type="task.Task"
            fields="done, display_name, note"
            sortable-fields="display_name"
            ƒ-bind-data="--taskCollectionDO"
            ƒ-trigger-navigation="--navpad"
            @-tablerow-selected="--rowSelected"
          >
          </furo-data-table>
        <furo-button-bar>
          <furo-empty-spacer></furo-empty-spacer>
          <furo-button primary label="place your component here. E.g. pagination"></furo-button>
        </furo-button-bar>
      </furo-card>

      <furo-data-object type="task.TaskCollection" @-object-ready="--taskCollectionDO" ƒ-inject-raw="--collectionResponse"></furo-data-object>
      <furo-collection-agent  service="Tasks" ƒ-list="--refreshRequested" ƒ-hts-in="--TasksHTS" list-on-hts-in @-response="--collectionResponse"></furo-collection-agent>
      <furo-deep-link service="Tasks" ƒ-trigger="--FBPready" @-hts-out="--TasksHTS"></furo-deep-link>
    `;
  }
}

window.customElements.define('task-list-card', TaskListCard);
