//The little egg mascot introducing new events and rules
class Reality {
    constructor(x, y) {
        this.container = undefined;
        this.title = undefined;
        this.titleContent = [`Early Childhood`, `Adolescence`, `Young Parenthood`, `Elderly Ages`];
        this.titleColour = [`rgb(255, 191, 80)`, `rgb(32, 103, 7)`, `rgb(7, 52, 103)`, `rgb(52, 7, 103)`]
        this.subtitle = undefined;
        this.subtitleContent = [`Effects of parenting on children`, `Dynamics between grown-up children and parents`, `Effects of children in early Parenthood`, `Dynamics between grown-up children and parents`]
        this.p0 = undefined;
        this.p1 = undefined;
        this.p2 = undefined;
        this.p0Content = [`Across several stages of the life cycle, the infant stage is crucial and determinant for a person’s formation of the self. This period characterized by vulnerability, transformability, and learnability has life-long impacts that are hard to be erased. One of the strongest external influences on the psychological well-being of the child is parenting, and interestingly, many empirical analyses also demonstrated a modest relationship between the impact of parenthood and the psychological well-being of the parents. While clearly, the factor of parenting affects the child heavier than the parent, the duality of this relationship suggests that parenthood issues and trauma are significant to both parties.`, `When a person undergoes chronic stress during their stages of psychological development (mainly childhood), C-PTSD (Complex Post-Traumatic Stress Disorders) and ACES ( Adverse Childhood Experiences) could develop. Those chronic stresses include but are not limited to “being maltreated, being raised in a financially insecure home, being raised by people prone to violence, or having a parent who is incarcerated.” C-PTSD could engender emotional dysregulation that prompts parents to regenerate abuse on their children. In fact, correlations show that parents maltreated in childhood are more likely to lack in certain parenting aspects. However, in the counterpart, those parents are also more likely to search for positive changes when parenting and to seek healing through parenthood. The idea of “I will give my child what I never had” is recurrent. In fact, generally during the early stage of parentlng, parenthood can break through the vicious cycle by introducing new values to the parent. This is a period of self-rediscovery and a healing process for many. In fact, a study by Nomaguchi K. M., the experience done with several parents with children of diverse ages shows that parents whose children are under the age of 5 experienced a higher level of happiness, self-esteem, bond with their child, and a lower level of depression.`, `In Canada, strategies to address ACEs (adverse childhood experiences) are very varied and implemented across diverse spectrums. In a study done by Public Health Ontario with 1071 references focusing on 26 in Ontario, Québec, Alberta, British Columbia, Manitoba, and Saskatchewan, it is observed that the majority of the programs are aiming primarily to prevent "child exposure to " intimate partner violence"`,
        `The significance of parenting arises from its protective roles and damage mediation for the child. According to the article “The importance of parenting in child health” by Masud Hoghughi, parenting has three essential components: care, control, and development. Care “protects children from harm. Care also encompasses promoting emotional as well as physical health…control involves setting and enforcing boundaries to ensure children’s and others’ safety, in ever widening areas of activity… development involves optimizing children’s potential and maximizing the opportunities for using it.” Factors such as severe poverty and maternal depression could contribute to distorting the parenting process. This is why parental qualities and skills are crucial to protect children against abuse or exposure to intrafamilial and external stresses in adversarial contexts. The project “Healing the Past by Nurturing the Future” in Australia has done a meta-analysis on how Australian Aboriginal and Torres Strait Islander parents undo cycles of trauma as they begin to parent their own children. The research touches upon 18329 articles, from which a healing model has been drawn for different life stages such as pregnancy and early childhood parenting. The researchers also interviewed 350 parents who experienced maltreatment in their own childhood. While those parents described “positive experiences and strategies to help them achieve their hopes and dreams of providing safe, loving and nurturing care for their children”, many experienced several challenges in the meantime. Some findings on the themes that do support those trauma survivors are: “New beginnings; Changing roles and identities; Feeling connected; Compassionate care; Empowerment; Creating safety; and Reweaving a future”.`, `In 2008, the Canadian Incidence Study of Reported Child Abuse and Neglect (CIS) reported the rate of maltreatment related of 40%. Among the children experiencing maltreatment, 34% are experiencing neglect, 34% are experiencing intimate partner violence, 20% are physically abused, 9% are emotionally abused and finally, 3% are sexually abused. Because that data stored in the study only documents cases that have been reported to the child welfare services, the true number of abused and neglected children is likely to be higher.`];
        this.p1Content = [`As massive cases of parenting are reported and gaining attention in the sector of public health issues, the stigma wrapping the definition of parents in the lovely pink bubbles starts to fade away. The idea around parenthood received fair discussion and studies, contributing to including all parts of the spectrum into its redefinition. In the series “Mother” directed in 2010 by Mizuta Nobuo and Naganuma Makoto, the topic of motherhood is displayed from another angle, showcasing several forms of child abuse including negligence, physical and emotional violence, raising awareness on the immaturity of child protection measures, and laws at the time. “Mother” is not the only example. In society, issues pertaining to parenting, such as childhood illnesses and accidents; teenage pregnancy and substance misuse; truancy, school disruption, and underachievement; child abuse; unemployability; juvenile crime; and mental illness, could become the precursors of problems in adulthood and the next generation.`, `On the other side of the spectrum, kids are often affected when they have parents who experienced childhood trauma. In one of the first studies on childhood experiences done in 1995, 17000 people are evaluated in the survey, and about two-thirds reported to have experienced one or more adverse childhood experiences. The adverse childhood experience includes abuse (emotional, physical, and sexual), neglect, parental separation, incarcerated household, severe financial instability, and domestic violence. Subjects who faced more adverse experiences have higher risks to develop impaired cognitive and social skills. In some special cases, however, some children will develop abilities to defend themselves against those negative experiences, such as handling mood swings and stress. The result of the survey clearly demonstrates that parenting issues are not uncommon, instead, those negative experiences are more than common in households.`, `Exposure to ACEs during childhood produces toxic stress that negatively affects brain architecture (e.g., impaired neural circuits) while compromising immune response and increasing vulnerabilities in health conditions. According to the paper “ Child abuse and mental disorders in Canada”, adults who experienced ACEs are more prone to mental health conditions, while developing cardiovascular disease, diabetes, and many other chronic conditions due to the physiological impact of negative stress emotions.`];
        this.p2Content = [`The significance of parenting arises from its protective roles and damage mediation for the child. According to the article “The importance of parenting in child health” by Masud Hoghughi, parenting has three essential components: care, control, and development. Care “protects children from harm. Care also encompasses promoting emotional as well as physical health…control involves setting and enforcing boundaries to ensure children’s and others’ safety, in ever widening areas of activity… development involves optimizing children’s potential and maximizing the opportunities for using it.” Factors such as severe poverty and maternal depression could contribute to distorting the parenting process. This is why parental qualities and skills are crucial to protect children against abuse or exposure to intrafamilial and external stresses in adversarial contexts. The project “Healing the Past by Nurturing the Future” in Australia has done a meta-analysis on how Australian Aboriginal and Torres Strait Islander parents undo cycles of trauma as they begin to parent their own children. The research touches upon 18329 articles, from which a healing model has been drawn for different life stages such as pregnancy and early childhood parenting. The researchers also interviewed 350 parents who experienced maltreatment in their own childhood. While those parents described “positive experiences and strategies to help them achieve their hopes and dreams of providing safe, loving and nurturing care for their children”, many experienced several challenges in the meantime. Some findings on the themes that do support those trauma survivors are: “New beginnings; Changing roles and identities; Feeling connected; Compassionate care; Empowerment; Creating safety; and Reweaving a future”.`, `In 2008, the Canadian Incidence Study of Reported Child Abuse and Neglect (CIS) reported the rate of maltreatment related of 40%. Among the children experiencing maltreatment, 34% are experiencing neglect, 34% are experiencing intimate partner violence, 20% are physically abused, 9% are emotionally abused and finally, 3% are sexually abused. Because that data stored in the study only documents cases that have been reported to the child welfare services, the true number of abused and neglected children is likely to be higher.`];
        this.speechState = 0;
        this.button = undefined;
        this.buttonText = [`Back`];
        this.ready = false;
        this.x = x;
        this.y = y;
    }
  
    moveTo() {

    }
     // display the clue button in colour
    display() {
       //Container
        this.container = document.getElementById('realityContainer');
        this.container.style.top = `${this.y}px`;
        this.container.style.left = `${this.x}px`;
        this.container.style.display = `block`;
        //Title
        this.title = document.getElementById('realityTitle');
        this.title.textContent = this.titleContent[this.speechState];
        this.title.style.color = this.titleColour[this.speechState];
        //Subtitle
        this.subtitle = document.getElementById('realitySubtitle');
        this.subtitle.textContent = this.subtitleContent[this.speechState];
        //Paragraphs
        this.p0 = document.getElementById('realityP0');
        this.p0.textContent = this.p0Content[this.speechState];
        this.p1 = document.getElementById('realityP1');
        this.p1.textContent = this.p1Content[this.speechState];
        this.p2 = document.getElementById('realityP2');
        this.p2.textContent = this.p2Content[this.speechState];
        //Button
        this.button = document.getElementById('realityButton');
        if (this.speechState === 0) {
            this.button.textContent = this.buttonText[0];
        // }  else if (this.speechState === 1) {
        //     this.button.textContent = this.buttonText[1]; 
        //     this.button1.style.display = 'inline';
        //     this.button1.textContent = this.buttonText[2];
        }
    }
}
        
  
  export default Reality;