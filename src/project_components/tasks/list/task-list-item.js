import { LitElement, html, css } from 'lit-element';
import { Theme } from '@furo/framework/src/theme.js';
import { FBP } from '@furo/fbp';

/**
 * `task-list-item`
 *  A single task item to use in a list
 *
 * @summary list item for a task
 * @customElement
 * @appliesMixin FBP
 */
class TaskListItem extends FBP(LitElement) {
  constructor() {
    super();

    this.data = {}; // we set data as empty object, because we use it in the template. Otherwise we will get "undefined" errors.
  }

  /**
   * @private
   * @return {Object}
   */
  static get properties() {
    return {
      /**
       * mark the element as selected
       */
      selected: { type: Boolean, reflect: true },
    };
  }

  /**
   * set as selected
   * This sets the attribute `selected` on this item
   */
  select() {
    this.selected = true;
    this.scrollIntoViewIfNeeded();
  }

  /**
   * unset as selected
   *
   * This removes the attribute `selected` from this item
   */
  deselect() {
    this.selected = false;
  }

  trigger() {
    /**
     * @event task-list-item
     * Fired when A item is clicked/triggered
     * detail payload: the raw entity of the item
     */
    const customEvent = new Event('task-list-item', { composed: true, bubbles: true });
    customEvent.detail = this.entity;
    this.dispatchEvent(customEvent);
  }

  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();
    // this._FBPTraceWires()
  }

  inject(rawentity) {
    this.data = rawentity.data; // we set data to data, because it is easyier to use in the template
    this.entity = rawentity; // we store the entity, because we will send it on the trigger action as payload.
    this.requestUpdate();
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return (
      Theme.getThemeForComponent('TaskListItem') ||
      css`
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }

        .task {
          font-size: 18px;
          line-height: 36px;
        }

        p {
          margin: 0;
          font-weight: normal;
          line-height: 1.5em;
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
      <div @-click="^^list-item-clicked(index)">
        <div class="task">${this.data.display_name}</div>
        <p>${this.data.note.value}</p>
      </div>
    `;
  }
}

window.customElements.define('task-list-item', TaskListItem);
