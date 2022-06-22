import { Params } from '@angular/router';

export interface NavigationItemModel {

  id?: string;
  active?: boolean;
  title: string;
  type: 'item' | 'group' | 'collapsible';
  translate?: string;
  matIcon?: string;
  iconColor?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  externalUrl?: boolean;
  openInNewTab?: boolean;
  function?: any;
  badge?: {
    title?: string;
    translate?: string;
    classes?: string;
  };
  children?: NavigationItemModel[];
  separator?: boolean;
  queryParams?: Params;

}
