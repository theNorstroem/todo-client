import { LitElement, html, css } from 'lit-element';
import { Theme } from '@furo/framework/src/theme.js';
import { FBP } from '@furo/fbp';
import '@furo/form';
import '@furo/input';
import '@furo/form/src/furo-form.js';
import '@furo/app/src/furo-tooltip.js';
import '@furo/data-input/src/furo-data-sign-pad.js';

/**
 * `sample-form`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo-sample-form
 * @appliesMixin FBP
 */
class SampleForm extends FBP(LitElement) {
  /**
   * @private
   * @return {Object}
   */
  static get properties() {
    return {
      /**
       * Description
       */
      myBool: { type: Boolean },
    };
  }

  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();
    // this._FBPTraceWires()
    /**
     * Register hook on wire --tab to
     *
     */
    this._FBPAddWireHook('--tab', e => {
      this.triggerTab(e);
    });
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return (
      Theme.getThemeForComponent(this.name) ||
      css`
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }
      `
    );
  }

  /**
   * @private
   * @returns {TemplateResult}
   * @private
   */
  render() {
    // language=HTML
    return html`
      <furo-form header-text="Header Text of the form" secondary-text="This is the secondary text">
        <p>Some text can be helpful sometimes</p>
        <h2>Give a h2 to label a group</h2>
        <secondary
          >A form-layouter can have custom breakpoints. This one has a breakpoint of 608. Resize
          your screen to see the effect</secondary
        >

        <!-- Inside a furo-form-layouter the elements are always full-width -->
        <!-- Full width, one column layout-->
        <furo-form-layouter two breakpoint-big="608">
          <furo-date-input
            condensed
            hint="Only possible in current year"
            max="2019-12-31"
            min="2019-01-01"
            label="valid from"
            ><furo-tooltip label="Up to you"></furo-tooltip
          ></furo-date-input>
          <furo-select-input
            condensed
            label="Mutation reason"
            value="New"
            list="New, mutation, remake"
          ></furo-select-input>
        </furo-form-layouter>
        <h2>Form layout with 4 elements in a row</h2>
        <secondary>A form-layouter can have one, two or four columns. </secondary>
        <!-- Full width, four column layout-->
        <furo-form-layouter four>
          <furo-search-input
            condensed
            double
            label="Search"
            hint="This is a search input with double size"
          ></furo-search-input>
          <furo-text-input condensed label="Special hint"></furo-text-input>
          <furo-text-input condensed label="Third field"></furo-text-input>
          <furo-text-input condensed label="Label"></furo-text-input>
          <furo-number-input condensed label="Number"></furo-number-input>
        </furo-form-layouter>

        <h2>Textarea</h2>
        <p>Textareas works best with other textarea elements or when they are used alone.</p>
        <furo-form-layouter two>
          <furo-textarea-input label="pro" float rows="5"></furo-textarea-input>
          <furo-textarea-input label="contra" float rows="5"></furo-textarea-input>
          <furo-data-sign-pad @-sign-updated="--signed"></furo-data-sign-pad>
          <img ƒ-.src="--signed" alt="" />
        </furo-form-layouter>
      </furo-form>
      <furo-keydown key="n" @-key="--tab"></furo-keydown>
    `;
  }
}

window.customElements.define('sample-form', SampleForm);
