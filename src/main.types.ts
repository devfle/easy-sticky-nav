type NavigationElement = {
  icon: string;
  url: string;
};

type HassConfig = {
  color: string;
  background: string;
  bottomSpace: string;
  minWidth: string;
  hide_header?: boolean;
  nav_items: NavigationElement[];
};

type TapConfig = {
  action: "navigate";
  navigation_path: string;
};

type TapEvent = {
  config: {
    tap_action: TapConfig;
  };
  action: "tap";
};

export type { HassConfig, NavigationElement, TapConfig, TapEvent };
