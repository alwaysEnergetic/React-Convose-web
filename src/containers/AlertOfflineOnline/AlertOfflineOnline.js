import { Detector } from "react-detect-offline"
import iconOffline from "./offline.png"
import iconOnline from "./online.png"
import { getBrowserIsAnimate } from "../../redux/selectors/browser"
import "./AlertOfflineOnline.css"
import { initResendFailedMessage } from "../../redux/actions/chats"
import { useDispatch, useSelector } from "react-redux"

const AlertOfflineOnline = () => {
  const dispatch = useDispatch()
  const animate = useSelector((state) => getBrowserIsAnimate(state))

  const handleChange = (online) => {
    if (online) dispatch(initResendFailedMessage())
  }
  return (
    <Detector
      onChange={handleChange}
      render={({ online }) => {
        return (
          <div
            className={`offline-online-container ${
              animate == true ? "animate-offline" : ""
            } ${online ? "bg-online" : "bg-offline"}`}
          >
            <span style={{ fontSize: "17px" }}>
              You are {online ? "online" : "offline"}
            </span>
            <img
              src={online ? iconOnline : iconOffline}
              className={`offline-online-img`}
            />
          </div>
        )
      }}
    />
  )
}
export default AlertOfflineOnline
