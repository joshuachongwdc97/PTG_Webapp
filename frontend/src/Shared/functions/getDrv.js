const getDrv = (id, drives) => {
	const filteredDrvs = drives.filter((drv) => {
		return drv.invid === id;
	});

	return filteredDrvs;
};

export default getDrv;
