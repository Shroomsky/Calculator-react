import { useState } from "react";
import "./App.css";
import { Button } from "./components/Button/Button";
import { Display } from "./components/Display/Display";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const initialCalcData = { first: null, operator: null };

export function App() {
	const [disp, setDisp] = useState("0");
	const [calcData, setCalcData] = useState(initialCalcData);
	const [memory, setMemory] = useState(0);

	function calculation({ first, operator }) {
		if (operator != null) {
			let s = Number(disp);
			let result = eval(`${Number(first)}${operator}${s}`);
			setDisp(result.toString());
			setCalcData(initialCalcData);
		}
	}

	function handleMemoryBtnClick(operation) {
		const value = parseFloat(disp);
		switch (operation) {
			case  "+":
				setMemory((prev) => (prev + value));
				setDisp("0")
				break;
			case "-":
				setMemory((prev) => (prev - value));
				setDisp("0")
				break;
			case "c":
				setDisp("0")
				setMemory(0);
				break;
			default:
				setMemory(0);
				break;
		}
	}


	function handleOperatorClick(operator) {		
		if (calcData.first == null && calcData.operator == null) {
			setCalcData((prev) => ({ ...prev, first: disp, operator: operator }));			
		} else if (operator) {		
			calculation(calcData);
			setCalcData((prev) => ({ ...prev, first: disp, operator: operator }));
		} else {
			return;
		}		
	}

	function handleNumericButtonClick(number) {
		if (calcData.first == null) {
			setDisp((prev) => (prev == "0" ? number : prev + number));
		} else if (calcData.first != null && calcData.operator != null) {
			console.log("kuku")
			setDisp(disp == "0" ? number : disp + number);
		} else if (calcData.first != null && disp != "0") {
			setCalcData((prev) => ({ ...prev, first: disp }));
			setDisp((prev) => (prev == "0" ? number : prev + number));
		}
	}

	function handleRemoveBtnClik() {
		setDisp(disp.slice(0, -1));
	}

	disp.length == 0 && setDisp("0");
	console.log(calcData)
	return (
		<div className="Calculator">
			<Display>{disp}</Display>

			<div className="grid grid-cols-4 gap-3">
			<Button
					grid="col-start-1 col-span-2"
					setDisp={handleRemoveBtnClik}
					bgColor="bg-orange-400"
					color="text-white">
					<FontAwesomeIcon icon={faArrowLeftLong} />
				</Button>
				<Button
					grid="col-start-3 col-span-2"
					bgColor="bg-orange-700"
					color="text-white"
					setDisp={() => {
						setDisp("");
						setCalcData(initialCalcData);
					}}>
					C
				</Button>
				
				<Button
					setDisp={() => handleMemoryBtnClick("+")}
					bgColor="bg-orange-400"
					color="text-white">
					M+
				</Button>
				<Button
					setDisp={() => handleMemoryBtnClick("-")}
					bgColor="bg-orange-400"
					color="text-white">
					M-
				</Button>
				<Button
					setDisp={() => setDisp(memory)}
					bgColor="bg-orange-400"
					color="text-white">
					MR
				</Button>
				<Button
					setDisp={() => handleMemoryBtnClick("c")}
					bgColor="bg-orange-400"
					color="text-white">
					MC
				</Button>
				
				<Button setDisp={() => handleNumericButtonClick("1")}>1</Button>
				<Button setDisp={() => handleNumericButtonClick("2")}>2</Button>
				<Button setDisp={() => handleNumericButtonClick("3")}>3</Button>
				<Button
					setDisp={() => {
						handleOperatorClick("+");
					}}
					bgColor="bg-gray-500"
					color="text-white">
					+
				</Button>
				<Button setDisp={() => handleNumericButtonClick("4")}>4</Button>
				<Button setDisp={() => handleNumericButtonClick("5")}>5</Button>
				<Button setDisp={() => handleNumericButtonClick("6")}>6</Button>
				<Button
					setDisp={() => {
						handleOperatorClick("-");
					}}
					bgColor="bg-gray-500"
					color="text-white">
					-
				</Button>
				<Button setDisp={() => handleNumericButtonClick("7")}>7</Button>
				<Button setDisp={() => handleNumericButtonClick("8")}>8</Button>
				<Button setDisp={() => handleNumericButtonClick("9")}>9</Button>
				<Button
					setDisp={() => {
						handleOperatorClick("*");
					}}
					bgColor="bg-gray-500"
					color="text-white">
					*
				</Button>
				<Button
					grid="col-span-2"
					setDisp={() => setDisp(disp != "0" ? (prev) => prev + 0 : 0)}>
					0
				</Button>
				<Button setDisp={() => handleNumericButtonClick(".")}>.</Button>

				<Button
					setDisp={() => {
						handleOperatorClick("/");
					}}
					bgColor="bg-gray-500"
					color="text-white">
					/
				</Button>
				<Button
					setDisp={() => {
						calculation(calcData);
					}}
					bgColor="bg-orange-400"
					color="text-white"
					grid=" col-span-4">
					=
				</Button>
			</div>
		</div>
	);
}
