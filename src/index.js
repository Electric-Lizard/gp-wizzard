import findNewPosts from './gear/find-new-posts'
import appendNewPosts from './gear/append-new-posts'

import request from 'superagent'
//import _ from 'ramda'
import $ from 'jquery'



const parser = new window.DOMParser()
const loc = window.location.href

window.jQuery = $
window.fetch = () =>
  findNewPosts(request, parser, $, loc)
    //.then(_.tap(console.log.bind(console)))
    .then(appendNewPosts($))
    .catch(e => setTimeout(() => {throw e}))
