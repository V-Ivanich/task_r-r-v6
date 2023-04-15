import React from 'react'
import {
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { useParams } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
      <NavLink to='/users'>Users list page</NavLink>
    </>
  )
}

function App() {
  const usersData = [
    { name: 'User-1', id: 0 },
    { name: 'User-2', id: 1 },
    { name: 'User-3', id: 2 },
    { name: 'User-4', id: 3 },
    { name: 'User-5', id: 4 },
  ]
  const Home = () => {
    return <h1>Home Page!</h1>
  }

  const EditUserPage = () => {
    const { userId: id } = useParams()
    console.log(id)
    return (
      <>
        <h1>Edit User Page!</h1>
        <NavLink to={`/users/${id}`}>User profile page</NavLink>
        <NavLink to={`/users/${+id + 1}`}>Another user page</NavLink>
        <NavLink to='/users'>Users List page</NavLink>
      </>
    )
  }

  const UserListPage = () => {
    return (
      <>
        <h1>User List Page</h1>
        {usersData.map((user) => (
          <NavLink key={user.id} to={`/users/${user.id}`}>
            {user.name}
          </NavLink>
        ))}
      </>
    )
  }

  const UserPage = () => {
    const { userId } = useParams()
    const getUserId = (id) => {
      return usersData.find((u) => u.id.toString() === id)
    }
    const user = getUserId(userId)
    if (!user) {
      return <Navigate to='/users' />
    }
    return (
      <>
        <h1>User Page!</h1>
        <NavLink to='/users'>Users List page</NavLink>
        <NavLink to={`/users/${userId}/edit`}>Edit this user</NavLink>
        <h3>{`${user.name} id: ${user.id}`}</h3>
      </>
    )
  }

  const UserLayout = () => {
    return (
      <>
        <h1>Users Layout</h1>
        <NavLink to='/'>Home page</NavLink>
        <Outlet />
      </>
    )
  }

  return (
    <div>
      <h1>App Layout</h1>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='users' element={<UserLayout />}>
          <Route index element={<UserListPage />} />
          <Route path=':userId' element={<UserPage />} />
          <Route path=':userId/edit' element={<EditUserPage />} />
          <Route path='*' element={<Navigate to='/users' />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  )
}

export default App
