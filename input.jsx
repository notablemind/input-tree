
var keys = require('keys')

var InputHead = module.exports = React.createClass({
  // all about the focus
  componentDidMount: function () {
    if (this.state.focus) {
      this.refs.input.getDOMNode().focus()
    }
  },
  componentDidUpdate: function () {
    if (this.state.focus) {
      this.refs.input.getDOMNode().focus()
    }
  },
  componentWillReceiveProps: function (props, oprops) {
    if (props.focus) this.setState({focus: true})
  },
  componentWillMount: function () {
    if (!this.props.on) return
    this.props.on(this.gotData)
  },

  componentWillUnmount: function () {
    this.props.off(this.gotData)
  },

  gotData: function (data) {
    this.setState({input: data.name})
  },

  inputChange: function (e) {
    this.setState({input:e.target.value})
    this.props.set({name: e.target.value})
  },
  blur: function () {
    this.setState({focus: false})
  },
  focus: function () {
    this.setState({focus: true})
  },

  getInitialState: function () {
    return {
      focus: this.props.focus,
      input: ''
    }
  },

  keyMap: function () {
    var keymap = {}
      , names = ['moveLeft', 'moveLeft', 'moveLp', 'moveLown']
    for (var i=0; i<names.length; i++) {
      keymap[names[i]] = this.props.keys[names[i]].bind(null, true)
    }
    return keys(keymap)
  },

  render: function () {
    return React.DOM.input({
      ref: 'input',
      className: this.state.focus ? 'focus' : '',
      onChange: this.inputChange,
      onBlur: this.blur,
      onFocus: this.focus,
      placeholder: 'feedme',
      value: this.state.input,
      onKeyDown: this.keyMap()
    })
  }
})


