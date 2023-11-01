import { useState } from "react";

const Exam10 = ()=>{

    const[items, setItems] = useState([
        {itemNo:1, itemName:"포켓몬스터빵", itemPrice:500, itemType:"식품"},
        {itemNo:2, itemName:"허니버터칩", itemPrice:1300, itemType:"식품"},
        {itemNo:3, itemName:"참이슬후레시", itemPrice:2200, itemType:"주류"},
        {itemNo:4, itemName:"카스", itemPrice:2500, itemType:"주류"},
        {itemNo:5, itemName:"테라", itemPrice:1300, itemType:"주류"},
        {itemNo:6, itemName:"켈리", itemPrice:1400, itemType:"주류"},
        {itemNo:7, itemName:"처음처럼", itemPrice:2000, itemType:"주류"},
        {itemNo:8, itemName:"오징어땅콩", itemPrice:3500, itemType:"식품"},
        {itemNo:9, itemName:"신라면", itemPrice:1500, itemType:"식품"},
        {itemNo:10, itemName:"하리보젤리", itemPrice:5500, itemType:"식품"}
    ]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-1">
                    <h2 className="card text-white bg-warning text-center my-3 py-3">상품목록</h2>

                    <table className="table table-hover text-center">
                        <thead>
                            <tr>
                                <th>itemNo</th>
                                <th>itemName</th>
                                <th>itemPrice</th>
                                <th>itemType</th>
                            </tr>
                        </thead>
                            {items.map((item,index)=>(
                                <tbody key={item.itemNo}>
                                    <tr>
                                        <td>{item.itemNo}</td>
                                        <td>{item.itemName}</td>
                                        <td>{item.itemPrice}</td>
                                        <td>{item.itemType}</td>
                                    </tr>
                            </tbody>
                            ))}
                    </table>
            </div>
            </div>
        </div>
    );

};

export default Exam10;
