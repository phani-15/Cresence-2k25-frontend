import { BrowserRouter } from 'react-router-dom'
import { TransitionProvider } from './Context/TransitionContext'
import PageTransition from './Components/PageTransition'
import Routing from './Routing'

function App() {
  return (
    <>
      <BrowserRouter>
        <TransitionProvider>
          <PageTransition />
          <Routing />
        </TransitionProvider>
      </BrowserRouter>
    </>
  )
}

export default App
