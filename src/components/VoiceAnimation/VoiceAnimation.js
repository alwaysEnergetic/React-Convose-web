import { memo } from "react"
import { StyledBar, StyledVoiceAnimation } from "./Styled"
const VoiceAnimation = () => {
  return (
    <StyledVoiceAnimation>
      {[0, 1, 2].map((i) => (
        <StyledBar duration={620 - Math.random() * 100} left={i * 14} key={i} />
      ))}
    </StyledVoiceAnimation>
  )
}

export default memo(VoiceAnimation)
