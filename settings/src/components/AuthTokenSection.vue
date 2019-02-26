<!--
  - @copyright 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
  -
  - @author 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program.  If not, see <http://www.gnu.org/licenses/>.
  -->

<template>
	<div id="security" class="section">
		<h2>{{ t('settings', 'Devices & sessions') }}</h2>
		<p class="settings-hint hidden-when-empty">{{ t('settings', 'Web, desktop and mobile clients currently logged in to your account.') }}</p>
		<AuthTokenList :tokens="tokens"
					   :loading="loading"
					   @toggleScope="toggleTokenScope"
					   @rename="rename"
					   @delete="deleteToken"/>
		<AuthTokenSetupDialogue :add="addNewToken" />
	</div>
</template>

<script>
	import Axios from 'nextcloud-axios';

	import AuthTokenList from './AuthTokenList';
	import AuthTokenSetupDialogue from './AuthTokenSetupDialogue';

	export default {
		name: "AuthTokenSection",
		components: {
			AuthTokenSetupDialogue,
			AuthTokenList
		},
		data() {
			return {
				loading: true,
				fetchUrl: OC.generateUrl('/settings/personal/authtokens'),
				tokens: [],
			}
		},
		mounted() {
			Axios.get(OC.generateUrl('/settings/personal/authtokens'))
				.then(resp => resp.data)
				.then(tokens => {
					console.debug('loaded app tokens', tokens);
					this.loading = false;
					this.tokens = tokens;
				})
				.catch(err => {
					OC.Notification.showTemporary(t('core', 'Error while loading browser sessions and device tokens'));
					console.error('could not load app tokens', err);
					throw err;
				});
		},
		methods: {
			addNewToken (token) {
				console.info('todo: store new token', token);
				return new Promise(res => {
					setTimeout(() => res({
						token: '12345-123345-12345-12344',
						loginName: 'ferdinand',
					}), 1500);
				});
			},
			toggleTokenScope(token, scope, value) {
				console.info('todo: toggle token scope on server', token, scope, value);
				token.scope[scope] = value;
			},
			rename(token, newName) {
				console.info('todo: rename token on server', token, newName);
				token.name = newName;
			},
			deleteToken(token) {
				console.info('todo: delete token on server', token);
				this.tokens = this.tokens.filter(t => t !== token);
				// OC.Notification.showTemporary(t('core', 'Error while deleting the token'))
			}
		}
	}
</script>

<style scoped>

</style>
