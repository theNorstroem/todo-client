import { LitElement, html, css } from 'lit-element';
import { Theme } from '@furo/framework/src/theme.js';
import { FBP } from '@furo/fbp';
import '@furo/data/src/furo-deep-link.js';
import '@furo/timing/src/furo-de-bounce.js';
import '@furo/util/src/furo-keydown.js';
import '@furo/util/src/furo-navigation-pad.js';
import './task-list-item.js';

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
    // this._FBPTraceWires()
    super._FBPReady();
    this.empty = '';
  }

  /**
   * Reloads the list
   *
   */
  refresh(e) {
    this._FBPTriggerWire('--refreshRequested', e);
  }

  /**
   * select item from list by setting the task id (tsk)
   * @param tsk
   */
  selectTaskId(tsk) {
    this._FBPTriggerWire('--selectedTSK', tsk);
  }

  /**
   * select prev item from list
   * @param tsk
   */
  selectPrev(tsk) {
    this._FBPTriggerWire('--selectPrevRequested', tsk);
  }


  /**
   * select next item from list
   * @param tsk
   */
  selectNext(tsk) {
    this._FBPTriggerWire('--selectNextRequested', tsk);
  }


  /**
   * @private
   * @return {Object}
   */
  static get properties() {
    return {
      /**
       * Number of items to display at once
       */
      items: { type: Number },
    };
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return (
      Theme.getThemeForComponent('TaskList') ||
      css`
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }

        furo-search-input {
          width: 100%;
        }

        /** general list item **/
        .list > * {
          min-height: 40px;
          line-height: 40px;
          margin-bottom: var(--spacing-xxs, 4px);
          letter-spacing: 0.01785714em;
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0 var(--spacing-xs);
          transition: all 0.2s;
          border-radius: 4px;
          cursor: pointer;
        }

        .list > *:hover {
          background-color: rgba(var(--primary-rgb), var(--state-hover));
          color: var(--primary);
        }

        .list > *[selected] {
          background-color: rgba(var(--primary-rgb), var(--state-selected));
          color: var(--primary);
        }

        .list > *[selected]:focus {
          background-color: rgba(var(--primary-rgb), var(--state-selected-focus));
          color: var(--primary);
        }

        .list > *[selected]:hover {
          background-color: rgba(var(--primary-rgb), var(--state-selected-hover));
          color: var(--primary);
        }

        .list > *:focus-within {
          background-color: rgba(var(--primary-rgb), var(--state-focus));
          color: var(--primary);
          outline: none;
        }

        .list > *:active,
        .list > *[selected]:active {
          background-color: rgba(var(--primary-rgb), var(--state-active));
        }

        .list > *[disabled] {
          color: rgba(255, 255, 255, var(--state-disabled));
          background-color: rgba(var(--primary-rgb), var(--state-disabled));
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
      <furo-vertical-flex>
        <furo-navigation-pad
          @-arrow-down-pressed="--arrowDown"
          @-arrow-up-pressed="--arrowUp"
          @-enter-pressed="--enterPressed"
          @-escape-pressed="--escapePressed(empty)"
        ></furo-navigation-pad>

        <furo-search-input
          label="search"
          @-value-changed="--searchStringEntered"
          trailing-icon="filter-list"
        >
        </furo-search-input>

        <div class="list" flex scroll @-list-item-clicked="--itemClicked">
          <flow-repeat
            is="flow-repeat"
            ƒ-inject-items="--collectionResponse(*.entities)"
            ƒ-select="--itemSelected, --itemClicked"
            ƒ-deselect="--addClicked"
            ƒ-select-previous-index="--arrowUp,--selectPrevRequested"
            ƒ-select-next-index="--arrowDown,--selectNextRequested"
            identity-path="data.id"
            ƒ-select-identity="--selectedTSK"
            ƒ-trigger-selected="--enterPressed, --itemClicked,--selectPrevRequested"
          >
            <template>
              <task-list-item
                ƒ-inject="--item"
                ƒ-trigger="--trigger"
                ƒ-select="--itemSelected"
                ƒ-deselect="--itemDeSelected"
                ƒ-.index="--index"
              ></task-list-item>
            </template>
          </flow-repeat>
        </div>
      </furo-vertical-flex>
      <furo-de-bounce ƒ-input-wire="--searchStringEntered" @-out="--debouncedSrch"></furo-de-bounce>
      <furo-de-bounce
        wait="750"
        ƒ-input-wire="--escapePressed"
        @-out="--debouncedEscape"
      ></furo-de-bounce>

      <furo-collection-agent
        page-size="${this.items}"
        ƒ-search="--debouncedSrch"
        ƒ-clear-search="--debouncedEscape"
        service="Tasks"
        ƒ-list="--refreshRequested"
        ƒ-hts-in="--TasksHTS"
        list-on-hts-in
        @-response="--collectionResponse"
      ></furo-collection-agent>
      <furo-deep-link
        service="Tasks"
        ƒ-trigger="--FBPready"
        @-hts-out="--TasksHTS"
      ></furo-deep-link>
    `;
  }
}

window.customElements.define('task-list', TaskList);
