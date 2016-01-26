import _ from 'ramda'


const content = (post) => post.find('.inner')

const posts = (dom) => dom.find('.post_wrapper')

const isHidden = (node) => node.style.display === 'none'

const imageViewing =
  (post) => !!post.find('.highslide.highslide-active-anchor').length

const spoilerOpened =
  (post) =>
    !!post
      .find('.spoilerbody')
      .filter(_.compose(_.not, _.flip(isHidden)))
      .length

const hasEditor = (post) => !!post.find('.editor').length

// Post -> boolean
const interacted = _.anyPass([hasEditor, spoilerOpened, imageViewing])

const formatHtml = (html) =>
  html
    .replace(/\s{2,}/, ' ')
    .replace(/(style="[^";]*)"/g, (_, a) => a+';'+'"')

const refresh = (a, b) => {
  if (!a || !b || !a.length || !b.length || interacted(a)) return
  const ax = content(a)
  const bx = content(b)
  if (formatHtml(ax.html()) !== formatHtml(bx.html())) {
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
