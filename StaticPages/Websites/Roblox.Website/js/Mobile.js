// bundle: mobile___70cf1f93d8a0dceb9b63b344871aea4e_m
// files: jquery/jquery.validate-1.9.0-modified.js, jquery/jquery.validate.unobtrusive.js, jquery/jquery.waypoints-1.1.7.js, jquery/jquery.jcountdown-1.4.2.js, Setup.js, Thumbnails.js, ListPage.js, GoogleAnalytics.js, Menu.js, UpdateHeaderAlerts.js, pages/BasicListPages.js, pages/CatalogSearch.js, pages/GroupProfile.js, pages/GroupSearch.js, pages/Home.js, pages/Inventory.js, pages/ItemPage.js, pages/Profile.js, pages/PurchaseConfirmationModal.js, pages/RemoveFriendModal.js, pages/UserSearch.js

// jquery/jquery.validate-1.9.0-modified.js
(function (n) {
	n.extend(n.fn, {
		validate: function (t) {
			var i, r;
			if (!this.length) {
				t && t.debug && window.console && console.warn("nothing selected, can't validate, returning nothing");
				return;
			}
			return ((i = n.data(this[0], 'validator')), i)
				? i
				: (this.attr('novalidate', 'novalidate'),
				  (i = new n.validator(t, this[0])),
				  n.data(this[0], 'validator', i),
				  i.settings.onsubmit &&
						((r = this.find('input, button')),
						r.filter('.cancel').click(function () {
							i.cancelSubmit = !0;
						}),
						i.settings.submitHandler &&
							r.filter(':submit').click(function () {
								i.submitButton = this;
							}),
						this.submit(function (t) {
							function r() {
								if (i.settings.submitHandler) {
									if (i.submitButton)
										var t = n("<input type='hidden'/>")
											.attr('name', i.submitButton.name)
											.val(i.submitButton.value)
											.appendTo(i.currentForm);
									return i.settings.submitHandler.call(i, i.currentForm), i.submitButton && t.remove(), !1;
								}
								return !0;
							}
							return (i.settings.debug && t.preventDefault(), i.cancelSubmit)
								? ((i.cancelSubmit = !1), r())
								: i.form()
								? i.pendingRequest
									? ((i.formSubmitted = !0), !1)
									: r()
								: (i.focusInvalid(), !1);
						})),
				  i);
		},
		valid: function () {
			if (n(this[0]).is('form')) return this.validate().form();
			var t = !0,
				i = n(this[0].form).validate();
			return (
				this.each(function () {
					t &= i.element(this);
				}),
				t
			);
		},
		removeAttrs: function (t) {
			var r = {},
				i = this;
			return (
				n.each(t.split(/\s/), function (n, t) {
					(r[t] = i.attr(t)), i.removeAttr(t);
				}),
				r
			);
		},
		rules: function (t, i) {
			var r = this[0],
				e,
				u,
				s;
			if (t) {
				var o = n.data(r.form, 'validator').settings,
					h = o.rules,
					f = n.validator.staticRules(r);
				switch (t) {
					case 'add':
						n.extend(f, n.validator.normalizeRule(i)),
							(h[r.name] = f),
							i.messages && (o.messages[r.name] = n.extend(o.messages[r.name], i.messages));
						break;
					case 'remove':
						return i
							? ((e = {}),
							  n.each(i.split(/\s/), function (n, t) {
									(e[t] = f[t]), delete f[t];
							  }),
							  e)
							: (delete h[r.name], f);
				}
			}
			return (
				(u = n.validator.normalizeRules(
					n.extend(
						{},
						n.validator.metadataRules(r),
						n.validator.classRules(r),
						n.validator.attributeRules(r),
						n.validator.staticRules(r),
					),
					r,
				)),
				u.required && ((s = u.required), delete u.required, (u = n.extend({ required: s }, u))),
				u
			);
		},
	}),
		n.extend(n.expr[':'], {
			blank: function (t) {
				return !n.trim('' + t.value);
			},
			filled: function (t) {
				return !!n.trim('' + t.value);
			},
			unchecked: function (n) {
				return !n.checked;
			},
		}),
		(n.validator = function (t, i) {
			(this.settings = n.extend(!0, {}, n.validator.defaults, t)), (this.currentForm = i), this.init();
		}),
		(n.validator.format = function (t, i) {
			return arguments.length == 1
				? function () {
						var i = n.makeArray(arguments);
						return i.unshift(t), n.validator.format.apply(this, i);
				  }
				: (arguments.length > 2 && i.constructor != Array && (i = n.makeArray(arguments).slice(1)),
				  i.constructor != Array && (i = [i]),
				  n.each(i, function (n, i) {
						t = t.replace(new RegExp('\\{' + n + '\\}', 'g'), i);
				  }),
				  t);
		}),
		n.extend(n.validator, {
			defaults: {
				messages: {},
				groups: {},
				rules: {},
				errorClass: 'error',
				validClass: 'valid',
				errorElement: 'label',
				focusInvalid: !0,
				errorContainer: n([]),
				errorLabelContainer: n([]),
				onsubmit: !0,
				ignore: ':hidden',
				ignoreTitle: !1,
				onfocusin: function (n) {
					(this.lastActive = n),
						this.settings.focusCleanup &&
							!this.blockFocusCleanup &&
							(this.settings.unhighlight &&
								this.settings.unhighlight.call(this, n, this.settings.errorClass, this.settings.validClass),
							this.addWrapper(this.errorsFor(n)).hide());
				},
				onfocusout: function (n) {
					!this.checkable(n) && (n.name in this.submitted || !this.optional(n)) && this.element(n);
				},
				onkeyup: function (n) {
					(n.name in this.submitted || n == this.lastElement) && this.element(n);
				},
				onclick: function (n) {
					n.name in this.submitted ? this.element(n) : n.parentNode.name in this.submitted && this.element(n.parentNode);
				},
				highlight: function (t, i, r) {
					t.type === 'radio' ? this.findByName(t.name).addClass(i).removeClass(r) : n(t).addClass(i).removeClass(r);
				},
				unhighlight: function (t, i, r) {
					t.type === 'radio' ? this.findByName(t.name).removeClass(i).addClass(r) : n(t).removeClass(i).addClass(r);
				},
			},
			setDefaults: function (t) {
				n.extend(n.validator.defaults, t);
			},
			messages: {
				required: 'This field is required.',
				remote: 'Please fix this field.',
				email: 'Please enter a valid email address.',
				url: 'Please enter a valid URL.',
				date: 'Please enter a valid date.',
				dateISO: 'Please enter a valid date (ISO).',
				number: 'Please enter a valid number.',
				digits: 'Please enter only digits.',
				creditcard: 'Please enter a valid credit card number.',
				equalTo: 'Please enter the same value again.',
				accept: 'Please enter a value with a valid extension.',
				maxlength: n.validator.format('Please enter no more than {0} characters.'),
				minlength: n.validator.format('Please enter at least {0} characters.'),
				rangelength: n.validator.format('Please enter a value between {0} and {1} characters long.'),
				range: n.validator.format('Please enter a value between {0} and {1}.'),
				max: n.validator.format('Please enter a value less than or equal to {0}.'),
				min: n.validator.format('Please enter a value greater than or equal to {0}.'),
			},
			autoCreateRanges: !1,
			prototype: {
				init: function () {
					function i(t) {
						var i = n.data(this[0].form, 'validator'),
							r = 'on' + t.type.replace(/^validate/, '');
						i.settings[r] && i.settings[r].call(i, this[0], t);
					}
					var r, t;
					(this.labelContainer = n(this.settings.errorLabelContainer)),
						(this.errorContext = (this.labelContainer.length && this.labelContainer) || n(this.currentForm)),
						(this.containers = n(this.settings.errorContainer).add(this.settings.errorLabelContainer)),
						(this.submitted = {}),
						(this.valueCache = {}),
						(this.pendingRequest = 0),
						(this.pending = {}),
						(this.invalid = {}),
						this.reset(),
						(r = this.groups = {}),
						n.each(this.settings.groups, function (t, i) {
							n.each(i.split(/\s/), function (n, i) {
								r[i] = t;
							});
						}),
						(t = this.settings.rules),
						n.each(t, function (i, r) {
							t[i] = n.validator.normalizeRule(r);
						}),
						n(this.currentForm)
							.validateDelegate(
								"[type='text'], [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ",
								'focusin focusout keyup',
								i,
							)
							.validateDelegate("[type='radio'], [type='checkbox'], select, option", 'click', i),
						this.settings.invalidHandler && n(this.currentForm).bind('invalid-form.validate', this.settings.invalidHandler);
				},
				form: function () {
					return (
						this.checkForm(),
						n.extend(this.submitted, this.errorMap),
						(this.invalid = n.extend({}, this.errorMap)),
						this.valid() || n(this.currentForm).triggerHandler('invalid-form', [this]),
						this.showErrors(),
						this.valid()
					);
				},
				checkForm: function () {
					this.prepareForm();
					for (var n = 0, t = (this.currentElements = this.elements()); t[n]; n++) this.check(t[n]);
					return this.valid();
				},
				element: function (t) {
					(t = this.validationTargetFor(this.clean(t))),
						(this.lastElement = t),
						this.prepareElement(t),
						(this.currentElements = n(t));
					var i = this.check(t);
					return (
						i ? delete this.invalid[t.name] : (this.invalid[t.name] = !0),
						this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)),
						this.showErrors(),
						i
					);
				},
				showErrors: function (t) {
					if (t) {
						n.extend(this.errorMap, t), (this.errorList = []);
						for (var i in t) this.errorList.push({ message: t[i], element: this.findByName(i)[0] });
						this.successList = n.grep(this.successList, function (n) {
							return !(n.name in t);
						});
					}
					this.settings.showErrors
						? this.settings.showErrors.call(this, this.errorMap, this.errorList)
						: this.defaultShowErrors();
				},
				resetForm: function () {
					n.fn.resetForm && n(this.currentForm).resetForm(),
						(this.submitted = {}),
						(this.lastElement = null),
						this.prepareForm(),
						this.hideErrors(),
						this.elements().removeClass(this.settings.errorClass);
				},
				numberOfInvalids: function () {
					return this.objectLength(this.invalid);
				},
				objectLength: function (n) {
					var t = 0,
						i;
					for (i in n) t++;
					return t;
				},
				hideErrors: function () {
					this.addWrapper(this.toHide).hide();
				},
				valid: function () {
					return this.size() == 0;
				},
				size: function () {
					return this.errorList.length;
				},
				focusInvalid: function () {
					if (this.settings.focusInvalid)
						try {
							n(this.findLastActive() || (this.errorList.length && this.errorList[0].element) || [])
								.filter(':visible')
								.focus()
								.trigger('focusin');
						} catch (t) {}
				},
				findLastActive: function () {
					var t = this.lastActive;
					return (
						t &&
						n.grep(this.errorList, function (n) {
							return n.element.name == t.name;
						}).length == 1 &&
						t
					);
				},
				elements: function () {
					var i = this,
						t = {};
					return n(this.currentForm)
						.find('input, select, textarea')
						.not(':submit, :reset, :image, [disabled]')
						.not(this.settings.ignore)
						.filter(function () {
							return (!this.name && i.settings.debug && window.console && console.error('%o has no name assigned', this),
							this.name in t || !i.objectLength(n(this).rules()))
								? !1
								: ((t[this.name] = !0), !0);
						});
				},
				clean: function (t) {
					return n(t)[0];
				},
				errors: function () {
					return n(this.settings.errorElement + '.' + this.settings.errorClass, this.errorContext);
				},
				reset: function () {
					(this.successList = []),
						(this.errorList = []),
						(this.errorMap = {}),
						(this.toShow = n([])),
						(this.toHide = n([])),
						(this.currentElements = n([]));
				},
				prepareForm: function () {
					this.reset(), (this.toHide = this.errors().add(this.containers));
				},
				prepareElement: function (n) {
					this.reset(), (this.toHide = this.errorsFor(n));
				},
				check: function (t) {
					var f, e, u, i, r;
					(t = this.validationTargetFor(this.clean(t))), (f = n(t).rules()), (e = !1);
					for (u in f) {
						i = { method: u, parameters: f[u] };
						try {
							if (
								((r = n.validator.methods[u].call(this, t.value.replace(/\r/g, ''), t, i.parameters)),
								r == 'dependency-mismatch')
							) {
								e = !0;
								continue;
							}
							if (((e = !1), r == 'pending')) {
								this.toHide = this.toHide.not(this.errorsFor(t));
								return;
							}
							if (!r) return this.formatAndAdd(t, i), !1;
						} catch (o) {
							this.settings.debug &&
								window.console &&
								console.log('exception occured when checking element ' + t.id + ", check the '" + i.method + "' method", o);
							throw o;
						}
					}
					if (!e) return this.objectLength(f) && this.successList.push(t), !0;
				},
				customMetaMessage: function (t, i) {
					if (n.metadata) {
						var r = this.settings.meta ? n(t).metadata()[this.settings.meta] : n(t).metadata();
						return r && r.messages && r.messages[i];
					}
				},
				customMessage: function (n, t) {
					var i = this.settings.messages[n];
					return i && (i.constructor == String ? i : i[t]);
				},
				findDefined: function () {
					for (var n = 0; n < arguments.length; n++) if (arguments[n] !== undefined) return arguments[n];
					return undefined;
				},
				defaultMessage: function (t, i) {
					return this.findDefined(
						this.customMessage(t.name, i),
						this.customMetaMessage(t, i),
						(!this.settings.ignoreTitle && t.title) || undefined,
						n.validator.messages[i],
						'<strong>Warning: No message defined for ' + t.name + '</strong>',
					);
				},
				formatAndAdd: function (n, t) {
					var i = this.defaultMessage(n, t.method),
						r = /\$?\{(\d+)\}/g;
					typeof i == 'function'
						? (i = i.call(this, t.parameters, n))
						: r.test(i) && (i = jQuery.format(i.replace(r, '{$1}'), t.parameters)),
						this.errorList.push({ message: i, element: n }),
						(this.errorMap[n.name] = i),
						(this.submitted[n.name] = i);
				},
				addWrapper: function (n) {
					return this.settings.wrapper && (n = n.add(n.parent(this.settings.wrapper))), n;
				},
				defaultShowErrors: function () {
					for (var t, i, n = 0; this.errorList[n]; n++)
						(t = this.errorList[n]),
							this.settings.highlight &&
								this.settings.highlight.call(this, t.element, this.settings.errorClass, this.settings.validClass),
							this.showLabel(t.element, t.message);
					if ((this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success))
						for (n = 0; this.successList[n]; n++) this.showLabel(this.successList[n]);
					if (this.settings.unhighlight)
						for (n = 0, i = this.validElements(); i[n]; n++)
							this.settings.unhighlight.call(this, i[n], this.settings.errorClass, this.settings.validClass);
					(this.toHide = this.toHide.not(this.toShow)), this.hideErrors(), this.addWrapper(this.toShow).show();
				},
				validElements: function () {
					return this.currentElements.not(this.invalidElements());
				},
				invalidElements: function () {
					return n(this.errorList).map(function () {
						return this.element;
					});
				},
				showLabel: function (t, i) {
					var r = this.errorsFor(t);
					r.length
						? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), r.attr('generated') && r.html(i))
						: ((r = n('<' + this.settings.errorElement + '/>')
								.attr({ for: this.idOrName(t), generated: !0 })
								.addClass(this.settings.errorClass)
								.html(i || '')),
						  this.settings.wrapper &&
								(r = r
									.hide()
									.show()
									.wrap('<' + this.settings.wrapper + '/>')
									.parent()),
						  this.labelContainer.append(r).length ||
								(this.settings.errorPlacement ? this.settings.errorPlacement(r, n(t)) : r.insertAfter(t))),
						!i &&
							this.settings.success &&
							(r.text(''),
							typeof this.settings.success == 'string' ? r.addClass(this.settings.success) : this.settings.success(r)),
						(this.toShow = this.toShow.add(r));
				},
				errorsFor: function (t) {
					var i = this.idOrName(t);
					return this.errors().filter(function () {
						return n(this).attr('for') == i;
					});
				},
				idOrName: function (n) {
					return this.groups[n.name] || (this.checkable(n) ? n.name : n.id || n.name);
				},
				validationTargetFor: function (n) {
					return this.checkable(n) && (n = this.findByName(n.name).not(this.settings.ignore)[0]), n;
				},
				checkable: function (n) {
					return /radio|checkbox/i.test(n.type);
				},
				findByName: function (t) {
					var i = this.currentForm;
					return n(document.getElementsByName(t)).map(function (n, r) {
						return (r.form == i && r.name == t && r) || null;
					});
				},
				getLength: function (t, i) {
					switch (i.nodeName.toLowerCase()) {
						case 'select':
							return n('option:selected', i).length;
						case 'input':
							if (this.checkable(i)) return this.findByName(i.name).filter(':checked').length;
					}
					return t.length;
				},
				depend: function (n, t) {
					return this.dependTypes[typeof n] ? this.dependTypes[typeof n](n, t) : !0;
				},
				dependTypes: {
					boolean: function (n) {
						return n;
					},
					string: function (t, i) {
						return !!n(t, i.form).length;
					},
					function: function (n, t) {
						return n(t);
					},
				},
				optional: function (t) {
					return !n.validator.methods.required.call(this, n.trim(t.value), t) && 'dependency-mismatch';
				},
				startRequest: function (n) {
					this.pending[n.name] || (this.pendingRequest++, (this.pending[n.name] = !0));
				},
				stopRequest: function (t, i) {
					this.pendingRequest--,
						this.pendingRequest < 0 && (this.pendingRequest = 0),
						delete this.pending[t.name],
						i && this.pendingRequest == 0 && this.formSubmitted && this.form()
							? (n(this.currentForm).submit(), (this.formSubmitted = !1))
							: !i &&
							  this.pendingRequest == 0 &&
							  this.formSubmitted &&
							  (n(this.currentForm).triggerHandler('invalid-form', [this]), (this.formSubmitted = !1));
				},
				previousValue: function (t) {
					return (
						n.data(t, 'previousValue') ||
						n.data(t, 'previousValue', { old: null, valid: !0, message: this.defaultMessage(t, 'remote') })
					);
				},
			},
			classRuleSettings: {
				required: { required: !0 },
				email: { email: !0 },
				url: { url: !0 },
				date: { date: !0 },
				dateISO: { dateISO: !0 },
				dateDE: { dateDE: !0 },
				number: { number: !0 },
				numberDE: { numberDE: !0 },
				digits: { digits: !0 },
				creditcard: { creditcard: !0 },
			},
			addClassRules: function (t, i) {
				t.constructor == String ? (this.classRuleSettings[t] = i) : n.extend(this.classRuleSettings, t);
			},
			classRules: function (t) {
				var r = {},
					i = n(t).attr('class');
				return (
					i &&
						n.each(i.split(' '), function () {
							this in n.validator.classRuleSettings && n.extend(r, n.validator.classRuleSettings[this]);
						}),
					r
				);
			},
			attributeRules: function (t) {
				var r = {},
					f = n(t),
					i,
					u;
				for (i in n.validator.methods)
					(u = i === 'required' && typeof n.fn.prop == 'function' ? f.prop(i) : f.attr(i)),
						u ? (r[i] = u) : f[0].getAttribute('type') === i && (r[i] = !0);
				return r.maxlength && /-1|2147483647|524288/.test(r.maxlength) && delete r.maxlength, r;
			},
			metadataRules: function (t) {
				if (!n.metadata) return {};
				var i = n.data(t.form, 'validator').settings.meta;
				return i ? n(t).metadata()[i] : n(t).metadata();
			},
			staticRules: function (t) {
				var r = {},
					i = n.data(t.form, 'validator');
				return i.settings.rules && (r = n.validator.normalizeRule(i.settings.rules[t.name]) || {}), r;
			},
			normalizeRules: function (t, i) {
				return (
					n.each(t, function (r, u) {
						if (u === !1) {
							delete t[r];
							return;
						}
						if (u.param || u.depends) {
							var f = !0;
							switch (typeof u.depends) {
								case 'string':
									f = !!n(u.depends, i.form).length;
									break;
								case 'function':
									f = u.depends.call(i, i);
							}
							f ? (t[r] = u.param !== undefined ? u.param : !0) : delete t[r];
						}
					}),
					n.each(t, function (r, u) {
						t[r] = n.isFunction(u) ? u(i) : u;
					}),
					n.each(['minlength', 'maxlength', 'min', 'max'], function () {
						t[this] && (t[this] = Number(t[this]));
					}),
					n.each(['rangelength', 'range'], function () {
						t[this] && (t[this] = [Number(t[this][0]), Number(t[this][1])]);
					}),
					n.validator.autoCreateRanges &&
						(t.min && t.max && ((t.range = [t.min, t.max]), delete t.min, delete t.max),
						t.minlength &&
							t.maxlength &&
							((t.rangelength = [t.minlength, t.maxlength]), delete t.minlength, delete t.maxlength)),
					t.messages && delete t.messages,
					t
				);
			},
			normalizeRule: function (t) {
				if (typeof t == 'string') {
					var i = {};
					n.each(t.split(/\s/), function () {
						i[this] = !0;
					}),
						(t = i);
				}
				return t;
			},
			addMethod: function (t, i, r) {
				(n.validator.methods[t] = i),
					(n.validator.messages[t] = r != undefined ? r : n.validator.messages[t]),
					i.length < 3 && n.validator.addClassRules(t, n.validator.normalizeRule(t));
			},
			methods: {
				required: function (t, i, r) {
					if (!this.depend(r, i)) return 'dependency-mismatch';
					switch (i.nodeName.toLowerCase()) {
						case 'select':
							var u = n(i).val();
							return u && u.length > 0;
						case 'input':
							if (this.checkable(i)) return this.getLength(t, i) > 0;
						default:
							return n.trim(t).length > 0;
					}
				},
				remote: function (t, i, r) {
					var f, u, e;
					return this.optional(i)
						? 'dependency-mismatch'
						: ((f = this.previousValue(i)),
						  this.settings.messages[i.name] || (this.settings.messages[i.name] = {}),
						  (f.originalMessage = this.settings.messages[i.name].remote),
						  (this.settings.messages[i.name].remote = f.message),
						  (r = (typeof r == 'string' && { url: r }) || r),
						  this.pending[i.name])
						? 'pending'
						: f.old === t
						? f.valid
						: ((f.old = t),
						  (u = this),
						  this.startRequest(i),
						  (e = {}),
						  (e[i.name] = t),
						  n.ajax(
								n.extend(
									!0,
									{
										url: r,
										mode: 'abort',
										port: 'validate' + i.name,
										dataType: 'json',
										data: e,
										success: function (r) {
											var o, h, s, e;
											(u.settings.messages[i.name].remote = f.originalMessage),
												(o = r === !0),
												o
													? ((h = u.formSubmitted),
													  u.prepareElement(i),
													  (u.formSubmitted = h),
													  u.successList.push(i),
													  u.showErrors())
													: ((s = {}),
													  (e = r || u.defaultMessage(i, 'remote')),
													  (s[i.name] = f.message = n.isFunction(e) ? e(t) : e),
													  u.showErrors(s)),
												(f.valid = o),
												u.stopRequest(i, o);
										},
									},
									r,
								),
						  ),
						  'pending');
				},
				minlength: function (t, i, r) {
					return this.optional(i) || this.getLength(n.trim(t), i) >= r;
				},
				maxlength: function (t, i, r) {
					return this.optional(i) || this.getLength(n.trim(t), i) <= r;
				},
				rangelength: function (t, i, r) {
					var u = this.getLength(n.trim(t), i);
					return this.optional(i) || (u >= r[0] && u <= r[1]);
				},
				min: function (n, t, i) {
					return this.optional(t) || n >= i;
				},
				max: function (n, t, i) {
					return this.optional(t) || n <= i;
				},
				range: function (n, t, i) {
					return this.optional(t) || (n >= i[0] && n <= i[1]);
				},
				email: function (n, t) {
					return (
						this.optional(t) ||
						/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(
							n,
						)
					);
				},
				url: function (n, t) {
					return (
						this.optional(t) ||
						/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
							n,
						)
					);
				},
				date: function (n, t) {
					var i = new Date();
					return this.optional(t) || !/Invalid|NaN/.test(new Date(i.toLocaleDateString(n)));
				},
				dateISO: function (n, t) {
					return this.optional(t) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(n);
				},
				number: function (n, t) {
					return this.optional(t) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(n);
				},
				digits: function (n, t) {
					return this.optional(t) || /^\d+$/.test(n);
				},
				creditcard: function (n, t) {
					var i, f, r;
					if (this.optional(t)) return 'dependency-mismatch';
					if (/[^0-9 -]+/.test(n)) return !1;
					var e = 0,
						r = 0,
						u = !1;
					for (n = n.replace(/\D/g, ''), i = n.length - 1; i >= 0; i--)
						(f = n.charAt(i)), (r = parseInt(f, 10)), u && (r *= 2) > 9 && (r -= 9), (e += r), (u = !u);
					return e % 10 == 0;
				},
				accept: function (n, t, i) {
					return (
						(i = typeof i == 'string' ? i.replace(/,/g, '|') : 'png|jpe?g|gif'),
						this.optional(t) || n.match(new RegExp('.(' + i + ')$', 'i'))
					);
				},
				equalTo: function (t, i, r) {
					var u = n(r)
						.unbind('.validate-equalTo')
						.bind('blur.validate-equalTo', function () {
							n(i).valid();
						});
					return t == u.val();
				},
			},
		}),
		(n.format = n.validator.format);
})(jQuery),
	(function (n) {
		var t = {},
			i;
		n.ajaxPrefilter
			? n.ajaxPrefilter(function (n, i, r) {
					var u = n.port;
					n.mode == 'abort' && (t[u] && t[u].abort(), (t[u] = r));
			  })
			: ((i = n.ajax),
			  (n.ajax = function (r) {
					var f = ('mode' in r ? r : n.ajaxSettings).mode,
						u = ('port' in r ? r : n.ajaxSettings).port;
					return f == 'abort' ? (t[u] && t[u].abort(), (t[u] = i.apply(this, arguments))) : i.apply(this, arguments);
			  }));
	})(jQuery),
	(function (n) {
		jQuery.event.special.focusin ||
			jQuery.event.special.focusout ||
			!document.addEventListener ||
			n.each({ focus: 'focusin', blur: 'focusout' }, function (t, i) {
				function r(t) {
					return (t = n.event.fix(t)), (t.type = i), n.event.handle.call(this, t);
				}
				n.event.special[i] = {
					setup: function () {
						this.addEventListener(t, r, !0);
					},
					teardown: function () {
						this.removeEventListener(t, r, !0);
					},
					handler: function (t) {
						return (arguments[0] = n.event.fix(t)), (arguments[0].type = i), n.event.handle.apply(this, arguments);
					},
				};
			}),
			n.extend(n.fn, {
				validateDelegate: function (t, i, r) {
					return this.bind(i, function (i) {
						var u = n(i.target);
						if (u.is(t)) return r.apply(u, arguments);
					});
				},
			});
	})(jQuery); // jquery/jquery.validate.unobtrusive.js

/*!
 ** Unobtrusive validation support library for jQuery and jQuery Validate
 ** Copyright (C) Microsoft Corporation. All rights reserved.
 */
(function (n) {
	function i(n, t, i) {
		(n.rules[t] = i), n.message && (n.messages[t] = n.message);
	}
	function c(n) {
		return n.replace(/^\s+|\s+$/g, '').split(/\s*,\s*/g);
	}
	function f(n) {
		return n.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, '\\$1');
	}
	function o(n) {
		return n.substr(0, n.lastIndexOf('.') + 1);
	}
	function e(n, t) {
		return n.indexOf('*.') === 0 && (n = n.replace('*.', t)), n;
	}
	function a(t, i) {
		var r = n(this).find("[data-valmsg-for='" + f(i[0].name) + "']"),
			u = n.parseJSON(r.attr('data-valmsg-replace')) !== !1;
		r.removeClass('field-validation-valid').addClass('field-validation-error'),
			t.data('unobtrusiveContainer', r),
			u ? (r.empty(), t.removeClass('input-validation-error').appendTo(r)) : t.hide();
	}
	function v(t, i) {
		var u = n(this).find('[data-valmsg-summary=true]'),
			r = u.find('ul');
		r &&
			r.length &&
			i.errorList.length &&
			(r.empty(),
			u.addClass('validation-summary-errors').removeClass('validation-summary-valid'),
			n.each(i.errorList, function () {
				n('<li />').html(this.message).appendTo(r);
			}));
	}
	function l(t) {
		var i = t.data('unobtrusiveContainer'),
			r = n.parseJSON(i.attr('data-valmsg-replace'));
		i &&
			(i.addClass('field-validation-valid').removeClass('field-validation-error'),
			t.removeData('unobtrusiveContainer'),
			r && i.empty());
	}
	function h() {
		var i = n(this);
		i.data('validator').resetForm(),
			i.find('.validation-summary-errors').addClass('validation-summary-valid').removeClass('validation-summary-errors'),
			i
				.find('.field-validation-error')
				.addClass('field-validation-valid')
				.removeClass('field-validation-error')
				.removeData('unobtrusiveContainer')
				.find('>*')
				.removeData('unobtrusiveContainer');
	}
	function s(t) {
		var i = n(t),
			r = i.data(u),
			f = n.proxy(h, t);
		return (
			r ||
				((r = {
					options: {
						errorClass: 'input-validation-error',
						errorElement: 'span',
						errorPlacement: n.proxy(a, t),
						invalidHandler: n.proxy(v, t),
						messages: {},
						rules: {},
						success: n.proxy(l, t),
					},
					attachValidation: function () {
						i.unbind('reset.' + u, f)
							.bind('reset.' + u, f)
							.validate(this.options);
					},
					validate: function () {
						return i.validate(), i.valid();
					},
				}),
				i.data(u, r)),
			r
		);
	}
	var r = n.validator,
		t,
		u = 'unobtrusiveValidation';
	(r.unobtrusive = {
		adapters: [],
		parseElement: function (t, i) {
			var f = n(t),
				e = f.parents('form')[0],
				r,
				u,
				o;
			e &&
				((r = s(e)),
				(r.options.rules[t.name] = u = {}),
				(r.options.messages[t.name] = o = {}),
				n.each(this.adapters, function () {
					var i = 'data-val-' + this.name,
						s = f.attr(i),
						r = {};
					s !== undefined &&
						((i += '-'),
						n.each(this.params, function () {
							r[this] = f.attr(i + this);
						}),
						this.adapt({ element: t, form: e, message: s, params: r, rules: u, messages: o }));
				}),
				n.extend(u, { __dummy__: !0 }),
				i || r.attachValidation());
		},
		parse: function (t) {
			var i = n(t).parents('form').andSelf().add(n(t).find('form')).filter('form');
			n(t)
				.find(':input[data-val=true]')
				.each(function () {
					r.unobtrusive.parseElement(this, !0);
				}),
				i.each(function () {
					var n = s(this);
					n && n.attachValidation();
				});
		},
	}),
		(t = r.unobtrusive.adapters),
		(t.add = function (n, t, i) {
			return i || ((i = t), (t = [])), this.push({ name: n, params: t, adapt: i }), this;
		}),
		(t.addBool = function (n, t) {
			return this.add(n, function (r) {
				i(r, t || n, !0);
			});
		}),
		(t.addMinMax = function (n, t, r, u, f, e) {
			return this.add(n, [f || 'min', e || 'max'], function (n) {
				var e = n.params.min,
					f = n.params.max;
				e && f ? i(n, u, [e, f]) : e ? i(n, t, e) : f && i(n, r, f);
			});
		}),
		(t.addSingleVal = function (n, t, r) {
			return this.add(n, [t || 'val'], function (u) {
				i(u, r || n, u.params[t]);
			});
		}),
		r.addMethod('__dummy__', function () {
			return !0;
		}),
		r.addMethod('regex', function (n, t, i) {
			var r;
			return this.optional(t) ? !0 : ((r = new RegExp(i).exec(n)), r && r.index === 0 && r[0].length === n.length);
		}),
		t.addSingleVal('accept', 'exts').addSingleVal('regex', 'pattern'),
		t.addBool('creditcard').addBool('date').addBool('digits').addBool('email').addBool('number').addBool('url'),
		t.addMinMax('length', 'minlength', 'maxlength', 'rangelength').addMinMax('range', 'min', 'max', 'range'),
		t.add('equalto', ['other'], function (t) {
			var s = o(t.element.name),
				h = t.params.other,
				r = e(h, s),
				u = n(t.form).find(":input[name='" + f(r) + "']")[0];
			i(t, 'equalTo', u);
		}),
		t.add('required', function (n) {
			(n.element.tagName.toUpperCase() !== 'INPUT' || n.element.type.toUpperCase() !== 'CHECKBOX') && i(n, 'required', !0);
		}),
		t.add('remote', ['url', 'type', 'additionalfields'], function (t) {
			var r = { url: t.params.url, type: t.params.type || 'GET', data: {} },
				u = o(t.element.name);
			n.each(c(t.params.additionalfields || t.element.name), function (i, o) {
				var s = e(o, u);
				r.data[s] = function () {
					return n(t.form)
						.find(":input[name='" + f(s) + "']")
						.val();
				};
			}),
				i(t, 'remote', r);
		}),
		n(function () {
			r.unobtrusive.parse(document);
		});
})(jQuery); // jquery/jquery.waypoints-1.1.7.js

/*!
jQuery Waypoints - v1.1.7
Copyright (c) 2011-2012 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/MIT-license.txt
https://github.com/imakewebthings/jquery-waypoints/blob/master/GPL-license.txt
*/
(function (n, t, i, r) {
	'$:nomunge';
	var h = n(r),
		s = 'waypoint.reached',
		o = function (n, i) {
			n.element.trigger(s, i), n.options.triggerOnce && n.element[t]('destroy');
		},
		l = function (n, t) {
			if (!t) return -1;
			for (var i = t.waypoints.length - 1; i >= 0 && t.waypoints[i].element[0] !== n[0]; ) i -= 1;
			return i;
		},
		f = [],
		a = function (t) {
			n.extend(this, {
				element: n(t),
				oldScroll: 0,
				waypoints: [],
				didScroll: !1,
				didResize: !1,
				doScroll: n.proxy(function () {
					var t = this.element.scrollTop(),
						u = t > this.oldScroll,
						e = this,
						r = n.grep(this.waypoints, function (n) {
							return u ? n.offset > e.oldScroll && n.offset <= t : n.offset <= e.oldScroll && n.offset > t;
						}),
						f = r.length;
					((this.oldScroll && t) || n[i]('refresh'), (this.oldScroll = t), f) &&
						(u || r.reverse(),
						n.each(r, function (n, t) {
							(t.options.continuous || n === f - 1) && o(t, [u ? 'down' : 'up']);
						}));
				}, this),
			}),
				n(t)
					.bind(
						'scroll.waypoints',
						n.proxy(function () {
							this.didScroll ||
								((this.didScroll = !0),
								r.setTimeout(
									n.proxy(function () {
										this.doScroll(), (this.didScroll = !1);
									}, this),
									n[i].settings.scrollThrottle,
								));
						}, this),
					)
					.bind(
						'resize.waypoints',
						n.proxy(function () {
							this.didResize ||
								((this.didResize = !0),
								r.setTimeout(
									n.proxy(function () {
										n[i]('refresh'), (this.didResize = !1);
									}, this),
									n[i].settings.resizeThrottle,
								));
						}, this),
					),
				h.load(
					n.proxy(function () {
						this.doScroll();
					}, this),
				);
		},
		v = function (t) {
			var i = null;
			return (
				n.each(f, function (n, r) {
					if (r.element[0] === t) return (i = r), !1;
				}),
				i
			);
		},
		e = {
			init: function (r, u) {
				return (
					this.each(function () {
						var o = n.fn[t].defaults.context,
							e,
							c = n(this);
						u && u.context && (o = u.context),
							n.isWindow(o) || (o = c.closest(o)[0]),
							(e = v(o)),
							e || ((e = new a(o)), f.push(e));
						var y = l(c, e),
							p = y < 0 ? n.fn[t].defaults : e.waypoints[y].options,
							h = n.extend({}, p, u);
						(h.offset =
							h.offset === 'bottom-in-view'
								? function () {
										var t = n.isWindow(o) ? n[i]('viewportHeight') : n(o).height();
										return t - n(this).outerHeight();
								  }
								: h.offset),
							y < 0 ? e.waypoints.push({ element: c, offset: null, options: h }) : (e.waypoints[y].options = h),
							r && c.bind(s, r),
							u && u.handler && c.bind(s, u.handler);
					}),
					n[i]('refresh'),
					this
				);
			},
			remove: function () {
				return this.each(function (t, i) {
					var r = n(i);
					n.each(f, function (n, t) {
						var i = l(r, t);
						i >= 0 &&
							(t.waypoints.splice(i, 1),
							t.waypoints.length || (t.element.unbind('scroll.waypoints resize.waypoints'), f.splice(n, 1)));
					});
				});
			},
			destroy: function () {
				return this.unbind(s)[t]('remove');
			},
		},
		c = {
			refresh: function () {
				n.each(f, function (t, r) {
					var u = n.isWindow(r.element[0]),
						s = u ? 0 : r.element.offset().top,
						e = u ? n[i]('viewportHeight') : r.element.height(),
						f = u ? 0 : r.element.scrollTop();
					n.each(r.waypoints, function (n, t) {
						var u, i, h;
						t &&
							(((u = t.options.offset),
							(i = t.offset),
							typeof t.options.offset == 'function'
								? (u = t.options.offset.apply(t.element))
								: typeof t.options.offset == 'string' &&
								  ((h = parseFloat(t.options.offset)), (u = t.options.offset.indexOf('%') ? Math.ceil(e * (h / 100)) : h)),
							(t.offset = t.element.offset().top - s + f - u),
							t.options.onlyOnScroll) ||
								(i !== null && r.oldScroll > i && r.oldScroll <= t.offset
									? o(t, ['up'])
									: i !== null && r.oldScroll < i && r.oldScroll >= t.offset
									? o(t, ['down'])
									: !i && r.element.scrollTop() > t.offset && o(t, ['down'])));
					}),
						r.waypoints.sort(function (n, t) {
							return n.offset - t.offset;
						});
				});
			},
			viewportHeight: function () {
				return r.innerHeight ? r.innerHeight : h.height();
			},
			aggregate: function () {
				var t = n();
				return (
					n.each(f, function (i, r) {
						n.each(r.waypoints, function (n, i) {
							t = t.add(i.element);
						});
					}),
					t
				);
			},
		};
	(n.fn[t] = function (i) {
		if (e[i]) return e[i].apply(this, Array.prototype.slice.call(arguments, 1));
		if (typeof i != 'function' && i) {
			if (typeof i == 'object') return e.init.apply(this, [null, i]);
			n.error('Method ' + i + ' does not exist on jQuery ' + t);
		} else return e.init.apply(this, arguments);
	}),
		(n.fn[t].defaults = { continuous: !0, offset: 0, triggerOnce: !1, context: r }),
		(n[i] = function (n) {
			return c[n] ? c[n].apply(this) : c.aggregate();
		}),
		(n[i].settings = { resizeThrottle: 200, scrollThrottle: 100 }),
		h.load(function () {
			n[i]('refresh');
		});
})(jQuery, 'waypoint', 'waypoints', window); // jquery/jquery.jcountdown-1.4.2.js

(function (n) {
	n.fn.countdown = function (t) {
		var v = {
				date: null,
				updateTime: 1e3,
				htmlTemplate:
					"%d <span class='cd-time'>days</span> %h <span class='cd-time'>hours</span> %i <span class='cd-time'>mins</span> %s <span class='cd-time'>sec</span>",
				minus: !1,
				onChange: null,
				onComplete: null,
				onResume: null,
				onPause: null,
				leadingZero: !1,
				offset: null,
				servertime: null,
				hoursOnly: !1,
				minsOnly: !1,
				secsOnly: !1,
				weeks: !1,
				hours: !1,
				yearsAndMonths: !1,
				direction: 'down',
				stopwatch: !1,
			},
			w = Array.prototype.slice,
			i = window.clearInterval,
			rt = Math.floor,
			o = 36e5,
			d = 31556926,
			g = 2629743.83,
			b = 604800,
			r = 86400,
			k = 3600,
			nt = 60,
			y = 1,
			ut = /(%y|%m|%w|%d|%h|%i|%s)/g,
			tt = /%y/,
			it = /%m/,
			a = /%w/,
			l = /%d/,
			c = /%h/,
			h = /%i/,
			p = /%s/,
			u = function (n) {
				var i = new Date(),
					t = n.data('jcdData');
				return t ? ((i = t.offset !== null ? s(t.offset) : s(null, t.difference)), i.setMilliseconds(0), i) : new Date();
			},
			s = function (n, t) {
				var u,
					r,
					f,
					i = new Date();
				return (
					n === null
						? (r = i.getTime() - t)
						: ((u = n * o), (f = i.getTime() - (-i.getTimezoneOffset() / 60) * o + u), (r = i.setTime(f))),
					new Date(r)
				);
			},
			e = function () {
				var st = this,
					lt,
					ct,
					w,
					at,
					ft,
					et,
					v,
					t,
					f,
					e,
					s,
					ht = '',
					ot,
					o = function (n) {
						var t;
						return (t = rt(ot / n)), (ot -= t * n), t;
					},
					n = st.data('jcdData');
				if (!n) return !1;
				(lt = n.htmlTemplate),
					(ct = u(st)),
					(w = n.dateObj),
					w.setMilliseconds(0),
					(at = n.direction === 'down' ? w.getTime() - ct.getTime() : ct.getTime() - w.getTime()),
					(ot = Math.round(at / 1e3)),
					(t = o(r)),
					(f = o(k)),
					(e = o(nt)),
					(s = o(y)),
					n.yearsAndMonths && ((ot += t * r), (ft = o(d)), (et = o(g)), (t = o(r))),
					n.weeks && ((ot += t * r), (v = o(b)), (t = o(r))),
					n.hoursOnly && ((f += t * 24), (t = 0)),
					n.minsOnly && ((e += f * 60 + t * 1440), (t = f = 0)),
					n.secsOnly && ((s += e * 60), (t = f = e = 0)),
					(n.yearsLeft = ft),
					(n.monthsLeft = et),
					(n.weeksLeft = v),
					(n.daysLeft = t),
					(n.hrsLeft = f),
					(n.minsLeft = e),
					(n.secLeft = s),
					s === 60 && (s = 0),
					n.leadingZero &&
						(t < 10 && !n.hoursOnly && (t = '0' + t),
						ft < 10 && (ft = '0' + ft),
						et < 10 && (et = '0' + et),
						v < 10 && (v = '0' + v),
						f < 10 && (f = '0' + f),
						e < 10 && (e = '0' + e),
						s < 10 && (s = '0' + s)),
					(n.direction === 'down' && (ct < w || n.minus)) || (n.direction === 'up' && (w < ct || n.minus))
						? ((ht = lt.replace(tt, ft).replace(it, et).replace(a, v)),
						  (ht = ht.replace(l, t).replace(c, f).replace(h, e).replace(p, s)))
						: ((ht = lt.replace(ut, '00')), (n.hasCompleted = !0)),
					st.html(ht).trigger('change.jcdevt', [n]).trigger('countChange', [n]),
					n.hasCompleted && (st.trigger('complete.jcdevt').trigger('countComplete'), i(n.timer)),
					st.data('jcdData', n);
			},
			f = {
				init: function (t) {
					var i = n.extend({}, v, t),
						u,
						r;
					return this.each(function () {
						var o = n(this),
							f = {},
							h,
							s;
						if ((o.data('jcdData') && (o.countdown('changeSettings', t, !0), (i = o.data('jcdData'))), i.date === null))
							return n.error('No Date passed to jCountdown. date option is required.'), !0;
						if (
							((r = new Date(i.date)),
							r.toString() === 'Invalid Date' && n.error('Invalid Date passed to jCountdown: ' + i.date),
							(r = null),
							i.onChange)
						)
							o.on('change.jcdevt', i.onChange);
						if (i.onComplete) o.on('complete.jcdevt', i.onComplete);
						if (i.onPause) o.on('pause.jcdevt', i.onPause);
						if (i.onResume) o.on('resume.jcdevt', i.onResume);
						(f = n.extend({}, i)),
							(f.originalHTML = o.html()),
							(f.dateObj = new Date(i.date)),
							(f.hasCompleted = !1),
							(f.timer = 0),
							(f.yearsLeft = f.monthsLeft = f.weeksLeft = f.daysLeft = f.hrsLeft = f.minsLeft = f.secLeft = 0),
							(f.difference = null),
							i.servertime !== null &&
								((u = new Date()),
								(s = n.isFunction(f.servertime) ? f.servertime() : f.servertime),
								(f.difference = u.getTime() - s),
								(s = null)),
							(h = n.proxy(e, o)),
							(f.timer = setInterval(h, f.updateTime)),
							o.data('jcdData', f),
							h();
					});
				},
				changeSettings: function (t, r) {
					return this.each(function () {
						var f = n(this),
							u,
							s,
							o = n.proxy(e, f);
						if (!f.data('jcdData')) return !0;
						if (
							((u = n.extend({}, f.data('jcdData'), t)),
							t.hasOwnProperty('date') &&
								((s = new Date(t.date)),
								s.toString() === 'Invalid Date' && n.error('Invalid Date passed to jCountdown: ' + t.date)),
							(u.completed = !1),
							(u.dateObj = new Date(t.date)),
							i(u.timer),
							f.off('.jcdevt').data('jcdData', u),
							!r)
						) {
							if (u.onChange) f.on('change.jcdevt', u.onChange);
							if (u.onComplete) f.on('complete.jcdevt', u.onComplete);
							if (u.onPause) f.on('pause.jcdevt', u.onPause);
							if (u.onResume) f.on('resume.jcdevt', u.onResume);
							(u.timer = setInterval(o, u.updateTime)), f.data('jcdData', u), o();
						}
						u = null;
					});
				},
				resume: function () {
					return this.each(function () {
						var i = n(this),
							t = i.data('jcdData'),
							f = n.proxy(e, i),
							o,
							r;
						if (!t) return !0;
						i.data('jcdData', t).trigger('resume.jcdevt', [t]).trigger('countResume', [t]),
							t.hasCompleted ||
								((t.timer = setInterval(f, t.updateTime)),
								t.stopwatch &&
									t.direction === 'up' &&
									((o = u(i).getTime() - t.pausedAt.getTime()),
									(r = new Date()),
									r.setTime(t.dateObj.getTime() + o),
									(t.dateObj = r)),
								f());
					});
				},
				pause: function () {
					return this.each(function () {
						var r = n(this),
							t = r.data('jcdData');
						if (!t) return !0;
						t.stopwatch && (t.pausedAt = u(r)),
							i(t.timer),
							r.data('jcdData', t).trigger('pause.jcdevt', [t]).trigger('countPause', [t]);
					});
				},
				complete: function () {
					return this.each(function () {
						var r = n(this),
							t = r.data('jcdData');
						if (!t) return !0;
						i(t.timer),
							(t.hasCompleted = !0),
							r.data('jcdData', t).trigger('complete.jcdevt').trigger('countComplete', [t]).off('.jcdevt');
					});
				},
				destroy: function () {
					return this.each(function () {
						var r = n(this),
							t = r.data('jcdData');
						if (!t) return !0;
						i(t.timer), r.off('.jcdevt').removeData('jcdData').html(t.originalHTML);
					});
				},
				getSettings: function (t) {
					var r = n(this),
						i = r.data('jcdData');
					return t && i ? (i.hasOwnProperty(t) ? i[t] : undefined) : i;
				},
			};
		if (f[t]) return f[t].apply(this, w.call(arguments, 1));
		if (typeof t != 'object' && t) n.error('Method ' + t + ' does not exist in the jCountdown Plugin');
		else return f.init.apply(this, arguments);
	};
})(jQuery); // Thumbnails.js

var RbxThumbs = {
	pauseBetweenRequests: 3e3,
	maxRetries: 8,
	waitAndRetry: function (n) {
		setTimeout(function () {
			RbxThumbs.reloadImage(n);
		}, RbxThumbs.pauseBetweenRequests);
	},
	reloadImage: function (n) {
		var i = n.data('retry-url'),
			t = n.data('retry-count');
		t || (t = 0),
			t++,
			n.data('retry-count', t),
			$.getJSON(i, function (t) {
				if (t.Final) RbxThumbs.setImage(n, t);
				else {
					var r = n.data('retry-count'),
						i = $.contains($.mobile.activePage[0], n[0]);
					i && r < RbxThumbs.maxRetries ? RbxThumbs.waitAndRetry(n) : RbxThumbs.setImage(n, t);
				}
			});
	},
	setImage: function (n, t) {
		$('<img />')
			.attr('src', t.Url)
			.load(function () {
				n.removeAttr('data-retry-url'),
					n.hide(),
					n.removeClass('spinner'),
					setTimeout(function () {
						n.attr('src', t.Url), n.show();
					}, 10);
			});
	},
	process: function (n) {
		var t = n.find('img.spinner[data-retry-url]');
		t.each(function () {
			var n = $(this);
			RbxThumbs.waitAndRetry(n);
		});
	},
};
$(document).on('pageinit', 'div[data-role=page, data-role=dialog]', function () {
	var n = $(this);
	RbxThumbs.process(n);
}); // ListPage.js

function configureListPage(n, t, i) {
	function l() {
		u.length <= 0 ||
			u.waypoint(function () {
				o(!1);
			}, v);
	}
	function c() {
		(f.startRow = 0),
			t &&
				$.each(t, function (n, t) {
					f[n] = typeof t == 'function' ? t() : t;
				});
	}
	function o(n, t) {
		if (!s && (e.hasClass('ui-page-active') || t === !0)) {
			(s = !0),
				n
					? ($.mobile.showPageLoadingMsg('b', 'Searching...', !0), c(r))
					: ((f.startRow = r.find('li:not([data-load-more])').length), u.find('h3').html('&nbsp;'), u.addClass('load-spinner'));
			var o = $.param(f),
				i = a + '?' + o;
			$.get(i, function (t) {
				u.remove(),
					n ? r.html(t) : r.append(t),
					r.listview('refresh'),
					$.mobile.hidePageLoadingMsg(),
					(s = !1),
					(u = r.find('li[data-load-more]')),
					l(),
					RbxThumbs.process(r);
			});
		}
	}
	var f = {},
		e = $(n),
		r = e.find('ul[data-results-list]'),
		a = r.data('action-url'),
		u = r.find('li[data-load-more]'),
		s = !1,
		v = {
			offset: function () {
				return $.waypoints('viewportHeight') + 200;
			},
			triggerOnce: !0,
		},
		h;
	i && c(),
		(h = e.find('form[data-search-form]')),
		h.submit(function () {
			o(!0);
			var n = h.find('input[data-search-keyword]');
			return n.blur(), !1;
		});
	r.on('click', 'a[data-load-more-link]', function () {
		o(!1);
	});
	e.on('pagebeforehide', function () {
		$.waypoints().waypoint('destroy');
	});
	e.on('pageshow', function () {
		l();
	});
	return o;
} // GoogleAnalytics.js

var _gaq = _gaq || [];
(function () {
	var n = document.createElement('script'),
		i,
		t;
	(n.type = 'text/javascript'),
		(n.async = !0),
		(n.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'),
		(i = document.getElementsByTagName('script')[0]),
		i.parentNode.insertBefore(n, i),
		(t = !1);
	$(document).on('pageshow', 'div[data-role=page], div[data-role=dialog]', function () {
		var e, f, i, r, n, u;
		try {
			t ||
				((e = $(document.body).data('ga-key')),
				(f = $(document.body).data('ga-devicename')),
				_gaq.push(['_setAccount', e]),
				_gaq.push(['_setCustomVar', 1, 'AppDeviceType', f, 1]),
				(t = !0)),
				(i = $(this)),
				(r = i.data('role')),
				r == 'page'
					? ((n = location.hash), n && n.length > 1 ? _gaq.push(['_trackPageview', n.substr(1)]) : _gaq.push(['_trackPageview']))
					: r == 'dialog' && ((u = i.data('url')), _gaq.push(['_trackPageview', u]));
		} catch (o) {}
	});
})(); // Menu.js

var RbxMenu = {
	menu: null,
	visible: !1,
	clickEvent: 'click',
	initMenu: function () {
		(RbxMenu.menu = $('#menu')), (RbxMenu.screen = $('#screen-cover'));
		var n = RbxMenu.menu.find('li > a');
		n.on('vmousedown', function () {
			$(this).addClass('touch');
		});
		n.on('vmouseup touchmove', function () {
			n.removeClass('touch');
		});
		RbxMenu.screen.on('tap click', function (n) {
			n.preventDefault(), n.stopPropagation(), RbxMenu.hide();
		});
		$(document.documentElement).keyup(function (n) {
			n.which == 27 && (RbxMenu.visible ? RbxMenu.hide() : RbxMenu.show(), n.preventDefault(), n.stopPropagation());
		});
	},
	fixSize: function () {
		var n = $('div.ui-page-active'),
			u = n.find('div.wrapper'),
			i,
			r,
			t;
		RbxMenu.visible
			? ((i = window.innerWidth),
			  u.width(i),
			  (r = i - 170),
			  n.width(r),
			  (t = $(document).height()),
			  n.height(t),
			  RbxMenu.menu.height(t),
			  RbxMenu.screen.width(r),
			  RbxMenu.screen.height(t))
			: (n.width('100%'), n.height('auto'), u.width('100%'), RbxMenu.menu.height('auto'));
	},
	hide: function () {
		(RbxMenu.visible = !1), RbxMenu.fixSize(), $(document.body).removeClass('menu-open'), RbxMenu.menu.hide(), RbxMenu.screen.hide();
	},
	show: function () {
		(RbxMenu.visible = !0), RbxMenu.menu.show(), RbxMenu.screen.show(), $(document.body).addClass('menu-open'), RbxMenu.fixSize();
	},
};
(navigator.userAgent.match(/(iPad|iPhone|iPod)/i) || (navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Chrome/i))) &&
	(RbxMenu.clickEvent = 'tap');
$(window).on('resize orientationchange', RbxMenu.fixSize);
$(function () {
	RbxMenu.initMenu();
});
$(document).on('pageinit', 'div[data-role=page]', function () {
	var t = $(this),
		n = t.find('a[data-show-menu-link]');
	n.on(RbxMenu.clickEvent, function (t) {
		t.preventDefault(), t.stopPropagation(), RbxMenu.show(), n.blur();
	});
	t.find('div.ui-header').on('swiperight', RbxMenu.show);
});
$(document).on('pagebeforechange', function () {
	RbxMenu.visible && RbxMenu.hide();
}); // UpdateHeaderAlerts.js

var RbxAlerts = {
	updateCounts: function (n, t) {
		var i = n.find('.count');
		t <= 0 ? (i.hide(), i.text(t), n.addClass('dim')) : (i.show(), i.text(t), n.removeClass('dim'));
	},
	updateHeaderAlertsHelper: function (n) {
		var t = $(document.body).find('div[data-role=header]').find('div.header-icons'),
			r = t.find('a[data-alerts-friend-requests]'),
			i = t.find('a[data-alerts-messages-unread]');
		RbxAlerts.updateCounts(r, n.friendRequests), RbxAlerts.updateCounts(i, n.messagesUnread);
	},
};
$(document).on('pageinit', 'div[data-role=page]', function () {
	var u = $(this),
		n = u.find('div[data-role=header]').find('div.header-icons'),
		f = n.find('a[data-alerts-friend-requests]'),
		e = n.find('a[data-alerts-messages-unread]'),
		o = parseInt(f.find('span.count').text()),
		i = parseInt(e.find('span.count').text()),
		r = { friendRequests: o, messagesUnread: i },
		t;
	RbxAlerts.updateHeaderAlertsHelper(r), (t = n.find('a'));
	t.on('vmousedown', function () {
		$(this).addClass('touch');
	});
	t.on('vmouseup', function () {
		$(this).removeClass('touch');
	});
}); // pages/BasicListPages.js

$(document).on('pageinit', '#friends-page, #friend-requests-page, #inbox-page, #group-profile-page, #private-sales-page', function () {
	configureListPage(this);
}); // pages/CatalogSearch.js

$(document).on('pageinit', '#catalog-search-page', function () {
	var n = $(this),
		i = configureListPage(this, {
			keyword: function () {
				return n.find('input[data-search-keyword]').val();
			},
			filter: function () {
				return n.find('select[data-search-filter]').val();
			},
		}),
		t = n.find('select[data-search-filter]');
	t.change(function () {
		i(!0);
	});
}); // pages/GroupProfile.js

$(document).on('pageinit', '#group-profile-page', function () {
	var r = $(this),
		t = r.find('a[data-join-group]'),
		u = t.data('action-url'),
		n,
		i;
	t.click(function () {
		$.mobile.showPageLoadingMsg('b', 'Sending...', !0),
			$.post(u, function (n) {
				$.mobile.hidePageLoadingMsg(),
					n == 'joined'
						? ($.mobile.showPageLoadingMsg('b', 'Joined', !0),
						  setTimeout($.mobile.hidePageLoadingMsg, 700),
						  $.mobile.changePage(window.location.pathname, { reloadPage: !0 }))
						: n == 'sent' &&
						  ($.mobile.showPageLoadingMsg('b', 'Join request sent', !0),
						  setTimeout($.mobile.hidePageLoadingMsg, 700),
						  t.addClass('ui-disabled'),
						  t.find('.ui-btn-text').text('Join request sent'));
			});
	}),
		(n = r.find('form[data-post-on-wall]')),
		(i = r.find('ul[data-results-list]')),
		n.submit(function () {
			var r = n.serialize(),
				t = n.attr('action');
			return (
				$.mobile.showPageLoadingMsg('b', 'Posting...', !0),
				$.post(t, r, function (t) {
					t == 'failed'
						? $.mobile.showPageLoadingMsg('b', "Couldn't post", !0)
						: ($.mobile.showPageLoadingMsg('b', 'Posted', !0), i.prepend(t), i.listview('refresh')),
						setTimeout($.mobile.hidePageLoadingMsg, 700),
						n.find('textarea').val('');
				}),
				n.find('input[type=submit]').focus(),
				!1
			);
		});
}); // pages/GroupSearch.js

$(document).on('pageinit', '#group-search-page', function () {
	var n = $(this);
	configureListPage(this, {
		keyword: function () {
			return n.find('input[data-search-keyword]').val();
		},
	});
}); // pages/Home.js

$(document).on('pageinit', '#my-home-page', function () {
	var n = $(this).find('form');
	n.submit(function () {
		var i = n.serialize(),
			t = n.attr('action');
		return (
			$.mobile.showPageLoadingMsg('b', 'Updating Status...', !0),
			$.post(t, i, function () {
				$.mobile.showPageLoadingMsg('b', 'Status Updated', !0), setTimeout($.mobile.hidePageLoadingMsg, 700);
			}),
			n.find('input[type=submit]').focus(),
			!1
		);
	});
}); // pages/Inventory.js

$(document).on('pageinit', '#inventory-page', function () {
	var n = $('#inventory-page-asset-id'),
		i = {
			assetTypeId: function () {
				return n.val();
			},
		},
		t = configureListPage(this, i, !0);
	n.change(function () {
		t(!0);
	});
}); // pages/ItemPage.js

$(document).on('pageinit', '#item-page', function () {
	var i = $(this),
		u = i.find('div[data-character-customization]'),
		f = i.find('select[data-name=wearing]'),
		n,
		r,
		t;
	f.change(function () {
		var t = u.children().serialize(),
			n = u.data('url');
		$.post(n, t, null);
	}),
		(n = i.find('span[data-countdown]')),
		n.length &&
			((r = Number(n.data('seconds-from-now'))),
			(t = new Date()),
			t.setSeconds(t.getSeconds() + Math.round(r)),
			n.countdown({ date: t, htmlTemplate: '%d days %h:%i:%s', leadingZero: !0 })),
		$('.fadeIn').fadeIn(1e3);
}); // pages/Profile.js

$(document).on('pageinit', '#profile-page', function () {
	var i = $(this),
		n = i.find('div[data-best-friends]'),
		r = n.find('select[data-name=status]'),
		t;
	r.change(function () {
		var i = n.children().serialize(),
			t = n.data('url');
		$.post(t, i, null);
	}),
		location.href.toString().indexOf('followUserNow') >= 1 &&
			(window.location = $('div[data-follow-start-url]').data('follow-start-url')),
		(t = $('#SendFriendRequest')),
		t.click(function () {
			$('#SendFriendRequestForm').submit();
		});
}); // pages/PurchaseConfirmationModal.js

$(document).on('pageshow', '#item-purchase-confirmation', function () {
	var f = $(this),
		n = f.find('div[data-purchase-info]'),
		r,
		u;
	if (n.length) {
		var e = n.data('asset-id'),
			o = e.toString(),
			i = n.data('price'),
			t;
		n.data('private-sale') == !0
			? (t = 'UserSale')
			: ((r = n.data('currency-type')), (u = r == 1 ? 'Robux' : 'Tickets'), (t = i == 0 ? 'TakeFreeItem' : 'PurchaseWith' + u)),
			_gaq.push(['_trackEvent', 'Catalog', t, o, i]);
	}
}); // pages/RemoveFriendModal.js

$(document).on('pageshow', '#remove-friend-modal', function () {
	var n = $(this),
		t = n.data('user-id');
	n.find('a[data-remove-friend-yes]').on('click', function () {
		var n = $(this),
			r = n.data('url'),
			i = n.data('href');
		$.mobile.showPageLoadingMsg('b', 'Working...', !0),
			$.post(r, { id: t }, function () {
				$.mobile.showPageLoadingMsg('b', 'Removed', !0),
					setTimeout($.mobile.hidePageLoadingMsg, 700),
					$.mobile.changePage(i, { reloadPage: !0 });
			});
	});
}); // pages/UserSearch.js

$(document).on('pageinit', '#user-search-page', function () {
	var n = $(this),
		t = configureListPage(this, {
			keyword: function () {
				return n.find('input[data-search-keyword]').val();
			},
		});
	n.find('input[data-search-keyword]').val() != '' && t(!0, !0);
});
