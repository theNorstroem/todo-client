import {LitElement, html, css} from 'lit-element';
import {Theme} from "@furo/framework/src/theme.js"
import {FBP} from "@furo/fbp";
import "@furo/data/src/furo-deep-link.js"
import "@furo/timing/src/furo-de-bounce.js"
import "./task-list-item.js"
/**
 * `task-list`
 *  Displays a list of tasks
 *
 * @summary list tasks
 * @customElement
 * @appliesMixin FBP
 */
class TaskList extends FBP(LitElement) {



  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    //this._FBPTraceWires()
    super._FBPReady();
  }

  refresh(e){
    this._FBPTriggerWire("--refreshRequested",e)
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return Theme.getThemeForComponent('TaskList') || css`
        :host {
            display: block;
        }

        :host([hidden]) {
            display: none;
        }
        furo-search-input{
          width: 100%;
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
      <furo-search-input label="search" @-value-changed="--srch"></furo-search-input>
      <furo-data-repeat ƒ-bind-data="--taskCollectionDO(*.entities)"
                        repeated-component="task-list-item"
                        condensed
                        add-icon="star"
                        add-text="add another x"
                        ƒ-add="--additionalDateClicked"
      >

      </furo-data-repeat>
      <furo-de-bounce ƒ-input-wire="--srch" @-out="--debouncedSrch"></furo-de-bounce>
      <furo-data-object type="task.TaskCollection" @-object-ready="--taskCollectionDO" ƒ-inject-raw="--collectionResponse"></furo-data-object>
      <furo-collection-agent  ƒ-search="--debouncedSrch" service="Tasks" ƒ-list="--refreshRequested" ƒ-hts-in="--TasksHTS" list-on-hts-in @-response="--collectionResponse"></furo-collection-agent>
      <furo-deep-link service="Tasks" ƒ-trigger="--FBPready" @-hts-out="--TasksHTS"></furo-deep-link>
    `;
  }
}

window.customElements.define('task-list', TaskList);
