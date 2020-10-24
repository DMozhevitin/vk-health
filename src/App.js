import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import Main from "./panels/Main";
import FoodInfo from "./panels/FoodInfo";
import GetStat from "./panels/GetStat";

const App = () => {
	const [activePanel, setActivePanel] = useState('main');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	// const [sugarItems, setSugarItems] = useState([])

	// document.addEventListener('on-sugar-model-close', (e) => {
	// 	let newSugarItems = sugarItems
	// 	newSugarItems.push(e.detail)
	// 	setSugarItems(newSugarItems)
	// })

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} go={go} />
			<Main
				id='main'
				fetchedUser={fetchedUser}
				go={go}
			/>
			<FoodInfo id={'foodInfo'} go={go}/>
			<Persik id='persik' go={go} />
			<GetStat id='getStat' go={go} />
		</View>
	);
}

export default App;
