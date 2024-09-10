const tabs = [ 'skt', 'kt', 'lgu' ];

/**
 * 모델 지정 메서드
 *
 * @param {JSON} data: JSON 데이터
 */
function setModel(data)
{
	tabs.forEach((tab) =>
	{
		const tag = document.querySelector(`#tab-${tab} > ul`);
		const list = [];

		data.device.forEach(({ image }, idx) =>
		{
			const flag = idx === 0 ? 'active show' : '';

			list.push(`
				<li class="nav-item">
					<a class="nav-link ${flag}" data-toggle="tab" href="#model-${tab}${idx}">
						<img src="${image}">
					</a>
				</li>
			`);
		});

		tag.innerHTML = list.join('');
	});
}

function setCapacity(data)
{
	tabs.forEach((tab, tabIdx) =>
	{
		const tag = document.querySelector(`#tab-${tab} .capacity-tab-area`);
		const list = [];

		data.device.forEach(({ storage }, storageIdx) =>
		{
			const storageFlag = storageIdx === 0 ? 'active show' : '';

			const capacityList = [];
			const planList = [];

			storage.forEach((i, j) =>
			{
				const flag = j === 0 ? 'active show' : '';

				capacityList.push(`
					<li class="nav-item">
						<a class="nav-link ${flag}" data-toggle="tab" href="#capacity-${tab}${storageIdx}${j}">
							${i}
						</a>
					</li>`);

				planList.push(`
					<div class="tab-pane fade ${flag}" id="capacity-${tab}${storageIdx}${j}">
						<div class="img-plan-table">
							<div class="img-row">
								<img class="img-fluid img-plan-cash" src="./assets/${tab}-${storageIdx}-${i}.png">
							</div>
						</div>
					</div>
				`);
			});

			list.push(`
				<div class="tab-pane fade ${storageFlag}" id="model-${tab}${storageIdx}">
					<ul class="nav nav-tabs nav-capacity nav-fill">
						${capacityList.join('')}
					</ul>

					<div class="tab-content planTable-tab-area">
						${planList.join('')}
					</div>
				</div>
			`);
		});

		tag.innerHTML = list.join('');
	});
}

document.onreadystatechange = async () =>
{
	if (document.readyState === 'complete')
	{
		const response = await fetch('./index.json', { method: 'GET' });

		if (response.ok)
		{
			const json = await response.json();

			setModel(json);
			setCapacity(json);
		}
	}
};