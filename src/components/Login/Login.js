import React, { useState } from "react";
import { Box, Input, Button } from "@material-ui/core";
import "./Login.scss";
const Login = props => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box>
      <div className="bg-image"> </div>
      <div className="content">
        <h2>Login</h2>
        <Box p={2}>
          <Input
            value={userName}
            className="input"
            type="text"
            placeholder="Email"
            onChange={e => {
              setUserName(e.target.value);
            }}
          />
        </Box>
        <Box p={2}>
          <Input
            className="input"
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
        </Box>
        <Box p={3}>
          <Button
            variant="outlined"
            className="button-color"
            onClick={() => props.submit({ userName, password })}
          >
            Login
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default Login;
