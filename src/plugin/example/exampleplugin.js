goog.module('plugin.example.ExamplePlugin');

const Settings = goog.require('os.config.Settings');
const AbstractPlugin = goog.require('os.plugin.AbstractPlugin');
const PluginManager = goog.require('os.plugin.PluginManager');
const {ID} = goog.require('plugin.example');


/* =========== NOTE ==========
 * If you change the package name of this particular class, be sure to modify
 * build.gcc.entry_point to match the new package/class name.
 */

/**
 * Provides a plugin example.
 */
class ExamplePlugin extends AbstractPlugin {
  /**
   * Constructor.
   */
  constructor() {
    super();
    this.id = ID;
    this.errorMessage = null;
  }

  /**
   * @inheritDoc
   */
  init() {
    // here's where all the setup is done

    // in this initial example, we just grab our test message from config
    var msg = Settings.getInstance().get('testMessage', 'Default message from plugin.');

    alert(msg);
  }
}


// add the plugin to the application
PluginManager.getInstance().addPlugin(new ExamplePlugin());

exports = ExamplePlugin;
