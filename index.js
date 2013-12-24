
var keys = require('keys')
  , Textarea = require('textarea-grow')

var InputHead = module.exports = React.createClass({

  getDefaultProps: function () {
    return {
      actions: {},
      keymap: {},
      value: '',
      multiline: true,
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
    if (this.props.preserveReturn) {
      delete keymap['return']
    }
    return keys(keymap)
  },

  onBackspace: function (e) {
    if (e.target.selectionEnd > 0) return true
    this.props.actions.remove(this.props.value)
  },

  onLeft: function (e) {
    if (e.target.selectionEnd > 0) return true
    this.props.actions.goLeft()
  },

  onRight: function (e) {
    if (e.target.selectionStart < e.target.value.length) return true
    this.props.actions.goRight()
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

  focus: function (start) {
    this.focusMe(start)
  },

  onFocus: function () {
    // if (!this.props.setFocus && this.props.onFocus) this.props.onFocus()
  },

  // component api
  focusMe: function (start) {
    if (this.props.multiline) {
      return this.refs.input.focus(start)
    }
    var inp = this.refs.input.getDOMNode()
      , focusAtStart = start || this.props.setFocus === 'start'
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

  shouldComponentUpdate: function (props, state) {
    return props.value !== this.props.value || props.multiline !== this.props.multiline
  },
  render: function () {
    var n = this.props.multiline ? Textarea : React.DOM.input
    return n({
      ref: 'input',
      className: 'input-head ' + this.props.className + ' ' + (this.props.setFocus ? 'focus' : ''),
      onChange: this.inputChange,
      onFocus: this.onFocus,
      placeholder: 'Type here',
      value: this.props.value,
      goUp: this.props.actions.goUp,
      goDown: this.props.actions.goDown,
      onKeyDown: this.keyMap()
    })
  }
})


