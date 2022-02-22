let q = {
    x: undefined,
    y: undefined,
    colour: 0,
    current: 0,
    questions: [
      {
        content: `Are you willing to be a man?`,
        description: `To work in the Paper World, you should be a male gender.`,
        response: ``,
        sanityTest: {
          answer: `yes`,
          condition: {
            property: `identifiedGenderInput`,
            value: `Female`
          },
          penalty: -10
        }
      },
      {
        content: `Are you willing to marry a man?`,
        description: `To work in your dream job you should marry a man...`,
        response: ``,
        sanityTest: {
          answer: `no`,
          condition: {
            property: `sexualOrientationInput`,
            value: `Female (women)`
          },
          penalty: -20
        }
      },
      {
        content: `Are you willing to act like a woman?`,
        description: `To work in your dream job you should act like a woman.`,
        response: ``,
        sanityTest: {
          answer: `no`,
          condition: {
            property: `sexualOrientationInput`,
            value: `Female (women)`
          },
          penalty: -10
        }
      },
      {
        content: `Are you willing to be owned by a man?`,
        description: `To protect your loved ones you should be owned by a man.`,
        response: ``,
        sanityTest: {
          answer: `no`,
          condition: {
            property: `sexualOrientationInput`,
            value: `Female (women)`
          },
          penalty: -10
        }
      },
      {
        content: `Are you willing to?`,
        description: `To .`,
        response: ``,
        sanityTest: {
          answer: `no`,
          condition: {
            property: `sexualOrientationInput`,
            value: `Female (women)`
          },
          penalty: -10
        }
      },
      {
        content: `Are you willing to?`,
        description: `To.`,
        response: ``,
        sanityTest: {
          answer: `no`,
          condition: {
            property: `sexualOrientationInput`,
            value: `Female (women)`
          },
          penalty: -60
        }
      },
      {
        content: `Are you willing to be a man?`,
        description: `To work in the Paper World, you should be a male gender.`,
        response: ``,
        sanityTest: {
          answer: `yes`,
          condition: {
            property: `identifiedGenderInput`,
            value: `Female`
          },
          penalty: -10
        }
      },
      {
        content: `Are you willing to marry a man?`,
        description: `To work in your dream job you should marry a man...`,
        response: ``,
        sanityTest: {
          answer: `no`,
          condition: {
            property: `sexualOrientationInput`,
            value: `Female (women)`
          },
          penalty: -20
        }
      },
      {
        content: `Are you willing to act like a woman?`,
        description: `To work in your dream job you should act like a woman.`,
        response: ``,
        sanityTest: {
          answer: `no`,
          condition: {
            property: `sexualOrientationInput`,
            value: `Female (women)`
          },
          penalty: -10
        }
      },
      {
        content: `Are you willing to be owned by a man?`,
        description: `To protect your loved ones you should be owned by a man.`,
        response: ``,
        sanityTest: {
          answer: `no`,
          condition: {
            property: `sexualOrientationInput`,
            value: `Female (women)`
          },
          penalty: -10
        }
      },
      {
        content: `Are you willing to?`,
        description: `To .`,
        response: ``,
        sanityTest: {
          answer: `no`,
          condition: {
            property: `sexualOrientationInput`,
            value: `Female (women)`
          },
          penalty: -10
        }
      },
      {
        content: `Are you willing to?`,
        description: `To.`,
        response: ``,
        sanityTest: {
          answer: `no`,
          condition: {
            property: `sexualOrientationInput`,
            value: `Female (women)`
          },
          penalty: -60
        }
      }
    ],
    sanityLevel: {
      content: undefined,
      x: undefined,
      y: undefined,
    },
}

export default q;