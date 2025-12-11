import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate} from 'react-router'
import { signInEmailPassword, createUserEmailPassword } from '../firebase/auth';
import { useAuth } from '../contexts/authContext/index';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault()
        if (isSigningIn) return;
        setIsSigningIn(true);
        setError('');

        try {
            await signInEmailPassword(email, password);
        } catch (err) {
            console.error(error);
            setError('Invalid email or password')
        } finally {
            setIsSigningIn(false);
        }
    };

    return (
        <div className="login">
            <h2>Log In</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="login-email">Email:</label>
                <input
                    type="text"
                    id="login-email"
                    value={email}
                    name="username"
                    onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="login-password">Password:</label>
                <input
                    type="password"
                    id="login-password"
                    value={password}
                    name="password" 
                    onChange={(e) => setPassword(e.target.value)}/>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    )
};

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault()
        if (isRegistering) return;
        setIsRegistering(true);

        try {
            await createUserEmailPassword(email, password);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Failed to register.');
        } finally {
            setIsRegistering(false);
        }
};

    return (
        <div className="register">
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="register-email">Email:</label>
                <input
                    type="text"
                    id="register-email"
                    value={email}
                    name="email" 
                    onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="register-password">Password:</label>
                <input
                    type="password"
                    id="register-password"
                    value={password}
                    name="password" 
                    onChange={(e) => setPassword(e.target.value)}/>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export function LogInRegister(props) {
    const { userLoggedIn, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && userLoggedIn) {
            navigate('/', { replace: true });
        }
    }, [loading, userLoggedIn, navigate]);

    if (loading) return <div>Loading...</div>;

    console.log('userLoggedIn:', userLoggedIn);
    
    return (
    <div>
        <main>
            <div className="forms">
                <Login />
                <Register />
            </div>
        </main>
    </div>
    );
}