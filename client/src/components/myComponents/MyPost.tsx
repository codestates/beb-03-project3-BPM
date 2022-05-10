import {} from '@mui/x-data-grid';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material';

export default function MyPost() {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>제목</TableCell>
              <TableCell align='center'>작성일</TableCell>
              <TableCell align='center'>추천수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <TableRow key={data.id}>
                map 돌고 data.id ~ recommend 까지 다 출력!
                <TableCell scope='row'>{data.id}</TableCell>
                <TableCell>{data.topic}</TableCell>
                <TableCell>{data.createAt}</TableCell>
                <TableCell>{data.recommend}</TableCell>
              </TableRow> */}
            Hello My Post!
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
