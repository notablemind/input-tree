/* @jsx React.DOM */

var keys = require('keys')

var InputHead = module.exports = React.createClass({

  gotData: function (data) {
    this.setState({input: data.name})
  },

  keyMap: function () {
    var keymap = {}
      , key
    for (var name in this.props.actions) {
      key = this.props.keymap[name]
      if (!key) continue
      keymap[keys.normalize(key).value] = this.props.actions[name].bind(null, true)
    }
    if (this.props.keymap.newNode) {
      keymap[keys.normalize(this.props.keymap.newNode).value] = this.onReturn.bind(this, false)
    }
    if (this.props.keymap.newAfter) {
      keymap[keys.normalize(this.props.keymap.newAfter).value] = this.onReturn.bind(this, true)
    }
    keymap['backspace'] = this.onBackspace
    return keys(keymap)
  },

  addText: function (text) {
    var full = this.state.input + text
      , pos = this.state.input.length
      , inp = this.refs.input.getDOMNode()
    this.setState({input: full})
    this.props.set({name: full})
    setTimeout(function () {
    inp.selectionStart = inp.selectionEnd = pos
    }, 10)
  },

  onBackspace: function (e) {
    if (e.target.selectionEnd) return true
    this.props.actions.remove(this.state.input)
  },

  onReturn: function (after) {
    var inp = this.refs.input.getDOMNode()
      , pos = inp.selectionStart
      , bef = this.state.input.slice(0, pos)
      , aft = this.state.input.slice(pos)
    if (bef !== this.state.input) this.setState({input: bef})
    this.props.actions.createAfter(aft, after)
  },

  inputChange: function (e) {
    this.setState({input:e.target.value})
    this.props.set({name: e.target.value})
  },

  focus: function () {
    if (!this.props.setFocus) this.props.onFocus()
  },

  // component api
  getInitialState: function () {
    return {
      input: ''
    }
  },

  focusMe: function () {
    var inp = this.refs.input.getDOMNode()
      , focusAtStart = this.props.setFocus === 'start'
      , pos = 0
    if (inp === document.activeElement) return
    if (this.state.input && !focusAtStart) pos = this.state.input.length
    inp.focus()
    inp.selectionStart = inp.selectionEnd = pos
  },

  componentDidMount: function () {
    if (this.props.setFocus) {
      this.focusMe()
    }
  },
  componentDidUpdate: function () {
    if (this.props.setFocus) {
      this.focusMe()
    }
  },
  componentWillMount: function () {
    if (!this.props.on) return
    this.props.on(this.gotData)
  },
  componentWillUnmount: function () {
    this.props.off(this.gotData)
  },

  render: function () {
    return React.DOM.input({
      ref: 'input',
      className: this.props.setFocus ? 'focus' : '',
      onChange: this.inputChange,
      onBlur: this.blur,
      onFocus: this.focus,
      placeholder: 'feedme',
      value: this.state.input,
      onKeyDown: this.keyMap()
    })
  }
})
