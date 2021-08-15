## GB-Frontend-docker

밥브리타임 React로 Front-end 구현하기 😉

#### Front-end : React + Nginx + Docker

-   [x] 메인페이지 및 게시판 컴포넌트 구현
-   [x] 엔드포인트 별 페이지 구성
-   [x] React 앱 패키징 및 Nginx 서버 구성
-   [x] Nginx + docker 이미지 수정 및 컨테이너화
-   [x] 임시 서버에서 프론트 서버로그 ELK 연동 테스트
-   [x] RESTful API로 데이터 Fetch
-   [x] Back-end와의 동기화

### 사용 방법

```sh
$ git clone https://github.com/VYWL/GB-Frontend-docker
$ cd GB-Frontend-docker
$ npm install
$ npm run build --silent
$ sudo docker build -f Dockerfile -t bobrytime-front .
$ docker run -it -d -p 80:80 -v /var/log/nginx:/var/log/nginx bobrytime-front
```

### 기타사항

-   문제 있을시 연락.
