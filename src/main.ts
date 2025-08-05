import type {
  HassConfig,
  NavigationElement,
  TapConfig,
  TapEvent,
} from "./main.types";

class EasyStickyNav extends HTMLElement {
  config!: HassConfig;
  content!: HTMLElement | null;
  isEditMode: boolean = false;

  getHuiRootElementFromDom() {
    const huiElm = document
      .querySelector("home-assistant")
      ?.shadowRoot?.querySelector("home-assistant-main")
      ?.shadowRoot?.querySelector("ha-drawer")
      ?.querySelector("partial-panel-resolver")
      ?.querySelector("ha-panel-lovelace")
      ?.shadowRoot?.querySelector("hui-root")?.shadowRoot;

    if (!huiElm) return null;

    return huiElm;
  }

  set editMode(state: boolean) {
    this.isEditMode = state;
  }

  set hass(hass: any) {
    if (!this.content) {
      this.innerHTML = `
        <style>
            .easy-sticky-nav {
                height: 48px;
                min-width: ${this.config.minWidth};
                max-width: 90%;
                background: ${this.config.background};
                position: fixed;
                left: 50%;
                transform: translateX(-50%);
                bottom: ${this.config.bottomSpace};
                color: ${this.config.color};
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                
                .easy-sticky-nav__content {
                    flex: 1 0 auto;
                }
                
                
                .easy-sticky-nav__inner {
                    display: flex;
                    list-style: none;
                    color: #FFF;
                    gap: 24px;
                    align-items: center;
                    justify-content: space-evenly;
                    width: 100%;
                    padding: 0;
                    margin: 0;
                    
                    > li {
                        transition: color .1s linear;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column-reverse;
                        
                        font-size: 14px;
                    }
                    
                    > li:hover {
                        cursor: pointer;
                        color: var(--primary-color);
                    }
                }
            }
        </style>
        
        <ha-card class="easy-sticky-nav">
          <div class="easy-sticky-nav__content">Loading...</div>
        </ha-card>
      `;

      this.content = this.querySelector<HTMLElement>("div");
    }

    if (this.config.hide_header) {
      const huiRootElm = this.getHuiRootElementFromDom();
      const headerElm = huiRootElm?.querySelector<HTMLElement>(".header");
      const viewContainer =
        huiRootElm?.querySelector<HTMLElement>("hui-view-container");

      if (!headerElm || !viewContainer) {
        return;
      }

      if (!this.isEditMode) {
        // remove the header element
        headerElm.style.display = "none";

        // remove the padding from the header element
        viewContainer.style.padding = "0px";
      } else {
        headerElm.style.display = "block";
        viewContainer.style.padding = "82px";
      }
    }

    const { nav_items: navItems } = this.config;

    const navElements = navItems.map((item: NavigationElement) => {
      const listElm = document.createElement("li");
      const iconElm = document.createElement("ha-icon");

      iconElm.setAttribute("icon", item.icon);

      listElm.addEventListener("click", () => {
        const tapEvent = this.registerEvent({
          action: "navigate",
          navigation_path: item.url,
        });

        this.dispatchEvent(tapEvent);
      });

      listElm.appendChild(iconElm);

      return listElm;
    });

    if (this.content) {
      this.content.innerHTML = `
          <ul class="easy-sticky-nav__inner"></ul>
      `;

      navElements.forEach((elm) =>
        this.content?.firstElementChild?.appendChild(elm),
      );
    }
  }

  setConfig(config: HassConfig) {
    const tempConfig: Partial<HassConfig> = {};

    if (!config.nav_items?.length) {
      throw new Error("You need to define nav_items. See: X");
    }

    if (!config.bottomSpace) {
      tempConfig.bottomSpace = "32px";
    }

    if (!config.color) {
      tempConfig.color = "var(--primary-text-color, #FFF)";
    }

    if (!config.background) {
      tempConfig.background = "var(--primary-background-color, #000)";
    }

    if (!config.minWidth) {
      tempConfig.minWidth = "350px";
    }

    this.config = { ...config, ...tempConfig };
  }

  registerEvent(config: TapConfig) {
    const event = new Event("hass-action", {
      bubbles: true,
      composed: true,
    }) as Event & { detail: TapEvent };

    event.detail = {
      config: {
        tap_action: {
          ...config,
        },
      },
      action: "tap",
    };

    return event;
  }

  getCardSize() {
    return 0;
  }

  getGridOptions() {
    return {
      rows: 0,
      columns: 0,
      min_rows: 0,
      max_rows: 0,
    };
  }
}

customElements.define("easy-sticky-nav", EasyStickyNav);
