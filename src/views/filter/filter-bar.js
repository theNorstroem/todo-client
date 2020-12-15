import {LitElement, html, css} from 'lit-element';
import {Theme} from "@furo/framework/src/theme.js"
import {FBP} from "@furo/fbp";
import "./date-filter.js"
import "./text-filter.js"
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
       this._FBPTraceWires()

    this._FBPTriggerWire("--filter", {
      must: {
        display_name: {
          "fld": "display_name",
          "is": "*",
          "val": "something"
        },
        due_date: {
          "fld": "due_date",
          "is": "<=",
          "val": "2020-10-08",
        },
        done: {
          "fld": "done",
          "is": "",
          "val": "false",
        }
      }
    })
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
      <furo-form header-text="filter">
        <furo-form-layouter four>
          <date-filter label="due" ƒ-bind-filter-condition="--filteDO(*.must.due_date)" conditions=">,<,>=,<="></date-filter>
          <text-filter label="display" ƒ-bind-filter-condition="--filteDO(*.must.display_name)" conditions="sw,*"></text-filter>
          <furo-data-checkbox-input label="jo" condensed  ƒ-bind-data="--filteDO(*.must.done.val)"></furo-data-checkbox-input>
          <furo-data-checkbox-input  condensed ƒ-bind-data="--filteDO(*.must.done.val)"></furo-data-checkbox-input>



        </furo-form-layouter>
      </furo-form>
      <furo-data-object type="filter.Filter" @-data-changed="--v" @-object-ready="--filteDO" ƒ-inject-raw="--filter"></furo-data-object>
      <furo-pretty-json style="width:500px;" ƒ-inject-data="--v(*._value)"></furo-pretty-json>

    `;
  }
}

window.customElements.define('filter-bar', FilterBar);
