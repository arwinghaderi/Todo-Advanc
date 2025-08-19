'use client'

import { Typewriter } from 'react-simple-typewriter'

export default function TypewriterText() {
  return (
    <Typewriter
      words={[
        'با TodoMaster، کارهات رو با سرعت مدیریت کن.',
        'با TodoMaster، دقت رو تجربه کن.',
        'با TodoMaster، لذت انجام کارها رو حس کن.',
      ]}
      loop={true}
      cursor
      cursorStyle="|"
      typeSpeed={130}
      deleteSpeed={60}
      delaySpeed={2000}
    />
  )
}
