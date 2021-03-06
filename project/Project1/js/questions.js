// All the questions and relative properties in the game state
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
            property: `birthGenderInput`,
            value: [`Female`]
          },
          penalty: -10
        }
      },
      {
        content: `Are you willing to marry a man?`,
        description: `To be an actor, you should marry a man.`,
        response: ``,
        sanityTest: {
          answer: `yes`,
          condition: {
            property: `sexualOrientationInput`,
            value: [`Female (women)`,`Not mentioned`]
          },
          penalty: -10
        }
      },
      {
        content: `Are you willing to act like a woman?`,
        description: `To be an actor or dancer, you should act like a woman.`,
        response: ``,
        sanityTest: {
          answer: `yes`,
          condition: {
            property: `identifiedGenderInput`,
            value: [`M.`]
          },
          penalty: -10
        }
      },
      {
        content: `Are you willing to be owned by a man?`,
        description: `To work as the admission officer, you should be owned by a member of the director board.`,
        response: ``,
        sanityTest: {
          answer: `yes`,
          condition: {
            property: `identifiedSpeciesInput`,
            value: [`Human`]
          },
          penalty: -20
        }
      },
      {
        content: `Are you willing to pay 10 sanity units?`,
        description: `To transform into a paper you should pay 10 sanity units.`,
        response: ``,
        sanityTest: {
          answer: `yes`,
          condition: {
            property: `identifiedSpeciesInput`,
            value: [`Human`]
          },
          penalty: -10
        }
      },
      {
        content: `Are you willing to change your name?`,
        description: `To have a special job you should change your name`,
        response: ``,
        sanityTest: {
          answer: `yes`,
          condition: {
            property: `identifiedSpeciesInput`, 
            value: [`Human`]
          },
          penalty: -10
        }
      },
      {
        content: `Click on a box to enter the Paper World`,
        description: `Your fate depends on your choice`,
        response: ``,
        sanityTest: {
          answer: `yes`,
          condition: {
            property: `identifiedGenderInput`,
            value: [`Female`]
          },
          penalty: 0
        }
      }
    ],
    sanityLevel: {
      content: undefined,
      x: undefined,
      y: undefined,
    },
    finished: false,
}

export default q;