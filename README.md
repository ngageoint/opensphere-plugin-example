# opensphere-plugin-example

This is an example of an external plugin to [OpenSphere](https://github.com/ngageoint/opensphere). 

## Getting Started

For ease of development, we have created [opensphere-yarn-workspace](https://github.com/ngageoint/opensphere-yarn-workspace) which assists in developing across multiple projects.

After you set that up, your directory structure should look like this:
```
opensphere-yarn-workspace/ # your clone of opensphere-yarn-workspace
  workspace/
    opensphere/ # your clone of OpenSphere
```

This project has all the basic boilerplate for getting a plugin project started. Clone it into the workspace as a sibling to OpenSphere.

```
opensphere-yarn-workspace/
  workspace/
    opensphere/
    opensphere-plugin-example
```

Now rename it to `opensphere-plugin-whatever-you-like`. Just do not forget to update its name in `package.json` also! 

Run `yarn` to install dependencies. Afterward, you can run tests with `yarn test`, however, the build itself still takes place in the `opensphere` project. Jump back to that project and use `yarn build` to pick up your plugin. Then view OpenSphere in your browser as you normally would.

## Plugin Tests

This includes the same (slightly old now) Karma and Jasmine versions as the main OpenSphere project. However, you can change those to whatever you like! Just take note of how (`karma.conf.js`)[https://github.com/ngageoint/opensphere-plugin-example/blob/master/karma.conf.js] is picking up the included files in the `closureFiles` variable and then passing those to the Karma config. You will need to do something similar for configuring other test runners.
