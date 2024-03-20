import { useState } from 'react'
import Layout from '../components/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [canUpdate, setCanUpdate] = useState(false)

  const handleUpdateClick = () => {

  }

  let updateOptions = {
    canUpdate,
    onClick: handleUpdateClick,
  }

  return (
    <Layout updateOptions={updateOptions}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
