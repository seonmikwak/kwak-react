import { useEffect, useState } from "react";
import Jumbotron from "./Jumbotron";
import {FaXmark} from "react-icons/fa6";
import {FaRegEdit} from "react-icons/fa";
import {AiOutlinePlus} from "react-icons/ai";

const Exam01_1 = ()=>{

    const [todoList, setTodoList] = useState([
        {no:1, title:"학원가기", type:"공부", edit:false},
        {no:2, title:"영어단어외우기", type:"공부", edit:false},
        {no:3, title:"헬스장가기", type:"운동", edit:false},
        {no:4, title:"친구만나기", type:"일상", edit:false}
    ]);

    const [data, setData] = useState({
        title:"",
        type:""
    });

    const changeData = (e)=>{//어느항목에 뭘 입력했는지 알아야하니까 e 필요
        setData({
            ...data,//나머지는 유지하되
            [e.target.name] : e.target.value//지금 들어오는 name값에 value를 넣어라
        });
    };

    const addTodoList = ()=>{
        //data의 내용을 todoList에 추가 후 data를 초기화

        //내용 검사 코드 추가 if(맘에 안들면) return;
        if(data.title.length === 0 || data.type.length === 0) return;

        const last = todoList.length-1;
        const no = todoList.length == 0 ? 1 : todoList[last].no+1;

        setTodoList([
            ...todoList, 
            {
                ...data, 
                no:no
            }
        ]);

        setData({title:"", type:""});
    };

    const deleteTodoList = (todo) => {
        const newTodoList = todoList.filter(t=>t.no !== todo.no);
        setTodoList(newTodoList);
    };

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                
                    {/* 점보트론을 만들면서 제목과 내용을 전달 */}
                    <Jumbotron title="일정 관리 프로그램" content="KH정보교육원 수업자료"/>

                    {/* 입력 화면 */}
                    <div className="row mt-4">
                        <div className="col-6">
                            <input className="form-control" name="title" value={data.title}
                                        onChange={changeData}/>
                        </div>
                        <div className="col-4">
                            <select className="form-select" name="type" value={data.type}
                                        onChange={changeData}>
                                <option value="">선택</option>
                                <option>일상</option>
                                <option>약속</option>
                                <option>취미</option>
                                <option>공부</option>
                            </select>
                        </div>
                        <div className="col-2">
                              <button className="btn btn-success" onClick={addTodoList}>
                                <AiOutlinePlus/>
                                추가
                              </button>
                        </div>
                    </div>

                    {/* 출력 화면 */}
                    <div className="row mt-4">
                        {todoList.map(todo=>(
                        <div className="col-12 fs-4 mb-2">
                            <span className="badge bg-primary me-2">
                                {todo.type}
                            </span>
                            {todo.title}
                            <FaRegEdit className="textdanger ms-1"/>
                            <FaXmark className="text-danger ms-1" onClick={e=>deleteTodoList(todo)}/>
                        </div>
                        ))}
                    </div>
                
                
                
                </div>
            </div>
        </div>
    );
};

export default Exam01_1;