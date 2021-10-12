goog.declareModuleId('plugin.example.ExamplePlugin');

import Settings from 'opensphere/src/os/config/settings.js';
import AbstractPlugin from 'opensphere/src/os/plugin/abstractplugin.js';
import PluginManager from 'opensphere/src/os/plugin/pluginmanager.js';

import {ID} from './example.js';

/* =========== NOTE ==========
 * If you change the package name of this particular class, be sure to modify
 * build.gcc.entry_point to match the new package/class name.
 */
/**
 * Provides a plugin example.
 */
export default class ExamplePlugin extends AbstractPlugin {
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
