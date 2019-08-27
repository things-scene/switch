import { LitElement, html, css } from "lit-element";

class SimpleSwitchElement extends LitElement {
  static get properties() {
    return {
      round: Boolean,
      value: Boolean
    };
  }

  static get styles() {
    return css`
      /* The switch - the box around the slider */
      label {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
      }

      /* Hide default HTML checkbox */
      label input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      /* The slider */
      span {
        position: absolute;
        cursor: pointer;
        width: var(--fullwidth);
        height: var(--fullheight);
        top: calc(0 - var(--thumb-size));
        left: 0;
        background-color: var(--off-color, #ccc);
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }

      span:before {
        position: absolute;
        content: "";
        height: calc(var(--thumb-size) - 8px);
        width: calc(var(--thumb-size) - 8px);
        left: 4px;
        top: 4px;
        background-color: var(--thumb-color, white);
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }

      input:checked + span {
        background-color: var(--on-color, #2196f3);
      }

      input:focus + span {
        box-shadow: 0 0 1px #2196f3;
      }

      input:checked + span:before {
        -webkit-transform: translateX(
            calc(var(--fullwidth) - var(--thumb-size))
          )
          translateY(calc(var(--fullheight) - var(--thumb-size)));
        -ms-transform: translateX(calc(var(--fullwidth) - var(--thumb-size)))
          translateY(calc(var(--fullheight) - var(--thumb-size)));
        transform: translateX(calc(var(--fullwidth) - var(--thumb-size)))
          translateY(calc(var(--fullheight) - var(--thumb-size)));
      }

      /* Rounded sliders */
      span[round] {
        border-radius: calc(var(--thumb-size) / 2);
      }

      span[round]:before {
        border-radius: calc((var(--thumb-size) - 8px) / 2);
      }
    `;
  }

  render() {
    return html`
      <label>
        <input type="checkbox" .checked=${this.value} />
        <span ?round=${this.round}></span>
      </label>
    `;
  }

  firstUpdated() {
    this.shadowRoot.addEventListener("change", e => {
      this.value = e.target.checked;
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: this.value
        })
      );
    });
  }
}

customElements.define("simple-switch", SimpleSwitchElement);
