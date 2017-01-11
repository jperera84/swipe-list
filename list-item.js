'use strict'

customElements.define('list-item', class extends HTMLElement {

  static get observedAttributes(){
    return [];
  }

  constructor(){
    super();
    const doc = document.currentScript.ownerDocument;
    const tmpl = doc.querySelector('#list-item');
    this._root = this.attachShadow({mode: 'open'});
    this._root.appendChild(tmpl.content.cloneNode(true));

    this._front = this._root.querySelector('.front');
    this._back = this._root.querySelector('.back');

    this._updBt = this._root.getElementById("updBt");
    this._delBt = this._root.getElementById("delBt");
    this._moreBt = this._root.getElementById("moreBt");

    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.update = this.update.bind(this);

    this.updClick = this.updClick.bind(this);
    this.delClick = this.delClick.bind(this);
    this.moreClick = this.moreClick.bind(this);
    this.updateBecauseOfClick = this.updateBecauseOfClick.bind(this);

    this.target = null;

    this.startX = 0;
    this.currentX = 0;
    this.dragginCard = false;
    this.screenX = 0;
    this.causeClick = false;
    this.addEventListener();

    requestAnimationFrame(this.update);
  }


  connectedCallback(){

  }

  disconnectedCallback(){

  }

  attributeChangedCallback(name, newValue, oldValue){

  }

  addEventListener(){
    this._front.addEventListener('touchstart', this.onStart);
    this._front.addEventListener('touchmove', this.onMove);
    this._front.addEventListener('touchend', this.onEnd);

    this._updBt.addEventListener('click', this.updClick);
    this._delBt.addEventListener('click', this.delClick);
    this._moreBt.addEventListener('click', this.moreClick);
  }

  onStart(e){
    if(!e.target.classList.contains("front"))
      return;
    this.target = e.target;
    this.startX = e.pageX || e.touches[0].pageX;
    this.currentX = this.startX;
    this.target.style.willChange = 'transform';
    this.dragginCard = true;
    this.causeClick = false;
    e.preventDefault();
  }

  onMove(e){
    if(!this.target)
      return;
    this.currentX = e.pageX || e.touches[0].pageX;
  }

  onEnd(e){
    if(!this.target)
      return;
    let screenX = Math.min(0, this.currentX - this.startX);
    if((this.target.offsetWidth - Math.abs(screenX)) > (this.target.offsetWidth - 144)){
      this.causeClick = true;
      this.updateBecauseOfClick();
    }
    this.dragginCard = false;
  }

  update(){
    requestAnimationFrame(this.update);
    if(!this.target)
      return;
    if(this.dragginCard){
      let screenX = Math.min(0, this.currentX - this.startX);
      if((this.target.offsetWidth - Math.abs(screenX)) > (this.target.offsetWidth - 160)){
        this.target.style.transform = `translateX(${screenX}px)`;
      }
    }
    if (this.draggingCard)
      return;
  }

  updClick(e){
    this.causeClick = true;
    this.updateBecauseOfClick();
  }

  delClick(e){
    this.causeClick = true;
    this.updateBecauseOfClick();
  }

  moreClick(e){
    this.causeClick = true;
    this.updateBecauseOfClick();
  }

  updateBecauseOfClick(){
    requestAnimationFrame(this.updateBecauseOfClick);
    if(!this.target)
      return;
    if(!this.dragginCard && this.causeClick){
      this.screenX += (0 - this.screenX) / 10;
      this.target.style.transform = `translateX(${this.screenX}px)`;
    }
  }


});
