
var Tree = require('tree')
  , Manager = require('manager')
  , Input = require('input')

React.renderComponent(tree.Tree({
  manager: new Manager({id: 0, children: rTree(0, 3)}),
  head: Input,
  headProps: {
    keymap: {
      moveLeft: 'ctrl h',
      moveRight: 'ctrl l',
      moveDown: 'ctrl j',
      moveUp: 'ctrl k',
      goDown: 'down',
      goUp: 'up',
    }
  },
  id: 0,
}), document.getElementById('inputs'))


