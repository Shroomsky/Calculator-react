/* eslint-disable react/prop-types */
export function Display({ children }) {
	return (
		<div className="p-4 h-16 text-xl rounded bg-gray-100 font-medium border-solid border-{var(--third-color)} border-[1px] text-right">
			{children}
		</div>
	);
}
