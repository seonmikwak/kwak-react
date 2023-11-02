import { useEffect, useState } from "react";
import Jumbotron from "./Jumbotron";

const Exam01 = ()=>{

    const [todoList, setTodoList] = useState([
        {no:1, title:"학원가기", type:"공부", edit:false},
        {no:2, title:"영어단어외우기", type:"공부", edit:false},
        {no:3, title:"헬스장가기", type:"운동", edit:false},
        {no:4, title:"친구만나기", type:"일상", edit:false}
    ]);

    const[backup, setBackup] = useState([]);

    const[data, setData] = useState({
        todoListTitle:"",
        todoListType:"",
    });

    useEffect(()=>{
        setBackup(todoList.map(todoList=>{
            const newTodoList = {...todoList};
            return newTodoList;
        }));
    },[])


    //줄을 수정상태로 변경
    const edit = (target) => {
        // console.log(target);

        //리스트 변경
        const newTodoList = todoList.map(todoList =>{
            if(todoList.no === target.no){
                return{
                    ...todoList,//다른건 그대로 둬도
                    edit:true//edit를 true로 바꿔라
                };
            }
            return todoList;//나머진 현상유지
        });
        
        setTodoList(newTodoList);
    };

    //줄의 데이터를 변경
    const change = (target, e)=>{
        const newTodoList = todoList.map(todoList =>{
            if(todoList.no === target.no){
                return {
                    ...todoList,
                    [e.target.name] : e.target.value
                };
            }
            return todoList;
        });
        setTodoList(newTodoList);
    };

    //취소
    const cancel = (target) =>{

        const findResult = backup.filter(todoList=>todoList.no === target.no);
        console.log(findResult);

        //리스트 변경
        const newTodoList = todoList.map(todoList=>{
            if(todoList.no === target.no){
                return {
                    ...findResult[0],
                    edit:false
                };
            }
            return todoList;
        });
        setTodoList(newTodoList);
    };

    const save = (target) => {
        //백업데이터 갱신
        const newBackup = backup.map(todoList=>{
            if(todoList.no === target.no){
                return{
                    ...target,
                    edit:false
                };
            }
            return todoList;
        });
        setBackup(newBackup);

        //todoList 변경
        const newTodoList = todoList.map(todoList=>{
            if(todoList.no === target.no){
                return{
                    ...todoList,
                    edit:false
                };
            }
            return todoList;
        });
        setTodoList(newTodoList);
    };

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                
                    {/* 점보트론을 만들면서 제목과 내용을 전달 */}
                    <Jumbotron title="일정 관리 프로그램" content="KH정보교육원 수업자료"/>

                    {/* 화면 */}
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th width="10%">no</th>
                                <th width="30%">titel</th>
                                <th width="20%">type</th>
                                <th width="40%">setting</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todoList.map((todoList, index)=>(
                                todoList.edit ? (
                                    <tr key={todoList.no}>
                                    <td>{todoList.no}</td>
                                    <td>
                                        <input type="text" value={todoList.title} className="form-control text-start"
                                                name="title" onChange={e=>change(todoList, e)}/>
                                    </td>
                                    <td>
                                        <input type="text" value={todoList.type} className="form-control"
                                                name="type" onChange={e=>change(todoList, e)}/>
                                    </td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={e=>cancel(todoList)}>취소</button>    
                                        <button className="btn btn-primary ms-1" onClick={e=>save(todoList)}>완료</button>    
                                    </td>
                                </tr>
                                ) : (
                                <tr key={todoList.no}>
                                    <td>{todoList.no}</td>
                                    <td className="text-start">{todoList.title}</td>
                                    <td>{todoList.type}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={e=>edit(todoList)}>수정</button>    
                                        <button className="btn btn-secondary ms-1">삭제</button>    
                                    </td>
                                </tr>
                                )
                            ))}
                        </tbody>

                    </table>
                
                
                
                </div>
            </div>
        </div>
    );
};

export default Exam01;