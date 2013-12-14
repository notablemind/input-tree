
var keys = require('keys')

var InputHead = module.exports = React.createClass({

  gotData: function (data) {
    this.setState({input: data.name})
  },

  keyMap: function () {
    var keymap = {}
      , names = ['left', 'right', 'up', 'down']
    function c(name) {return 'move' + name[0].toUpperCase() + name.slice(1)}
    for (var i=0; i<names.length; i++) {
      if (!this.props.keymap[c(names[i])]) continue;
      keymap[this.props.keymap[c(names[i])]] = this.props.move[names[i]].bind(null, true)
    }
    return keys(keymap)
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

  // component api
  getInitialState: function () {
    return {
      focus: this.props.focus,
      input: ''
    }
  },
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


