// modified version of default layout renderer
// simplified code, added support for line breaks (fill)

const childrenSize = function (out, el) {
  if (!this.isRendered(el)) return out

  out = Math.max(out, el.lpos.yl - el.lpos.yi)

  return out
}

module.exports = function (coords) {
  const width = coords.xl - coords.xi
  const xi = coords.xi

  // The current row offset in cells (which row are we on?)
  let rowOffset = 0

  // The index of the first child in the row
  let rowIndex = 0

  return (el, i) => {
    // if custom prop fill is present, start a new line
    if (el.props.fill) {
      rowOffset += this.children
        .slice(rowIndex, i)
        .reduce(childrenSize.bind(this), 0)

      rowIndex = i
      el.position.left = 0
      el.position.top = rowOffset
    }

    el.shrink = true

    const last = this.getLastCoords(i)

    if (!last) {
      el.position.left = 0
      el.position.top = 0
    } else {
      // if position was set to 0, keep it that way
      if (el.position.left !== 0) {
        el.position.left = last.xl - xi
      }

      if (el.position.left + el.width <= width) {
        el.position.top = rowOffset
      } else {
        rowOffset += this.children
          .slice(rowIndex, i)
          .reduce(childrenSize.bind(this), 0)
        rowIndex = i
        el.position.left = 0
        el.position.top = rowOffset
      }
    }
  }
}
