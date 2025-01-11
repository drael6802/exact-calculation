import {useRef} from 'react';

function MemberList({
						memberList,
						menuList,
						setMemberList,
						setMenuList,
						deleteMember,
						addMember,
						toggleAllMenusForMember,
						addMemberToMenu,
					}) {
	// useRef로 input 요소를 참조
	const memberNameRef = useRef(null);

	return (
		<div className="member-section">
			<h5>멤버 리스트</h5>
			<ul>
				{memberList.map((member, index) => (
					<li key={index} className="member-item">
						<div className="member-info">
								<input
									type="text"
									value={member.name}
									onChange={(e) => {
										// 입력 값을 해당 멤버 이름으로 업데이트하는 로직
										const updatedName = e.target.value;
										setMemberList((prevMemberList) =>
											prevMemberList.map((prevMember, idx) =>
												idx === index
													? {...prevMember, name: updatedName} // 변경된 이름 반영
													: prevMember // 변경 없는 항목은 그대로 유지
											)
										);
									}}
								/>
							<button onClick={() => deleteMember(index)}>삭제</button>
						</div>
						<div className="member-checkboxes">
							<label> <input
								type="checkbox"
								onChange={(e) =>
									toggleAllMenusForMember(e.target.checked, member.name)
								}
							/> 전체 선택 </label> {menuList.map((menu, menuIndex) => (
							<label key={menuIndex}> <input
								type="checkbox"
								checked={menu.members.includes(member.name)}
								onChange={(e) =>
									addMemberToMenu(e.target.checked, menu.name, member.name)
								}
							/> {menu.name}
							</label>
						))}
						</div>
					</li>
				))}
			</ul>
			<div className="member-item">
				<div className="member-add">
					<div className="member-add-inputs">
						<input ref={memberNameRef} placeholder="멤버 이름"/>
						<button
							onClick={() => {
								const name = memberNameRef.current.value.trim();
								if (name) {
									addMember(name);
									memberNameRef.current.value = '';
								} else {
									alert('멤버 이름을 입력하세요!');
								}
							}}
						>
							멤버 추가
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MemberList;
