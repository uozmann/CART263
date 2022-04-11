//The little egg mascot introducing new events and rules
class Reality {
    constructor(x, y) {
        this.container = undefined;
        this.title = undefined;
        this.titleContent = [`Early Childhood`]
        this.subtitle = undefined;
        this.subtitleContent = [`Effects of parenting on children`]
        this.p0 = undefined;
        this.p1 = undefined;
        this.p2 = undefined;
        this.p0Content = [`Welcome to A Lifetime in Circle, I am your virtual assistant. Let's begin with a quick tour. On the top is the toolbar you will need for naviguation. The 🙋‍♀️ is the menu where you will find the instructions. The 👀 is the view control where you can control your view and move around with arrow keys.`, `Welcome to the first life stage. Bob is a triangle child raised by momma Square. Select "Simulation" to start the game. Select "Reality" to learn about the effects of parenting in early childhood.`, ];
        this.p1Content = [`Welcome to A Lifetime in Circle, I am your virtual assistant. Let's begin with a quick tour. On the top is the toolbar you will need for naviguation. The 🙋‍♀️ is the menu where you will find the instructions. The 👀 is the view control where you can control your view and move around with arrow keys.`, `Welcome to the first life stage. Bob is a triangle child raised by momma Square. Select "Simulation" to start the game. Select "Reality" to learn about the effects of parenting in early childhood.`, ];
        this.p2Content = [`Welcome to A Lifetime in Circle, I am your virtual assistant. Let's begin with a quick tour. On the top is the toolbar you will need for naviguation. The 🙋‍♀️ is the menu where you will find the instructions. The 👀 is the view control where you can control your view and move around with arrow keys.`, `Welcome to the first life stage. Bob is a triangle child raised by momma Square. Select "Simulation" to start the game. Select "Reality" to learn about the effects of parenting in early childhood.`, ];
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