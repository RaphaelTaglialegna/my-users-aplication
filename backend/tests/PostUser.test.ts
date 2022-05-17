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


describe('Testes de Integração da API Users', () => {
  let chaiHttpResponse: Response;

  describe('1- Requisição do tipo `GET` para a rota `/users` para buscar todos os usurários cadastrados.', async () => {
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
//   describe('3 - Criando um novo contato através da rota `/Userss` fazendo requisição do tipo `POST` será testado as seguintes validações.', () => {
//     before(async () => {
//       sinon
//         .stub(Users, 'create')
//         .resolves({
//           id: 3,
//           firstName: 'Robert',
//           lastName: 'Mattos',
//           cpf: '00000000536',
//       });
//       sinon
//         .stub(Phone, 'create')
//         .resolves({
//           id: 3,
//           phone: '19912345659',
//       });
//       sinon
//       .stub(Email, 'create')
//       .resolves({
//         id: 3,
//         email: 'mattos@gmail.com',
//     });
//     });
    
//     after(() => {
//       (Users.create).restore();
//       (Phone.create).restore();
//       (Email.create).restore();
//     });

//     describe('Fazendo a requisição sem o campo firstName', () => {
//       it('Espera no corpo da resposta STATUS 400', async () => {
//         chaiHttpResponse = await chai.request(app).post('/Userss').send({        
//           lastName: 'Mattos',
//           cpf: '00000000536',
//           emails: [{ email: 'mattos@gmail.com' }],
//           phones: [{ phone: '19912345659' }],
//       });
//         expect(chaiHttpResponse.status).to.be.equal(400);
//       });
//       it('Espera um erro com a seguinte mensagem ""firstName" is required".', () => {
//         expect(chaiHttpResponse.body).to.haveOwnProperty('message')
//         .to.be.eq('"firstName" is required');
//       });    
//     });

//     describe('Fazendo a requisição sem o campo lastName', () => {
//       it('Espera no corpo da resposta STATUS 400', async () => {
//       chaiHttpResponse = await chai.request(app).post('/Userss').send({        
//         firstName: 'Robert',
//         cpf: '00000000536',
//         emails: [{ email: 'mattos@gmail.com' }],
//         phones: [{ phone: '19912345659' }],
//     });
//       expect(chaiHttpResponse.status).to.be.equal(400);
//     });
//       it('Espera um erro com a seguinte mensagem ""lastName" is required".', () => {
//         expect(chaiHttpResponse.body).to.haveOwnProperty('message')
//         .to.be.eq('"lastName" is required');
//       });      
//     });

//     describe('Fazendo a requisição sem o campo phone', () => {
//       it('Espera no corpo da resposta STATUS 400', async () => {
//       chaiHttpResponse = await chai.request(app).post('/Userss').send({        
//         firstName: 'Robert',
//         lastName: 'Mattos',
//         cpf: '00000000536',
//         emails: [{ email: 'mattos@gmail.com' }],
//         phones: [{}],
//     });
//       expect(chaiHttpResponse.status).to.be.equal(400);
//     });
//       it('Espera um erro com a seguinte mensagem ""phones[0].phone" is required".', () => {
//         expect(chaiHttpResponse.body).to.haveOwnProperty('message')
//         .to.be.eq('"phones[0].phone" is required');
//       });      
//     });

//     describe('Cadastrando um usuário válido', () => {
//       it('Espera no corpo da resposta STATUS 201', async () => {
//       chaiHttpResponse = await chai.request(app).post('/Userss').send(VALIDUsers);
//       expect(chaiHttpResponse.status).to.be.equal(201);
//     });
//       it('Espera um retorno do usuário cadastrado e seu respectivo ID".', () => {
//         expect(chaiHttpResponse.body).to.be.an('object').deep.equal({ id: 3, ...VALIDUsers });
//       });      
//     });
//   });
});
