
function m(a, b) {
  for (var n in b) {a[n] = b[n]}
  return a
}

function InputTree(options) {
  function thehead(props, children) {
    return InputHead(m(props, 
  }
  return tree.Tree({
    manager: options.manager,
    head: thehead,
    id: 0,
  })
}



React.renderComponent(tree.InputTree({
  manager: new tree.Manager({id: 0, children: rTree(0, 3)}),
  head: InputHead,
  id: 0,
}), document.getElementById('inputs'))


