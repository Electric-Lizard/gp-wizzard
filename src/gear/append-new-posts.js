import _ from 'ramda'


const delimiterStyle = {
  height: '1px',
  backgroundColor: '#03A9F4',
  //border: '0 solid transparent',
  //borderTopWidth: '1px',
  //borderBottomWidth: '1px',
  //borderColor: '#B3E5FC',
}

const delimiter = ($) => $('<div>').css(delimiterStyle)

const appendNewPosts = _.curry(
  ($, x) => {
    if(x.length > 0)
      $('#forumposts form')
        .append(delimiter($))
        .append(x)

    return x
  }
)

export default appendNewPosts
