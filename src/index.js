import findNewPosts from './gear/find-new-posts'
import appendNewPosts from './gear/append-new-posts'
import refreshPagination from './gear/refresh-pagination'
import refreshPosts from './gear/refresh-posts'
import refreshLastMessage from './gear/refresh-last-message'

import request from 'superagent'
import _ from 'ramda'
import $ from 'jquery'


const htmlToDom = _.curry(
	(parser, html) => parser.parseFromString(html, 'text/html')
)

const parser = new window.DOMParser()

const href = ($) => $('link[rel="canonical"]').attr('href')

const run = () => new Promise((resolve, reject) => {
  request
    .get(href($))
    .end((err, res) => {
      if (err) reject(err)
      else {
        resolve(res.text)
      }
    })
})
window.jQuery = $
window.fetch = () =>
  run()
    .then(_.tap(() => console.log('I\'m not dead')))
    .then(htmlToDom(parser))
    .then(_.tap(_.compose(appendNewPosts($), findNewPosts($))))
    .then(_.tap(refreshPagination($)))
    .then(_.tap(refreshPosts($)))
    .then(_.tap(refreshLastMessage($)))
    .catch(e => setTimeout(() => {throw e}))

setInterval(window.fetch, 5000)
