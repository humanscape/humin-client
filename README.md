# Humin Client

## 서버 배포

해당 가이드는 Centos8버전을 기준으로 제작되었습니다.

1. nodejs 설치

```
$ dnf install @nodejs
```

2. import yarn repo

```
$ curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
$ rpm --import https://dl.yarnpkg.com/rpm/pubkey.gpg
```

3. install yarn
```
$ dnf install yarn
```

4. 라이브러리 설치
```
$ yarn install
```

5. build
```
$ yarn build
```

메모리 관련 오류 시 로컬에서 빌드 해 업로드 진행

6. nginx에 적용
```
$ cp -R build/* /usr/share/nginx/html/
```