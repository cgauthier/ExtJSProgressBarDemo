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
	initComponent: function() {
		var me = this;

		me.title = "My Account Page";
		me.layout = {
			type: "fit"
		};
		me.bodyPadding = "20";
		me.html = "Sample Demo answering Question number 31 in Test for ExtJS developer position";
		
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
									xtype: 'box',
									flex: 1,
									html: "^<br/><span id='targetNum'></span>",
									style: "text-align: center; font-weight:bold;"
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
									htmlTpl: "<span class='fa fa-info-circle'></span> You need ${0} more to reach you target.",
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
									listeners: {
										click: function(btn) {
											var x, start = 56, target = 125, progVal, diff = target - start, me = this, cmp = me.win;
											
											var successCmp = cmp.down('box[target="success"]');
											var diffCmp = cmp.down('box[target="diff"]');
											successCmp.setHtml("Target<br/>$" + target);
											diffCmp.setHtml(Ext.String.format(diffCmp.htmlTpl, diff));
											x = start;
											
											var intervalId = setInterval(function() {
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
													clearInterval(intervalId);
												}
											}, 100);											
										},
										scope: me
									}
								}]
							},
							
							listeners: {
								afterrender: {
									fn: function(cmp) {
										
										me.progressBar = Ext.create('Ext.ProgressBar', {
											renderTo: cmp.down('box[target="progress"]').getEl(),
											height: 100,
											animate: true,
											textEl: "targetNum"
										});						
										var x, start = 0, stop = 56, target = 125, progVal, diff = target - start;
										
										var successCmp = cmp.down('box[target="success"]');
										var diffCmp = cmp.down('box[target="diff"]');
										successCmp.setHtml("Target<br/>$" + target);
										diffCmp.setHtml(Ext.String.format(diffCmp.htmlTpl, diff));
										x = start;
										
										var intervalId = setInterval(function() {
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
											if(x == 56) {
												me.progressBar.updateText("$56");
												clearInterval(intervalId);
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