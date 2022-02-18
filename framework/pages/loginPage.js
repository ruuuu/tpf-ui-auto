import supertest from 'supertest';
import { app } from './index.js';

const LoginPage = function () {

  const loginField = ('input[data-field-name="login"]');
  const passwordField = ('[data-field-name="password"]');
  const loginButton = ('button');
  const linkTpf = ('a[href="/tpf"]');


  this.login = async function (page, name, password) {
    await page.fill(loginField, name);

    await page.fill(passwordField, password);

    await page.click(loginButton);

    await page.click(linkTpf);
  };



  this.getAllInn = async function (url, j) {  // выдает массив ИНН, котрые есть в системе

    const dataToGetInn = {
      grant_type: "password",
      password: String(app().data()[j].password),
      username: String(app().data()[j].email)
    };

    const rr = await supertest(url) // 
      .post('/api/v0/vst-oauth2/oauth/token')
      .set('Authorization', `Basic ZGVtby1jbGllbnQ6c2VjcmV0`)
      .send(dataToGetInn);

    const token = rr.body.access_token;
    //console.log('token = ', token);


    const r = await supertest(url)
      .get('/api/v0/tpf-bank/taxpayers')
      .query({ page: 0, size: 20 })
      .set('Authorization', `Bearer ${token}`);

    //console.log('r.body ', r.body);    
    //console.log('array taxpayers: ', r.body.content);

    let arrayInn = [];
    for (let i = 0; i < r.body.content.length; i++) {
      arrayInn.push(r.body.content[i].taxpayerInn);
    }

    //console.log('arrayInn: ', arrayInn); // массив ИНН котые есть в системе
    //console.log('inn[0]: ', r.body.content[0].taxpayerInn);

    const inn = arrayInn[Math.floor(Math.random() * arrayInn.length)];
    //console.log('inn: ', inn);
    return inn;

  };

};

export { LoginPage }; 