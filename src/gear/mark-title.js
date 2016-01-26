import _ from 'ramda'


const markTitle = _.curry(
  ($, marked, setMarked) => {
    if (!document.hidden) return
    else if (marked) return
    else {
      setMarked(true)
      $(document).one('visibilitychange', () => setMarked(false))
    }
  }
)

export default markTitle
