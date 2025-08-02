# Easy Sticky Nav
An easy way to add a modern sticky bottom navigation to your Home-Assistant installation.

## Options

| Property      | Type                  | Required | Description                                                        |
| ------------- | --------------------- | -------- | ------------------------------------------------------------------ |
| `color`       | `string`              | ❌ No     | Color of the navigation bar (e.g., hex, rgb, or CSS color name).   |
| `background`  | `string`              | ❌ No     | Background color of the navigation bar.                            |
| `bottomSpace` | `string`              | ❌ No     | Space below the bar.                                               |
| `minWidth`    | `string`              | ❌ No     | Minimum screen width for the bar to appear.                        |
| `hide_header` | `boolean`             | ❌ No     | Hides the default Home Assistant header if `true`.                 |
| `nav_items`   | `NavigationElement[]` | ✅ Yes    | Array of navigation elements to display in the sticky nav.         |



### NavItem Settings

| Field  | Type     | Required | Description                                                      |
| ------ | -------- | -------- | ---------------------------------------------------------------- |
| `icon` | `string` | ✅ Yes    | A Material Design Icon (e.g., `mdi:home-outline`).               |
| `url`  | `string` | ✅ Yes    | The path or URL to navigate to.                                  |


## Example

```yaml
type: custom:easy-sticky-nav
hide_header: true
nav_items:
  - name: Home
    icon: mdi:home-outline
    url: /dashboard-dashboard/home
  - name: User Settings
    icon: mdi:account-outline
    url: /profile/general
  - name: Notification
    icon: mdi:bell-outline
    url: "#"
  - name: Settings
    icon: mdi:cog-outline
    url: /config/dashboard
```

## Notice

If you hide the header you can still enter the edit-mode of Home-Assistant with:

```text
?edit=1
```

