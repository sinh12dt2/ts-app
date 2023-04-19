import { queryCallback } from 'mysql';
import db from '../Dbconnection';

const Student = {
	getAllSinhVien: (callback: Function) => {
		return db.query("Select * from sinhvien", callback);
	},
	getSinhVienById: (id: number, callback: queryCallback) => {
		return db.query("select * from sinhvien where Id=?", [id], callback);
	},
	addSV: (student: any, callback: queryCallback) => {
		return db.query("Insert into sinhvien(name,class,dob) values(?,?,?)",[student.name, student.class, student.dob], callback);
	},
	deleteSV: (id: number,callback: queryCallback) => {
		return db.query("delete from sinhvien where Id=?",[id],callback);
	},
	updateSV: (id: number, student: any, callback: queryCallback | undefined) => {
		return db.query("update sinhvien set name=?,class=?,dob=? where Id=?",[student?.name, student?.class, student?.dob, id], callback);
	}
};

export default Student;
