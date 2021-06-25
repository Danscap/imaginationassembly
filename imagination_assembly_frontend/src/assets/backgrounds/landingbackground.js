
import React from 'react'

const SVG = props => {

	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='1600' viewBox='0 0 200 200'><rect fill='#ffffff' width='200' height='200'/><defs><linearGradient id='a' gradientUnits='userSpaceOnUse' x1='88' y1='88' x2='0' y2='0'><stop offset='0' stop-color='#064e77'/><stop offset='1' stop-color='#0a7dbe'/></linearGradient><linearGradient id='b' gradientUnits='userSpaceOnUse' x1='75' y1='76' x2='168' y2='160'><stop offset='0' stop-color='#8f8f8f'/><stop offset='0.09' stop-color='#b3b3b3'/><stop offset='0.18' stop-color='#c9c9c9'/><stop offset='0.31' stop-color='#dbdbdb'/><stop offset='0.44' stop-color='#e8e8e8'/><stop offset='0.59' stop-color='#f2f2f2'/><stop offset='0.75' stop-color='#fafafa'/><stop offset='1' stop-color='#FFFFFF'/></linearGradient><filter id='c' x='0' y='0' width='200%' height='200%'><feGaussianBlur in='SourceGraphic' stdDeviation='12' /></filter></defs><polygon fill='url(#a)' points='0 174 0 0 174 0'/><path fill='#000' fill-opacity='.5' filter='url(#c)' d='M121.8 174C59.2 153.1 0 174 0 174s63.5-73.8 87-94c24.4-20.9 87-80 87-80S107.9 104.4 121.8 174z'/><path fill='url(#b)' d='M142.7 142.7C59.2 142.7 0 174 0 174s42-66.3 74.9-99.3S174 0 174 0S142.7 62.6 142.7 142.7z'/></svg>
		)
	//height={props.height} width={props.width} viewBox={`0 0 ${props.viewW} ${props.viewH}`}
	
}

export default SVG
