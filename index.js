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
      keymap[keys.normalize(key).value] = this.props.actions[name].bind(null, true, this)
    }
    return keys(keymap)
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
  componentDidMount: function () {
    if (this.props.setFocus) {
      this.refs.input.getDOMNode().focus()
    }
  },
  componentDidUpdate: function () {
    if (this.props.setFocus) {
      this.refs.input.getDOMNode().focus()
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
