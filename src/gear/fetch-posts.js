import _ from 'ramda'

const href = ($) => $('link[rel="canonical"]').attr('href')
const fetchPosts = _.curry(
  ($, request) =>
    new Promise((resolve, reject) => {
      request
        .get(href($))
        .end((err, res) => {
          if (err) reject(err)
          else {
            resolve(res.text)
          }
        })
    }
))

export default fetchPosts
