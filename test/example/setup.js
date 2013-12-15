
var Tree = require('tree')
  , Manager = require('note-manager')
  , Input = require('input-tree')

function rid() {
  var chars = 'abcdef0123456789'
    , id = ''
  for (var i=0; i<5; i++) {
    id += chars[parseInt(Math.random()*chars.length)]
  }
  return id
}

function rTree(idx, depth, fixed) {
  if (depth <= 0) return
  var n = fixed || parseInt(Math.random() * 3) + 2
    , children = []
  for (var i=0; i<n; i++) {
    children.push({
      id: rid(), // idx + ':' + i,
      data: {text: 'Name of ' + idx + ':' + i},
      children: rTree(idx + ':' + i, depth-1, fixed)
    })
  }
  return children
}

var InputHead = React.createClass({

  getInitialState: function () {
    return {
      text: '',
      selection: false
    }
  },

  componentWillMount: function () {
    if (!this.props.on) return
    this.props.on(this.gotData)
  },
  componentWillUnmount: function () {
    this.props.off(this.gotData)
  },

  gotData: function (data) {
    this.setState({text: (data.data && data.data.text) || ''})
  },
  onChange: function (text) {
    this.setState({text: text, selection: false})
    this.props.set('data', {text: text})
  },

  addText: function (text) {
    var full = this.state.text + text
      , pos = this.state.text.length
    this.setState({
      text: full,
      selection: this.state.text.length
    })
    this.props.set('data', {text: full})
  },

  render: function () {
    return this.transferPropsTo(Input({
      setSelection: this.state.selection,
      onChange: this.onChange,
      value: this.state.text,
    }))
  }
})

React.renderComponent(Tree({
  manager: new Manager({id: 0, children: rTree(0, 3)}), // big test is rTree(0, 3, 6)
  head: InputHead,
  headProps: {
    keymap: {
      moveLeft: 'alt left|shift tab',
      moveRight: 'alt right|tab',
      moveDown: 'alt down',
      moveUp: 'alt up',

      newNode: 'return',
      newAfter: 'shift return',
      goDown: 'down',
      goUp: 'up',
    }
  },
  id: 0,
}), document.getElementById('tree'))


