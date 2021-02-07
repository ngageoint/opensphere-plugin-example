// os.mock sets up a bunch of basic opensphere APIs, like settings, which is
// used in our example plugin
goog.require('os.mock');
goog.require('plugin.example.ExamplePlugin');

describe('plugin.example.ExamplePlugin', function() {
  const ExamplePlugin = goog.module.get('plugin.example.ExamplePlugin');
  it('should have the proper ID', function() {
    expect(new ExamplePlugin().id).toBe('example');
  });

  it('should alert the user with a message', function() {
    spyOn(window, 'alert');
    const p = new ExamplePlugin();
    p.init();
    expect(window.alert).toHaveBeenCalled();
  });
});
