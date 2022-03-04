"use strict";

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

let store = Array(3).fill('');
let screen = document.querySelector('.main-screen');
let operator = document.querySelector('.operators');
const calcHandler = (event) => {
  event.preventDefault();
  if (event.target.tagName != 'DIV') return;
  let target = event.target;

  if ((target.innerHTML == '+' || target.innerHTML == '-' || target.innerHTML == '/' || target.innerHTML.toLowerCase() == 'x') && store[0] == '') return;

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
    
  }

  if (target.innerHTML == '=')
  {
    if (store[0] && store[1])
    {
      let result;
      if (store[2] == '+')
      {
        //to reduce imprecise calculations with addition
        result = (Number(store[0]) * 10 + Number(store[1]) * 10) / 10;
        store[0] = String(result)
        screen.value = store[0];
        store[2] = ''
        store[1] = ''
      }
      else if (store[2] == '-')
      {
        result = (Number(store[0]) * 10 - Number(store[1]) * 10) / 10;
        store[0] = String(result)
        screen.value = store[0];
        store[2] = ''
        store[1] = ''
      }
      else if (store[2] == '/')
      {
        result = Number(store[0]) / Number(store[1]);
        store[0] = String(result)
        screen.value = store[0];
        store[2] = ''
        store[1] = ''
      }
      else if (store[2].toLowerCase() == 'x' )
      {
        result = Number(store[0]) * Number(store[1]);
        store[0] = String(result)
        screen.value = store[0];
        store[2] = ''
        store[1] = ''
      }
    }else {
      store[0] = '';
    }
  }

  if (target.innerHTML == '+')
  {
    if (store[0] && store[1])
    {
      if (store[2])
      {
        let result;
        if (store[2] == '+')
        {
          result = Number(store[0]) + Number(store[1]);
          store[0] = String(result)
          store[1] = '';
          store[2] = '';
          screen.value = store[0]
        }
        else if (store[2] == '-')
        {
          //to reduce imprecise calculations with subtraction.
          result = ((Number(store[0]) * 10) - (Number(store[1]) * 10)) / 10;
          store[0] = String(result)
          store[1] = '';
          store[2] = '';
          screen.value = store[0]
        }
        else if (store[2] == '/')
        {
          result = Number(store[0]) / Number(store[1]);
          store[0] = String(result)
          store[1] = '';
          store[2] = '';
          screen.value = store[0]
        }
        else if (store[2].toLowerCase() == 'x' )
        {
          result = Number(store[0]) * Number(store[1]);
          store[0] = String(result)
          store[1] = '';
          store[2] = '';
          screen.value = store[0]
        }
        store[2] = target.innerHTML;
      }
    }else {
      store[2] = target.innerHTML;
    }
  }

  if (target.innerHTML == '-')
  {
    if (store[0] && store[1])
    {
      if (store[2])
      {
        let result;
        if (store[2] == '+')
        {
          //to reduce imprecise calculations with addition
          result = (Number(store[0]) * 10 + Number(store[1]) * 10) / 10;
          store[0] = String(result)
          store[1] = '';
          store[2] = '';
          screen.value = store[0]
        }else if (store[2] == '-')
        {
          //to reduce imprecise calculations with subtraction.
          result = (Number(store[0]) * 10 - Number(store[1]) * 10) / 10;
          store[0] = String(result)
          store[1] = '';
          store[2] = '';
          screen.value = store[0]
        }else if (store[2] == '/')
        {
          result = Number(store[0]) / Number(store[1]);
          store[0] = String(result)
          store[1] = '';
          store[2] = '';
          screen.value = store[0]
        }else if (store[2].toLowerCase() == 'x' )
        {
          result = Number(store[0]) * Number(store[1]);
          store[0] = String(result)
          store[1] = '';
          store[2] = '';
          screen.value = store[0]
        }
        store[2] = target.innerHTML;
      }
    }else {
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
          //to reduce imprecise calculations with addition
          result = (Number(store[0]) * 10 + Number(store[1]) * 10) / 10;
          store[0] = String(result)
          store[1] = '';
          store[2] = '';
          screen.value = store[0]
        }else if (store[2] == '-')
        {
          //to reduce imprecise calculations with subtraction.
          result = (Number(store[0]) * 10 - Number(store[1]) * 10) / 10;
          store[0] = String(result)
          store[1] = '';
          store[2] = '';
          screen.value = store[0]
        }else if (store[2] == '/')
        {
          result = Number(store[0]) / Number(store[1]);
          store[0] = String(result)
          store[1] = '';
          store[2] = '';
          screen.value = store[0]
        }else if (store[2].toLowerCase() == 'x' )
        {
          result = Number(store[0]) * Number(store[1]);
          store[0] = String(result)
          store[1] = '';
          store[2] = '';
          screen.value = store[0]
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
        let result;
        if (store[2] == '+')
        {
          //to reduce imprecise calculations with addition.
          result = (Number(store[0]) * 10 + Number(store[1]) * 10) / 10;
          store[0] = String(result)
          store[1] = '';
          store[2] = '';
          screen.value = store[0]
        }else if (store[2] == '-')
        {
          //to reduce imprecise calculations with subtraction.
          result = (Number(store[0]) * 10 - Number(store[1]) * 10) / 10;
          store[0] = String(result)
          store[1] = '';
          store[2] = '';
          screen.value = store[0]
        }else if (store[2] == '/')
        {
          result = Number(store[0]) / Number(store[1]);
          store[0] = String(result)
          store[1] = '';
          store[2] = '';
          screen.value = store[0]
        }else if (store[2].toLowerCase() == 'x' )
        {
          result = Number(store[0]) * Number(store[1]);
          store[0] = String(result)
          store[1] = '';
          store[2] = '';
          screen.value = store[0]
        }
        store[2] = target.innerHTML;
      }
    }else {
      store[2] = target.innerHTML;
    }
  }

  if (isFinite(target.innerHTML) )
  {
    
    let value;
    if (store[2] === '')
    {
      if (store[0].startsWith('0') && store[0][1] != '.')
      {
        value = store[0].slice(1)
        store[0] = value;
      }
      store[0] += target.innerHTML;
      screen.value = store[0];
      return;
    }
    
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