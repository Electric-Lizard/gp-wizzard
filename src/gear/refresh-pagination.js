import _ from 'ramda'


const findPageNum = ($) =>
$.find('.pagesection .pagelinks').eq(0).children('.navPages')
  .filter((_, v) => isFinite(parseFloat(v.innerHTML)))
  .last()
  .text()

// returns 2 elements (top and bottom)
const findPagination = ($) => $.find('.pagesection .pagelinks')

const replacePagination = ($, dom) => {
  const a = findPagination($(document))
  const b = findPagination($(dom))

  a.eq(0).replaceWith(b.eq(0).clone())
  a.eq(1).replaceWith(b.eq(1).clone())
}

const refreshPagination = _.curry(($, dom) => {
  const currentPage = findPageNum($(document))
  const actualPage = findPageNum($(dom))

  if (actualPage > currentPage) {
    replacePagination($, dom)

    findPagination($(document)).children().each((_, v) => {
      const i = parseFloat(v.innerHTML)
      if (isFinite(i) && i > currentPage) {
        v.style.color = '#03A9F4'
      }
    })
  }
})

export default refreshPagination
