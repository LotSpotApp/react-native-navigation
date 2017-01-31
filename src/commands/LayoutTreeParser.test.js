import * as SimpleLayouts from './SimpleLayouts';

describe('LayoutTreeParser', () => {
  let uut;

  beforeEach(() => {
    const uniqueIdProvider = { generate: (prefix) => `${prefix}+UNIQUE_ID` };
    const LayoutTreeParser = require('./LayoutTreeParser').default;
    uut = new LayoutTreeParser(uniqueIdProvider);
  });

  it('adds uniqueId to containers', () => {
    const input = { container: {} };
    expect(uut.parseFromSimpleJSON(input))
      .toEqual({
        type: 'ContainerStack',
        id: 'ContainerStack+UNIQUE_ID',
        children: [
          {
            type: 'Container',
            id: 'Container+UNIQUE_ID',
            data: {},
            children: []
          }
        ],
        data: {}
      });
  });

  it('deep clones to avoid mutations', () => {
    const obj = {};
    const result = uut.parseFromSimpleJSON({ container: { foo: obj } });
    expect(result.children[0].data.foo).not.toBe(obj);
  });

  it('parses single screen', () => {
    expect(uut.parseFromSimpleJSON(SimpleLayouts.singleScreenApp))
      .toEqual({
        type: 'ContainerStack',
        id: 'ContainerStack+UNIQUE_ID',
        data: {},
        children: [
          {
            type: 'Container',
            id: 'Container+UNIQUE_ID',
            data: {
              name: 'com.example.MyScreen'
            },
            children: []
          }
        ]
      });
  });

  it('parses single screen with props', () => {
    expect(uut.parseFromSimpleJSON(SimpleLayouts.singleScreenWithAditionalParams))
      .toEqual({
        type: 'ContainerStack',
        id: 'ContainerStack+UNIQUE_ID',
        data: {},
        children: [
          {
            type: 'Container',
            id: 'Container+UNIQUE_ID',
            children: [],
            data: {
              name: 'com.example.MyScreen',
              passProps: SimpleLayouts.passProps,
              style: {},
              buttons: {}
            }
          }
        ]
      });
    const parsedPropsFn = uut.parseFromSimpleJSON(SimpleLayouts.singleScreenWithAditionalParams)
      .children[0].data.passProps.fnProp;
    expect(parsedPropsFn).toBe(SimpleLayouts.passProps.fnProp);
    expect(parsedPropsFn()).toEqual('Hello from a function');
  });

  it('parses tab based', () => {
    expect(uut.parseFromSimpleJSON(SimpleLayouts.tabBasedApp))
      .toEqual({
        type: 'Tabs',
        id: 'Tabs+UNIQUE_ID',
        data: {},
        children: [
          {
            type: 'ContainerStack',
            id: 'ContainerStack+UNIQUE_ID',
            data: {},
            children: [
              {
                type: 'Container',
                id: 'Container+UNIQUE_ID',
                children: [],
                data: {
                  name: 'com.example.ATab'
                }
              }
            ]
          },
          {
            type: 'ContainerStack',
            id: 'ContainerStack+UNIQUE_ID',
            data: {},
            children: [
              {
                type: 'Container',
                id: 'Container+UNIQUE_ID',
                children: [],
                data: {
                  name: 'com.example.SecondTab'
                }
              }
            ]
          },
          {
            type: 'ContainerStack',
            id: 'ContainerStack+UNIQUE_ID',
            data: {},
            children: [
              {
                type: 'Container',
                id: 'Container+UNIQUE_ID',
                children: [],
                data: {
                  name: 'com.example.ATab'
                }
              }
            ]
          }
        ]
      });
  });

  it('parses side menus', () => {
    expect(uut.parseFromSimpleJSON(SimpleLayouts.singleWithSideMenu))
      .toEqual({
        type: 'SideMenuRoot',
        id: 'SideMenuRoot+UNIQUE_ID',
        data: {},
        children: [
          {
            type: 'SideMenuLeft',
            id: 'SideMenuLeft+UNIQUE_ID',
            data: {},
            children: [
              {
                type: 'Container',
                id: 'Container+UNIQUE_ID',
                data: {
                  name: 'com.example.SideMenu'
                },
                children: []
              }
            ]
          },
          {
            type: 'SideMenuCenter',
            id: 'SideMenuCenter+UNIQUE_ID',
            data: {},
            children: [
              {
                type: 'ContainerStack',
                id: 'ContainerStack+UNIQUE_ID',
                data: {},
                children: [
                  {
                    type: 'Container',
                    id: 'Container+UNIQUE_ID',
                    data: {
                      name: 'com.example.MyScreen'
                    },
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      });
  });

  it('parses side menu right', () => {
    expect(uut.parseFromSimpleJSON(SimpleLayouts.singleWithRightSideMenu))
      .toEqual({
        type: 'SideMenuRoot',
        id: 'SideMenuRoot+UNIQUE_ID',
        data: {},
        children: [
          {
            type: 'SideMenuCenter',
            id: 'SideMenuCenter+UNIQUE_ID',
            data: {},
            children: [
              {
                type: 'ContainerStack',
                id: 'ContainerStack+UNIQUE_ID',
                data: {},
                children: [
                  {
                    type: 'Container',
                    id: 'Container+UNIQUE_ID',
                    data: {
                      name: 'com.example.MyScreen'
                    },
                    children: []
                  }
                ]
              }
            ]
          },
          {
            type: 'SideMenuRight',
            id: 'SideMenuRight+UNIQUE_ID',
            data: {},
            children: [
              {
                type: 'Container',
                id: 'Container+UNIQUE_ID',
                data: {
                  name: 'com.example.SideMenu'
                },
                children: []
              }
            ]
          }
        ]
      });
  });

  it('parses both side menus', () => {
    expect(uut.parseFromSimpleJSON(SimpleLayouts.singleWithBothMenus))
      .toEqual({
        type: 'SideMenuRoot',
        id: 'SideMenuRoot+UNIQUE_ID',
        data: {},
        children: [
          {
            type: 'SideMenuLeft',
            id: 'SideMenuLeft+UNIQUE_ID',
            data: {},
            children: [
              {
                type: 'Container',
                id: 'Container+UNIQUE_ID',
                data: {
                  name: 'com.example.Menu1'
                },
                children: []
              }
            ]
          },
          {
            type: 'SideMenuCenter',
            id: 'SideMenuCenter+UNIQUE_ID',
            data: {},
            children: [
              {
                type: 'ContainerStack',
                id: 'ContainerStack+UNIQUE_ID',
                data: {},
                children: [
                  {
                    type: 'Container',
                    id: 'Container+UNIQUE_ID',
                    data: {
                      name: 'com.example.MyScreen'
                    },
                    children: []
                  }
                ]
              }
            ]
          },
          {
            type: 'SideMenuRight',
            id: 'SideMenuRight+UNIQUE_ID',
            data: {},
            children: [
              {
                type: 'Container',
                id: 'Container+UNIQUE_ID',
                data: {
                  name: 'com.example.Menu2'
                },
                children: []
              }
            ]
          }
        ]
      });
  });

  it('parses tabs with side menus', () => {
    expect(uut.parseFromSimpleJSON(SimpleLayouts.tabBasedWithBothSideMenus))
      .toEqual({
        type: 'SideMenuRoot',
        id: 'SideMenuRoot+UNIQUE_ID',
        data: {},
        children: [
          {
            type: 'SideMenuLeft',
            id: 'SideMenuLeft+UNIQUE_ID',
            data: {},
            children: [
              {
                type: 'Container',
                id: 'Container+UNIQUE_ID',
                data: {
                  name: 'com.example.Menu1'
                },
                children: []
              }
            ]
          },
          {
            type: 'SideMenuCenter',
            id: 'SideMenuCenter+UNIQUE_ID',
            data: {},
            children: [
              {
                type: 'Tabs',
                id: 'Tabs+UNIQUE_ID',
                data: {},
                children: [
                  {
                    type: 'ContainerStack',
                    id: 'ContainerStack+UNIQUE_ID',
                    data: {},
                    children: [
                      {
                        type: 'Container',
                        id: 'Container+UNIQUE_ID',
                        data: {
                          name: 'com.example.FirstTab'
                        },
                        children: []
                      }
                    ]
                  },
                  {
                    type: 'ContainerStack',
                    id: 'ContainerStack+UNIQUE_ID',
                    data: {},
                    children: [
                      {
                        type: 'Container',
                        id: 'Container+UNIQUE_ID',
                        data: {
                          name: 'com.example.SecondTab'
                        },
                        children: []
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: 'SideMenuRight',
            id: 'SideMenuRight+UNIQUE_ID',
            data: {},
            children: [
              {
                type: 'Container',
                id: 'Container+UNIQUE_ID',
                data: {
                  name: 'com.example.Menu2'
                },
                children: []
              }
            ]
          }
        ]
      });
  });
});