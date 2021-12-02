"use strict";
window.addEventListener("DOMContentLoaded",
    function() {
         //1.localStorage
         if (typeof localStorage === "undefined") {
          window.alert("このブラウザはLocal Storage機能が実装されていません");
          return;
        } else{
         viewStorage();     //localStorage
         saveLocalStorage();//localStorageへ保存
         delLocalStorage(); //localStorageから1件削除
         allClearLocalStorage();//localStorageからすべて削除
         selectTable();      //データ選択
        }
    }
);
//2.localStorageへの保存
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
         function(e) {
             e.preventDefault();
             const key = document.getElementById("textKey").value;
             const value = document.getElementById("textMemo").value;

             //入力をチェック
             if (key =="" || value==""){
                window.alert("Key,Memohaいずれも必須です。");
                return;

            }else {
                localStorage.setItem(key,value)
                viewStorage();     //localStorage
                let W_msg ="LocalStorageに" + key + " " + value + "を保存しました。";
                window.alert(W_msg);
                document.getElementById("textKey").value ="";
                document.getElementById("textMemo").value = "";

            }
                
        },false
    );
};
//3.LocalStorageから1件削除
function delLocalStorage(){
    const del = document.getElementById("del");
    del.addEventListener("click",
         function(e){
             e.preventDefault();
             let w_sel = "0";
             w_sel = selectRadioBtn();
             if(w_sel === "1"){
             const key = document.getElementById("textKey").value;
             const value = document.getElementById("textMemo").value;
             localStorage.removeItem(key);
             viewStorage();
             let W_msg = "LocalStorageに" + key +"" + value + "削除しました。";
             window.alert(W_msg);
             document.getElementById("textKey").value = "";
             document.getElementById("textMemo").value = "";
             }
         },false
    );
};
// 4.localStorageからすべて削除
function allClearLocalStorage(){
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function(e){
             e.preventDefault();
             let W_confirm = confirm("LocalStorageのデータをすべて削除(all clear)します。\nよろしいでしょうか？");
             if(W_confirm === true){
                localStorage.clear();
                viewStorage(); 
                let W_msg = "LocalStorageのデータすべて削除（all clear）しました。";
                window.alert(W_msg);
             document.getElementById("textKey").value = "";
             document.getElementById("textMemo").value = "";
             }
         },false
    );
};
// 5.データ選択
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function(e) {
            e.preventDefault;
            selectRadioBtn();
        }, false
    );
}
// テーブルからデータ選択
function selectRadioBtn() {
    let w_set = "0"; //選択されていれば,"1"にする
    const radio1 = document.getElementsByName("radio1");
    const table1 = document.getElementById("table1");

    for(let i=0; i < radio1.length; i++) {
        if(radio1[i].checked) {
            document.getElementById("textKey").value = table1.rows[i+1].cells[1].firstChild.data;
            document.getElementById("textMemo").value = table1.rows[i+1].cells[2].firstChild.data;
            return w_set = "1";
        }
    }

    window.alert("１つ選択(select）してください。");
}
//localStorageからのデータの取得
function viewStorage() {
    const list = document.getElementById("list");
    //htmlのテーブル初期化
    while(list.rows[0] ) list.deleteRow(0);

    //localStorage
    for (let i=0; i < localStorage.length; i++){
        let W_key = localStorage.key(i);
        //localStorageのキーと値を表示
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='radio1' type= 'radio'>";
        td2.innerHTML = W_key;
        td3.innerHTML = localStorage.getItem(W_key);
    }
    $("#table1").tablesorter({
        sortList: [[1,0]]
    });
    $("table1").trigger("update");
}