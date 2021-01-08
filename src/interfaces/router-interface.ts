import { RouteRecordRaw } from 'vue-router'

export interface CustomRouteConfig extends Omit<RouteRecordRaw, 'children'> {
  key?: string;
  name?: string;
  meta?: Meta;

  hideChildrenInMenu?: boolean;

  hidden?: boolean;
  children? : CustomRouteConfig[];
}

export interface Meta {
  title: any;
  icon?: any | undefined;
  hiddenHeaderContent?: any;
  target?: any;
  permission?: any;
  show?: boolean;
  hideChildren?: boolean;
  keepAlive?: boolean;
}
