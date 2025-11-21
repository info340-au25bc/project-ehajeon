import React from 'react';

export function LogInRegister() {
    return (
    <div>
        <main>
            <div className="forms">
                <div className="login">
                    <h2>Log In</h2>
                    <form action="">
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" />

                        <label for="password">Password:</label>
                        <input type="text" id="password" name="password" />

                        <button type="submit">Login</button>
                    </form>
                </div>

                <div class="register">
                    <h2>Register</h2>
                    <form action="">
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" />

                        <label for="password">Password:</label>
                        <input type="text" id="password" name="password" />

                        <label for="email">Email:</label>
                        <input type="text" id="email" name="email" />

                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>

        </main>
    </div>
    );
}