# 202012709 이현준

## 대표 아이디

admin / 1234

## 실행 URL

[사이트 바로가기](http://13.125.23.113:3000/)


## 🔨설치

``` 
npm install
```

## 📐실행

``` 
pm2 start ./bin/www --watch
```

안된다면

```
node ./bin/www
```

##  🚩 Contents

- [국가 정보 리스트](#국가-정보-리스트)
- [추가 폼](#추가-폼)
- [국가 상세 정보](#국가-상세-정보)
- [수정 폼](#수정-폼)
- [로그아웃](#로그아웃)
- [맴버 생성 폼](#맴버-생성-폼)
- [국가 추가](#국가-추가)
- [jtw token 체크](#jtw-token-체크)
- [코멘트 등록](#코멘트-등록)
- [맴버 생성](#맴버-생성)
- [로그인](#로그인)
- [국가 수정](#국가-수정)
- [국가 삭제](#국가-삭제)


|       항목       |          URL           | Metho  |
| :--------------: | :--------------------: | :----: |
| 국가 정보 리스트 |        /country        |  GET   |
|     추가 폼      |      /country/add      |  GET   |
|  국가 상세 정보  |      /country/ID       |  GET   |
|     수정 폼      |    /country/edit/ID    |  GET   |
|     로그아웃     |    /country/logout     |  GET   |
|   맴버 생성 폼   | /country/create_member |  GET   |
|    국가 추가     |        /country        |  POST  |
|  jtw token 체크  |   /country/tokenchk    |  POST  |
|   코멘트 등록    |    /country/comment    |  POST  |
|    맴버 생성     |    /country/member     |  POST  |
|      로그인      |     /country/login     |  POST  |
|    국가 수정     |        /country        |  PUT   |
|    국가 삭제     |      /country/ID       | DELETE |

---

### 📄국가 정보 리스트

#### 요청

|    업무     | 국가 정보 리스트 |
| :---------: | ---------------- |
|     URL     | /country         |
|   URL 예    | /country         |
| 요청 메소드 | GET              |

#### 응답

![](https://github.com/IDU-SW/country_project/blob/master/img/get_country.PNG?raw=true)

---

### 📄추가 폼

#### 요청

|    업무     | 국가 정보 리스트 |
| :---------: | ---------------- |
|     URL     | /country/add     |
|   URL 예    | /country/add     |
| 요청 메소드 | GET              |

#### 응답

![](https://github.com/IDU-SW/country_project/blob/master/img/get_country_add.PNG?raw=true)

--------

### 📑국가 상세 정보

#### 요청

|    업무     | 국가 정보 리스트 |              |
| :---------: | ---------------- | ------------ |
|     URL     | /country/ID      | ID : 국가 ID |
|   URL 예    | /country/1       |              |
| 요청 메소드 | GET              |              |

#### 응답

#####  ![](https://github.com/IDU-SW/country_project/blob/master/img/get_country_id.PNG?raw=true)

---

### 📑수정 폼

#### 요청

|    업무     | 국가 정보 리스트 |              |
| :---------: | ---------------- | ------------ |
|     URL     | /country/edit/ID | ID : 국가 ID |
|   URL 예    | /country/edit/1  |              |
| 요청 메소드 | GET              |              |

#### 응답

#####  ![](https://github.com/IDU-SW/country_project/blob/master/img/get_country_edit.PNG?raw=true)

---

### 📑로그아웃

#### 요청

|    업무     | 국가 정보 리스트 |
| :---------: | ---------------- |
|     URL     | /country/logout  |
|   URL 예    | /country/logout  |
| 요청 메소드 | GET              |

---

### 📑맴버 생성 폼

#### 요청

|    업무     | 국가 정보 리스트       |
| :---------: | ---------------------- |
|     URL     | /country/create_member |
|   URL 예    | /country/create_member |
| 요청 메소드 | GET                    |

#### 응답

![](https://github.com/IDU-SW/country_project/blob/master/img/get_createmember.PNG?raw=true)

------

### 💾국가 추가

#### 요청

|    업무     | 국가 정보 리스트 |
| :---------: | ---------------- |
|     URL     | /country         |
|   URL 예    | /country         |
| 요청 메소드 | POST             |
| 콘텐츠 타입 | application/json |
| 메세지 구조 | country          |
|             | capital          |
|             | area             |
|             | language         |
|             | currency         |

##### 요청 메시지 예

``` json
{
    "country": "가봉",
    "capital": "리브르빌",
    "area": "아프리카",
    "language": "프랑스어",
    "currency": "XAF"
}
```



#### 응답

| 컨텐츠 타입 | JSON |          |                  |
| ----------- | ---- | -------- | ---------------- |
| 메시지 구조 | msg  |          | 성공/실패 메시지 |
|             | data | id       | 인덱스           |
|             |      | country  | 국가명           |
|             |      | capital  | 수도             |
|             |      | area     | 지역             |
|             |      | language | 제1언어          |
|             |      | currency | 화패             |

##### 응답 메세지 예

```  json
{
    "msg": "success",
    "data": {
        "id": 193,
        "country": "가봉",
        "capital": "리브르빌",
        "area": "아프리카",
        "language": "프랑스어",
        "currency": "XAF"
    }
}	
```

---

### 💾jtw token 체크

#### 요청

|    업무     | 국가 정보 리스트  |
| :---------: | ----------------- |
|     URL     | /country/tokenchk |
|   URL 예    | /country/tokenchk |
| 요청 메소드 | POST              |
| 콘텐츠 타입 | application/json  |
| 메세지 구조 | 하단 참고         |


##### 요청 메시지 예

``` json
data: {
    data: 'jtw 토큰'
}
```



#### 응답

| 컨텐츠 타입 | JSON   |      |                  |
| ----------- | ------ | ---- | ---------------- |
| 메시지 구조 | msg    |      | 성공/실패 메시지 |
|             | status | 200  |                  |
|             | token  |      |                  |

##### 응답 메세지 예

```  json
{
	status: 200,
	msg: "success",
	token: {id: "admin", name: "admin", iat: 1593521550, exp: 1593525150}
}
```

---

### 💾코멘트 등록

#### 요청

|    업무     | 국가 정보 리스트 |
| :---------: | ---------------- |
|     URL     | /country/comment |
|   URL 예    | /country/comment |
| 요청 메소드 | POST             |
| 콘텐츠 타입 | application/json |
| 메세지 구조 | 하단 참고        |


##### 요청 메시지 예

``` json
{ 
	country: '코멘트~~',
	id: '1',
	writer: 'admin' 
}
```



#### 응답

| 컨텐츠 타입 | JSON       |
| ----------- | ---------- |
| 메시지 구조 | id         |
|             | country_id |
|             | token      |
|             | comment    |

##### 응답 메세지 예

```  json
{ 
    id: 2,
    country_id: '1',
    writer: 'admin',
    comment: '코멘트~~'
}
```

---

### 💾맴버 생성

#### 요청

|    업무     | 국가 정보 리스트 |
| :---------: | ---------------- |
|     URL     | /country/member  |
|   URL 예    | /country/member  |
| 요청 메소드 | POST             |
| 콘텐츠 타입 | application/json |
| 메세지 구조 | 하단 참고        |


##### 요청 메시지 예

``` json
{
	name: '테스트',
	member_id: 'test',
	member_pw: '1234'
}
```



#### 응답

| 컨텐츠 타입 | JSON      |
| ----------- | --------- |
| 메시지 구조  | meg      |
| 			 | id        |
|             | name      |
|             | member_id |
|             | member_pw |

##### 응답 메세지 예

```  json
 {   
     msg: 'success',
      data :{
         id: 3,
         name: '테스트',
         member_id: 'test',
         member_pw: '1234'
      }
 }
```

----

### 💾로그인

#### 요청

|    업무     | 국가 정보 리스트 |
| :---------: | ---------------- |
|     URL     | /country/login   |
|   URL 예    | /country/login   |
| 요청 메소드 | POST             |
| 콘텐츠 타입 | application/json |
| 메세지 구조 | 하단 참고        |


##### 요청 메시지 예

``` json
{ 
    member_id: 'test',
    member_pw: '1234'
}
```



#### 응답

| 컨텐츠 타입 | JSON      |
| ----------- | --------- |
| 메시지 구조 | msg       |
|             | token     |
|             | name      |

##### 응답 메세지 예

```  json
 {   
     msg: 'success',
     token : ~~~~~,
     name :'테스트'
 }
```

----

### 🩹국가 수정

#### 요청

|    업무     | 국가 정보 리스트 |
| :---------: | ---------------- |
|     URL     | /country         |
|   URL 예    | /country         |
| 요청 메소드 | PUT              |
| 콘텐츠 타입 | application/json |
| 메세지 구조 | id               |
|             | country          |
|             | capital          |
|             | area             |
|             | language         |
|             | currency         |

##### 요청 메시지 예

``` json
{	
    "id":"4",
    "country": "가봉_2",
    "capital": "리브르빌",
    "area": "아프리카",
    "language": "프랑스어",
    "currency": "XAF"
}
```



#### 응답

| 컨텐츠 타입 | JSON |          |                  |
| ----------- | ---- | -------- | ---------------- |
| 메시지 구조 | msg  |          | 성공/실패 메시지 |
|             | data | id       | 인덱스           |
|             |      | country  | 국가명           |
|             |      | capital  | 수도             |
|             |      | area     | 지역             |
|             |      | language | 제1언어          |
|             |      | currency | 화패             |

##### 응답 메세지 예

```  json
{
    "msg": "success",
    "data": {
        "id": 4,
        "country": "가봉_2",
        "capital": "리브르빌",
        "area": "아프리카",
        "language": "프랑스어",
        "currency": "XAF"
    }
}
```

-----

### ✂국가 삭제

#### 요청

|    업무     | 국가 정보 리스트 |              |
| :---------: | ---------------- | ------------ |
|     URL     | /country/ID      | ID : 국가 ID |
|   URL 예    | /country/1       |              |
| 요청 메소드 | DELETE           |              |

#### 응답

| 컨텐츠 타입 | JSON  |         |
| ----------- | ----- | ------- |
| 메시지 구조 | count | 총 갯수 |

##### 응답 메세지 예

```  json
{
    "msg": "success",
    "data": "1번 삭제 완료"
}
```