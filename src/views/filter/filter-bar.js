import {LitElement, html, css} from 'lit-element';
import {Theme} from "@furo/framework/src/theme.js"
import {FBP} from "@furo/fbp";
import "./date-filter.js"
import "./text-filter.js"
import "./filter-slot.js"
import "@furo/util/src/furo-pretty-json.js"

/**
 * `filter-bar`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo-filter-bar
 * @appliesMixin FBP
 */
class FilterBar extends FBP(LitElement) {


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
    //    this._FBPTraceWires()
    this.initDefaults()

    /**
     * Register hook on wire --clearAllClicked to
     * reset all filters to the initial val
     */
    this._FBPAddWireHook("--clearAllClicked", () => {
      this.initDefaults();
    });
  }


  initDefaults() {
    let initialFilterData = {
      flat: {
        display_name: {
          "fld": "display_name",
          "is": "*",
          "val": ""
        },
        due_date: {
          "fld": "due_date",
          "is": "<=",
          "val": "2020-10-08",
        },
        done: {
          "fld": "done",
          "is": "eq",
          "val": "false",
        },
        responsible: {
          "fld": "responsible_person",
          "is": "eq",
          "val": "",
        }
      }
    };

    this._FBPTriggerWire("--filter", initialFilterData)
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return Theme.getThemeForComponent('FilterBar') || css`
      :host {
        display: block;
        padding: 12px;
      }

      :host([hidden]) {
        display: none;
      }

      .title {
        margin: 0px;
        font-size: 14px;
        letter-spacing: 0.1px;
        color: rgba(var(--on-surface-rgb), var(--medium-emphasis-surface));
        line-height: 20px;
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

      <furo-form-layouter two>
        <div>
          <div class="title">due date</div>
          <date-filter condensed label="date" ƒ-bind-filter-condition="--filteDO(*.flat.due_date)"
                       conditions=">,<,>=,<="></date-filter>
        </div>
        <div>
          <div class="title">task</div>
          <text-filter condensed label="text" ƒ-bind-filter-condition="--filteDO(*.flat.display_name)"
                       conditions="sw,*"></text-filter>
        </div>
        <div>
          <div class="title">done</div>
          <filter-slot hide-clear condensed label="" ƒ-bind-filter-condition="--filteDO(*.flat.done)"
                       conditions="eq, not">
            <furo-data-checkbox-input label="done" condensed></furo-data-checkbox-input>
          </filter-slot>
        </div>

        <div>
          <div class="title">responsible person</div>
          <filter-slot hide-clear hide-condition default-condition="eq" label="slotted"
                       ƒ-bind-filter-condition="--filteDO(*.flat.responsible)" conditions="eq, not">
            <furo-data-collection-dropdown
              condensed
              label="select"
              ƒ-bind-data="--filteDO(*.flat.responsible.val)"
              ƒ-inject-entities="--PersonsCollection(*.entities)"
            ></furo-data-collection-dropdown>
          </filter-slot>

        </div>

      </furo-form-layouter>
      <furo-button-bar>
        <furo-button outline @-click="--srch">Search</furo-button>
        <furo-button outline @-click="--clearAllClicked">Clear all filters</furo-button>
      </furo-button-bar>


      <furo-data-object type="furo.filter.Filter" @-data-changed="--v" @-object-ready="--filteDO"
                        ƒ-inject-raw="--filter"></furo-data-object>


      <furo-collection-agent
        ƒ-set-filter="--v(*._base64)"
        ƒ-clear-search="--debouncedEscape"
        service="Tasks"
        ƒ-list="--srch"
        ƒ-hts-in="--TasksHTS"
        @-response="^^search-result"
      ></furo-collection-agent>

      <furo-deep-link
        service="Tasks"
        ƒ-trigger="--FBPready"
        @-hts-out="--TasksHTS"
      ></furo-deep-link>

      <furo-deep-link
        service="Persons"
        ƒ-trigger="--FBPready"
        @-hts-out="--PersonsHTS"
      ></furo-deep-link>

      <furo-collection-agent
        list-on-hts-in
        service="Persons"
        @-response="--PersonsCollection"
        ƒ-hts-in="--PersonsHTS"
      ></furo-collection-agent>

    `;
  }
}

window.customElements.define('filter-bar', FilterBar);
