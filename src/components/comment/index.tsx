import React from "react";

import { Avatar, Divider, Grid, Paper } from "@mui/material";

export function Comment({
  avatar,
  userName,
  message,
  createTime,
}: {
  avatar: string;
  userName: string;
  message: string;
  createTime: string;
}) {
  return (
    <div style={{ padding: 14 }} className="App">
      <h1>ĐÁNH GIÁ SẢN PHẨM</h1>
      <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={avatar} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{userName}</h4>
            <p style={{ textAlign: "left" }}>{message}</p>
            <p style={{ textAlign: "left", color: "gray" }}>
              Bình luận đã được viết vào {createTime}
            </p>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}