import _ from 'ramda'


const lastMessage =
  (dom) => dom.find('#postmodify [name="last_msg"]')

const refreshLastMessage = _.curry(($, dom) => {
  lastMessage($(document)).val(lastMessage($(dom)))
})

export default refreshLastMessage
