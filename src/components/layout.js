import React from "react"
import { FiMoon, FiSun } from "react-icons/fi"

import { isRunningInBrowser } from "../utils/helpers"
import Sidebar from "./sidebar"
import Switch from "./switch"

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: "light",
    }
  }

  componentWillMount() {
    if (isRunningInBrowser()) {
      let theme = JSON.parse(localStorage.getItem("theme"))
      if (theme !== null) {
        this.setState({ theme })
        document.documentElement.setAttribute("data-theme", theme)
      }
    }
  }

  toggleTheme = () => {
    const theme = this.state.theme === "light" ? "dark" : "light"
    this.setState({ theme })
    document.documentElement.setAttribute("data-theme", theme)
    isRunningInBrowser() && localStorage.setItem("theme", JSON.stringify(theme))
  }

  render() {
    const { location, title, children, currentLanguage } = this.props
    const { theme } = this.state
    const isOn = theme !== "light" ? true : false

    return (
      <div>
        <div className="d-flex justify-content-end pt-3 px-sm-5 mr-3">
          <div style={{ marginTop: "-0.5px", paddingRight: "0.5rem" }}>
            {isOn ? (
              <FiMoon style={{ color: "#f5f3ce", fontSize: "1.5rem" }} />
            ) : (
              <FiSun style={{ color: "#ecbd2c", fontSize: "1.5rem" }} />
            )}
          </div>
          <Switch isOn={isOn} handleToggle={this.toggleTheme} />
        </div>
        <div className="row">
          <Sidebar
            title={title}
            langKey={currentLanguage}
            location={location}
          />
          <div className="col-sm-9 mt-sm-3">{children}</div>
        </div>
        <footer className="ml-5">
          © {new Date().getFullYear()}, Built with
          {` `}
          gatsby
        </footer>
      </div>
    )
  }
}

export default Layout
