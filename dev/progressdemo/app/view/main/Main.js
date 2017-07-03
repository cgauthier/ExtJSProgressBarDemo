/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('ProgressDemo.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.Window',
		'Ext.ProgressBar',
		'Ext.toolbar.Toolbar',
		'Ext.button.Button',
		'Ext.layout.container.HBox',
		'Ext.container.Container',
		'Ext.Component',
		'Ext.layout.container.Fit',
		'Ext.layout.container.VBox'
		
    ],

	progressBar: null,
	win: null,
	intervalId: null,
	initComponent: function() {
		var me = this;

		me.title = "My Account Page";
		me.layout = {
			type: "fit"
		};
		me.bodyPadding = "20";
		me.html = "Sample Demo demonstrating the use of a ProgressBar widget in ExtJS 6.5.0";
		
		me.bbar = {
			xtype: 'toolbar',
			items: [{
				xtype: "tbfill"
			}, {
				xtype: 'button',
				text: 'Verify your progress',
				listeners: {
					click: function(btn) {
						
						me.win = Ext.create('Ext.window.Window', {
							width: 600,
							height: 300,
							title: "Your Progress",
							bodyPadding: "20",
							layout: {
								type: "vbox",
								align: 'stretch'
							},
							items: [{
								xtype: 'container',
								height: 100,
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								items: [{
									xtype: 'box',
									html: "Reached: ",
									width: 80,
									style: "text-align: right; font-weight:bold; padding: 40px 5px 0px 0px;"
								}, {
									target: 'progress',
									xtype: 'box',
									flex: 1,
									html: ""
								}, {
									target: 'success',
									xtype: 'box',
									width: 100,
									html: "",
									style: "text-align: center; font-weight:bold; padding: 30px 0px 0px 0px;background-color: #cccccc; color: #ffffff;"				
								}]
							}, {
								xtype: 'container',
								height: 40,
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								items: [{
									xtype: 'box',
									html: "&nbsp;",
									width: 80
								}, {
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'auto'
									},
									items: [{
										target: "moveable",
										xtype: 'box',
										html: "<span style='text-align:center; font-weight:bold;width:30px;display:inline-block;'>^<br/><span id='targetNum'></span></span>"
									}]
								}, {
									xtype: 'box',
									width: 100,
									html: "&nbsp;"			
								}]
							}, {
								xtype: 'container',
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								items: [{
									xtype: 'box',
									html: "&nbsp;",
									width: 80
								}, {
									xtype: 'box',
									flex: 1,
									target: 'diff',
									htmlTpl: "<span class='fa fa-info-circle'></span> You need ${0} more to reach your target.",
									html: "",
									style: "text-align: center; font-weight:bold;"
								
								}, {
									xtype: 'box',
									width: 100,
									html: "&nbsp;"			
								}]
							}],
							bbar: {
								xtype: "toolbar",
								items: [{
									xtype: 'tbfill'
								}, {
									xtype: 'button',
									text: "Achieve your target",
									action: 'target',
									disabled: true,
									listeners: {
										click: function(btn) {
											btn.disable();
											var x, start = 56, target = 125, progVal, diff = target - start, me = this, cmp = me.win;
											
											var successCmp = cmp.down('box[target="success"]');
											var diffCmp = cmp.down('box[target="diff"]');
											
											successCmp.setHtml("Target<br/>$" + target);
											diffCmp.setHtml(Ext.String.format(diffCmp.htmlTpl, diff));
											x = start;
											
											me.intervalId = setInterval(function() {
												progVal = x / target;
												me.progressBar.updateProgress(progVal);
												me.progressBar.updateText("$" + x)
												diff--;
												if(diff <= 0) {
													diffCmp.setHtml("<span class='fa fa-info-circle'></span> You have reached your target! Congratulations!");
												} else {
													diffCmp.setHtml(Ext.String.format(diffCmp.htmlTpl, diff));
												}
												x++;
												if(x > target) {
													me.progressBar.updateText("$" + target);
													clearInterval(me.intervalId);
												}
											}, 100);											
										},
										scope: me
									}
								}]
							},
							
							listeners: {
								
								beforedestroy: {
									fn: function(cmp) {
										if(this.intervalId) {
											clearInterval(this.intervalId);
										}
										this.intervalId = null;
										this.win = null;
										this.progressBar = null;
										
									},
									scope: me
								},
								
								afterrender: {
									fn: function(cmp) {
										var me = this;
										var targetBtn = cmp.down('button[action="target"]');
										me.progressBar = Ext.create('Ext.ProgressBar', {
											renderTo: cmp.down('box[target="progress"]').getEl(),
											height: 100,
											animate: true,
											textEl: "targetNum",
											listeners: {
												update: {
													fn: function(pbar, value, text) {
														var pbarEl;
														var moveableEl;
														var pbarDivEl;
														if(pbar.el) {
															pbarEl = pbar.getEl();
															pbarDivEl = Ext.get(pbarEl.select('div[class~="x-progress-bar"]').elements[0]);
															moveableEl = Ext.get(pbar.win.down('box[target="moveable"]').getEl().select('span').elements[0]);
															if(moveableEl && pbarDivEl) {
																moveableEl.alignTo(pbarDivEl, "br", [-12, 0]);	
															}
														}
													},
													scope: me
												}
											},
											win: cmp
										});						
										var x, start = 0, stop = 56, target = 125, progVal, diff = target - start;
										
										var successCmp = cmp.down('box[target="success"]');
										var diffCmp = cmp.down('box[target="diff"]');
										
										successCmp.setHtml("Target<br/>$" + target);
										var updateText;
										diffCmp.setHtml(Ext.String.format(diffCmp.htmlTpl, diff));
										x = start;
										
										me.intervalId = setInterval(function() {
											progVal = x / target;
											updateText = "$" + x;
											me.progressBar.updatedText = updateText;
											me.progressBar.updateProgress(progVal);
											me.progressBar.updateText(updateText)
											diff--;
											if(diff <= 0) {
												diffCmp.setHtml("<span class='fa fa-info-circle'></span> You have reached your target! Congratulations!");
											} else {
												diffCmp.setHtml(Ext.String.format(diffCmp.htmlTpl, diff));
											}
											x++;
											if(x == 56) {
												me.progressBar.updateText("$56");
												targetBtn.enable();
												clearInterval(me.intervalId);
											}
										}, 100);
										
									},
									scope: me
								}
							}
						});
						
						me.win.show();
						
					},
					scope: me
				}
			}]
		};
		
		me.callParent(arguments);
	}
	

});
