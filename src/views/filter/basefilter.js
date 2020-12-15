import {LitElement, html, css} from 'lit-element';
import {Theme} from "@furo/framework/src/theme.js"
import {FBP} from "@furo/fbp";

/**
 * Base filter is the base element to build special filter condition fields
 * Your element is then bindable with type filter.Condition
 *
 *  after binding with .. a wire --filternode is triggered
 *
 *  ### internal hooks
 *  #### --clear
 *  Use this to clear the filter val and is.
 *
 * @summary base component to make a bindable filter
 * @appliesMixin FBP
 */
export class BaseFilter extends FBP(LitElement) {


  /**
   * @private
   * @return {Object}
   */
  static get properties() {
    return {
      /**
       * Semicolon separated list of acceptable conditions.
       *
       * like: gt, lt
       */
      conditions: {type: String},
      /**
       * The label for the input
       */
      label: {type: String}
    };
  }

  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();
    // this._FBPTraceWires()
    /**
     * Register hook on wire --condition to
     * listen on changes of the condition dropdown
     */
    this._FBPAddWireHook("--clear",(e)=>{
          this.field.val._value = "";
          this.field.is._value = "";
    });
  }

  bindFilterCondition(fc){
    this.field = fc;
    this.field.val._meta.label = this.label;
    this._FBPTriggerWire("--filternode",fc)

  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return Theme.getThemeForComponent('BaseFilter') || css`
        :host {
            display: block;
        }

        :host([hidden]) {
            display: none;
        }
        furo-data-collection-dropdown{
          width: 64px;
          margin-right: 8px;
        }
        furo-icon-button{
          --furo-icon-width:16px;
          --furo-icon-height:16px;
          outline: none;
        }
    `
  }

  /**
   * Write your own render method please
   * @return {*}
   */
  render() {
    // language=HTML
    return html`


    `;
  }
}
