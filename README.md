# 202012709 이현준

## 🔨설치
``` 
npm install
```

##  🚩 Contents
- [국가 정보 리스트](#국가-정보-리스트)
- [국가 상세 정보](#국가-상세-정보)
- [국가 추가](#국가-추가)
- [국가 수정](#국가-수정)
- [국가 삭제](#국가-삭제)


|       항목       |     URL     | Metho  |
| :--------------: | :---------: | :----: |
| 국가 정보 리스트 |  /country   |  GET   |
|  국가 상세 정보  | /country/ID |  GET   |
|    국가 추가     |  /country   |  POST  |
|    국가 수정     |  /country   |  PUT   |
|    국가 삭제     | /country/ID | DELETE |

---

### 📄국가 정보 리스트

#### 요청

|    업무     | 국가 정보 리스트 |
| :---------: | ---------------- |
|     URL     | /country         |
|   URL 예    | /country         |
| 요청 메소드 | GET              |

#### 응답

| 컨텐츠 타입 | JSON  |          |         |
| ----------- | ----- | -------- | ------- |
| 메시지 구조 | count |          | 총 갯수 |
|             | data  | id       | 인덱스  |
|             |       | country  | 국가명  |
|             |       | capital  | 수도    |
|             |       | area     | 지역    |
|             |       | language | 제1언어 |
|             |       | currency | 화패    |

##### 응답 메세지 예

```  json
{
    "count": 193,
    "data": [
        {
            "id": 0,
            "country": "가나",
            "capital": "아크라",
            "area": "아프리카",
            "language": "영어",
            "currency": "GHS"
        },
        //생략
        ]
}
```

--------

### 📑국가 상세 정보

#### 요청

|    업무     | 국가 정보 리스트 |              |
| :---------: | ---------------- | ------------ |
|     URL     | /country/ID      | ID : 국가 ID |
|   URL 예    | /country/1       |              |
| 요청 메소드 | GET              |              |

#### 응답

| 컨텐츠 타입 | JSON     |         |
| ----------- | -------- | ------- |
| 메시지 구조 | count    | 총 갯수 |
|             | id       | 인덱스  |
|             | country  | 국가명  |
|             | capital  | 수도    |
|             | area     | 지역    |
|             | language | 제1언어 |
|             | currency | 화패    |

##### 응답 메세지 예

```  json
{
    "id": 1,
    "country": "가봉",
    "capital": "리브르빌",
    "area": "아프리카",
    "language": "프랑스어",
    "currency": "XAF"
}
```

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

-------

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

