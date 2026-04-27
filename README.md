# 개발환경 설정

본 프로젝트는 Gulp로 구성 되어 있으며 다음 환경에서 정상적인 개발이 가능합니다.

```javascript
- node.js : 8.11.4 이상 (LTS 버전)
- gulp-cli : 2.0.1
- gulp : 4.0.2
```

### node.js 설치

node.js의 버전은 LTS로 다운로드 합니다. [[다운로드]](https://nodejs.org/ko/)

> 이미 설치 된 경우 본 과정을 생략 할 수 있습니다.

`cmd`, `powershell`, `Terminal` 을 실행 후 다음 설명에 따라 설치를 진행 합니다.

### gulp-cli 설치

전역에 gulp-cli 를 설치 합니다.

```javascript
npm install -g gulp-cli
```

### 버전 확인

설치 한 node.js, gulp-cli 버전을 확인 합니다.

```javascript
node -v

/* Result */
v24.12.0
```

```javascript
gulp -v

/* Result */
CLI version 3.1.0
Local version 4.0.2
```

> 결과가 위 버전보다 낮을 경우 상위 버전으로 재설치가 필요 합니다.

### 패키지 설치

`package.json` 파일에 정의된 필수 모듈을 설치 합니다.

```javascript
npm install -d
```

### 웹서버 실행하기

```javascript
gulp;
```

### Build 실행하기

```javascript
gulp build
```

웹서버 실행 후 터미널에서 다음 메시시가 확인 되면 모든 준비가 완료 된 상태입니다.

```shell
---------------------------------------
      Local: http://localhost:3000
   External: http://121.131.27.204:3000
---------------------------------------
         UI: http://localhost:3001
UI External: http://localhost:3001
---------------------------------------
[Browsersync] Serving files from: ./src
```

브라우저에서 http://localhost:3000 으로 접속후 개발을 시작하세요.

> port 번호는 개발 환경에 따라 달라질 수 있습니다.
