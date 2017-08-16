
let button = document.querySelector('.accordion .button')
button.onclick = (e) => {
  let menu = e.currentTarget.parentElement.parentElement
  let ul = menu.getElementsByTagName('ul')[0]
  if (ul.classList.contains('act')) {
    ul.classList.remove('act')
    TweenMax.to(ul, .25, {height: '0px', ease: Quad.easeOut})
  } else {
    let startValue = ul.getBoundingClientRect()
    if (startValue.bottom - startValue.top > 0) {
      TweenMax.to(ul, .25, {height: '0px', ease: Quad.easeOut})
    } else {
      TweenMax.to(ul, .25, {height: '270px', ease: Quad.easeOut})
      ul.classList.add('act')
    }
  }
}

let buttonFixedMenu = document.querySelector('.fixed__nav button')
buttonFixedMenu.onclick = (e) => {
  let parent = e.currentTarget.parentElement.parentElement
  let menu = parent.querySelector('ul.menu')
  let fixedMenu = parent.parentElement
  if (menu.classList.contains('active')) {
    menu.classList.remove('active')
    TweenMax.to(fixedMenu, .5, {height: '65px', ease: Quad.easeOut})
  } else {
    menu.classList.add('active')
    TweenMax.to(fixedMenu, .5, {height: '333px', ease: Quad.easeOut})
  }
}

let fixedNav = document.querySelector('.fixed__nav')
let navigChild = fixedNav.children[0]
let bg = document.querySelector('.request__bg')
let timeline = new TimelineMax()
timeline.pause()
let heightTween
if (document.body.clientWidth < 1000) {
  heightTween = new TweenMax.to(fixedNav, 1, {height: '333px', ease: Back.easeOut})
} else {
  heightTween = new TweenMax.to(fixedNav, .5, {height: '50px', ease: Back.easeOut})
}
//heightTween.pause()
timeline
    .add(heightTween)
    .add(TweenMax.to(navigChild, .5, {opacity: '1', easy: Back.easeOut}))

/*let test = document.getElementById('test')
test.onclick = (e) => {
  let rule = CSSRulePlugin.getRule('.fixed__nav:after')
  if (navig.classList.contains('active')) {
    timeline.reverse()
    TweenMax.to(rule, .3, {cssRule: {width: '0%'}, easy: Back.easeOut})
    setTimeout(() => {
      navig.classList.remove('active')
    }, timeline.totalDuration() * 1000)
  } else {
    navig.classList.add('active')
    TweenMax.to(rule, .3, {cssRule: {width: '100%'}, easy: Back.easeOut})
    timeline.play()
  }
}*/

document.onscroll = (e) => {
  console.log('sdf')
  let rule = CSSRulePlugin.getRule('.fixed__nav:after')
  let active = false
  if (bg.getBoundingClientRect().top < 0) {
    if (!fixedNav.classList.contains('active')) {
      fixedNav.classList.add('active')
      active = true
    }
    if (active) {
      TweenMax.to(rule, .5, {cssRule: {width: '100%'}, ease: Back.easeOut})
      timeline.play()
    }
  } else {
    if (fixedNav.classList.contains('active')) {
      active = false
    }
    if (!active && fixedNav.classList.contains('active')) {
      timeline.reverse()
      TweenMax.to(rule, .5, {cssRule: {width: '0%'}, ease: Back.easeOut})
      setTimeout(() => {
        fixedNav.classList.remove('active')
        let ul = fixedNav.querySelector('ul.menu')
         if (!ul.classList.contains('active')) {
           ul.classList.add('active')
         }
      }, timeline.totalDuration() * 1000)
    }
  }
}

// fix adaptive menu with Tweenmax animation
// also fix main menu height when user resize window
let siteMenu = document.querySelector('.smoothscroll ul.menu')
window.onresize = (e) => {
  if (document.body.clientWidth < 1000) {
        timeline.remove(heightTween)
        heightTween = new TweenMax.to(fixedNav, 1, {height: '333px', ease: Back.easeOut})
        timeline.add(heightTween, 0)
        siteMenu.style.height = '0'
      } else {
        timeline.remove(heightTween)
        heightTween = new TweenMax.to(fixedNav, .5, {height: '50px', ease: Back.easeOut})
        timeline.add(heightTween, 0)
        if (siteMenu.classList.contains('act')) {
          siteMenu.classList.remove('act')
        }
        siteMenu.style.height = '50px'
  }
}

let map = document.querySelector('.contacts__map')

map.onclick = (e) => {
  e.currentTarget.classList.remove('active')
}

map.querySelector('iframe').onmouseout = (e) => {
  e.currentTarget.parentElement.classList.add('active')
}

/*slider*/
let content = document.querySelector('.best_products__content')
let arrows = content.querySelectorAll('.arrow.icon')
let segment = content.querySelectorAll('.ui.segment')
let num = segment.length
let segmentWidth = segment[0].getBoundingClientRect().width
let offset = 1
let left, right
arrows.forEach((el) => {
  el.classList.contains('left') ? left = el : right = el
  el.onclick = (e) => {
    let timer = .3
    let stylefirst = window.getComputedStyle(segment[0])
    let firstElMargin = {left: +stylefirst.marginLeft.slice(0, -2), right: +stylefirst.marginRight.slice(0, -2)}
    if (e.currentTarget.classList.contains('left')) {
      offset >= num ? num : offset++
    } else {
      offset <= 1 ? 1 : offset--
    }

    if (offset === 1) {
      right.classList.remove('active')
    } else if (offset === num) {
      left.classList.remove('active')
    } else {
      if (!left.classList.contains('active')) {
        left.classList.add('active')
      }
      if (!right.classList.contains('active')) {
        right.classList.add('active')
      }
    }

    TweenMax.staggerTo(segment, timer, {x: -1 * (offset - 1) * (segmentWidth + firstElMargin.left), ease: Linear }, timer / num)
  }
})
