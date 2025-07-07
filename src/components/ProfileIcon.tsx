import { useState, useEffect } from 'react';
import api from '../utils/api';
import { getUserId } from '../utils/auth';

function ProfileIcon() {
  const [initial, setInitial] = useState('');

  useEffect(() => {
    const userId = getUserId();
    setInitial(userId ? userId.charAt(0).toUpperCase(): 'U')

    // const fetchUserDetails = async () => {
    //   try {
    //     const userId = getUserId();
    //    const response = await api.get(`/userDetails/${userId}`);
    //     setInitial(userId.charAt(0).toUpperCase());
    //   } catch (err) {
    //     console.error('Failed to fetch user details');
    //   }
    // };
    // fetchUserDetails();
  }, []);

  return <span className="profile-icon">{initial || 'U'}</span>;
}

export default ProfileIcon;