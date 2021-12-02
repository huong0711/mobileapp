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
                let W_confirm = window.confirm("LocalStorageに\n" + key + value + "\nを保存しますか？");
                if (W_confirm === true){ //version up 1
                localStorage.setItem(key,value)
                viewStorage();     //localStorage
                let W_msg ="LocalStorageに" + key + " " + value + "を保存しました。";
                window.alert(W_msg);
                document.getElementById("textKey").value ="";
                document.getElementById("textMemo").value = "";
                }//versionup1
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
             const chkbox1 = document.getElementsByName("chkbox1");//version_up3a add
             const table1 = document.getElementById("table1");//version_up3 add
             let W_cnt = "0";
             W_cnt = selectCheckBox("del");  //versiion up 2
             if(W_cnt >= 1){ //version up3 chg
             //const key = document.getElementById("textKey").value;
             //const value = document.getElementById("textMemo").value;
             let W_confirm = window.confirm("LocalStorageから選択されている" + W_cnt + "件を削除しますか？");//確認ダイアログで押されたとき
             if (W_confirm === true){ //version up1
                for(let i=0; i < chkbox1.length; i++) {
                    if(chkbox1[i].checked) {
                        localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);//version_up3 chg
                    }
                }//version_up3
             viewStorage();
             let W_msg = "LocalStorageから" + W_cnt + "件削除(delete)しますか？";
             window.alert(W_msg);
             document.getElementById("textKey").value = "";
             document.getElementById("textMemo").value = "";
                 }//version up1
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
             }//version up1
         },false
    );
};
// 5.データ選択
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function(e) {
            e.preventDefault;
            selectCheckBox("select"); //version up 3
        }, false
    );
}
// テーブルからデータ選択
function selectCheckBox(mode) {  //version up3
    //let w_sel = "0"; //選択されていれば,"1"にする
    let W_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let W_textKey = "";//work version up 2
    let W_textMemo = ""; //work version up 2

    for(let i=0; i < chkbox1.length; i++) {
        if(chkbox1[i].checked) {
            if (W_cnt === 0){
            W_textKey = table1.rows[i+1].cells[1].firstChild.data;
            W_textMemo = table1.rows[i+1].cells[2].firstChild.data;
            //return w_sel = "1";
            }//version up 2 add
            W_cnt++;
        }
    }
    document.getElementById("textKey").value = W_textKey;
    document.getElementById("textMemo").value = W_textMemo;
    if(mode === "select"){
        if(W_cnt === 1){
            return W_cnt;
        }
        else{
            // let W_confirm = confirm("LocalStorageのデータを1つ選択してください。");
            window.alert("１つ選択(select）してください。");
        }
    }
    if(mode === "del"){
        if(W_cnt >= 1){
            return W_cnt;
        }else{
            // let W_confirm = confirm("LocalStorageのデータを1つ選択してください。");
            window.alert("１つ以上選択(select）してください。");
        }
    }
};
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

        td1.innerHTML = "<input name='chkbox1' type= 'checkbox'>"; //version2
        td2.innerHTML = W_key;
        td3.innerHTML = localStorage.getItem(W_key);
    }
    $("#table1").tablesorter({
        sortList: [[1,0]]
    });
    $("table1").trigger("update");
}