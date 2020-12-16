import {LitElement, html, css} from 'lit-element';
import {Theme} from "@furo/framework/src/theme.js"
import {FBP} from "@furo/fbp";
import "@furo/data-input/src/furo-data-text-input.js"
import {BaseFilter} from "./basefilter";
/**
 * `text-filter`
 * Text element bindable with type filter.Condition
 *
 * @summary text filter
 * @customElement
 * @demo demo-text-filter
 * @appliesMixin FBP
 */
class TextFilter extends BaseFilter {

  render() {
    // language=HTML
    return html`
      <furo-horizontal-flex>
        <furo-data-collection-dropdown label="" ?condensed="${this.condensed}" ƒ-focus="--clear" ƒ-bind-data="--filternode(*.is)" list="${this.conditions}"></furo-data-collection-dropdown>
        <furo-data-text-input label="${this.label}" ?condensed="${this.condensed}" flex ƒ-bind-data="--filternode(*.val)"></furo-data-text-input>
        <furo-icon-button tabindex="-1" icon="clear" @-click="--clear"></furo-icon-button>
      </furo-horizontal-flex>
      <furo-keydown key="Escape" @-key="--clear"></furo-keydown>

    `;
  }
}

window.customElements.define('text-filter', TextFilter);
