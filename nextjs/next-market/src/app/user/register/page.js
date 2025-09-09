"use client"
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
        const response = await fetch("http://localhost:3000/api/user/register",{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        const responseData = await response.json();
        alert(responseData.message);
    }catch{
      console.error("Error occurred while registering user");
    }
  }

  return (
    <div>
      <h1>ユーザー登録</h1>
        <form onSubmit={handleSubmit}>
            <input value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              name="name"
              placeholder="名前"
              required
              suppressHydrationWarning
            />
            <input value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              name="email"
              placeholder="メールアドレス"
              required
              suppressHydrationWarning
            />
            <input value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              name="password"
              placeholder="パスワード"
              required
              suppressHydrationWarning
            />
            <button type="submit">登録</button>
        </form>
    </div>
  );
}

export default Register;
