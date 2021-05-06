import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, HostListener } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface LeftNavLinks {
  name: string;
  icon: string;
  children?: LeftNavLinks[];
  path?: string;
  queryParams?: Object;
}

const TREE_DATA: LeftNavLinks[] = [
  {
    name: 'Home',
    icon: 'home',
    path: '/logout',
  },

  {
    name: 'Indent requests',
    icon: 'list',
    children: [
      {
        name: 'My Request',
        icon: 'list',
        path: 'indent-requests/my-requests',
        // queryParams: { self: true }
      }, {
        name: 'Awaiting my approvals',
        icon: 'list',
        path: 'indent-requests/for-approval',
        // queryParams: { status: 'pending' }
      }, {
        name: 'Create new request',
        icon: 'list',
        path: 'indent-requests/create',
        queryParams: { status: 'pending' }
      },
      {
        name: 'Approved Requests',
        icon: 'list',
        path: 'indent-requests/approved-requests',
        // queryParams: { status: 'pending' }
      },
      {
        name: 'Rejected Requets',
        icon: 'list',
        path: 'indent-requests/rejected-requests',
        // queryParams: { status: 'pending' }
      }
    ]
  },
  {
    name: 'Settings',
    path: 'settings',
    icon: 'build'
  }
];

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent {
  treeControl = new NestedTreeControl<LeftNavLinks>(node => node.children);
  dataSource = new MatTreeNestedDataSource<LeftNavLinks>();

  constructor(private element: ElementRef) {
    this.dataSource.data = TREE_DATA;
  }

  @HostListener('mouseout', ['$event'])
  collapseAllNode = (event: MouseEvent) => {
    if (!(this.element.nativeElement as HTMLElement).contains(event.relatedTarget as HTMLElement)) {
      this.treeControl.collapseAll();
    }
  }
  hasChild = (_: number, node: LeftNavLinks) => !!node.children && node.children.length > 0;
}