import { PureComponent } from "react"
import PropTypes from "prop-types"
import Responsive from "react-responsive"
import { breakPoints } from "../../utils/mediaQueryHelper"

class DesktopUp extends PureComponent {
  render() {
    const { children } = this.props
    return <Responsive minWidth={breakPoints.desktop}>{children}</Responsive>
  }
}

DesktopUp.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DesktopUp
