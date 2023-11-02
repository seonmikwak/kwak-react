import { useEffect, useRef, useState } from "react";
import { Modal} from "bootstrap/dist/js/bootstrap.esm";

const Exam10 = ()=>{

    const[items, setItems] = useState([
        {itemNo:1, itemName:"포켓몬스터빵", itemPrice:500, itemType:"식품", edit:false},
        {itemNo:2, itemName:"허니버터칩", itemPrice:1300, itemType:"식품", edit:false},
        {itemNo:3, itemName:"참이슬후레시", itemPrice:2200, itemType:"주류", edit:false},
        {itemNo:4, itemName:"카스", itemPrice:2500, itemType:"주류", edit:false},
        {itemNo:5, itemName:"테라", itemPrice:1300, itemType:"주류", edit:false},
        {itemNo:6, itemName:"켈리", itemPrice:1400, itemType:"주류", edit:false},
        {itemNo:7, itemName:"처음처럼", itemPrice:2000, itemType:"주류", edit:false},
        {itemNo:8, itemName:"오징어땅콩", itemPrice:3500, itemType:"식품", edit:false},
        {itemNo:9, itemName:"신라면", itemPrice:1500, itemType:"식품", edit:false},
        {itemNo:10, itemName:"하리보젤리", itemPrice:5500, itemType:"식품", edit:false}
    ]);

    const [backup, setBackup] = useState([]);

    const [data, setData] = useState({
        itemName:"",
        itemPrice:"",
        itemType:"",
    });

    //useRef : 특정 대상을 참조할 수 있는 훅
    //- const 이름 = useRef(초기값);
    //- 태그에 ref라는 속성으로 이름을 지정해두면 언제든지 불러서 사용할 수 있다.
    const bsModal = useRef();

    const changeData = e=>{
        const newData = {
            ...data,
            [e.target.name]: e.target.value
        };
        setData(newData);
    };

    //(중요) "시작하자마자" items의 내용을 backup으로 복제(1회)
    //항목을 비워놓으면 시작하자마자 한번만 실행
    useEffect(()=>{
        setBackup(items.map(item=>{
            const newItem = {...item};
            return newItem;
        }));
    },[])

    //줄을 수정상태로 변경하는 함수
    //- 이 함수를 실행하려면 최소한 itemNo는 알아야 한다
    //- 함수를 호출할 때 이벤트정보 (e) 대신 아이템정보(item)을 전달하여 처리하도록 처리
    const changeToEdit = (target)=>{
        // console.log(target);


        //아이템 변경
        const newItems = items.map(item=>{
            if(item.itemNo === target.itemNo){//target과 같은 번호의 상품만큼은
                return {
                    ...item,//다른건 그대로 둬도
                    edit:true//edit를 true로 바꿔라
                };
            }
            return item;//나머진 현상유지
        });

        setItems(newItems);
    };

    //줄의 데이터를 변경하는 함수
    //- 어떤 아이템인지(target)와 뭐라고 입력했는지(e)를 알아야 한다
    const changeItem = (target, e) =>{
        const newItems = items.map(item=>{
            if(item.itemNo === target.itemNo){//만약에 같은 번호를 발견한다면
                return{
                    ...item,//나머지 정보는 그대로 두고
                    [e.target.name] : e.target.value//입력창의 이름에 해당하는 필드값을 입력값으로 바꿔라
                }
            }
            return item;
        });
        setItems(newItems);
    };

    //취소 버튼을 누른 경우 실행할 함수
    //- backup에 들어있는 target과 번호가 같은 데이터를 items의 target과 같은 번호에 덮어쓰기
    const cancelItem = (target) =>{

        //backup에서 target의 번호에 해당하는 객체를 찾는다(filter)
        const findResult = backup.filter(item=>item.itemNo === target.itemNo);
        console.log(findResult);

        //아이템 변경
        const newItems = items.map(item=>{
            if(item.itemNo === target.itemNo){//target과 같은 번호의 상품만큼은
                return {
                    ...findResult[0],//다른건 백업데이터로 두고
                    edit:false//edit를 false로 바꿔라
                };
            }
            return item;//나머진 현상유지
        });
        setItems(newItems);
    };
    const saveItem = (target) =>{

        //백업 데이터 중 target과 번호가 같은 데이터를 갱신
        const newBackup = backup.map(item=>{
            if(item.itemNo === target.itemNo){//target과 같은 번호의 상품만큼은
                return {
                    ...target,//다른건 그대로 둬도
                    edit:false//edit를 false로 바꿔라
                };
            }
            return item;//나머진 현상유지
        });
        setBackup(newBackup);

        //아이템 변경
        const newItems = items.map(item=>{
            if(item.itemNo === target.itemNo){//target과 같은 번호의 상품만큼은
                return {
                    ...item,//다른건 그대로 둬도
                    edit:false//edit를 false로 바꿔라
                };
            }
            return item;//나머진 현상유지
        });

        setItems(newItems);//items를 변경해서 새로 만든 배열

    };

    //아이템 삭제
    //- 배열에서 항목을 삭제할 때도 filter를 사용한다
    const deleteItem = (target) =>{
        //아이템 삭제
        const newItems = items.filter(item=>item.itemNo !== target.itemNo);
        setItems(newItems);
        
        //백업 삭제
        const newBackup = backup.filter(item=>item.itemNo !== target.itemNo);
        setBackup(newBackup);
    };

    //항목 추가
    //- data에 들어있는 객체를 복사해서 items에 추가
    //- data는 깨끗하게 정리
    const addItem = e =>{

        const itemNo = items.length == 0 ? 1 : items[items.length-1].itemNo + 1;

        //아이템 추가
        //const newItems = items.concat(data);//절대안됨
        //const newItems = items.concat({...data});//가능
        const newItems = [
            ...items, 
            {
                ...data, 
                edit:false,
                itemNo:itemNo //상품번호 : 마지막번호 +1
            }
        ];
        setItems(newItems);

        //백업 추가
        const newBackup = [
            ...backup,
            {
                ...data,
                itemNo : itemNo
            }
        ];
        setBackup(newBackup);

        //입력창 초기화
        setData({
            itemName:"",
            itemPrice:"",
            itemType:"",
        });

        //모달 닫기
        closeModal();
    };

    const cancelAddItem = ()=>{
        //입력창 초기화
        setData({
            itemName:"",
            itemPrice:"",
            itemType:""
        });

         //모달 닫기
         closeModal();
    }

    //모달 여는 함수
    const openModal = ()=>{
        // var modal = new Modal(document.querySelector("#exampleModal"));
        var modal = new Modal(bsModal.current);
        modal.show();
    };

    //모달 닫는 함수
    const closeModal = ()=>{
        // var modal = Modal.getInstance(document.querySelector("#exampleModal"));
        var modal = Modal.getInstance(bsModal.current);
        modal.hide();
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-1">
                    <h2 className="card text-white bg-warning text-center my-3 py-3">상품목록</h2>

                    <div className="row mt-4">
                        <div className="col">
                            <button type="button" className="btn btn-primary"
                                                        onClick={openModal}>
                                신규등록
                            </button>
                        </div>
                    </div>

                    <table className="table table-hover text-center">
                        <thead>
                            <tr>
                                <th width="5%">No</th>
                                <th width="30%">상품명</th>
                                <th width="20%">가격</th>
                                <th width="15%">타입</th>
                                <th width="30%">관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item,index)=>(
                                //조건 ? (T) : (F)
                                item.edit ? (
                                    <tr key={item.itemNo}>
                                        <td>{item.itemNo}</td>
                                        <td>
                                            <input type="text" value={item.itemName} name="itemName"
                                                    className="form-control" onChange={e=>changeItem(item, e)}/>   
                                        </td>
                                        <td>
                                            <input type="text" value={item.itemPrice} name="itemPrice" 
                                                    className="form-control" onChange={e=>changeItem(item, e)}/>
                                        </td>
                                        <td>
                                            <input type="text" value={item.itemType} name="itemType" 
                                                    className="form-control" onChange={e=>changeItem(item, e)}/>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-secondary me-1"
                                                    onClick={e=>cancelItem(item)}>취소</button>
                                            <button className="btn btn-sm btn-success"
                                                    onClick={e=>saveItem(item)}>완료</button>
                                        </td>
                                    </tr>

                                ) : (
                                    <tr key={item.itemNo}>
                                        <td>{item.itemNo}</td>
                                        <td>{item.itemName}</td>
                                        <td>{item.itemPrice}</td>
                                        <td>{item.itemType}</td>
                                        <td>
                                            <button className="btn btn-sm btn-info me-1"
                                                        onClick={e=>changeToEdit(item)}>수정</button>
                                            <button className="btn btn-sm btn-danger"
                                                        onClick={e=>deleteItem(item)}>삭제</button>
                                        </td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
            </div>
            </div>

            {/* Modal */}
            <div className="modal fade" ref={bsModal} id="exampleModal" 
                data-bs-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">신규 상품 등록</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                        <div className="col">
                            <label className="form-label mt-3">상품명</label>
                            <input className="form-control" name="itemName" value={data.itemName} onChange={changeData}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="form-label mt-3">판매가</label>
                            <input className="form-control" name="itemPrice" value={data.itemPrice} onChange={changeData}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="form-label mt-3">상품분류</label>
                            <input className="form-control mb-3" name="itemType" value={data.itemType} onChange={changeData}/>
                        </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    {/* 자동으로 닫히게 하는 버튼 */}
                    {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">취소</button> */}
                    {/* 수동으로 원하는 로직을 추가하여 닫히게 하는 버튼 */}
                    <button type="button" className="btn btn-secondary" onClick={cancelAddItem}>취소</button>
                    <button type="button" className="btn btn-primary ms-1" onClick={addItem}>추가</button>
                  </div>
                </div>
              </div>
            </div>


        </div>
    );

};

export default Exam10;
