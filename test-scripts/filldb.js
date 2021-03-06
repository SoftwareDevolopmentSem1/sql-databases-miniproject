const fs = require("fs");

fName = [
	"Anne",
	"Kirsten",
	"Mette",
	"Hanne",
	"Helle",
	"Anna",
	"Susanne",
	"Lene",
	"Maria",
	"Marianne",
	"Lone",
	"Camilla",
	"Pia",
	"Louise",
	"Charlotte",
	"Bente",
	"Tina",
	"Gitte",
	"Inge",
	"Karen",
	"Peter",
	"Jens",
	"Michael",
	"Lars",
	"Thomas",
	"Henrik",
	"Søren",
	"Christian",
	"Jan",
	"Martin",
	"Niels",
	"Anders",
	"Morten",
	"Jesper",
	"Mads",
	"Hans",
	"Jørgen",
	"Per",
	"Rasmus",
	"Ole",
	"Daniel",
	"Stephan",
	"Nikolaj",
	"Jacob"
];

lName = [
	"Nielsen",
	"Jensen",
	"Hansen",
	"Pedersen",
	"Andersen",
	"Christensen",
	"Larsen",
	"Sørensen",
	"Rasmussen",
	"Jørgensen",
	"Petersen",
	"Madsen",
	"Kristensen",
	"Olsen",
	"Thomsen",
	"Christiansen",
	"Poulsen",
	"Johansen",
	"Møller",
	"Mortensen",
	"Lindholm"
];

title = ["auto_technicians", "administrative_staff"];

function ranDate(start, dur) {
	const year = Math.floor(start + Math.random() * dur);
	let month = "0" + Math.floor(1 + Math.random() * 12);
	month = month.slice(-2);
	let day = Math.floor(1 + Math.random() * 30);
	if (month == 2) {
		day = 1 + (day % 27);
	}
	day = "0" + day;
	day = day.slice(-2);
	return [year, month, day].join("-");
}

function ranTime() {
	const h = "0" + Math.floor(Math.random() * 24);
	const m = "0" + Math.floor(Math.random() * 4) * 15;

	return h.slice(-2) + ":" + m.slice(-2);
}

function ranName() {
	return (
		fName[Math.floor(Math.random() * fName.length)] +
		" " +
		lName[Math.floor(Math.random() * lName.length)]
	);
}

let arr = [];
let tmpArr = [];
const numClients = 2000;
const numEmps = 30;
const numIns = 20;
const numCars = numIns;
const numAdmins = 3;

arr.push("insert into employees (name, title) values");
for (let i = 1; i < numEmps; i++) {
	if (i < numIns) tmpArr.push(`('${ranName()}', 'instructor')`);
	else if (i < numIns + numAdmins) tmpArr.push(`('${ranName()}', 'administrative_staff')`);
	else tmpArr.push(`('${ranName()}', 'auto_technicians')`);
}

arr.push(tmpArr.join(", \n") + ";");
tmpArr = [];

arr.push("insert into cars (tech_check) values");
for (let i = 0; i < numCars; i++) {
	tmpArr.push(`('${ranDate(2020, 1)}')`);
}

arr.push(tmpArr.join(", \n") + ";");
tmpArr = [];

arr.push("insert into clients (name, birth, car, instructor) values");
for (let i = 0; i < numClients; i++) {
	tmpArr.push(
		`('${ranName()}', '${ranDate(1950, 50)}', ${Math.floor(
			1 + Math.random() * numCars
		)}, ${Math.floor(1 + Math.random() * numEmps)})`
	);
}

arr.push(tmpArr.join(", \n") + ";");
tmpArr = [];

arr.push("insert into lessons (client, instructor, start) values ");
for (let i = 0; i < numClients; i++) {
	const rnd = Math.floor(1 + Math.random() * 19);
	const emp = Math.floor(1 + Math.random() * numIns);
	for (let i = 0; i < rnd; i++) {
		tmpArr.push(
			`(${Math.floor(1 + Math.random() * numClients)}, ${emp}, '${ranDate(
				2017,
				5
			)} ${ranTime()}')`
		);
	}
}

arr.push(tmpArr.join(", \n") + ";");
tmpArr = [];

arr.push("insert into interviews (employee, client, start) values ");
for (let i = 1; i < numClients; i++) {
	const emp = Math.floor(numIns + Math.random() * numAdmins);
	const client = i;

	tmpArr.push(`(${emp}, ${client}, '${ranDate(2017, 3)} ${ranTime()}')`);
}

arr.push(tmpArr.join(", \n") + ";");
tmpArr = [];

const data = arr.join("\n");

fs.writeFile("Output.sql", data, (err) => {
	if (err) throw err;
});
