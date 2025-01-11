import { useEffect, useState } from 'react';
import MenuList from './components/MenuList';
import MemberList from './components/MemberList';
import ResultSection from './components/ResultSection';

function App() {
	const [menuList, setMenuList] = useState([
		/*{ name: '파스타', unitPrice: 15000, count: 2, price: 30000, members: [] },
		{ name: '삼겹살', unitPrice: 10000, count: 1, price: 10000, members: []},
		{ name: '국밥', unitPrice: 10000, count: 2, price: 20000, members: [] },*/
	]);

	const [memberList, setMemberList] = useState([
		/*{ name: '홍길동' },
		{ name: '홍길순' },
		{ name: '이상훈' },*/
	]);

	const [result, setResult] = useState({});

	const test = () => {
		console.log(menuList);
		console.log(memberList);
		console.log(result);
	}

	useEffect(() => {
		calculateSplit();
	}, [JSON.stringify(menuList), JSON.stringify(memberList)]);

	const calculateSplit = () => {
		const memberResult = {};

		// Initialize result structure for each member
		memberList.forEach((member) => {
			memberResult[member.name] = {
				payout: 0, // 총 부담 금액
				menusPay: [] // 메뉴별 분배 내역
			};
		});

		// Iterate through menus to calculate splits
		menuList.forEach((menu) => {
			if (menu.members.length > 0) {
				const menuPayout = menu.price / menu.members.length; // 각 멤버가 부담하는 금액

				// Distribute the menu payment among members
				menu.members.forEach((memberName) => {
					if (!memberResult[memberName]) return;

					// Add payout amount
					memberResult[memberName].payout += menuPayout;

					// Add individual menu and its payout
					memberResult[memberName].menusPay.push({
						[menu.name]: menuPayout // 메뉴 이름과 분배 금액
					});
				});
			}
		});

		console.log("memberResult", memberResult);
		setResult(memberResult); // 상태에 업데이트
	};

	const addMenu = (name, unitPrice, count) => {
		if (name && unitPrice > 0 && count > 0) {
			if (menuList.some((item) => item.name === name)) {
				alert('이미 존재하는 메뉴입니다! 중복된 메뉴는 입력 할 수 없습니다.');
				return;
			}

			setMenuList((prev) => [
				...prev,
				{
					name,
					unitPrice: parseInt(unitPrice, 10),
					count: parseInt(count, 10),
					price: unitPrice * count,
					members: [],
				},
			]);
		} else {
			alert('모든 항목을 입력하세요!');
		}
	};

	const addMember = (name) => {
		if (name) {
			setMemberList((prev) => [...prev, { name }]);
		} else {
			alert('멤버 이름을 입력하세요!');
		}
	};

	const deleteMenu = (index) => {
		setMenuList((prev) => prev.filter((_, idx) => idx !== index));
	};

	const deleteMember = (index) => {
		const memberToDelete = memberList[index].name;
		setMemberList((prev) => prev.filter((_, idx) => idx !== index));
		setMenuList((prevMenuList) =>
			prevMenuList.map((menu) => ({
				...menu,
				members: menu.members.filter((member) => member !== memberToDelete),
			}))
		);
		setResult((prevResult) => {
			const updatedResult = { ...prevResult };
			delete updatedResult[memberToDelete];
			return updatedResult;
		});
	};

	const addMemberToMenu = (isChecked, menuName, memberName) => {
		setMenuList((prevMenuList) =>
			prevMenuList.map((menu) =>
				menu.name === menuName
					? {
						...menu,
						members: isChecked
							? [...menu.members, memberName]
							: menu.members.filter((member) => member !== memberName),
					}
					: menu
			)
		);
	};

	const toggleAllMenusForMember = (isChecked, memberName) => {
		setMenuList((prevMenuList) =>
			prevMenuList.map((menu) => ({
				...menu,
				members: isChecked
					? [...new Set([...menu.members, memberName])]
					: menu.members.filter((member) => member !== memberName),
			}))
		);
	};

	return (
		<div className="container">
			{/*<button onClick={test}>띵똥</button>*/}
			<MenuList
				menuList={menuList}
				setMenuList={setMenuList}
				deleteMenu={deleteMenu}
				addMenu={addMenu}
			/>
			<MemberList
			memberList={memberList}
			menuList={menuList}
			setMemberList={setMemberList}
			setMenuList={setMenuList}
			deleteMember={deleteMember}
			addMember={addMember}
			toggleAllMenusForMember={toggleAllMenusForMember}
			addMemberToMenu={addMemberToMenu}
		/> <ResultSection result={result}/>
		</div>

	);
}

export default App;
