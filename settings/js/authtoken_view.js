/* global Handlebars, moment */

/**
 * @author Christoph Wurst <christoph@owncloud.com>
 *
 * @copyright Copyright (c) 2016, ownCloud, Inc.
 * @license AGPL-3.0
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 */

var AuthTokenView = OC.Backbone.View.extend({
	initialize: function (options) {
		this.collection = options.collection;

		var $el = $(el);
		$('body').on('click', _.bind(this._hideConfigureToken, this));
		$el.on('click', '.popovermenu', function (event) {
			event.stopPropagation();
		});
		$el.on('click', 'a.icon-delete', _.bind(this._onDeleteToken, this));
		$el.on('click', '.icon-more', _.bind(this._onConfigureToken, this));
		$el.on('change', 'input.filesystem', _.bind(this._onSetTokenScope, this));
		$el.on('click', '.icon-rename', _.bind(this._onRenameToken, this));
		$el.on('dblclick', '.token-name > span', _.bind(this._onRenameToken, this));
		$el.on('keyup', '.token-name > input', _.bind(this._onEnterTokenName, this));

		this._form = $('#app-password-form');
		this._tokenName = $('#app-password-name');
		this._addAppPasswordBtn = $('#add-app-password');
		this._addAppPasswordBtn.click(_.bind(this._addAppPassword, this));
		this._appPasswordName = $('#app-password-name');
		this._appPasswordName.on('keypress', function (event) {
			if (event.which === 13) {
				this._addAppPassword();
			}
		}.bind(this));

		this._result.find('.clipboardButton').tooltip({
			placement: 'bottom',
			title: t('core', 'Copy'),
			trigger: 'hover'
		});

		// Clipboard!
		var clipboard = new ClipboardJS('.clipboardButton');
		clipboard.on('success', function (e) {
			var $input = $(e.trigger);
			$input.tooltip('hide')
				.attr('data-original-title', t('core', 'Copied!'))
				.tooltip('fixTitle')
				.tooltip({placement: 'bottom', trigger: 'manual'})
				.tooltip('show');
			_.delay(function () {
				$input.tooltip('hide')
					.attr('data-original-title', t('core', 'Copy'))
					.tooltip('fixTitle');
			}, 3000);
		});
		clipboard.on('error', function (e) {
			var $input = $(e.trigger);
			var actionMsg = '';
			if (/iPhone|iPad/i.test(navigator.userAgent)) {
				actionMsg = t('core', 'Not supported!');
			} else if (/Mac/i.test(navigator.userAgent)) {
				actionMsg = t('core', 'Press ⌘-C to copy.');
			} else {
				actionMsg = t('core', 'Press Ctrl-C to copy.');
			}

			$input.tooltip('hide')
				.attr('data-original-title', actionMsg)
				.tooltip('fixTitle')
				.tooltip({placement: 'bottom', trigger: 'manual'})
				.tooltip('show');
			_.delay(function () {
				$input.tooltip('hide')
					.attr('data-original-title', t('core', 'Copy'))
					.tooltip('fixTitle');
			}, 3000);
		});
	},

	_toggleAddingToken: function (state) {
		this._addingToken = state;
		this._addAppPasswordBtn.toggleClass('icon-loading-small', state);
	},

	_hideConfigureToken: function () {
		$('.token-list tr').removeClass('active');
		$('.token-list tr .popovermenu').removeClass('open');
	},

	_toggleFormResult: function (showForm) {
		if (showForm) {
			this._result.slideUp();
			this._form.slideDown();
		} else {
			this._form.slideUp();
			this._result.slideDown();
		}
	}
});
