import _ from 'ramda'


const content = (a) => a.find('.inner')

const posts = (dom) => dom.find('.post_wrapper')

const refresh = (a, b) => {
  if (!a || !b || !a.length || !b.length) return
  const ax = content(a)
  const bx = content(b)
  if (ax.html() !== bx.html()) {
    ax.replaceWith(bx)
    a.css({backgroundColor: '#FFF8E1'})
  }
}

const refreshPosts = _.curry(($, dom) => {
  const actualPosts = posts($(dom))
  posts($(document)).each((i, v) => {
    refresh($(v), $(actualPosts[i]))
  })
})

export default refreshPosts
