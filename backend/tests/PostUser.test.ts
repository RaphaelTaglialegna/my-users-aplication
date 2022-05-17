import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../src/app';

import Users from '../src/models/Users';
import { Response } from 'superagent';

import
 {
  requestUserValid,
  requestValidateName,
  requestValidateEmail,
  requestValidatePassword
  } from './Mocks/requests'

chai.use(chaiHttp);

const { expect } = chai;

const ID = 3 as number;

describe('Testes de Integração da API Users Requisições do Tipo POST', () => {
  let chaiHttpResponse: Response;

  describe('1- Requisição do tipo `POST` para a rota `/users` para cadastrar um usuário com sucesso.', () => {
    before(async () => {  
      sinon
      .stub(Users, 'create')
      .resolves({ id: ID } as unknown as Users);
    });

    after(() => {
      (Users.create as sinon.SinonStub).restore();
    });
    
    it('Espera no corpo da resposta STATUS 201', async () => {
      chaiHttpResponse = await chai.request(app).post('/users').send(requestUserValid);

      expect(chaiHttpResponse.status).to.be.equal(201);
    });
    
    it('Espera um retorno do usuário cadastrado e seu respectivo ID".', async () => {
      chaiHttpResponse = await chai.request(app).post('/users').send(requestUserValid);
      const { username, email } = requestUserValid;
      expect(chaiHttpResponse.body).to.be.an('object').deep.equal({ id: ID, username, email });
    }); 
    
  });

  describe('3-Validações dos campos "username, email e password"', () => {
    describe('Requisição do tipo `POST` para a rota `/users/` sem o campo "username".', () => {
      it('Espera no corpo da resposta STATUS 400 ', async () => {
      chaiHttpResponse = await chai.request(app).post('/users').send(requestValidateName);
       expect(chaiHttpResponse.status).to.be.equal(400);
     });
      it('Espera um erro com a seguinte mensagem "All fields must be filled".',async () => {
        chaiHttpResponse = await chai.request(app).post('/users').send(requestValidateName);
        expect(chaiHttpResponse.body).to.haveOwnProperty('message')
        .to.be.eq("All fields must be filled");
      });
    });

    describe('Requisição do tipo `POST` para a rota `/users/` sem o campo "email".', () => {
      it('Espera no corpo da resposta STATUS 400 ', async () => {
      chaiHttpResponse = await chai.request(app).post('/users').send(requestValidateEmail);
        expect(chaiHttpResponse.status).to.be.equal(400);
      });
      it('Espera um erro com a seguinte mensagem "All fields must be filled"""email" is required".',async () => {
        chaiHttpResponse = await chai.request(app).post('/users').send(requestValidateEmail);
        expect(chaiHttpResponse.body).to.haveOwnProperty('message')
        .to.be.eq("All fields must be filled");
      });
    });

    describe('Requisição do tipo `POST` para a rota `/users/` sem o campo "password".', () => {
      it('Espera no corpo da resposta STATUS 400 ', async () => {
      chaiHttpResponse = await chai.request(app).post('/users').send(requestValidatePassword);
        expect(chaiHttpResponse.status).to.be.equal(400);
      });
      it('Espera um erro com a seguinte mensagem "All fields must be filled".',async () => {
        chaiHttpResponse = await chai.request(app).post('/users').send(requestValidatePassword);
        expect(chaiHttpResponse.body).to.haveOwnProperty('message')
        .to.be.eq("All fields must be filled");
      });
    });    
  });
});
