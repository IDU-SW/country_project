const Sequelize = require('sequelize');

function connect() {
    const sequelize = new Sequelize('example', 'dev', 'cometrue', {
        dialect: 'mysql',
        host: '127.0.0.1',
        pool: {
            max: 10, // 커넥션 최대 개수
            min: 0, // 풀에 유지하는 커넥션 최소 개수
            acquire: 60000, // 커넥션 풀에서 커넥션 얻기 최대 대기 시간(기본 60초)
            idle: 10000, // 커넥션이 해제되기 전 idle 상태 대기 시간(msec, 기본 10초)            
            evict: 1000, // 커넥션 풀에서 사용하지 않는 커넥션 해제 검사 간격(interval)
            validate: {} // 커넥션 검사 함수
        }
    });
    
    sequelize.authenticate()
    .then(() => {
        console.log('Sequelize DB 연결 성공');
        sequelize.close();
    })
    .catch(err => {
        console.error('Sequelize DB 연결 실패 :', err);
    });  
}
connect();