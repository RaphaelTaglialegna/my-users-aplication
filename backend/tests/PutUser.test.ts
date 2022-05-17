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
import { any } from 'joi';
import userData from './Mocks/contactByIdMock';

chai.use(chaiHttp);

const { expect } = chai;

const ID = 3 as number;

describe('Testes de Integração da API Users Requisições do Tipo PUT', () => {
  let chaiHttpResponse: Response;

  describe('1- Requisição do tipo `PUT` para a rota `/users/02` para atualizar um usuário com sucesso.', () => {
    before(async () => {
      
       sinon
        .stub(Users, 'findByPk')
        .resolves(userData as unknown as Users);

        sinon
        .stub(Users, 'update')
        .resolves({ 1 : any } as any);
    });

    after(() => {
      (Users.findByPk as sinon.SinonStub).restore();
      (Users.update as sinon.SinonStub).restore();

    });
    
    it('Espera no corpo da resposta STATUS 204', async () => {
      chaiHttpResponse = await chai.request(app).put('/users/2').send(requestUserValid);
      expect(chaiHttpResponse.status).to.be.equal(204);
    });
    
  });

  describe('2-Validações dos campos "username, email e password"', () => {
    describe('Requisição do tipo `PUT` para a rota `/users/` sem o campo "username".', () => {
      it('Espera no corpo da resposta STATUS 400 ', async () => {
      chaiHttpResponse = await chai.request(app).put('/users/2').send(requestValidateName);
       expect(chaiHttpResponse.status).to.be.equal(400);
     });
      it('Espera um erro com a seguinte mensagem "All fields must be filled".',async () => {
        chaiHttpResponse = await chai.request(app).put('/users/2').send(requestValidateName);
        expect(chaiHttpResponse.body).to.haveOwnProperty('message')
        .to.be.eq("All fields must be filled");
      });
    });

    describe('Requisição do tipo `PUT` para a rota `/users/2` sem o campo "email".', () => {
      it('Espera no corpo da resposta STATUS 400 ', async () => {
      chaiHttpResponse = await chai.request(app).put('/users/2').send(requestValidateEmail);
        expect(chaiHttpResponse.status).to.be.equal(400);
      });
      it('Espera um erro com a seguinte mensagem "All fields must be filled"""email" is required".',async () => {
        chaiHttpResponse = await chai.request(app).put('/users/2').send(requestValidateEmail);
        expect(chaiHttpResponse.body).to.haveOwnProperty('message')
        .to.be.eq("All fields must be filled");
      });
    });

    describe('Requisição do tipo `PUT` para a rota `/users/2` sem o campo "password".', () => {
      it('Espera no corpo da resposta STATUS 400 ', async () => {
      chaiHttpResponse = await chai.request(app).put('/users/2').send(requestValidatePassword);
        expect(chaiHttpResponse.status).to.be.equal(400);
      });
      it('Espera um erro com a seguinte mensagem "All fields must be filled".',async () => {
        chaiHttpResponse = await chai.request(app).put('/users/2').send(requestValidatePassword);
        expect(chaiHttpResponse.body).to.haveOwnProperty('message')
        .to.be.eq("All fields must be filled");
      });
    });
  });
    describe('3- Requisição do tipo `PUT` para a rota `/users/53` para atualizar um usuário que não existe.', () => {
      before(async () => {
      
        sinon
         .stub(Users, 'findByPk')
         .resolves(null as unknown as Users);
     });
 
     after(() => {
       (Users.findByPk as sinon.SinonStub).restore();
 
     });
      
      it('Espera no corpo da resposta STATUS 404', async () => {
        chaiHttpResponse = await chai.request(app).put('/users/54').send(requestUserValid);
        expect(chaiHttpResponse.status).to.be.equal(404);
      });
      it('Espera que retorne a mensagem "No user in data base or invalid ID"', async () => {
        chaiHttpResponse = await chai.request(app).get('/users/156').send(requestUserValid);
        expect(chaiHttpResponse.body).to.haveOwnProperty('message')
          .to.be.eq('No user in data base or invalid ID'); 
      });      
    });
});
