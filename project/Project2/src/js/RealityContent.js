//The text explaining challenges and issues to deal with each state
class Reality {
    constructor(x, y) {
        this.container = undefined;
        this.title = undefined;
        this.titleContent = [`Early Childhood`, `Adolescence`, `Young Parenthood`, `Elderly Ages`];
        this.titleColour = [`rgb(255, 191, 80)`, `rgb(184, 255, 98)`, `rgb(251, 0, 255)`, `rgb(0, 98, 255)`]
        this.subtitle = undefined;
        this.subtitleContent = [`Effects of parenting on children`, `Dynamics between grown-up children and parents`, `Effects of children in early Parenthood`, `Dynamics between grown-up children and parents`]
        this.p0 = undefined;
        this.p1 = undefined;
        this.p2 = undefined;
        this.p3 = undefined;
        this.p0Content = [`Across several stages of the life cycle, the infant stage is crucial and determinant for a person’s formation of the self. This period characterized by vulnerability, transformability, and learnability has life-long impacts that are hard to be erased. One of the strongest external influences on the psychological well-being of the child is parenting.`, `In society, issues pertaining to parenting, such as childhood illnesses and accidents; teenage pregnancy and substance misuse; truancy, school disruption, and underachievement; child abuse; unemployability; juvenile crime; and mental illness, could become the precursors of problems in adulthood and the next generation.`, `Many empirical analyses also demonstrated a modest relationship between the impact of parenthood and the psychological well-being of the parents. The project “Healing the Past by Nurturing the Future” in Australia has done a meta-analysis on how Australian Aboriginal and Torres Strait Islander parents undo cycles of trauma as they begin to parent their own children. The research touches upon 18329 articles, from which a healing model has been drawn for different life stages such as pregnancy and early childhood parenting. The researchers also interviewed 350 parents who experienced maltreatment in their own childhood. While those parents described “positive experiences and strategies to help them achieve their hopes and dreams of providing safe, loving and nurturing care for their children”, many experienced several challenges in the meantime. Some findings on the themes that do support those trauma survivors are: “New beginnings; Changing roles and identities; Feeling connected; Compassionate care; Empowerment; Creating safety; and Reweaving a future”.`, `In a study by Nomaguchi K. M., the experience done with several parents with children of diverse ages shows that parents whose children are under the age of 5 experienced a higher level of happiness, self-esteem, bond with their child, and a lower level of depression. For parents whose children are over 16, experiences with lower happiness level start to appear. The influence of parent-child relationship is strongly rooted in every single one of us, thus approaching this topic with attention and positivity is important for the mental-well being. By creating this website, I wish to remind the recurrence of unperfect parenting style, and that those negative affects can be addressed.`];
        this.p1Content = [`The significance of parenting arises from its protective roles and damage mediation for the child. According to the article “The importance of parenting in child health” by Masud Hoghughi, parenting has three essential components: care, control, and development. Care “protects children from harm. Care also encompasses promoting emotional as well as physical health…control involves setting and enforcing boundaries to ensure children’s and others’ safety, in ever widening areas of activity… development involves optimizing children’s potential and maximizing the opportunities for using it.” Factors such as severe poverty and maternal depression could contribute to distorting the parenting process. This is why parental qualities and skills are crucial to protect children against abuse or exposure to intrafamilial and external stresses in adversarial contexts.`,`In Canada, strategies to address ACEs (adverse childhood experiences) are very varied and implemented across diverse spectrums. In a study done by Public Health Ontario with 1071 references focusing on 26 in Ontario, Québec, Alberta, British Columbia, Manitoba, and Saskatchewan, it is observed that the majority of the programs are aiming primarily to prevent “child exposure to intimate partner violence, substance use by a parent and child maltreatment.” Exposure to ACEs during childhood produces toxic stress that negatively affects brain architecture (e.g., impaired neural circuits) while compromising immune response and increasing “vulnerabilities to poor health outcomes across the lifespan.” According to the paper “ Child abuse and mental disorders in Canada”, adults who experienced ACEs are more prone to mental health conditions, while developing cardiovascular disease, diabetes, and many other chronic conditions due to the physiological impact of negative stress emotions.`, `C-PTSD could engender emotional dysregulation that prompts parents to regenerate abuse on their children. In fact, correlations show that parents maltreated in childhood are more likely to lack in certain parenting aspects. However, in the counterpart, those parents are also more likely to search for positive changes when parenting and to seek healing through parenthood. The idea of “I will give my child what I never had” is recurrent. Generally during the early stage of parenting, parenthood can break through the vicious cycle by introducing new values to the parent.`];
        this.p2Content = [`When a person undergoes chronic stress during their stages of psychological development (mainly childhood), C-PTSD (Complex Post-Traumatic Stress Disorders) and ACES ( Adverse Childhood Experiences) could develop. Those chronic stresses include but are not limited to “being maltreated, being raised in a financially insecure home, being raised by people prone to violence, or having a parent who is incarcerated.” In one of the first studies on childhood experiences done in 1995, 17000 people are evaluated in the survey, and about two-thirds reported to have experienced one or more adverse childhood experiences. The adverse childhood experience includes abuse (emotional, physical, and sexual), neglect, parental separation, incarcerated household, severe financial instability, and domestic violence. Subjects who faced more adverse experiences have higher risks to develop impaired cognitive and social skills. In some special cases, however, some children will develop abilities to defend themselves against those negative experiences, such as handling mood swings and stress. The result of the survey clearly demonstrates that parenting issues are not uncommon, instead, those negative experiences are more than common in households.`, `In 2008, the Canadian Incidence Study of Reported Child Abuse and Neglect (CIS) reported the “rate of maltreatment-related investigations was 39.16 per 1,000 children and substantiated investigations was 14.19 per 1,000 children.” Among the children experiencing maltreatment, 34% are experiencing neglect, 34% are experiencing intimate partner violence, 20% are physically abused, 9% are emotionally abused and finally, 3% are sexually abused. Because that data stored in the study only documents cases that have been reported to the child welfare services, the true number of abused and neglected children is likely to be higher.`, `As trauma in the early ages requires life-long healing, it is important to provide ways to address those situations and to demystify the stigmas and stereotypes around parenting and being parented. In general, parents who experienced early childhood trauma are prone to replicating those negative experiences on their children due to poor role modeling or a lack of positive references; some other parents may deliver ACEs back to their children because of the mental and physical conditions that they carry through C-PTSD.`,``];
        this.p3Content = [` Hoghughi M. (1998). The importance of parenting in child health. Doctors as well as the government should do more to support parents. BMJ (Clinical research ed.), 316(7144), 1545. https://doi.org/10.1136/bmj.316.7144.1545 <br> Hoghughi M. Parenting at the margins: some consequences of inequality. In: Dwivedi K, ed. Enhancing parenting skills. Chichester: Wiley, 1997.
        <br> Adverse childhood experiences | psychology Today Canada. (n.d.). Retrieved March 8, 2022, from https://www.psychologytoday.com/ca/basics/adverse-childhood-experiences.`, `Kolvin I, Muller FJ, Scott D, Gatzanis SRM, Fleeting M. Continuities of deprivation: the Newcastle 1000 family study. Avebury: Alderson, 1990. <br>  Ontario Agency for Health Protection and Promotion (Public Health Ontario). Carsley S, Oei T. Interventions to prevent and mitigate the impact of adverse childhood experiences (ACEs) in Canada: a literature review. Toronto, ON: Queen’s Printer for Ontario; 2020. ISBN: 978-1-4868-4393-0. https://www.publichealthontario.ca/-/media/documents/a/2020/adverse-childhood-experiences-report.pdf <br> Afifi TO, MacMillan HL, Boyle M, Taillieu T, Cheung K, Sareen J. Child abuse and mental disorders in Canada. CMAJ. 2014;186(9):E324-32. Available from: https://doi.org/10.1503/cmaj.131792. <br> Hughes K, Bellis MA, Hardcastle KA, Sethi D, Butchart A, Mikton C, et al. The effect of multiple adverse childhood experiences on health: a systematic review and meta-analysis. Lancet Public Health. 2017;2(8):e356-66. Available from: https://doi.org/10.1016/S2468-2667(17)30118-4 <br>  Public Health Agency of Canada. Canadian incidence study of reported child abuse and neglect – 2008: major findings. Ottawa, ON: Her Majesty the Queen in Right of Canada; 2010. Available from: http://www.phac-aspc.gc.ca/ncfv-cnivf/index-eng.php`, `Chamberlain C, Ralph N, Hokke S, Clark Y, Gee G, Stansfield C, et al. (2019) Healing The Past By Nurturing The Future: A qualitative systematic review and meta-synthesis of pregnancy, birth and early postpartum experiences and views of parents with a history of childhood maltreatment. PLoS ONE 14(12): e0225441. https://doi.org/10.1371/journal.pone.0225441 <br> Koslowitz, R. (2019, December 16). Post-traumatic parenting. Psychology Today. Retrieved March 8, 2022, from https://www.psychologytoday.com/us/blog/targeted-parenting/201912/post-traumatic-parenting. <br> Kei M. Nomaguchi, Parenthood and psychological well-being: Clarifying the role of child age and parent–child relationship quality, Social Science Research, Volume 41, Issue 2, 2012, Pages 489-498, ISSN 0049-089X, https://doi.org/10.1016/j.ssresearch.2011.08.001.`, ` Kei M. Nomaguchi, Parenthood and psychological well-being: Clarifying the role of child age and parent–child relationship quality, Social Science Research, Volume 41, Issue 2, 2012, Pages 489-498,
ISSN 0049-089X, https://doi.org/10.1016/j.ssresearch.2011.08.001.`];
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
        //Citation
        this.p3 = document.getElementById('realityCitation');
        this.p3.innerHTML = this.p3Content[this.speechState];
        //Button
        this.button = document.getElementById('realityButton');
        this.button.textContent = this.buttonText[0];
        // }  else if (this.speechState === 1) {
        //     this.button.textContent = this.buttonText[1]; 
        //     this.button1.style.display = 'inline';
        //     this.button1.textContent = this.buttonText[2];
    }
}
        
  
  export default Reality;