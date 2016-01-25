import _ from 'ramda'


const htmlToDom = _.curry(
	(parser, html) => parser.parseFromString(html, 'text/html')
)

const findPosts = _.curry(
 (find) => find('#forumposts .windowbg:has(.keyinfo),' +
          '#forumposts .windowbg2:has(.keyinfo)')
)

const getPostId = _.curry(
  ($post) => $post.find('[id^="subject_"]').attr('id')
)

const comparePosts = _.curry(
  ($, a, b) => getPostId($(a)) === getPostId($(b))
)

const getNewPosts = ($, parser, html) => {
  const dom = htmlToDom(parser, html)
  const $dom = $(dom)
  const posts = findPosts($dom.find.bind($dom))
  const renderedPosts = findPosts($)
  const newPosts = _.differenceWith(comparePosts($), posts, renderedPosts)
  return newPosts
}

const findNewPosts = _.curry((request, parser, $, loc) => {
  return new Promise((resolve, reject) => {
    request
      .get(loc)
      .end((err, res) => {
        if (err) reject(err)
        else {
          const newPosts = getNewPosts($, parser, res.text)
          resolve(newPosts)
        }
      })
  })
})

export default findNewPosts
