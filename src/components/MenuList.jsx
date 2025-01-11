import { useRef, useState } from "react";

function MenuList({menuList, setMenuList, deleteMenu, addMenu}) {
	const [price, setPrice] = useState(0); // 실시간 출력용 상태
	// useRef로 input 요소들을 참조
	const newMenuNameRef = useRef(null);
	const newMenuPriceRef = useRef(null);
	const newMenuCountRef = useRef(null);

	const handlePriceChange = () => {
		const unitPrice = parseInt(newMenuPriceRef.current.value, 10) || 0;
		const count = parseInt(newMenuCountRef.current.value, 10) || 0;
		setPrice(unitPrice * count); // 단가와 수량 변화에 따라 실시간 계산
	};

	return (
		<div className="menu-section">
			<h5>메뉴 리스트 (총합: {menuList.reduce((total, item) => total + item.price, 0)}원)</h5>
			<ul>
				{menuList.map((menu, index) => (
					<li key={index} className="menu-item">
						{/* 입력 필드 섹션 */}
						<div className="menu-item-inputs">
							<input
								type="text"
								value={menu.name}
								onChange={(e) =>
									setMenuList((prev) =>
										prev.map((item, idx) =>
											idx === index ? {...item, name: e.target.value} : item
										)
									)
								}
							/> <input
							type="number"
							value={menu.unitPrice}
							onChange={(e) =>
								setMenuList((prev) =>
									prev.map((item, idx) =>
										idx === index
											? {
												...item,
												unitPrice: parseInt(e.target.value, 10),
												price: parseInt(e.target.value, 10) * item.count,
											}
											: item
									)
								)
							}
						/> <input
							type="number"
							value={menu.count}
							onChange={(e) =>
								setMenuList((prev) =>
									prev.map((item, idx) =>
										idx === index
											? {
												...item,
												count: parseInt(e.target.value, 10),
												price: item.unitPrice * parseInt(e.target.value, 10),
											}
											: item
									)
								)
							}
						/>
							<input type="text" disabled value={`= ${new Intl.NumberFormat('ko-KR').format(Math.ceil(menu.price))} 원`}/>
							{/*<div className="menu-price">
								{" = " + new Intl.NumberFormat('ko-KR').format(Math.ceil(menu.price))}원
							</div>*/}
							<button onClick={() => deleteMenu(index)}>삭제</button>
						</div>

						{/* 가격과 삭제 버튼 섹션 */} {/*<div className="menu-item-price">
							<div>
								<span> = </span> <span>{menu.price}원</span>
							</div>
							<button onClick={() => deleteMenu(index)}>삭제</button>
						</div>*/}
					</li>
				))}
			</ul>
			<div className="menu-item">
				{/*<h4>새로운 메뉴 추가</h4>*/}
				<div className="menu-item-inputs">
					<input ref={newMenuNameRef} placeholder="메뉴 이름"/> <input
					ref={newMenuPriceRef}
					type="number"
					placeholder="단가"
					onChange={handlePriceChange}/> <input
					ref={newMenuCountRef}
					type="number"
					placeholder="수량"
					onChange={handlePriceChange}/>

					<input type="text" disabled value={`= ${new Intl.NumberFormat('ko-KR').format(Math.ceil(price))} 원`}/>

					{/*
					<div className="menu-price">
						{" = " +
							(newMenuPriceRef.current && newMenuCountRef.current
								? new Intl.NumberFormat('ko-KR').format(
									Math.ceil(
										newMenuPriceRef.current.value * newMenuCountRef.current.value
									)
								)
								: 0)
						}원
					</div>
					*/}
					<button
						onClick={() => {
							// useRef로 값을 가져와서 addMenu 호출
							const name = newMenuNameRef.current.value;
							const unitPrice = parseInt(newMenuPriceRef.current.value, 10);
							const count = parseInt(newMenuCountRef.current.value, 10);

							addMenu(name, unitPrice, count);

							// 입력값 초기화
							newMenuNameRef.current.value = '';
							newMenuPriceRef.current.value = '0';
							newMenuCountRef.current.value = 1;
						}}
					>
						추가
					</button>
				</div>
			</div>
		</div>
	);
}

export default MenuList;
