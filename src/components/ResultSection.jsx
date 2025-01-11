function ResultSection({ result }) {
	return (
		<div className="result-section">
			<h5>정산 결과</h5>
			<ul>
				{/* 각 멤버별 정산 결과 */}
				{Object.entries(result).map(([memberName, data], index) => (
					<li key={index} className="result-item">
						<div className="member-summary">
							<strong>{memberName}</strong> {/* 멤버 이름 */}
							<span className="total-payout">
								총 정산금: {new Intl.NumberFormat('ko-KR').format(Math.ceil(data.payout))}원
							</span>
						</div>
						{/* 메뉴별 상세 분배 내역 */}
						<ul className="menu-details">
							{data.menusPay.map((menu, idx) => (
								<li key={idx} className="menu-pay-item">
									{/* 메뉴별 이름과 금액 출력 */}
									{Object.entries(menu).map(([menuName, amount]) => (
										<span key={menuName} className="menu-pay-detail">
											<strong>{menuName}</strong>: {new Intl.NumberFormat('ko-KR').format(Math.ceil(amount))}원
										</span>
									))}
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
}

export default ResultSection;
