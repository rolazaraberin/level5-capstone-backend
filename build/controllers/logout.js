"use strict";var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P((function(resolve){resolve(value)}))}return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const authenticate_1=__importDefault(require("./authenticate")),dbToken_1=__importDefault(require("./dbToken")),router_1=require("../routes/router"),logout={withToken:withToken};function withToken(request,response){return __awaiter(this,void 0,void 0,(function*(){try{const{email:email,token:token}=request.body;yield authenticate_1.default.token(email,token),yield dbToken_1.default.invalidate(email),response.status(200).send("SUCCESS: logged out")}catch(asyncError){const{error:error,code:code,message:message}=yield(0,router_1.handleAsyncError)(asyncError);response.status(code).send(message)}}))}exports.default=logout;