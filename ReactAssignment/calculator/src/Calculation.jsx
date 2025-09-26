import { useState } from "react";
import "./Calculation.css";

function Calculation() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");

  const handleClick = (value) => {
    if (value === "AC") {
      setResult("0");
      setExpression("");
    } else if (value === "+/-") {
      const toggle = (-eval(expression || 0)).toString();
      setResult(toggle);
      setExpression(toggle);
    } else if (value === "=") {
      const finalresult = eval(expression).toString();
      setResult(finalresult);
      setExpression(finalresult);
    } else {
      setExpression((prev) => {
        const newResult = prev + value;
        setResult(newResult);
        return newResult;
      });
    }
  };

  return (
    <div className="calculator">
      <table>
        <tbody>
          <tr>
            <td colSpan="4" className="display">
              {result}
            </td>
          </tr>
          <tr>
            <td tabIndex="0" onClick={() => handleClick("AC")}>
              AC
            </td>
            <td tabIndex="0" onClick={() => handleClick("+/-")}>
              +/-
            </td>
            <td tabIndex="0" onClick={() => handleClick("%")}>
              %
            </td>
            <td
              tabIndex="0"
              className="orange"
              onClick={() => handleClick("/")}
            >
              /
            </td>
          </tr>
          <tr>
            <td tabIndex="0" onClick={() => handleClick("7")}>
              7
            </td>
            <td tabIndex="0" onClick={() => handleClick("8")}>
              8
            </td>
            <td tabIndex="0" onClick={() => handleClick("9")}>
              9
            </td>
            <td
              tabIndex="0"
              className="orange"
              onClick={() => handleClick("*")}
            >
              *
            </td>
          </tr>
          <tr>
            <td tabIndex="0" onClick={() => handleClick("4")}>
              4
            </td>
            <td tabIndex="0" onClick={() => handleClick("5")}>
              5
            </td>
            <td tabIndex="0" onClick={() => handleClick("6")}>
              6
            </td>
            <td
              tabIndex="0"
              className="orange"
              onClick={() => handleClick("-")}
            >
              -
            </td>
          </tr>
          <tr>
            <td tabIndex="0" onClick={() => handleClick("1")}>
              1
            </td>
            <td tabIndex="0" onClick={() => handleClick("2")}>
              2
            </td>
            <td tabIndex="0" onClick={() => handleClick("3")}>
              3
            </td>
            <td
              tabIndex="0"
              className="orange"
              onClick={() => handleClick("+")}
            >
              +
            </td>
          </tr>
          <tr>
            <td tabIndex="0" colSpan="2" onClick={() => handleClick("0")}>
              0
            </td>
            <td tabIndex="0" onClick={() => handleClick(".")}>
              .
            </td>
            <td
              tabIndex="0"
              className="orange"
              onClick={() => handleClick("=")}
            >
              =
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Calculation;
