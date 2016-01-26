import findNewPosts from './gear/find-new-posts'
import appendNewPosts from './gear/append-new-posts'
import refreshPagination from './gear/refresh-pagination'
import refreshPosts from './gear/refresh-posts'
import refreshLastMessage from './gear/refresh-last-message'
import fetchPosts from './gear/fetch-posts'
import markTitle from './gear/mark-title'

import request from 'superagent'
import _ from 'ramda'
import $ from 'jquery'


const htmlToDom = _.curry(
	(parser, html) => parser.parseFromString(html, 'text/html')
)
const titleMark = (marked) => marked ? '*' : ''
const title = _.curry((title, marked) => titleMark(marked) + title)


const parser = new window.DOMParser()

let state = {
  titleMarked: false,
  title: document.title,
}

const setMarked = (marked) => {
  state = _.assoc('titleMarked', marked, state)
  document.title = title(state.title, state.titleMarked)
}

const notifyTitle = () => markTitle($, state.marked, setMarked)

const boolToTitle = _.tap(
  (b) => {
    if (b) notifyTitle()
  }
)

const newPostsToTitle = _.tap(_.compose(boolToTitle, _.prop('length')))

window.jQuery = $
window.fetch = () =>
  fetchPosts($, request)
    .then(_.tap(() => console.log('I\'m not dead')))
    .then(htmlToDom(parser))
    .then(_.tap(_.compose(newPostsToTitle, appendNewPosts($), findNewPosts($))))
    .then(_.tap(_.compose(boolToTitle, refreshPagination($))))
    .then(_.tap(refreshPosts($)))
    .then(_.tap(refreshLastMessage($)))
    .catch(e => setTimeout(() => {throw e}))

setInterval(window.fetch, 5000)
