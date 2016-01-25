import _ from 'ramda'


const findPosts = _.curry(
 ($) => $.find('#forumposts .windowbg:has(.keyinfo),' +
          '#forumposts .windowbg2:has(.keyinfo)')
)

const getPostId = _.curry(
  ($post) => $post.find('[id^="subject_"]').attr('id')
)

const comparePosts = _.curry(
  ($, a, b) => getPostId($(a)) === getPostId($(b))
)

const findNewPosts = _.curry(($, dom) => {
  const posts = findPosts($(dom))
  const renderedPosts = findPosts($(document))
  const newPosts = _.differenceWith(comparePosts($), posts, renderedPosts)
  return newPosts.map(x => $(x).clone()[0])
})

export default findNewPosts
