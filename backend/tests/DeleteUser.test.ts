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

describe('Testes de Integração da API Users Requisições do Tipo `DELETE`', () => {
  let chaiHttpResponse: Response;

  describe('1- Requisição do tipo `DELETE` para a rota `/users/02` para deletar um usuário com sucesso.', () => {
    before(async () => {
      
       sinon
        .stub(Users, 'findByPk')
        .resolves(userData as unknown as Users);

        sinon
        .stub(Users, 'destroy')
        .resolves({ 1 : any } as any);
    });

    after(() => {
      (Users.findByPk as sinon.SinonStub).restore();
      (Users.destroy as sinon.SinonStub).restore();
    });
    
    it('Espera no corpo da resposta STATUS 204', async () => {
      chaiHttpResponse = await chai.request(app).put('/users/2').send(requestUserValid);
      expect(chaiHttpResponse.status).to.be.equal(204);
    });
    
  });
  
  describe('3- Requisição do tipo `DELETE` para a rota `/users/53` para deletar um usuário que não existe.', () => {
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
