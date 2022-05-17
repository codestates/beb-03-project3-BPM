import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';

export default function PostDetail() {
  let params = useParams();

  async function getPost() {
    let res = await axios.get(
      `http://localhost:4000/post/${params.boardid}/${params.postid}`
    );
    console.log(res);
  }
  getPost();
  return <>Hello Detail</>;
}
