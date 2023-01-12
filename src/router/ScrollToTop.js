import { Component } from "react"
import PropTypes from "prop-types"
import { location as locationShape } from "react-router-prop-types"
import { withRouter } from "react-router-dom"

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props
    if (location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const { children } = this.props
    return children
  }
}

ScrollToTop.propTypes = {
  children: PropTypes.node.isRequired,
  location: locationShape.isRequired,
}

export default withRouter(ScrollToTop)
