import React from 'react';

export function LogInRegister(props) {
    return (
    <div>
        <main>
            <div className="forms">
                <div className="login">
                    <h2>Log In</h2>
                    <form action="">
                        <label for="username">Username:</label>
                        <input type="text" id="login-username" name="username" />

                        <label for="password">Password:</label>
                        <input type="text" id="login-password" name="password" />

                        <button type="submit">Login</button>
                    </form>
                </div>

                <div className="register">
                    <h2>Register</h2>
                    <form action="">
                        <label for="username">Username:</label>
                        <input type="text" id="register-username" name="username" />

                        <label for="password">Password:</label>
                        <input type="text" id="register-password" name="password" />

                        <label for="email">Email:</label>
                        <input type="text" id="register-email" name="email" />

                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>

        </main>
    </div>
    );
}