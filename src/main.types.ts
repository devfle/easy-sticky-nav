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

export type { HassConfig, NavigationElement };
