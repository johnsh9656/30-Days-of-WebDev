const containerTemplate = document.createElement('template');
containerTemplate.innerHTML = `
  <style>
    .card-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
    }
  </style>

  <div class="card-container">
  </div>
`;

const firstname = ["Kai", "Eliana", "Jaden", "Ezra", "Luca", "Rowan", "Nova", "Amara", "Aaliyah", "Finn"];
const lastname= ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Wilson"];
const avatarLink = ["https://randomuser.me/api/portraits/men", "https://randomuser.me/api/portraits/women"];

class CardContainer extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(containerTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    const cardContainer = this.shadowRoot.querySelector('.card-container');
    cardContainer.innerHTML = this.generateCardList().join('');
  }

  generateCardList() {
    let cards = [];
    for (let i=0; i<30; i++) {
      cards.push(this.generateCard());
    }
    return cards;
  }

  generateCard() {
    const firstName = firstname[Math.floor(Math.random() * firstname.length)];
    const lastName = lastname[Math.floor(Math.random() * lastname.length)];
    const _name = `${firstName} ${lastName}`; 
    
    const avatarId = Math.floor(Math.random() * 99);
    const _avatar = `${avatarLink[Math.floor(Math.random() * avatarLink.length)]}/${avatarId}.jpg`;

    const _email = `${firstName.toLowerCase()}${lastName.toLowerCase()}@gmail.com`;
    const _phone = `(${this.getNDigitNum(3)}) ${this.getNDigitNum(3)}-${this.getNDigitNum(4)}`;

    return `
      <user-card name="${_name}" avatar="${_avatar}">
        <div slot="email">${_email}</div>
        <div slot="phone">${_phone}</div>
      </user-card>
    `;
  }

  getNDigitNum = (n) => {
    return ("" + Math.random()).substring(2, 2+n);
  }
}

window.customElements.define('card-container', CardContainer);