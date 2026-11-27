import { frontendURL } from 'dashboard/helper/URLHelper';
import { ROLES } from 'dashboard/constants/permissions.js';
import CustomAppView from './CustomAppView.vue';

// Jarpus: full-page view for any Dashboard App, opened from the sidebar "Apps" menu
export const routes = [
  {
    path: frontendURL('accounts/:accountId/apps/:appId'),
    name: 'custom_app_view',
    component: CustomAppView,
    meta: {
      permissions: [...ROLES],
    },
  },
];
