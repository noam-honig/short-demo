import { FormEvent, useEffect, useState } from 'react'
import { remult, UserInfo } from 'remult'
import App from './App'

export default function Auth() {
  const [currentUser, setCurrentUser] = useState<UserInfo>()
  const [showSignIn, setShowSignIn] = useState(false)
  remult.user = currentUser

  async function signIn(f: FormEvent<HTMLFormElement>) {
    f.preventDefault()
    const result = await fetch('/api/signIn', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(new FormData(f.currentTarget))),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (result.ok) {
      setCurrentUser(await result.json())
      setShowSignIn(false)
    } else alert(await result.json())
  }
  async function signOut() {
    await fetch('/api/signOut', {
      method: 'POST',
    })
    setCurrentUser(undefined)
    setShowSignIn(true)
  }
  useEffect(() => {
    fetch('/api/currentUser')
      .then((r) => r.json())
      .then(async (currentUserFromServer) => {
        setCurrentUser(currentUserFromServer)
      })
  }, [])

  if (showSignIn)
    return (
      <>
        <main className="sign-in">
          <h2>Sign In</h2>
          <form onSubmit={signIn}>
            <label>Name</label>
            <input name="username" placeholder="Try Steve or Jane" />
            <button>Sign in</button>
          </form>
        </main>
      </>
    )

  return (
    <>
      <div>
        Hello {currentUser?.name}{' '}
        {!currentUser ? (
          <button onClick={() => setShowSignIn(true)}>Sign In</button>
        ) : (
          <button onClick={signOut}>Sign Out</button>
        )}
      </div>

      <App />
    </>
  )
}
