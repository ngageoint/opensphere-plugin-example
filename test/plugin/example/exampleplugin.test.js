// os.mock sets up a bunch of basic opensphere APIs, like settings, which is
// used in our example plugin
goog.require('os.mock');
goog.require('plugin.example.ExamplePlugin');

describe('plugin.example.ExamplePlugin', function() {
  it('should have the proper ID', function() {
    expect(new plugin.example.ExamplePlugin().id).toBe('example');
  });

  it('should alert the user with a message', function() {
    spyOn(window, 'alert');
    var p = new plugin.example.ExamplePlugin();
    p.init();
    expect(window.alert).toHaveBeenCalled();
  });
});
