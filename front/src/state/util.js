import axios from 'axios';
export const baseURL = 'http://localhost:3000';


export const request = ({method, url, data}) => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      data,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.zAIPIL0eT3YqDoXgIJ2hHPN7oJBeJ5_YHQk6pMdq6RA'
      }
    })
    .then(res => {
      if(!res.data.status)
        reject(res.data.errors);
      resolve(res.data.data);
    });
  })
}