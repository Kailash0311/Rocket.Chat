import { Template } from 'meteor/templating';
import { RocketChat } from 'meteor/rocketchat:lib';
import { SideNav } from 'meteor/rocketchat:ui';
import { t } from 'meteor/rocketchat:utils';

Template.accountFlex.events({
	'click [data-action="close"]'() {
		SideNav.closeFlex();
	},
});

// Template.accountFlex.onRendered(function() {
// 	$(this.find('.rooms-list')).perfectScrollbar();
// });

Template.accountFlex.helpers({
	allowUserProfileChange() {
		return RocketChat.settings.get('Accounts_AllowUserProfileChange');
	},
	showSecurityMenu() {
		return RocketChat.settings.get('UI_Display_Security');
	},
	encryptionEnabled() {
		return RocketChat.settings.get('E2E_Enable');
	},
	showPersonalAccessTokensMenu() {
		return RocketChat.authz.hasAllPermission(['create-personal-access-tokens']) && RocketChat.settings.get('UI_Display_Personal_Access_Tokens');
	},
	showIntegrationsMenu() {
		return RocketChat.settings.get('Webdav_Integration_Enabled') && RocketChat.settings.get('UI_Display_Integrations');
	},
	menuItem(name, icon, section, group) {
		return {
			name: t(name),
			icon,
			pathSection: section,
			pathGroup: group,
			darken: true,
		};
	},
	embeddedVersion() {
		return RocketChat.Layout.isEmbedded();
	},
});
