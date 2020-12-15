import {LitElement, html, css} from 'lit-element';
import {Theme} from "@furo/framework/src/theme.js"
import {FBP} from "@furo/fbp";
import "./filter-bar.js"
/**
 * `view-filter`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo-view-filter
 * @appliesMixin FBP
 */
class ViewFilter extends FBP(LitElement) {


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

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return Theme.getThemeForComponent('ViewFilter') || css`
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
      <furo-vertical-flex>
        <furo-app-bar-top
          navigation-icon="arrow-back"
          @-navigation-clicked="--navBackClicked"
          drawer="main-drawer"
        >
          <div>Extended search</div>
          <furo-empty-spacer></furo-empty-spacer>
        </furo-app-bar-top>

        <div flex>

       <filter-bar></filter-bar>
          <div>here


          </div>

        </div>
      </furo-vertical-flex>


      <furo-app-flow ƒ-trigger="--navBackClicked" event="exit-filter"></furo-app-flow>
      <!-- Listen to changes in the URL if we are in /task -->
      <furo-location
        url-space-regex="${window.APPROOT}/task"
        @-location-changed="--locationChanged"
      ></furo-location>
    `;
  }
}

window.customElements.define('view-filter', ViewFilter);
