const chai = require('chai');
const expect = chai.expect;

const Sequelize = require('sequelize');

const User = require('../models/user');

describe('User model', function () {

  let bio;
  let user;
  beforeEach(function () {
    bio = 'Once upon a time I knew nothing of databases. Today, I dream in SQL and experience the world through tables and rows. I\'m currently a single entity but I\'m looking for someone else to JOIN me in a RELATIONship. If you enjoy puns as much as I do, send me a query and we can SELECT a time to meet.'
    user = User.build({
      first: 'DB',
      last: 'Admin',
      age: 42,
      email: 'dbAdmin@company.com',
      bio: bio
    });
  });

  describe('fields:', function () {

    it('include `first`, `last`, `age`, `email`, and `bio`', function () {
      return user.save()
      .then(function (savedUser) {
        expect(savedUser.first).to.equal('DB');
        expect(savedUser.last).to.equal('Admin');
        expect(savedUser.email).to.equal('dbAdmin@company.com');
        expect(savedUser.bio).to.equal(bio);
      })
    });

    it('requires `email`', function () {
      delete user.email;

      return user.validate()
      .then(function (err) {
        expect(err).to.be.an.instanceOf(Error);
        expect(err.message).to.contain('content cannot be null');
      });
    });

  });

  describe('options:', function () {

    describe('`fullName` getter', function () {

      it('returns `first` and `last` concatenated with a space between', function () {
        expect(user.fullName).to.equal('DB Admin');
      });

    });

    describe('`haveBirthday` instance method', function () {

      it('returns a promise', function () {
        const birthdayPromise = user.haveBirthday();
        expect(birthdayPromise).to.be.instanceOf(Sequelize.Promise);
        return birthdayPromise;
      });

      it('the returned promise resolves to the user\'s new age', function () {
        return user.haveBirthday()
        .then(function (newAge) {
          expect(newAge).to.be(43);
        });
      });

    });

  });

});
