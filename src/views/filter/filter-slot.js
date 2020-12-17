import { html } from 'lit-element';
import { BaseFilter } from './basefilter.js';

/**
 * `filter-slot`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo-filter-slot
 * @appliesMixin FBP
 */
class FilterSlot extends BaseFilter {
  constructor() {
    super();
    /**
     * Register hook on wire --slotted-value-changed to
     * update the val when the value in the slot changes
     */
    this._FBPAddWireHook('--slotted-value-changed', e => {
      if (this.field) {
        this.field.val._value = e.toString();
      }
    });
  }

  /**
   * @private
   * @returns {TemplateResult}
   * @private
   */
  render() {
    // language=HTML
    return html`
      <furo-horizontal-flex>
        <furo-data-collection-dropdown
          label=""
          ?condensed="${this.condensed}"
          ƒ-focus="--clear"
          ƒ-bind-data="--filternode(*.is)"
          list="${this.comparators}"
        ></furo-data-collection-dropdown>
        <div flex @-value-changed="--slotted-value-changed" @-clear="--clear">
          <slot></slot>
        </div>
      </furo-horizontal-flex>
      <furo-keydown key="Escape" @-key="--clear"></furo-keydown>
    `;
  }
}

window.customElements.define('filter-slot', FilterSlot);
