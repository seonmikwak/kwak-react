import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {BiSolidEdit} from "react-icons/bi";
import {AiFillDelete, AiOutlinePlus} from "react-icons/ai";
import { Modal } from "bootstrap";

const Pocketmon = (props)=>{
  const [pocketmonList, setPocketmonList] = useState([]);
 
    //서버에서 pocketmon list를 불러와서 state에 설정하는 코드
    const loadPocketmon = () =>{
      axios({
        url:"http://localhost:8080/pocketmon/",
        method:"get"
      })
      .then(response=>{//성공
        // console.log(response);
        setPocketmonList(response.data);
      })
      .catch(err=>{});//실패
    };

    useEffect(()=>{
      loadPocketmon();
    },[]);


  //포켓몬스터 삭제
  //- 이제는 state에서 삭제하는 것이 아니라 서버에 통신을 보낸 뒤 목록을 갱신하면 된다.
  const deletePocketmon = (pocketmon) => {
    const choice = window.confirm("정말 삭제하시겠습니까?");
    if(choice === false) return;
    
    //axios({옵션}).then(성공시 실행할 함수).catch(실패시 실행할 함수);
    axios({
      url:`http://localhost:8080/pocketmon/${pocketmon.no}`,
      method:"delete"
    })
    .then(response=>{
      loadPocketmon();//목록 갱신
    })
    .catch(err=>{});
  };
  

  //모달 관련된 처리
  const bsModal = useRef();
  const openModal = ()=>{
    const modal = new Modal(bsModal.current);
    modal.show();
  };
  const closeModal = ()=>{
    const modal = Modal.getInstance(bsModal.current);
    modal.hide();
    clearPocketmon();
  };

  //등록과 관련된 state
  const [pocketmon, setPocketmon] = useState({name:"",type:"",});
  const changePocketmon = (e)=>{
    setPocketmon({
      ...pocketmon,
      [e.target.name] : e.target.value
    });
  };

  //입력창에 값을 지우는
  const clearPocketmon = ()=>{
    setPocketmon({name:"", type:""});
  };

  //axios로 서버에 등록 요청을 보낸 뒤 등록이 성공하면 목록을 갱신하도록 처리
  const savePocketmon = ()=>{
    //입력값 검사 후 차단 코드 추가

    // axios({옵션}).then(성공시 콜백).catch(실패시 콜백);
    axios({
      url:"http://localhost:8080/pocketmon/",
      method:"post",
      data:pocketmon//전송할 데이터
    })
    .then(response=>{//성공했다면
      loadPocketmon();//목록을 갱신하고
      closeModal();//모달을 닫아라
    })
    .catch(err=>{});
  };

  //포켓몬스터 수정 창 열기
  //- target은 수정 버튼을 누른 행의 포켓몬스터 정보
  //- target의 정보를 pocketmon으로 카피 후 모달 열기
  const editPocketmon = (target)=>{
    setPocketmon({...target});
    openModal();
  };

  //포켓몬스터 수정 처리
  const updatePocketmon = ()=>{
    //검사 후 차단 처리

    const {no, name, type} = pocketmon;
    axios({
      url:`http://localhost:8080/pocketmon/${no}`,
      method:"put",
      data:{
        name:name,
        type:type
      }
    })
    .then(response=>{
      loadPocketmon();
      closeModal();
    })
    .catch(err=>{})
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>포켓몬스터 관리</h1>
          <p>React CRUD 연습 예제</p>
        </div>
      </div>

      {/* 추가버튼 */}
      <div className="row mt-4">
        <div className="col text-end">
          <button className="btn btn-success" onClick={openModal}>
            <AiOutlinePlus/>
            추가
          </button>
        </div>
      </div>


      {/* 출력위치 */}
      <div className="row mt-4">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>속성</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pocketmonList.map(pocketmon=>(
                <tr key={pocketmon.no}>
                  <td>{pocketmon.no}</td>
                  <td>{pocketmon.name}</td>
                  <td>{pocketmon.type}</td>
                  <td>
                    {/* 아이콘 자리*/}
                    <BiSolidEdit className="text-warning" onClick={e=>editPocketmon(pocketmon)}/>
                    <AiFillDelete className="text-danger"
                        onClick={e=>deletePocketmon(pocketmon)}/>
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
                  {pocketmon.no === undefined ? '신규 몬스터 등록':`${pocketmon.no}번 몬스터 수정`}
                </h5>
                <button type="button" className="btn-close" data-dismiss="modal" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">

              <div className="row">
                <div className="col">
                  <label className="form-label">이름</label>
                  <input type="text" name="name" className="form-control"
                        value={pocketmon.name} onChange={changePocketmon}/>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">속성</label>
                  <input type="text" name="type" className="form-control"
                        value={pocketmon.type} onChange={changePocketmon}/>
                </div>
              </div>


            </div>
            <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>닫기</button>
                {/* {pocketmon.no === undefined ? 저장버튼:변경버튼} */}
                {pocketmon.no === undefined ? 
                  <button className="btn btn-success" onClick={savePocketmon}>저장</button>
                  :
                  <button className="btn btn-success" onClick={updatePocketmon}>수정</button>
                }
                
            </div>
            </div>
        </div>
      </div>


    </>
  );
};

export default Pocketmon;