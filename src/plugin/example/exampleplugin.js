goog.provide('plugin.example.ExamplePlugin');

goog.require('os.plugin.AbstractPlugin');
goog.require('os.plugin.PluginManager');


/* =========== NOTE ==========
 * If you change the package name of this particular class, be sure to modify
 * build.gcc.entry_point to match the new package/class name.
 */

/**
 * Provides a plugin example.
 * @extends {os.plugin.AbstractPlugin}
 * @constructor
 */
plugin.example.ExamplePlugin = function() {
  plugin.example.ExamplePlugin.base(this, 'constructor');
  this.id = plugin.example.ID;
  this.errorMessage = null;
};
goog.inherits(plugin.example.ExamplePlugin, os.plugin.AbstractPlugin);

/**
 * @type {string}
 * @const
 */
plugin.example.ID = 'example';

/**
 * @inheritDoc
 */
plugin.example.ExamplePlugin.prototype.init = function() {
  // here's where all the setup is done

  // in this initial example, we just grab our test message from config
  var msg = os.settings.get('testMessage', 'Default message from plugin.');

  alert(msg);
};

// add the plugin to the application
os.plugin.PluginManager.getInstance().addPlugin(new plugin.example.ExamplePlugin());
