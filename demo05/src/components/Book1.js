import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Book.css";
import {BiSolidEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {ImPlus} from "react-icons/im";
import { Modal } from "bootstrap";

const Book = (props)=>{

  const [bookList, setBookList] = useState([]);

  const loadBook = () => {
    axios ({
      url:`${process.env.REACT_APP_REST_API_URL}/book/`,
      method:"get"
    })
    .then(response=>{//성공
      if(response.length === 0) {
        console.log("검색 결과가 존재하지 않습니다");
        }
        else {
        for(const i=0; i < response.length; i++) {
        console.log("<Pet information>");
        console.log("ID = " + response[i].length);
        console.log("Name = " + response[i].name);
        console.log("Photo count = " + response[i].photoUrls.length);
        console.log("Tag count = " + response[i].tags.length);
        console.log("Status = " + response[i].status);
        }
        
        }
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
      // url : "http://localhost:8080/book"+book.bookId,
      url:`${process.env.REACT_APP_REST_API_URL}/${book.bookId}`,
      method:"delete"
    })
    .then(response =>{
      loadBook();
    })
    .catch(err=>{});
  };


  //도서 등록과 관련된 state
  const [book, setBook] = useState({
    bookTitle:"",
    bookAuthor:"",
    bookPublicationDate:"",
    bookPrice:0,
    bookPublisher:"",
    bookPageCount:0,
    bookGenre:""
  });

  const changeBook = (e)=>{
    setBook({
      ...book,
      [e.target.name] : e.target.value
    });
  };
  
 
  
  
  //등록
  //asios로 서버에 등록 요청을 보낸 뒤 등록이 성공하면 목록을 갱신하도록 처리
  const saveBook = ()=>{
    //입력값 검사 후 차단 코드 추가
    
    // axios({옵션}).then(성공시 콜백).catch(실패시 콜백);
    axios({
      url:`${process.env.REACT_APP_REST_API_URL}`,
      method:"post",
      data:book
      // data:{...book}
    })
    .then(response=>{//성공했다면
      loadBook();//목록을 갱신하고
      closeModal();//모달 닫기
    })
    .catch(err=>{});
  };


  //도서 수정창 열기
  const editBook = (target) =>{
    setBook({...target});
    openModal();
  };

  //도서 수정 처리
  const updateBook = ()=>{
    const copyBook = {...book};
    delete copyBook.bookId;

    axios({
      url:`${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
      method:"put",
      data:copyBook
    })
    .then(response=>{
      loadBook();
      closeModal();
    })
    .catch(err=>{})
  };

  //모달 관련 처리
  const bsModal = useRef();
  const openModal = ()=>{
    const modal = new Modal(bsModal.current);
    modal.show();
  };
  const closeModal = ()=>{
    const modal = Modal.getInstance(bsModal.current);
    modal.hide();
    clearBook();
  };
  
  //입력창에 값을 지우는
  const clearBook =()=>{
    setBook({
      bookTitle:"",
      bookAuthor:"",
      bookPublicationDate:"",
      bookPrice:0,
      bookPublisher:"",
      bookPageCount:0,
      bookGenre:""
    });
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>도서 관리</h1>
          <p>React CRUD 연습 예제</p>
        </div>
      </div>

      {/* 추가버튼 */}
      <div className="row mb-2">
        <div className="col text-end">
          <button className="btn btn-success" onClick={openModal}>
            <ImPlus/>
            추가
          </button>
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
                    <BiSolidEdit className="text-warning" onClick={e=>editBook(book)}/>
                    <AiFillDelete className="text-danger" onClick={e=>deleteBook(book)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" ref={bsModal} 
                data-bs-backdrop="static" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" >
                  {/* {조건 ? '추가' : '수정'} */}
                  {book.bookId === undefined ? '신규도서 등록' : `${book.bookId}번 도서 수정`}
                </h5>
                <button type="button" className="btn-close" data-dismiss="modal" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">

                <div className="row">
                  <div className="col">
                    <label className="form-label">제목</label>
                    <input type="text" name="bookTitle" className="form-control" 
                            value={book.bookTitle} onChange={changeBook}/>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label className="form-label">저자</label>
                    <input type="text" name="bookAuthor" className="form-control" 
                            value={book.bookAuthor} onChange={changeBook}/>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label className="form-label">출간일</label>
                    <input type="date" name="bookPublicationDate" className="form-control" 
                            value={book.bookPublicationDate} onChange={changeBook}/>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label className="form-label">판매가</label>
                    <input type="number" name="bookPrice" className="form-control" 
                            value={book.bookPrice} onChange={changeBook}/>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label className="form-label">출판사</label>
                    <input type="text" name="bookPublisher" className="form-control" 
                            value={book.bookPublisher} onChange={changeBook}/>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label className="form-label">페이지수</label>
                    <input type="number" name="bookPageCount" className="form-control" 
                            value={book.bookPageCount} onChange={changeBook}/>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label className="form-label">장르</label>
                    <select name="bookGenre" value={book.bookGenre} onChange={changeBook} className="form-control">
                      <option value="">선택하세요</option>
                      <option>소설</option>
                      <option>수필</option>
                      <option>로맨스</option>
                      <option>판타지</option>
                      <option>클래식</option>
                      <option>자서전</option>
                      <option>에세이</option>
                    </select>
                  </div>
                </div>

            </div>
            <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>닫기</button>
                {/* {pocketmon.no === undefined ? 저장버튼:변경버튼} */}
                {book.bookId === undefined ? 
                  <button className="btn btn-success" onClick={saveBook}>저장</button>
                  :
                  <button className="btn btn-success" onClick={updateBook}>수정</button>
              }

            </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Book;