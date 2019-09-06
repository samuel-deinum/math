const arr = [
  [
    {
      type: "ADD",
      info: {
        id: 0,
        component: "BotText",
        time: 3,
        text: "Hello there, Welcome to the Exponent Module!",
        h: 50,
        x: 30,
        y: 20,
        onComplete: [
          {
            type: "WB_ACTIONS",
            actions: [
              { type: "WB_ACTIONS", actions: [] },
              {
                type: "CHANGE",
                target: 0,
                time: 1,
                changes: {
                  x: 10,
                  text: "So what is an Exponent?",
                  time: 1.3,
                  onComplete: [
                    {
                      type: "ADD",
                      info: {
                        id: 1,
                        component: "Svgs",
                        type: "three",
                        x: 70,
                        y: -50,
                        heightOrgScale: 2
                      },
                      onComplete: [
                        {
                          type: "CHANGE",
                          target: 1,
                          time: 1,
                          changes: { y: 50 },
                          onComplete: [
                            {
                              type: "CHANGE",
                              target: 0,
                              time: 1,
                              changes: {
                                text:
                                  "If we have and ordinary number, 3 for example",
                                onComplete: [],
                                time: 2,
                                onComplete: [
                                  {
                                    type: "WB_ACTIONS",
                                    actions: [
                                      {
                                        type: "CHANGE",
                                        target: 0,
                                        time: 3,
                                        changes: {
                                          text:
                                            "Sometimes there can be a smaller number in the top right corner",
                                          onComplete: [],
                                          time: 3
                                        }
                                      },
                                      {
                                        type: "ADD",
                                        info: {
                                          id: 3,
                                          component: "Svgs",
                                          type: "two",
                                          x: 80,
                                          y: -50
                                        },
                                        onComplete: [
                                          {
                                            type: "CHANGE",
                                            target: 3,
                                            time: 1,
                                            changes: { y: 40 }
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
                  ]
                }
              }
            ]
          }
        ]
      }
    }
  ]
];

export default arr;
