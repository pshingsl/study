const db = require('../config/db')

// 데이터베이스 요청 하지만 언제 돌아 올지 모르니 비동기 처리를 해서 문제 해결
exports.getDbCustomers = async() => {
    const [data] = await db.query('SELECT * FROM Customers') // 구조분해 할당으로 뒤에 undfinded가 안나옴
    return data;
}

exports.getDbComments = () => {
    return [
        {
        id: 1,
        userid: 'helloworld',
        date: '2022-10-31',
        comment: '안녕하세요^~^',
        },
        {
        id: 2,
        userid: 'happy',
        date: '2022-11-01',
        comment: '반가워유',
        },
        {
        id: 3,
        userid: 'lucky',
        date: '2022-11-02',
        comment: '오 신기하군',
        },
        {
        id: 4,
        userid: 'bestpart',
        date: '2022-11-02',
        comment: '첫 댓글입니당ㅎㅎ',
        },
    ];
}