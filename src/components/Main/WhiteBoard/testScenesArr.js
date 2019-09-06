const arr = [
  ///////////////////////////////////
  [
    {
      type: "ADD",
      info: {
        id: 1,
        component: "BotText",
        text: "Hello There! Welcome to MATH WORLD",
        fontSize: 2,
        time: 2,
        x: 30,
        y: 20,
        w: 50,
        h: 50,
        onComplete: [
          {
            type: "WB_ACTIONS",
            actions: [
              { type: "WB_ACTIONS", actions: [] },
              {
                type: "CHANGE",
                target: 1,
                changes: {
                  text: "In thie Session we will be learning Addition",
                  onComplete: [
                    {
                      type: "CHANGE",
                      target: 1,
                      time: 1,
                      changes: { x: 2, y: 2, scaleX: 0.75, scaleY: 0.75 }
                    },
                    {
                      type: "ADD",
                      info: {
                        id: 2,
                        component: "Svgs",
                        type: "plus",
                        x: 50,
                        y: -50,
                        heightOrgScale: 4
                      },
                      onComplete: [
                        {
                          type: "CHANGE",
                          target: 2,
                          time: 1,
                          changes: { y: 30 },
                          onComplete: [
                            {
                              type: "WB_ACTIONS",
                              actions: [
                                { type: "WB_ACTIONS", actions: [] },
                                {
                                  type: "CHANGE",
                                  target: 1,
                                  changes: {
                                    text: "Let's begin with a simple example",
                                    onComplete: [
                                      {
                                        type: "WB_ACTIONS",
                                        actions: [{ type: "NEXT_SCENE" }]
                                      }
                                    ]
                                  }
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    }
  ],
  /////////////////////////////////////////////
  [
    {
      type: "ADD",
      info: {
        id: 9,
        component: "BotText",
        fontSize: 3,
        text: "Click on the number above",
        side: true,
        x: -50,
        y: 50,
        h: 20,
        scaleX: 0.5,
        scaleY: 0.5
      },
      onComplete: [{ type: "CHANGE", target: 9, time: 1, changes: { x: 0 } }]
    },
    {
      type: "ADD",
      info: {
        id: 10,
        component: "Svgs",
        type: "one",
        x: -50,
        y: 30,
        heightOrgScale: 2,
        onClick: [
          {
            type: "CHANGE",
            target: 10,
            changes: {
              type: "bot",
              onClick: [
                {
                  type: "CHANGE",
                  target: 10,
                  changes: { onClick: null }
                }
              ]
            }
          },
          {
            type: "MULTI",
            id: 100,
            num: 2,
            actions: [
              {
                type: "ADD",
                info: {
                  id: 13,
                  component: "NumInput",
                  h: 10,
                  w: 80,
                  fontSize: 2,
                  x: -50,
                  y: 75,
                  question: "What is 1 + 1",
                  ans: 2,
                  onTrue: [
                    { type: "DELETE", target: 14 },
                    {
                      type: "ADD",
                      info: {
                        id: 141,
                        component: "TextBox",
                        x: 30,
                        y: -20,
                        text: "GOOD JOB",
                        fontSize: 7,
                        color: "green",
                        w: 70,
                        h: 10
                      },
                      onComplete: [
                        {
                          type: "CHANGE",
                          target: 141,
                          time: 1,
                          changes: { y: 5 },
                          onComplete: [
                            {
                              type: "CHANGE_ALL",
                              time: 1,
                              changes: { x: 150 },
                              onComplete: [{ type: "NEXT_SCENE" }]
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  onFalse: [
                    {
                      type: "ADD",
                      info: {
                        id: 14,
                        component: "TextBox",
                        x: 30,
                        y: -20,
                        text: "TRY AGAIN",
                        fontSize: 7,
                        color: "red",
                        w: 70,
                        h: 10
                      },
                      onComplete: [
                        {
                          type: "CHANGE",
                          target: 14,
                          time: 1,
                          changes: { y: 5 }
                        }
                      ]
                    },
                    {
                      type: "CHANGE",
                      target: 13,
                      time: 0,
                      changes: { onFalse: [] }
                    }
                  ]
                },
                onComplete: [
                  { type: "CHANGE", target: 13, time: 1, changes: { x: 10 } }
                ]
              }
            ]
          }
        ]
      },
      onComplete: [{ type: "CHANGE", target: 10, time: 1, changes: { x: 20 } }]
    },
    {
      type: "ADD",
      info: {
        id: 11,
        component: "Svgs",
        type: "plus",
        x: -50,
        y: 30,
        heightOrgScale: 2
      },
      onComplete: [{ type: "CHANGE", target: 11, time: 1, changes: { x: 40 } }]
    },
    {
      type: "ADD",
      info: {
        id: 12,
        component: "Svgs",
        type: "one",
        x: -50,
        y: 30,
        heightOrgScale: 2,
        onClick: [
          {
            type: "CHANGE",
            target: 12,
            time: 1,
            changes: { type: "bot", onClick: null }
          },
          { type: "MULTI", id: 100, num: 2 }
        ]
      },
      onComplete: [{ type: "CHANGE", target: 12, time: 1, changes: { x: 65 } }]
    }
  ],
  /////////////////////////////////////////////////////////////////////////////////
  [
    {
      type: "ADD",
      info: {
        id: 0,
        component: "Svgs",
        type: "three",
        x: -50,
        y: 30,
        heightOrgScale: 2,
        onClick: [
          {
            type: "DELETE",
            target: 0
          },
          {
            type: "ADD",
            info: {
              id: 10,
              component: "Svgs",
              type: "bot",
              x: 20,
              y: 30,
              heightOrgScale: 2
            },
            onComplete: [
              {
                type: "CHANGE",
                target: 10,
                time: 1,
                changes: { x: 15, y: 20 }
              }
            ]
          },
          {
            type: "ADD",
            info: {
              id: 11,
              component: "Svgs",
              type: "bot",
              x: 20,
              y: 30,
              heightOrgScale: 2
            },
            onComplete: [
              {
                type: "CHANGE",
                target: 11,
                time: 1,
                changes: { x: 25, y: 20 }
              }
            ]
          },
          {
            type: "ADD",
            info: {
              id: 12,
              component: "Svgs",
              type: "bot",
              x: 20,
              y: 30,
              heightOrgScale: 2
            },
            onComplete: [
              {
                type: "CHANGE",
                target: 12,
                time: 1,
                changes: { x: 20, y: 35 }
              }
            ]
          }
        ]
      },
      onComplete: [{ type: "CHANGE", target: 0, time: 1, changes: { x: 20 } }]
    },
    {
      type: "ADD",
      info: {
        id: 1,
        component: "Svgs",
        type: "plus",
        x: -50,
        y: 30,
        heightOrgScale: 2
      },
      onComplete: [{ type: "CHANGE", target: 1, time: 1, changes: { x: 40 } }]
    },
    {
      type: "ADD",
      info: {
        id: 2,
        component: "Svgs",
        type: "four",
        x: -50,
        y: 30,
        heightOrgScale: 2,
        onClick: [
          { type: "DELETE", target: 2 },
          {
            type: "ADD",
            info: {
              id: 20,
              component: "Svgs",
              type: "bot",
              x: 65,
              y: 30,
              heightOrgScale: 2
            },
            onComplete: [
              {
                type: "CHANGE",
                target: 20,
                time: 1,
                changes: { x: 60, y: 20 }
              }
            ]
          },
          {
            type: "ADD",
            info: {
              id: 21,
              component: "Svgs",
              type: "bot",
              x: 65,
              y: 30,
              heightOrgScale: 2
            },
            onComplete: [
              {
                type: "CHANGE",
                target: 21,
                time: 1,
                changes: { x: 70, y: 20 }
              }
            ]
          },
          {
            type: "ADD",
            info: {
              id: 22,
              component: "Svgs",
              type: "bot",
              x: 65,
              y: 30,
              heightOrgScale: 2
            },
            onComplete: [
              {
                type: "CHANGE",
                target: 22,
                time: 1,
                changes: { x: 60, y: 35 }
              }
            ]
          },
          {
            type: "ADD",
            info: {
              id: 23,
              component: "Svgs",
              type: "bot",
              x: 65,
              y: 30,
              heightOrgScale: 2
            },
            onComplete: [
              {
                type: "CHANGE",
                target: 23,
                time: 1,
                changes: { x: 70, y: 35 }
              }
            ]
          }
        ]
      },
      onComplete: [{ type: "CHANGE", target: 2, time: 1, changes: { x: 65 } }]
    },
    {
      type: "ADD",
      info: {
        id: 3,
        component: "NumInput",
        h: 10,
        w: 80,
        fontSize: 2,
        x: -50,
        y: 75,
        question: "What is 3 + 4",
        ans: 7,
        onTrue: [
          { type: "DELETE", target: 4 },
          {
            type: "ADD",
            info: {
              id: 401,
              component: "TextBox",
              x: 30,
              y: -20,
              text: "GOOD JOB",
              fontSize: 7,
              color: "green",
              w: 70,
              h: 10
            },
            onComplete: [
              {
                type: "CHANGE",
                target: 401,
                time: 1,
                changes: { y: 5 },
                onComplete: [
                  {
                    type: "CHANGE_ALL",
                    time: 1,
                    changes: { x: 150 },
                    onComplete: [{ type: "NEXT_SCENE" }]
                  }
                ]
              }
            ]
          }
        ],
        onFalse: [
          {
            type: "ADD",
            info: {
              id: 4,
              component: "TextBox",
              x: 20,
              y: -20,
              text: "DO NOT GIVE UP",
              fontSize: 7,
              color: "red",
              w: 70,
              h: 10
            },
            onComplete: [
              {
                type: "CHANGE",
                target: 4,
                time: 1,
                changes: { y: 5 }
              },
              { type: "CHANGE", target: 3, time: 0, changes: { onFalse: [] } }
            ]
          }
        ]
      },
      onComplete: [{ type: "CHANGE", target: 3, time: 1, changes: { x: 10 } }]
    }
  ],
  //TWO00000000000000000000000000000000000000000000000000
  [
    {
      type: "ADD",
      info: {
        id: 10,
        component: "Svgs",
        type: "six",
        x: -50,
        y: 30,
        heightOrgScale: 2,
        onClick: [
          { type: "DELETE", target: 10 },
          {
            type: "ADD",
            info: {
              id: 11,
              component: "Svgs",
              type: "bot",
              x: 20,
              y: 30,
              heightOrgScale: 2
            },
            onComplete: [
              { type: "CHANGE", target: 11, time: 1, changes: { x: 15, y: 7 } }
            ]
          },
          {
            type: "ADD",
            info: {
              id: 12,
              component: "Svgs",
              type: "bot",
              x: 20,
              y: 30,
              heightOrgScale: 2
            },
            onComplete: [
              { type: "CHANGE", target: 12, time: 1, changes: { x: 15, y: 20 } }
            ]
          },
          {
            type: "ADD",
            info: {
              id: 13,
              component: "Svgs",
              type: "bot",
              x: 20,
              y: 30,
              heightOrgScale: 2
            },
            onComplete: [
              { type: "CHANGE", target: 13, time: 1, changes: { x: 15, y: 33 } }
            ]
          },
          {
            type: "ADD",
            info: {
              id: 14,
              component: "Svgs",
              type: "bot",
              x: 20,
              y: 30,
              heightOrgScale: 2
            },
            onComplete: [
              { type: "CHANGE", target: 14, time: 1, changes: { x: 25, y: 7 } }
            ]
          },
          {
            type: "ADD",
            info: {
              id: 15,
              component: "Svgs",
              type: "bot",
              x: 20,
              y: 30,
              heightOrgScale: 2
            },
            onComplete: [
              { type: "CHANGE", target: 15, time: 1, changes: { x: 25, y: 20 } }
            ]
          },
          {
            type: "ADD",
            info: {
              id: 16,
              component: "Svgs",
              type: "bot",
              x: 20,
              y: 30,
              heightOrgScale: 2
            },
            onComplete: [
              { type: "CHANGE", target: 16, time: 1, changes: { x: 25, y: 33 } }
            ]
          }
        ]
      },
      onComplete: [{ type: "CHANGE", target: 10, time: 1, changes: { x: 20 } }]
    },
    {
      type: "ADD",
      info: {
        id: 21,
        component: "Svgs",
        type: "plus",
        x: -50,
        y: 30,
        heightOrgScale: 2
      },
      onComplete: [{ type: "CHANGE", target: 21, time: 1, changes: { x: 40 } }]
    },
    {
      type: "ADD",
      info: {
        id: 31,
        component: "Svgs",
        type: "three",
        x: -50,
        y: 30,
        heightOrgScale: 2,
        onClick: [
          { type: "DELETE", target: 31 },
          {
            type: "ADD",
            info: {
              id: 64,
              component: "Svgs",
              type: "bot",
              x: 65,
              y: 30,
              heightOrgScale: 2
            },
            onComplete: [
              { type: "CHANGE", target: 64, time: 1, changes: { x: 60, y: 15 } }
            ]
          },
          {
            type: "ADD",
            info: {
              id: 65,
              component: "Svgs",
              type: "bot",
              x: 65,
              y: 30,
              heightOrgScale: 2
            },
            onComplete: [
              { type: "CHANGE", target: 65, time: 1, changes: { x: 70, y: 15 } }
            ]
          },
          {
            type: "ADD",
            info: {
              id: 66,
              component: "Svgs",
              type: "bot",
              x: 65,
              y: 30,
              heightOrgScale: 2
            },
            onComplete: [
              { type: "CHANGE", target: 66, time: 1, changes: { x: 65, y: 30 } }
            ]
          }
        ]
      },
      onComplete: [{ type: "CHANGE", target: 31, time: 1, changes: { x: 65 } }]
    },
    {
      type: "ADD",
      info: {
        id: 43,
        component: "NumInput",
        h: 10,
        w: 80,
        fontSize: 2,
        x: -50,
        y: 75,
        question: "What is 6 + 3",
        ans: 9,
        onTrue: [
          { type: "DELETE", target: 54 },
          {
            type: "ADD",
            info: {
              id: 543,
              component: "TextBox",
              x: 30,
              y: -20,
              text: "GOOD JOB",
              fontSize: 7,
              color: "green",
              w: 70,
              h: 10
            },
            onComplete: [
              {
                type: "CHANGE",
                target: 543,
                time: 1,
                changes: { y: 5 },
                onComplete: [
                  {
                    type: "CHANGE_ALL",
                    time: 1,
                    changes: { x: 150 },
                    onComplete: [{ type: "NEXT_SCENE" }]
                  }
                ]
              }
            ]
          }
        ],
        onFalse: [
          {
            type: "ADD",
            info: {
              id: 54,
              component: "TextBox",
              x: 15,
              y: -20,
              text: "YOU CAN DO THIS!",
              fontSize: 7,
              color: "red",
              w: 90,
              h: 10
            },
            onComplete: [
              {
                type: "CHANGE",
                target: 54,
                time: 1,
                changes: { y: 5 }
              },
              { type: "CHANGE", target: 43, time: 0, changes: { onFalse: [] } }
            ]
          }
        ]
      },
      onComplete: [{ type: "CHANGE", target: 43, time: 1, changes: { x: 10 } }]
    }
  ],
  [
    {
      type: "ADD",
      info: {
        id: 0,
        component: "TextBox",
        x: 20,
        y: 5,
        fontSize: 6,
        h: 10,
        w: 100,
        text: "READY TO PRACTICE?"
      }
    },
    {
      type: "ADD",
      info: {
        id: 1,
        component: "TextBox",
        x: 40,
        y: 50,
        h: 10,
        w: 100,
        fontSize: 6,
        text: "OK",
        onClick: [{ type: "NEXT_SCENE" }]
      }
    }
  ],
  [
    {
      type: "ADD",
      info: {
        id: 11,
        component: "Game",
        type: "alien",
        x: 12,
        y: 105,
        h: 90,
        operator: "+",
        onFinish: [
          { type: "DELETE", target: 11 },
          {
            type: "ADD",
            info: {
              id: 1,
              component: "TextBox",
              h: 10,
              w: 100,
              x: 25,
              y: -100,
              text: "GREAT WORK!",
              fontSize: 7,
              color: "blue"
            },
            onComplete: [
              {
                type: "CHANGE",
                target: 1,
                time: 1,
                changes: { y: 10 },
                onComplete: [
                  {
                    type: "CHANGE",
                    target: 1,
                    time: 1.5,
                    changes: { y: 10 },
                    onComplete: [
                      {
                        type: "CHANGE",
                        target: 1,
                        time: 1,
                        changes: { y: 110 },
                        onComplete: [{ type: "NEXT_SCENE" }]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      onComplete: [{ type: "CHANGE", target: 11, time: 1, changes: { y: 5 } }]
    }
  ]
];

export default arr;
