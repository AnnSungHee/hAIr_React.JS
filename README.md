# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# 1단계 node.js 설치하기

## node.js 홈페이지 접속

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/22a94b05-7985-4fde-bf6a-f80077137839/d0ea6905-13d5-4ebe-b82e-5921bbb18486/Untitled.png)

## Chocolatey 설치 무시

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/22a94b05-7985-4fde-bf6a-f80077137839/bff53ffd-264e-4563-9fd5-f18f15179fa3/Untitled.png)

## 버전 확인

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/22a94b05-7985-4fde-bf6a-f80077137839/d8432c70-2962-416b-a4f5-4eee649c7f1e/Untitled.png)

# 2단계 새로운 로컬 리포지터리 만들기(프로젝트 폴더)

### 명령문

```bash
npx create-react-app 이름
```

### 결과

```bash
F:\Repository>npx create-react-app temp-proj
Need to install the following packages:
create-react-app@5.0.1
Ok to proceed? (y) y                                                                                                                                                                                                                                                                                                                                                                        
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated uid-number@0.0.6: This package is no longer supported.                                                                                                                    
npm warn deprecated fstream-ignore@1.0.5: This package is no longer supported.                                                                                                                
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated rimraf@2.7.1: Rimraf versions prior to v4 are no longer supported
npm warn deprecated fstream@1.0.12: This package is no longer supported.
npm warn deprecated tar@2.2.2: This version of tar is no longer supported, and will not receive security updates. Please upgrade asap.                                                                                                                                                                                                                                                      

Creating a new React app in F:\Repository\temp-proj.                                                                                                                                                                                                                                                                                                                                        

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts with cra-template...

added 1477 packages in 3m

258 packages are looking for funding
  run `npm fund` for details

Initialized a git repository.

Installing template dependencies using npm...

added 67 packages, and changed 1 package in 16s

262 packages are looking for funding
  run `npm fund` for details
Removing template package using npm...

removed 1 package, and audited 1544 packages in 6s

262 packages are looking for funding
   run `npm fund` for details

8 vulnerabilities (2 moderate, 6 high)

To address all issues (including breaking changes), run:
   npm audit fix --force

Run `npm audit` for details.

Created git commit.

Success! Created temp-proj at F:\Repository\temp-proj
Inside that directory, you can run several commands:

   npm start
	Starts the development server.

   npm run build
	Bundles the app into static files for production.

   npm test
	Starts the test runner.

   npm run eject
	Removes this tool and copies build dependencies, configuration files
	and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

   cd temp-proj
   npm start

Happy hacking!
```