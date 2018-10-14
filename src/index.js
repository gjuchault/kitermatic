import React from 'react'
import { render } from 'react-blessed'
import screen from './screen'
import App from './views/App'
import env, { number } from './env'
import { refreshContainers } from './store/containers'

render(<App />, screen)

refreshContainers()
setInterval(refreshContainers, number(env.KTRM_REFRESH_INTERVAL, 3000))
