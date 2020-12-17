import { LitElement, html, css } from 'lit-element';
import { Theme } from '@furo/framework/src/theme.js';
import { FBP } from '@furo/fbp';
import './date-filter.js';
import './text-filter.js';
import './filter-slot.js';
import '@furo/util/src/furo-pretty-json.js';

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
      myBool: { type: Boolean },
    };
  }

  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();
    //    this._FBPTraceWires()
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return (
      Theme.getThemeForComponent('FilterBar') ||
      css`
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
      <furo-form-layouter four breakpoint-big="1000" breakpoint-small="600">
        <date-filter
          hide-clear
          condensed
          ƒ-bind-filter-condition="--filteDO(*.due_date)"
        ></date-filter>

        <text-filter condensed ƒ-bind-filter-condition="--filteDO(*.display_name)"></text-filter>

        <text-filter condensed ƒ-bind-filter-condition="--filteDO(*.note)"></text-filter>

        <filter-slot
          ƒ-bind-filter-condition="--filteDO(*.done)"
          comparators="eq, not"
        >
          <furo-data-checkbox-input label="done" condensed></furo-data-checkbox-input>
        </filter-slot>

        <filter-slot ƒ-bind-filter-condition="--filteDO(*.person)">
          <furo-data-collection-dropdown
            condensed
            ƒ-bind-data="--filteDO(*.person.val)"
            ƒ-inject-entities="--PersonsCollection(*.entities)"
          ></furo-data-collection-dropdown>
        </filter-slot>
      </furo-form-layouter>

      <furo-button outline @-click="--srch">Search</furo-button>
      <furo-button outline @-click="--clearAllClicked">Clear all filters</furo-button>

      <furo-data-object
        type="task.Filter"
        @-data-changed="--v"
        @-object-ready="--filteDO"
        ƒ-init="--clearAllClicked"
      ></furo-data-object>

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
