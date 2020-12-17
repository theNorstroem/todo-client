import { html } from 'lit-element';
import '@furo/data-input/src/furo-data-date-input.js';
import '@furo/data-input/src/furo-data-collection-dropdown.js';
import { BaseFilter } from './basefilter.js';

/**
 * `date-filter`
 * Date element bindable with type filter.Comparator
 *
 * @summary date filter
 * @customElement
 * @demo demo-date-filter
 * @appliesMixin FBP
 */
class DateFilter extends BaseFilter {
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
        <furo-data-date-input
          id="val"
          ?condensed="${this.condensed}"
          trailing-icon="clear"
          @-trailing-icon-clicked="--clear"
          flex
          ƒ-bind-data="--filternode(*.val)"
        ></furo-data-date-input>
      </furo-horizontal-flex>
      <furo-keydown key="Escape" @-key="--clear"></furo-keydown>
    `;
  }
}

window.customElements.define('date-filter', DateFilter);
