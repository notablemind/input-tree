
var keys = require('keys')

var InputHead = module.exports = React.createClass({

  getDefaultProps: function () {
    return {
      actions: {},
      keymap: {},
      value: '',
      onChange: function () {},
      setFocus: false,
      onFocus: function () {},
      setSelection: false,
      className: ''
    }
  },

  keyMap: function () {
    var keymap = {}
      , key
    if (this.props.onNext) {
      keymap['tab'] = this.props.onNext
    }
    if (this.props.onPrev) {
      keymap['shift tab'] = this.props.onPrev
    }

    if (this.props.keymap) {
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
    }
    if (this.props.actions) {
      keymap['backspace'] = this.onBackspace
      keymap['left'] = this.onLeft
      keymap['right'] = this.onRight
    }
    return keys(keymap)
  },

  onBackspace: function (e) {
    if (e.target.selectionEnd > 0) return true
    this.props.actions.remove(this.props.value)
  },

  onLeft: function (e) {
    if (e.target.selectionEnd > 0) return true
    this.props.actions.goUp()
  },

  onRight: function (e) {
    if (e.target.selectionStart < e.target.value.length) return true
    this.props.actions.goDown(true, true)
  },

  onReturn: function (after) {
    var inp = this.refs.input.getDOMNode()
      , pos = inp.selectionStart
      , bef = this.props.value.slice(0, pos)
      , aft = this.props.value.slice(pos)
    if (bef !== this.props.value) this.props.onChange(bef)
    this.props.actions.createAfter({text: aft}, after)
  },

  inputChange: function (e) {
    this.props.onChange(e.target.value)
  },

  focus: function () {
    this.focusMe()
  },

  onFocus: function () {
    if (!this.props.setFocus && this.props.onFocus) this.props.onFocus()
  },

  // component api
  focusMe: function () {
    var inp = this.refs.input.getDOMNode()
      , focusAtStart = this.props.setFocus === 'start'
      , pos = 0
    if (inp === document.activeElement) return
    if (this.props.value && !focusAtStart) pos = this.props.value.length
    inp.focus()
    inp.selectionStart = inp.selectionEnd = pos
  },

  selectMe: function () {
    var inp = this.refs.input.getDOMNode()
    inp.selectionStart = inp.selectionEnd = this.props.setSelection
  },

  componentDidMount: function () {
    if (this.props.setFocus) {
      this.focusMe()
    }
    if (this.props.setSelection !== false) {
      this.selectMe()
    }
  },

  componentDidUpdate: function () {
    if (this.props.setFocus) {
      this.focusMe()
    }
    if (this.props.setSelection !== false) {
      this.selectMe()
    }
  },

  render: function () {
    return React.DOM.input({
      ref: 'input',
      className: this.props.className + ' ' + (this.props.setFocus ? 'focus' : ''),
      onChange: this.inputChange,
      onFocus: this.onFocus,
      placeholder: 'Type here',
      value: this.props.value,
      onKeyDown: this.keyMap()
    })
  }
})


