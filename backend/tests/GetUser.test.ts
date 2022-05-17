import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../src/app';

import Users from '../src/models/Users';
import { Response } from 'superagent';
import usersData from './Mocks/databaseMock';
import userData from './Mocks/contactByIdMock';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testes de Integração da API Users Requisições do Tipo "GET"', () => {
  let chaiHttpResponse: Response;

  describe('1- Requisição do tipo "GET" para a rota `/users` para buscar todos os usurários cadastrados.', async () => {
    before(async () => {
      sinon
        .stub(Users, 'findAll')
        .resolves(usersData as unknown as Users[]);
    });
    
    after(() => {
      (Users.findAll as sinon.SinonStub).restore();
    });
    
    it('Espera no corpo da resposta STATUS 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/users');

      expect(chaiHttpResponse.status).to.be.equal(200);
    });
    
    it('Espera que tenha os campos id, username e email', async() => {
      chaiHttpResponse = await chai.request(app).get('/users');

      expect(chaiHttpResponse.body[0]).to.have.own.property('id');
      expect(chaiHttpResponse.body[0]).to.have.own.property('username');
      expect(chaiHttpResponse.body[0]).to.have.own.property('email');
      expect(chaiHttpResponse.body[0]).not.have.own.property('password');

    }); 
  });

  describe('2- Requisição do tipo `GET` para a rota `/users/id` para buscar o usuário correspondente ao ID da requisição.', async () => {
    
    before(async () => {
      sinon
      .stub(Users, 'findByPk')
      .resolves(userData as unknown as Users);
    });
    
    after(() => {
      (Users.findByPk as sinon.SinonStub).restore();
    });
    
    it('Espera no corpo da resposta STATUS 200', async () => {
     chaiHttpResponse = await chai.request(app).get('/users/2');
     expect(chaiHttpResponse.status).to.be.equal(200);
   });
   
  it('Espera que tenha os campos id, username e email', async () => {
    chaiHttpResponse = await chai.request(app).get('/users/1');
    expect(chaiHttpResponse.body).to.have.own.property('id');
    expect(chaiHttpResponse.body).to.have.own.property('username');
    expect(chaiHttpResponse.body).to.have.own.property('email');
    expect(chaiHttpResponse.body).not.have.own.property('password');
  });
 });

 describe('3- Requisição do tipo `GET` para a rota `/users/id` com um ID inválido.', async () => {
    
  before(async () => sinon
    .stub(Users, 'findByPk')
    .resolves(null));
  
  after(() => {
    (Users.findByPk as sinon.SinonStub).restore();
  });
  
  it('Espera no corpo da resposta STATUS 404', async () => {
   chaiHttpResponse = await chai.request(app).get('/users/34');
   expect(chaiHttpResponse.status).to.be.equal(404);
 });
 
  it('Espera que retorne a mensagem "No user in data base or invalid ID"', async () => {
    chaiHttpResponse = await chai.request(app).get('/users/156');
    expect(chaiHttpResponse.body).to.haveOwnProperty('message')
      .to.be.eq('No user in data base or invalid ID'); 
    });
  });
});
