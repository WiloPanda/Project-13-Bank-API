import dataAccount from '@/Mocks/account.json'
import Account from '@/Components/Account'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '@/App/Selector/authSelector';
import { userSelector } from '@/App/Selector/userSelector';
import { AuthApi } from '@/Services/authApi';

const Profile = () => {
  const { token } = useSelector(authSelector);
  const { firstName, lastName } = useSelector(userSelector);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const setinfos = async () => {
    const data = await AuthApi.getProfileApi(token);
    dispatch({
      type: "User/setUserProfile",
      payload: {
        firstName: data.body.firstName,
        lastName: data.body.lastName,
      },
    });
  };

  const update = async (newFirstName, newLastName) => {
    await AuthApi.updateProfileApi(token, { firstName: newFirstName, lastName: newLastName });
    dispatch({ type: "User/setUserProfile", payload: { firstName: newFirstName, lastName: newLastName } });
  };

  const [edit, setEdit] = useState(false)
  const [newFirstName, setNewFirstName] = useState(firstName)
  const [newLastName, setNewLastName] = useState(lastName)

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    setinfos();
  }, [token]);

  let reset = () => {
    setEdit(false)
    setNewFirstName(firstName)
    setNewLastName(lastName)
  }

  const handleEdit = () => {
    setNewFirstName(firstName || "");
    setNewLastName(lastName || "");
    setEdit(true);
  };

  let handleUpdate = () => {
    update(newFirstName, newLastName)
    setEdit(false)
  }

  return (
    <main className="main bg-dark">
      {!edit &&
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName} {lastName}!
          </h1>
          <button className="edit-button" onClick={handleEdit}>
            Edit
          </button>
        </div>
      }

      {edit &&
        <div className="header">
          <h1>Welcome back</h1>
          <div className="input-wrapper edit-name-inputs">
            <input type='text' value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} />
            <input type='text' value={newLastName} onChange={(e) => setNewLastName(e.target.value)} />
          </div>

          <div className="edit-name-buttons">
            <button className="edit-button" onClick={handleUpdate}>Save</button>
            <button className="edit-button" onClick={reset}>Cancel</button>
          </div>
        </div>
      }
      <h2 className="sr-only">Accounts</h2>
      {dataAccount.map(account => (
        <Account key={account.id} account={account} />
      ))}
    </main>
  )
}

export default Profile