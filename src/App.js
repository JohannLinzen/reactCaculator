import "./App.css";
import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
function App() {
  // preState: 存儲先前輸入的數字。
  // curState: 存儲當前輸入的數字。計算機是按下一個數字就顯示在螢幕，38 ,3 + 8 ，3是preState 8 is curstate
  // input: 存儲當前顯示在螢幕上的數字。
  // operator: 存儲當前輸入的運算符。
  // total: 存儲是否已經計算出總和的狀態
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const inputNum = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") return;

    if (total) {
      setPreState("");
    }

    curState
      ? setCurState((pre) => pre + e.target.innerText)
      : setCurState(e.target.innerText);
    //無論 curState 是真還是假，都會執行 setTotal(false) 這行代碼，將 total 設為假，這是因為在進行新的操作時，之前的計算結果已經不再適用，需要重新進行計算。
    setTotal(false);
  };
  // 第一個 useEffect 會在 curState 更改時執行，將 curState 設置為輸入框的值。這個 useEffect 使用了第二個參數，即陣列 [curState]，表示只有在 curState 更改時才會執行。這種用法可以減少不必要的重複執行。
  useEffect(() => {
    setInput(curState);
  }, [curState]);

  // 會在 component 第一次渲染時執行，將輸入框的值設置為 0。由於這個 useEffect 不依賴於任何變數，所以第二個參數為空陣列，表示只會在 component 第一次渲染時執行一次。
  useEffect(() => {
    setInput("0");
  }, []);
  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }
// 當連續按兩次等號時，計算機會試圖將當前的狀態與上一個運算符進行計算，但是因為此時沒有新的數字輸入，所以試圖將空字符串解析為數字，從而產生NaN。
// 要解決這個問題，您可以在等號處理函數中添加一個條件語句，檢查preState和curState是否都存在，如果其中一個不存在，則不進行計算，直接返回。
    if (preState === "" || curState === "") {
      return;
    }
    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;

      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "X":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCurState("");
  };

  const minusplus = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };

  const percent = () => {
    preState
      ? setCurState(String((parseFloat(curState) / 100) * preState))
      : setCurState(String(parseFloat(curState) / 100));
  };

  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
  };
  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">
          {input !== "" || input === "0" ? (
            <NumericFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumericFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>
        <div className="btn light-gray" onClick={reset}>
          AC
        </div>
        <div className="btn light-gray" onClick={percent}>
          %
        </div>
        <div className="btn light-gray" onClick={minusplus}>
          +/-
        </div>
        <div className="btn orange" onClick={operatorType}>
          /
        </div>
        <div className="btn" onClick={inputNum}>
          7
        </div>
        <div className="btn" onClick={inputNum}>
          8
        </div>
        <div className="btn" onClick={inputNum}>
          9
        </div>
        <div className="btn orange" onClick={operatorType}>
          X
        </div>
        <div className="btn" onClick={inputNum}>
          4
        </div>
        <div className="btn" onClick={inputNum}>
          5
        </div>
        <div className="btn" onClick={inputNum}>
          6
        </div>
        <div className="btn orange" onClick={operatorType}>
          +
        </div>
        <div className="btn" onClick={inputNum}>
          1
        </div>
        <div className="btn" onClick={inputNum}>
          2
        </div>
        <div className="btn" onClick={inputNum}>
          3
        </div>
        <div className="btn orange" onClick={operatorType}>
          -
        </div>
        <div className="btn zero" onClick={inputNum}>
          0
        </div>
        <div className="btn" onClick={inputNum}>
          .
        </div>
        <div className="btn" onClick={equals}>
          =
        </div>
      </div>
    </div>
  );
}

export default App;
