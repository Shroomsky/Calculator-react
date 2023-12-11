import { useState } from "react";
import "./App.css";
import { Button } from "./components/Button/Button";
import { Display } from "./components/Display/Display";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

export function App() {
	const [disp, setDisp] = useState("0");
	const [memory, setMemory] = useState(0);

	function calculation() {
		try {
			setDisp(eval(disp));
		} catch (error) {
			if (error) {
				setDisp("Error");
			}
		}
	}

	function handleMemoryBtnClick(operation) {
		const value = parseFloat(disp);
		switch (operation) {
			case "+":
				setMemory((prev) => prev + value);
				setDisp("0");
				break;
			case "-":
				setMemory((prev) => prev - value);
				setDisp("0");
				break;
			case "c":
				setDisp("0");
				setMemory(0);
				break;
			default:
				setMemory(0);
				break;
		}
	}

	function handleOperatorClick(operator) {
		if (disp == "0") {
			setDisp(disp.slice(0, -1) + operator);
		} else {
			setDisp((prev) => (prev += operator));
		}
	}

	function handleNumericButtonClick(number) {
		if (disp == "0" && number != ".") {
			setDisp(disp.slice(0, -1) + number);
		} else {
			setDisp((prev) => (prev += number));
		}
	}

	function handleRemoveBtnClik() {
		setDisp(disp.slice(0, -1));
	}

	disp.length == 0 && setDisp("0");

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
					setDisp={calculation}
					bgColor="bg-orange-400"
					color="text-white"
					grid=" col-span-4">
					=
				</Button>
			</div>
		</div>
	);
}
