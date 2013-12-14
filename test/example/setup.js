
var Tree = require('tree')
  , Manager = require('manager')
  , Input = require('input-tree')

function rid() {
  var chars = 'abcdef0123456789'
    , id = ''
  for (var i=0; i<5; i++) {
    id += chars[parseInt(Math.random()*chars.length)]
  }
  return id
}

function rTree(idx, depth) {
  if (depth <= 0) return
  var n = parseInt(Math.random() * 3) + 2
    , children = []
  for (var i=0; i<n; i++) {
    children.push({
      id: rid(), // idx + ':' + i,
      data: {
        name: 'Name of ' + idx + ':' + i
      },
      children: rTree(idx + ':' + i, depth-1)
    })
  }
  return children
}

React.renderComponent(Tree({
  manager: new Manager({id: 0, children: rTree(0, 3)}),
  head: Input,
  headProps: {
    keymap: {
      moveLeft: 'ctrl h',
      moveRight: 'ctrl l',
      moveDown: 'ctrl j',
      moveUp: 'ctrl k',
      newAfter: 'return',
      goDown: 'down',
      goUp: 'up',
    }
  },
  id: 0,
}), document.getElementById('tree'))


