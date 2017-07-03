/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'ProgressDemo.Application',

    name: 'ProgressDemo',

    requires: [
        // This will automatically load all classes in the ProgressDemo namespace
        // so that application classes do not need to require each other.
        'ProgressDemo.*'
    ],

    // The name of the initial view to create.
    mainView: 'ProgressDemo.view.main.Main'
});
