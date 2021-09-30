/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions/generateCertificate.ts":
/*!**********************************************!*\
  !*** ./src/functions/generateCertificate.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handle\": () => (/* binding */ handle)\n/* harmony export */ });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs */ \"dayjs\");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! handlebars */ \"handlebars\");\n/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(handlebars__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! chrome-aws-lambda */ \"chrome-aws-lambda\");\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _utils_dynamodbClient__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/dynamodbClient */ \"./src/utils/dynamodbClient.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst compile = async (data) => {\r\n    const filePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(process.cwd(), 'src', 'templates', 'certificate.hbs');\r\n    const html = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(filePath, 'utf-8');\r\n    return handlebars__WEBPACK_IMPORTED_MODULE_3___default().compile(html)(data);\r\n};\r\nconst handle = async (event) => {\r\n    const { id, name, grade } = JSON.parse(event.body);\r\n    const response = await _utils_dynamodbClient__WEBPACK_IMPORTED_MODULE_6__.document.query({\r\n        TableName: 'users_certificates',\r\n        KeyConditionExpression: 'id = :id',\r\n        ExpressionAttributeValues: {\r\n            ':id': id,\r\n        },\r\n    })\r\n        .promise();\r\n    const userAlreadyExists = response.Items[0];\r\n    if (!userAlreadyExists) {\r\n        await _utils_dynamodbClient__WEBPACK_IMPORTED_MODULE_6__.document.put({\r\n            TableName: 'users_certificate',\r\n            Item: {\r\n                id,\r\n                name,\r\n                grade,\r\n            },\r\n        })\r\n            .promise();\r\n    }\r\n    const medalPath = path__WEBPACK_IMPORTED_MODULE_0___default().join(process.cwd(), 'src', 'templates', 'selo.png');\r\n    const medal = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(medalPath, 'base64');\r\n    const data = {\r\n        date: dayjs__WEBPACK_IMPORTED_MODULE_2___default()().format('DD/MM/YYYY'),\r\n        grade,\r\n        name,\r\n        id,\r\n        medal,\r\n    };\r\n    const content = await compile(data);\r\n    const browser = await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_4___default().puppeteer.launch({\r\n        headless: true,\r\n        args: (chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_4___default().args),\r\n        defaultViewport: (chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_4___default().defaultViewport),\r\n        executablePath: await (chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_4___default().executablePath),\r\n    });\r\n    const page = await browser.newPage();\r\n    await page.setContent(content);\r\n    const pdf = await page.pdf({\r\n        format: 'a4',\r\n        landscape: true,\r\n        path: process.env.IS_OFFLINE ? 'certificate.pdf' : null,\r\n        printBackground: true,\r\n        preferCSSPageSize: true,\r\n    });\r\n    await browser.close();\r\n    const s3 = new aws_sdk__WEBPACK_IMPORTED_MODULE_5__.S3();\r\n    await s3\r\n        .putObject({\r\n        Bucket: 'serverlesscertificateignite',\r\n        Key: `${id}.pdf`,\r\n        ACL: 'public-read',\r\n        Body: pdf,\r\n        ContentType: 'application/pdf',\r\n    })\r\n        .promise();\r\n    return {\r\n        statusCode: 201,\r\n        body: JSON.stringify({\r\n            message: 'Certificate created!',\r\n            url: `https://serverlesscerificatesignite.s3.amazonaws.com/${id}.pdf`,\r\n        }),\r\n        headers: {\r\n            'Content-Type': 'application/json',\r\n        },\r\n    };\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL2dlbmVyYXRlQ2VydGlmaWNhdGUudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWdCQTtBQUNBO0FBT0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaWduaXRlY2VydGlmaWNhdGUvLi9zcmMvZnVuY3Rpb25zL2dlbmVyYXRlQ2VydGlmaWNhdGUudHM/YTVhZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnO1xuaW1wb3J0IGhhbmRsZWJhcnMgZnJvbSAnaGFuZGxlYmFycyc7XG5pbXBvcnQgY2hyb21pdW0gZnJvbSAnY2hyb21lLWF3cy1sYW1iZGEnO1xuaW1wb3J0IHsgUzMgfSBmcm9tICdhd3Mtc2RrJztcbmltcG9ydCB7IGRvY3VtZW50IH0gZnJvbSAnLi4vdXRpbHMvZHluYW1vZGJDbGllbnQnO1xuXG5pbnRlcmZhY2UgSUNyZWF0ZUNlcnRpZmljYXRlIHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBncmFkZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSVRlbXBsYXRlIHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBncmFkZTogc3RyaW5nO1xuICBkYXRlOiBzdHJpbmc7XG4gIG1lZGFsOiBzdHJpbmc7XG59XG5cbmNvbnN0IGNvbXBpbGUgPSBhc3luYyAoZGF0YTogSVRlbXBsYXRlKSA9PiB7XG4gIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKFxuICAgIHByb2Nlc3MuY3dkKCksXG4gICAgJ3NyYycsXG4gICAgJ3RlbXBsYXRlcycsXG4gICAgJ2NlcnRpZmljYXRlLmhicydcbiAgKTtcblxuICBjb25zdCBodG1sID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmLTgnKTtcblxuICByZXR1cm4gaGFuZGxlYmFycy5jb21waWxlKGh0bWwpKGRhdGEpO1xufTtcblxuZXhwb3J0IGNvbnN0IGhhbmRsZSA9IGFzeW5jIChldmVudCkgPT4ge1xuICBjb25zdCB7IGlkLCBuYW1lLCBncmFkZSB9ID0gSlNPTi5wYXJzZShldmVudC5ib2R5KSBhcyBJQ3JlYXRlQ2VydGlmaWNhdGU7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkb2N1bWVudFxuICAgIC5xdWVyeSh7XG4gICAgICBUYWJsZU5hbWU6ICd1c2Vyc19jZXJ0aWZpY2F0ZXMnLFxuICAgICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogJ2lkID0gOmlkJyxcbiAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgICAgICAgJzppZCc6IGlkLFxuICAgICAgfSxcbiAgICB9KVxuICAgIC5wcm9taXNlKCk7XG5cbiAgY29uc3QgdXNlckFscmVhZHlFeGlzdHMgPSByZXNwb25zZS5JdGVtc1swXTtcblxuICBpZiAoIXVzZXJBbHJlYWR5RXhpc3RzKSB7XG4gICAgYXdhaXQgZG9jdW1lbnRcbiAgICAgIC5wdXQoe1xuICAgICAgICBUYWJsZU5hbWU6ICd1c2Vyc19jZXJ0aWZpY2F0ZScsXG4gICAgICAgIEl0ZW06IHtcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGdyYWRlLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC5wcm9taXNlKCk7XG4gIH1cblxuICBjb25zdCBtZWRhbFBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYycsICd0ZW1wbGF0ZXMnLCAnc2Vsby5wbmcnKTtcbiAgY29uc3QgbWVkYWwgPSBmcy5yZWFkRmlsZVN5bmMobWVkYWxQYXRoLCAnYmFzZTY0Jyk7XG5cbiAgY29uc3QgZGF0YTogSVRlbXBsYXRlID0ge1xuICAgIGRhdGU6IGRheWpzKCkuZm9ybWF0KCdERC9NTS9ZWVlZJyksXG4gICAgZ3JhZGUsXG4gICAgbmFtZSxcbiAgICBpZCxcbiAgICBtZWRhbCxcbiAgfTtcblxuICBjb25zdCBjb250ZW50ID0gYXdhaXQgY29tcGlsZShkYXRhKTtcblxuICBjb25zdCBicm93c2VyID0gYXdhaXQgY2hyb21pdW0ucHVwcGV0ZWVyLmxhdW5jaCh7XG4gICAgaGVhZGxlc3M6IHRydWUsXG4gICAgYXJnczogY2hyb21pdW0uYXJncyxcbiAgICBkZWZhdWx0Vmlld3BvcnQ6IGNocm9taXVtLmRlZmF1bHRWaWV3cG9ydCxcbiAgICBleGVjdXRhYmxlUGF0aDogYXdhaXQgY2hyb21pdW0uZXhlY3V0YWJsZVBhdGgsXG4gIH0pO1xuXG4gIGNvbnN0IHBhZ2UgPSBhd2FpdCBicm93c2VyLm5ld1BhZ2UoKTtcblxuICBhd2FpdCBwYWdlLnNldENvbnRlbnQoY29udGVudCk7XG5cbiAgY29uc3QgcGRmID0gYXdhaXQgcGFnZS5wZGYoe1xuICAgIGZvcm1hdDogJ2E0JyxcbiAgICBsYW5kc2NhcGU6IHRydWUsXG4gICAgcGF0aDogcHJvY2Vzcy5lbnYuSVNfT0ZGTElORSA/ICdjZXJ0aWZpY2F0ZS5wZGYnIDogbnVsbCxcbiAgICBwcmludEJhY2tncm91bmQ6IHRydWUsXG4gICAgcHJlZmVyQ1NTUGFnZVNpemU6IHRydWUsXG4gIH0pO1xuXG4gIGF3YWl0IGJyb3dzZXIuY2xvc2UoKTtcblxuICBjb25zdCBzMyA9IG5ldyBTMygpO1xuXG4gIGF3YWl0IHMzXG4gICAgLnB1dE9iamVjdCh7XG4gICAgICBCdWNrZXQ6ICdzZXJ2ZXJsZXNzY2VydGlmaWNhdGVpZ25pdGUnLFxuICAgICAgS2V5OiBgJHtpZH0ucGRmYCxcbiAgICAgIEFDTDogJ3B1YmxpYy1yZWFkJyxcbiAgICAgIEJvZHk6IHBkZixcbiAgICAgIENvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vcGRmJyxcbiAgICB9KVxuICAgIC5wcm9taXNlKCk7XG5cbiAgcmV0dXJuIHtcbiAgICBzdGF0dXNDb2RlOiAyMDEsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgbWVzc2FnZTogJ0NlcnRpZmljYXRlIGNyZWF0ZWQhJyxcbiAgICAgIHVybDogYGh0dHBzOi8vc2VydmVybGVzc2NlcmlmaWNhdGVzaWduaXRlLnMzLmFtYXpvbmF3cy5jb20vJHtpZH0ucGRmYCxcbiAgICB9KSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gIH07XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/functions/generateCertificate.ts\n");

/***/ }),

/***/ "./src/utils/dynamodbClient.ts":
/*!*************************************!*\
  !*** ./src/utils/dynamodbClient.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"document\": () => (/* binding */ document)\n/* harmony export */ });\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);\n\r\nconst options = {\r\n    region: 'localhost',\r\n    endpoint: 'http://localhost:8000',\r\n};\r\nconst isOffline = () => {\r\n    return process.env.IS_OFFLINE;\r\n};\r\nconst document = isOffline()\r\n    ? new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.DynamoDB.DocumentClient(options)\r\n    : new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.DynamoDB.DocumentClient();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdXRpbHMvZHluYW1vZGJDbGllbnQudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2lnbml0ZWNlcnRpZmljYXRlLy4vc3JjL3V0aWxzL2R5bmFtb2RiQ2xpZW50LnRzPzQ1MTMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHluYW1vREIgfSBmcm9tICdhd3Mtc2RrJztcclxuXHJcbmNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgcmVnaW9uOiAnbG9jYWxob3N0JyxcclxuICBlbmRwb2ludDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMCcsXHJcbn07XHJcblxyXG5jb25zdCBpc09mZmxpbmUgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIHByb2Nlc3MuZW52LklTX09GRkxJTkU7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZG9jdW1lbnQgPSBpc09mZmxpbmUoKVxyXG4gID8gbmV3IER5bmFtb0RCLkRvY3VtZW50Q2xpZW50KG9wdGlvbnMpXHJcbiAgOiBuZXcgRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/utils/dynamodbClient.ts\n");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),

/***/ "chrome-aws-lambda":
/*!************************************!*\
  !*** external "chrome-aws-lambda" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("chrome-aws-lambda");

/***/ }),

/***/ "dayjs":
/*!************************!*\
  !*** external "dayjs" ***!
  \************************/
/***/ ((module) => {

module.exports = require("dayjs");

/***/ }),

/***/ "handlebars":
/*!*****************************!*\
  !*** external "handlebars" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("handlebars");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/generateCertificate.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;