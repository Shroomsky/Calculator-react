/* eslint-disable react/prop-types */
export function Button({ children, bgColor, color, grid, setDisp }) {

	return (
		<button
			onClick={setDisp}
			className={`p-3 ${bgColor ? bgColor : "bg-gray-200"} ${
				color ? color : "black"
			} rounded font-medium ${grid ? grid : ""} hover:brightness-75`}>
			{children}
		</button>
	);
}
