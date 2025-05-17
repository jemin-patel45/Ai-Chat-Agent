/* import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user.context';
import { useNavigate } from 'react-router-dom';

const UserAuth = ({ children }) => {
    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const Navigate = useNavigate();

    
    
    useEffect(() => {
        if (user) {
            setLoading(false)
        }
        if (!token) {
            Navigate('/Login')

        }
        if(!user){
            Navigate('/Login')
        }
        
        
    }, [])
    
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <>
            {children}
        </>
    );
};

export default UserAuth;
 */





import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user.context';
import { useNavigate } from 'react-router-dom';

const UserAuth = ({ children }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const Navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      setLoading(false);
    } else {
      Navigate('/');
    }
  }, [user, token, Navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default UserAuth;
