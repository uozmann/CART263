//text content for the Narration class
let narratives = {
    endingDancer: [`Upon close examination from the director board, you have been given a special role.`, `You became the only dancer in the Paper World.`, `Today, you have been asked to perform a show for the director board.`, `You should score at least 90 points for them to be entertained.`, `To perform, say "Paper top" to go up and say "Paper down" to go down.`, `You can start whenever.`, `The director board seems to have enjoyed your performance very much.`, `As a reward, they have decided to let you keep your identity.`, `You did not understand at first.`, `But over the years, you see people around you changing and start to understand.`, `This world pushes its citizen to act a certain way.`, `You are indeed very lucky to be able to stay the way you were.`],
    currentDancerLine: 0,
    endingDancerGame: {
        x: [],
        y: [],
        currentY: 300,
        textY: 400,
        num: 60,
    },
    endingActor: [`Upon close examination from the director board, you have been given a special role.`, `You became the only actor in the Paper World.`, `Today, you been asked to perform a show for the director board.`, `You should score at least 90 points for them to be entertained.`, `You should complete empty parts of your script by improvising.`, `Attention: choose the logic sentence to say!`, `3, 2, 1, Action!`, `The director board seems to have enjoyed your performance very much.`, `As a reward, they have decided to let you keep your identity.`, `You did not understand at first.`, `But over the years, you see people around you changing and start to understand.`, `This world pushes its citizen to act a certain way.`, `You are indeed very lucky to be able to stay the way you were.`],
    currentActorLine: 0,
    endingActorGame: {
        prompt: [`The sand of Chu River has been reformed many times. The vicissitudes of life have totally changed. How many beauties in the turbulent days have turned into [?]`, `The spear rides the horse to level the world, but this farewell is difficult. With a cry, tears are already in my eyes. Drink this cup with you. Drunk, light up [?] to watch the swordwell.`, `Gaixia song is out of chaos, Chu singing everywhere. Sorrowful, Ci Jun, Drinking Sword, Blood Falling, Cold Frost. It's hard to let go of [?]. The place where I return to my soul is boundless`, `The swords of Han soldiers broke the moonlight. By the river alone, alone, in a lone boat, without thinking for the rest of my life. It's hard to let go of the past. I will share the mountains and rivers with you in the [?]`],
        promptNum: 0,
    },
    endingOfficer: [`Upon close examination from the director board, you have been given a special role.`, `You became the only Entry Officer in the Paper World.`, `You task is mainly to register the new arriving citizens.`, `Quickly, you realized the Paper World tries to implement the same identity,`, `to those who live inside it.`, `You felt weird, and want to escape the world.`, `How would you like to escape the world?`],
    currentOfficerLine: 0,
    endingOfficerGame: {
        playerInput: `No word recorded`,
        choiceResponse: ``,
    },
    endingStudent: [`You decided to not work and to be a student instead.`, `It's very funny because there is no school in the Paper World.`, `However the option to be a student was still available to you.`, `One day, as you are wandering in your bedroom, you found a diary.`],
    currentStudentLine: 0,
    score: 0,
}

export default narratives;