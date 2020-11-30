import { LitElement, html, css } from 'lit-element';
import { Theme } from '@furo/framework/src/theme.js';
import { FBP } from '@furo/fbp';
import '@furo/form/src/furo-button-bar.js';
import '@furo/data/src/furo-catalog.js';
import '@furo/data-input/src/furo-catalog.js';
import '@furo/util/src/furo-keydown.js';

/**
 * `view-auth`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo-view-auth
 * @appliesMixin FBP
 */
class ViewAuth extends FBP(LitElement) {
  logout() {
    this._FBPTriggerWire('--logoutRequested');
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
      Theme.getThemeForComponent(this.name) ||
      css`
        :host {
          display: block;
          height: 100vh;
        }

        :host([hidden]) {
          display: none;
        }
        furo-card {
          width: 360px;
        }

        furo-form-layouter > * {
          margin: 20px 0;
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
        <furo-empty-spacer></furo-empty-spacer>
        <furo-horizontal-flex>
          <furo-empty-spacer></furo-empty-spacer>
          <furo-card header-text="Login" secondary-text="Enter the username and password">
            <furo-form-layouter one>
              <furo-data-text-input
                ƒ-bind-data="--auth(*.username)"
                leading-icon="account-box"
              ></furo-data-text-input>
              <furo-data-password-input
                leading-icon="lock-outline"
                hint="Look under your keyboard or on postit below monitor"
                ƒ-bind-data="--auth(*.password)"
                ƒ-toggle-visibility="--togglePasswordClicked"
                trailing-icon="visibility"
                @-trailing-icon-clicked="--togglePasswordClicked"
              ></furo-data-password-input>
            </furo-form-layouter>
            <furo-horizontal-flex space="" slot="action">
              <furo-button primary unelevated @-click="--login">Login</furo-button>
              <furo-empty-spacer></furo-empty-spacer>
            </furo-horizontal-flex>
          </furo-card>
          <furo-empty-spacer></furo-empty-spacer>
        </furo-horizontal-flex>
        <furo-empty-spacer></furo-empty-spacer>
      </furo-vertical-flex>

      <furo-keydown key="Enter" @-key="--login"></furo-keydown>
      <!-- non visual -->
      <furo-data-object type="auth.Credentials" @-object-ready="--auth"></furo-data-object>
      <furo-custom-method
        service="AuthSession"
        method="create"
        @-response="--authResponse"
        ƒ-bind-request-data="--auth"
        ƒ-trigger="--login"
        ƒ-hts-in="--hts"
      ></furo-custom-method>
      <furo-deep-link
        service="AuthSession"
        ƒ-qp-in="--pageActivated"
        @-hts-out="--hts"
      ></furo-deep-link>
      <furo-app-flow event="login-successfull" ƒ-trigger="--authResponse"></furo-app-flow>

      <furo-deep-link
        ƒ-trigger="--logoutRequested"
        service="AuthSession"
        @-hts-out="--authHTS"
      ></furo-deep-link>
      <furo-custom-method
        service="AuthSession"
        method="delete"
        ƒ-hts-in="--authHTS"
        @-hts-updated="--loopBack"
        ƒ-trigger="--loopBack"
        @-response="^^unauthorized"
      ></furo-custom-method>
    `;
  }
}

window.customElements.define('view-auth', ViewAuth);
