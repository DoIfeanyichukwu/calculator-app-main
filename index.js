"use strict";

class Stack {
  constructor()
  {
    this.count = 0;
    this.items = {};
  }

  push(element)
  {
    this.items[this.count] = element;
    this.count++;
  }

  pop()
  {
    if (this.isEmpty())
    {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peek()
  {
    if (this.isEmpty())
    {
      return undefined
    }
    return this.items[this.count - 1];
  }

  size()
  {
    return this.count
  }

  isEmpty()
  {
    return this.count === 0;
  }

  clear()
  {
    this.items = {};
    this.count = 0;
  }

  toString()
  {
    if (this.isEmpty())
    {
      return '';
    }
    let objString = `${this.items[0]}`
    for (let i = 1; i < this.count; i++)
    {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  const themeBtns = Array.from(document.querySelectorAll('.theme-btn'))
  themeBtns.map(btn => {
    if (btn.classList.contains('see') && !btn.classList.contains(currentTheme)) {
      btn.classList.remove('see')
    }
    else if (btn.classList.contains(currentTheme))
    {
      btn.classList.add('see');
    }
  })
}
// store[0] ==> first value
// store[1] ==> second value
// store[2] ==> sign
// store[3] ==> equals monitor.
// store[4] ==> negative sign monitor 
let store = Array(5).fill('');
let screen = document.querySelector('.main-screen');
let operator = document.querySelector('.operators');

const calcHandler = (event) => {
  event.preventDefault();
  if (event.target.tagName != 'BUTTON') return;
  let target = event.target;

  if ((target.innerHTML == '+' || target.innerHTML == '/' || target.innerHTML.toLowerCase() == 'x') && store[0] == '') return;


  const solve = (f, screen_val=false) => {
    let result = f(store);
    store[0] = String(result);
    screen.value = store[0];
    store[2] = '';
    store[1] = '';
    if (screen_val == true) screen.value = store[0];
    return;
  }
  //to reduce imprecise calculations with addition
  const plus = (store) => (Number(store[0]) * 10 + Number(store[1]) * 10) / 10;
  //to reduce imprecise calculations with subtraction.
  const minus = (store) => ((Number(store[0]) * 10) - (Number(store[1]) * 10)) / 10;
  const divide = (store) => Number(store[0]) / Number(store[1]);
  const times = (store) => Number(store[0]) * Number(store[1]);

  if (target.innerHTML.toLowerCase() == 'del')
  {
    if (store[0] && store[1] == '')
    {
      let value = store[0]
      store[0] = value.slice(0,value.length - 1);
      if (store[0] == '')
      {
        screen.value = '0';
      }else {
        screen.value = store[0];
      }
    }else if (store[1]){
      let value = store[1]
      store[1] = value.slice(0, value.length - 1)
      screen.value = store[1]
    }
  }

  if (target.innerHTML.toLowerCase() == 'reset')
  {
    store = store.map(n => n = '');
    screen.value = 0;
  }

  if (target.innerHTML == '.')
  {
    if (store[0] == '')
    {
      store[0] += '0.'
      screen.value = store[0]
    }else if (store[0] && store[1] == '')
    {
      store[1] += '0.'
      screen.value = store[1];
    }
    if (!store[0].includes('.')) {
      store[0] += '.';
      screen.value = store[0];
    }
    if (store[1] && !store[1].includes('.'))
    {
      store[1] += '.';
      screen.value = store[1];
    }
    if (store[3] && store[0])
    {
      store[3] = false;
      store[0] = ''
      store[1] = ''
      store[0] += '0.'
      screen.value = store[0]
    }
    
  }

  if (target.innerHTML == '=')
  {
    if (store[0] && store[1])
    {
      let result;
      if (store[2] == '+')
      {
        //to reduce imprecise calculations with addition
        solve(plus);
      }
      else if (store[2] == '-')
      {
        solve(minus);
      }
      else if (store[2] == '/')
      {
        solve(divide)
      }
      else if (store[2].toLowerCase() == 'x' )
      {
        solve(times)
      }
    }else if ((store[0] && !store[1]) && store[2]) {
      if (store[2] == '+') {
        let result = (Number(store[0]) * 10 + Number(store[0]) * 10) / 10;
        screen.value = result;
      }
      else if (store[2] == '-')
      {
        let result = (Number(store[0]) * 10 - Number(store[0]) * 10) / 10;
        screen.value = result;
      }
      else if (store[2] == '/')
      {
        let result = (Number(store[0]) / Number(store[0]));
        screen.value = result;
      }
      else if (store[2].toLowerCase() == 'x')
      {
        let result = (Number(store[0]) * Number(store[0]))
        screen.value = result;
      }
      store[0] = '';
      store[2] = '';
    }
    else if (store[0])
    {
      store[3] = true;
      return;
    }
    else {
      let value = store[0]
      screen.value = String(Number(value));
      store[0] = '';
    }
    store[3] = true;
  }

  if (target.innerHTML == '+')
  {
    if (store[0] && store[1])
    {
      if (store[2])
      {
        if (store[2] == '+')
        {
          solve(plus, true);
        }
        else if (store[2] == '-')
        {
          solve(minus, true);
        }
        else if (store[2] == '/')
        {
          solve(divide, true);
        }
        else if (store[2].toLowerCase() == 'x' )
        {
          solve(times, true);
        }
        store[2] = target.innerHTML;
      }
    }else {
      store[2] = target.innerHTML;
    }
  }

  if (target.innerHTML == '-')
  {

    if (store[0] === '') {
      store[4] = '-'
      return;
    }

    if (store[0] && store[1])
    {
      if (store[2])
      {
        let result;
        if (store[2] == '+')
        {
          solve(plus, true)
        }else if (store[2] == '-')
        {
          solve(minus, true);
        }else if (store[2] == '/')
        {
          result = Number(store[0]) / Number(store[1]);
          solve(divide, true);
        }else if (store[2].toLowerCase() == 'x' )
        {
          solve(times, true);
        }
        store[2] = target.innerHTML;
      }
    }
    else {
      store[2] = target.innerHTML;
    }
  }

  if (target.innerHTML.toLowerCase() == 'x')
  {
    if (store[0] && store[1])
    {
      if (store[2])
      {
        let result;
        if (store[2] == '+')
        {
          solve(plus, true);
        }else if (store[2] == '-')
        {
          solve(minus, true);
        }else if (store[2] == '/')
        {
          solve(divide, true);
        }else if (store[2].toLowerCase() == 'x' )
        {
          solve(times, true);
        }
        store[2] = target.innerHTML;
      }
    }else {
      store[2] = target.innerHTML;
    }
  }

  if (target.innerHTML == '/')
  {
    if (store[0] && store[1])
    {
      if (store[2])
      {
        if (store[2] == '+')
        {
          solve(plus, true);
        }else if (store[2] == '-')
        {
          solve(minus, true);
        }else if (store[2] == '/')
        {
          solve(divide, true);
        }else if (store[2].toLowerCase() == 'x' )
        {
          solve(times, true);
        }
        store[2] = target.innerHTML;
      }
    }else {
      store[2] = target.innerHTML;
    }
  }

  if (isFinite(target.innerHTML) )
  {
    // if equaltrue === true; 
    let value;
    if (store[2] === '' && ((store[3] === false) || (store[3] === '')))
    {
      if (store[4]) {
        store[0] = store[4] + target.innerHTML;
        store[4] = '';
        screen.value = store[0];
        return;
      }
      if (store[0].startsWith('0') && store[0][1] != '.')
      {
        value = store[0].slice(1)
        store[0] = value;
      }
      store[0] += target.innerHTML;
      screen.value = store[0];
      return;
    }
    else if ( (store[2] === '') && (store[3] === true) )
    {
      store[3] = false;
      store[0] = target.innerHTML;
      screen.value = store[0];
    }else {
      screen.value = ''
      if (store[1].startsWith('0') && store[1][1] != '.')
      {
        value = store[1].slice(1)
        store[1] = value;
      }
      store[1] += target.innerHTML;
      screen.value = store[1];
    }
    
  }
}

operator.addEventListener("click", calcHandler);

const buttons = document.querySelector('.buttons');

const themeHandlear = (event) => {
  event.preventDefault()
  const target = event.target;
  if (target.tagName != 'BUTTON' && !target.classList.contains('theme-btn')) return;
  document.documentElement.setAttribute('data-theme', target.value);
  localStorage.setItem('theme', target.value);
  target.classList.add('see');

  const themeBtns = Array.from(document.querySelectorAll('.theme-btn'))
  themeBtns.map(btn => {
    if (btn.classList.contains('see') && (btn != target)) {
      btn.classList.remove('see')
    }
  })
}

buttons.addEventListener("click", themeHandlear);