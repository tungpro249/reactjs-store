import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

const Comments = ({ productId }: { productId: number }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const API_URL = "https://mockapi.io/api/v1/comments";

  // Lấy danh sách bình luận
  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}?product_id=${productId}`);
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy bình luận:", error);
      setLoading(false);
    }
  };

  // Thêm bình luận mới
  const addComment = async () => {
    if (!newComment.trim()) return;

    try {
      setAdding(true);
      const response = await axios.post(API_URL, {
        product_id: productId,
        user_name: "Anonymous", 
        content: newComment,
        created_at: new Date().toISOString(),
      });
      setComments((prev) => [...prev, response.data]);
      setNewComment("");
      setAdding(false);
    } catch (error) {
      console.error("Lỗi khi thêm bình luận:", error);
      setAdding(false);
    }
  };

  // Fetch comments khi component được mount
  useEffect(() => {
    fetchComments();
  }, [productId]);

  return (
    <Box sx={{padding: 2, width: "100%" }}>
      <Typography variant="h5" gutterBottom>
        Bình luận
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {comments.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              Chưa có bình luận nào.
            </Typography>
          ) : (
            comments.map((comment) => (
              <ListItem key={comment.id} alignItems="flex-start">
                <ListItemText
                  primary={`${comment.user_name}`}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {comment.content}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="caption"
                        color="textSecondary"
                      >
                        {new Date(comment.created_at).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))
          )}
        </List>
      )}

      <Box mt={3}>
        <TextField
          label="Nhập bình luận..."
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={adding}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={addComment}
            disabled={!newComment.trim() || adding}
          >
            {adding ? <CircularProgress size={24} /> : "Gửi"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Comments;
