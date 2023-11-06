import { useEffect, useState } from "react";
import axios from "axios";
import "./Book.css";
import {BiSolidEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";

const Book = (props)=>{

  const [bookList, setBookList] = useState([]);

  const loadBook = () => {
    axios ({
      url:"http://localhost:8080/book/",
      method:"get"
    })
    .then(response=>{//성공
      // console.log(response);
      setBookList(response.data);
    })
    .catch(err=>{});//실패
  };

  useEffect(()=>{
    loadBook();
  }, []);

  //도서 데이터 삭제
  const deleteBook = (book) => {
    const choice = window.confirm("정말 삭제하시겠습니까?");
    if(choice === false) return;

    //axios({옵션}).then(성공시 실행할 함수).catch(실패시 실행할 함수);
    axios({
      // url:`http://localhost:8080/book/${book.bookId}`,
      url : "http://localhost:8080/book"+book.bookId,
      method:"delete"
    })
    .then(response =>{
      loadBook();
    })
    .catch(err=>{});
  };
  

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>도서 관리</h1>
          <p>React CRUD 연습 예제</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table className="table">
            <thead className="table-info">
              <tr>
                <th className="pc-only">도서번호</th>
                <th>도서제목</th>
                <th>저자</th>
                <th className="pc-only">출간일</th>
                <th>판매가</th>
                <th>출판사</th>
                <th className="pc-only">페이지수</th>
                <th className="pc-only">장르</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookList.map(book=>(
                <tr key={book.bookId}>
                  <td className="pc-only">{book.bookId}</td>
                  <td>{book.bookTitle}</td>
                  <td>{book.bookAuthor}</td>
                  <td className="pc-only">{book.bookPublicationDate}</td>
                  <td>{book.bookPrice}</td>
                  <td>{book.bookPublisher}</td>
                  <td className="pc-only">{book.bookPageCount}</td>
                  <td className="pc-only">{book.bookGenre}</td>
                  <td>
                    {/* 아이콘 자리*/}
                    <BiSolidEdit className="text-warning"/>
                    <AiFillDelete className="text-danger"
                        onClick={e=>deleteBook(book)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Book;