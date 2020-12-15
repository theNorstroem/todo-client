import { LitElement, html, css } from 'lit-element';
import { Theme } from '@furo/framework/src/theme.js';
import { FBP } from '@furo/fbp';
import '@furo/layout/src/furo-resizer.js';
import '@furo/notification/src/furo-banner.js';
import '@furo/notification/src/furo-banner-display.js';
import './task-navigation.js';
import './task-detail.js';

/**
 * `view-task`
 * This view is here to edit an existing task.
 *
 *
 *
 * @summary edit a task
 * @customElement
 * @demo demo-view-task
 * @appliesMixin FBP
 */
class ViewTask extends FBP(LitElement) {
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
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return (
      Theme.getThemeForComponent('ViewTask') ||
      css`
        :host {
          display: block;
          height: 100vh;
        }

        :host([hidden]) {
          display: none;
        }
        /**
         * we give a border color for the resizer.
         */
        furo-resizer {
          border-right: 1px solid var(--separator, #fafafa);
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
        <furo-app-bar-top
          navigation-icon="arrow-back"
          @-navigation-clicked="--navBackClicked"
          drawer="main-drawer"
        >
          <div>Tasks</div>
          <furo-empty-spacer></furo-empty-spacer>
          <furo-icon-button icon="filter-list" @-click="--filter-btn-clicked"></furo-icon-button>
        </furo-app-bar-top>

        <furo-horizontal-flex flex>
          <!-- we set the width by style because the resizer requires it that way. We set the remember value to keep the setted size from the user -->
          <furo-resizer
            righthandle=""
            style="width: 260px;"
            minwidth="260"
            maxwidth="480"
            remember="view-task-navigation"
          >
            <!-- we set the selected task (tsk) from the query param  -->
            <task-navigation
              ƒ-refresh="--pageEntered,--taskDeleted,--taskUpdated"
              ƒ-select-prev="--taskDeleted"
              ƒ-select-task-id="--locationChanged(*.query.tsk)"
            ></task-navigation>
          </furo-resizer>
          <!-- we pass in the query params from the location -->
          <task-detail
            flex
            ƒ-set-qp="--locationChanged(*.query)"
            @-delete-success="--taskDeleted"
            @-task-updated="--taskUpdated"
          ></task-detail>
        </furo-horizontal-flex>
      </furo-vertical-flex>

      <furo-app-flow ƒ-trigger="--navBackClicked" event="exit-tasks"></furo-app-flow>
      <furo-app-flow ƒ-trigger="--filter-btn-clicked" event="view-filter-requested"></furo-app-flow>
      <!-- Listen to changes in the URL if we are in /task -->
      <furo-location
        url-space-regex="${window.APPROOT}/task"
        @-location-changed="--locationChanged"
      ></furo-location>
    `;
  }
}

window.customElements.define('view-task', ViewTask);
